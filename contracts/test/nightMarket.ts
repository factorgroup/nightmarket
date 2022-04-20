import { expect } from 'chai';
import * as hre from 'hardhat';
import { smock } from '@defi-wonderland/smock';
import { constants, BigNumber, utils } from 'ethers';

import { default as gameJSON } from '../../artifacts/contracts/darkforest/GetterInterface.sol/IGetter.json';
import * as poseidon from '../../client/util/poseidonCipher.js';
import { getListProof } from '../../client/util/snarkHelper.js';
import * as c from './testConstants';

// DF dependencies use BigInteger for BigInts.
import bigInt, { BigInteger } from 'big-integer';
import { mimcHash, mimcSponge } from '@darkforest_eth/hashing';
import { formatPrivKeyForBabyJub, genEcdhSharedKey, genPubKey } from 'maci-crypto';
import { ethers } from 'hardhat';

const ZqField = require("ffjavascript").ZqField;
const Scalar = require("ffjavascript").Scalar;
const p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const F = new ZqField(p);

// Contracts
let nightmarket;
let listVerifier;
let saleVerifier;
let fakeGame;

// Accounts
let seller;
let buyer;
let anyone;
let addrs;
let mnemonic;
let walletMnemonic;
// TODO nonce can be achieved through: genRandomBabyJubValue

// Calculate commitments from test constants
const MESSAGE = [c.X_COORD, c.Y_COORD];
const LISTING_ID = poseidon.encrypt(MESSAGE, c.KEY, 0);
// @ts-ignore: String not assignable to Number
const KEY_COMMITMENT = mimcHash(0)(c.KEY[0], c.KEY[1]).toString();
// @ts-ignore: String not assignable to Number
const PLANET_ID = mimcHash(c.PLANETHASH_KEY)(c.X_COORD, c.Y_COORD).toString();

// Sale proof constants

/**
 * Generates a game mock contract and deploys the Verifiers
 * @dev: Tests are sequential & dependant on state altered by previous test
 */
before(async function () {
	// Using hardcoded keys in hardhat.config.ts
	[seller, buyer, anyone] = await hre.ethers.getSigners();

	const lvFactory = await hre.ethers.getContractFactory("contracts/ListVerifier.sol:Verifier");
	listVerifier = await lvFactory.deploy();

	const svFactory = await hre.ethers.getContractFactory("contracts/SaleVerifier.sol:Verifier");
	saleVerifier = await svFactory.deploy();

	// Stub game diamond contract returns
	fakeGame = await smock.fake(gameJSON.abi);
	fakeGame.getSnarkConstants.returns(c.SNARK_CONSTANTS);
	fakeGame.planetsExtendedInfo.returns(c.PLANET_EXTENDED_INFO);
	fakeGame.revealedCoords.returns(c.REVEALED_COORDS);

	// Deploy game
	const nmFactory = await hre.ethers.getContractFactory("NightMarket");
	nightmarket = await nmFactory.deploy(listVerifier.address, saleVerifier.address, fakeGame.address);
});

describe("NightMarket contract", function () {

	it("Deployment should work", async function () {
		const zk = await nightmarket.zkConstants();
		expect(zk.PLANETHASH_KEY.toNumber()).to.equal(7);
		expect(zk.BIOMEBASE_KEY.toNumber()).to.equal(8);

		const listAddress = await nightmarket.listVerifier();
		expect(listAddress).to.equal(listVerifier.address);
		const saleAddress = await nightmarket.saleVerifier();
		expect(saleAddress).to.equal(saleVerifier.address);
	});

	it("validPlanet modifier", async function () {
		// Invalid planet constants
		const UNINITIALIZED_PLANET = 123;
		const REVEALED_PLANET = 456;

		fakeGame.planetsExtendedInfo.whenCalledWith(UNINITIALIZED_PLANET).returns({
			isInitialized: false,
			createdAt: 0,
			lastUpdated: 0,
			perlin: 0,
			spaceType: 1,
			upgradeState0: 0,
			upgradeState1: 0,
			upgradeState2: 0,
			hatLevel: 0,
			hasTriedFindingArtifact: false,
			prospectedBlockNumber: 0,
			destroyed: false,
			spaceJunk: 0
		});

		fakeGame.revealedCoords.whenCalledWith(REVEALED_PLANET).returns({
			locationId: REVEALED_PLANET,
			x: 0,
			y: 0,
			revealer: constants.AddressZero
		});

		// Note: I would do to.be.revertedWith(error), but this is annoyingly broken
		let error: any = await expect(
			nightmarket.list(
				getMockProof(),
				LISTING_ID,
				c.NONCE,
				KEY_COMMITMENT,
				UNINITIALIZED_PLANET,
				c.BIOMEBASE,
				c.PRICE,
				c.ESCROW_TIME
			)).to.be.reverted;
		expect(error.toString()).to.contain('Planet doesn\'t exit or is not initialized');

		error = await expect(
			nightmarket.list(
				getMockProof(),
				LISTING_ID,
				c.NONCE,
				KEY_COMMITMENT,
				REVEALED_PLANET,
				c.BIOMEBASE,
				c.PRICE,
				c.ESCROW_TIME
			)).to.be.reverted;
		expect(error.toString()).to.contain('Planet coordinates have already been revealed');
	});

	it("List: Seller cannot list with invalid proof", async function () {
		let error: any = await expect(
			nightmarket.list(
				getMockProof(),
				LISTING_ID,
				c.NONCE,
				KEY_COMMITMENT,
				PLANET_ID,
				c.BIOMEBASE,
				c.PRICE,
				c.ESCROW_TIME
			)).to.be.reverted;
		expect(error.toString()).to.contain('Seller list coordinates: invalid proof');
	});

	it("List: Proof is watermarked to seller only", async function () {
		const proofArgs = await getListProof(listProofArgs());
		let error: any = await expect(nightmarket.connect(anyone).list(
			...proofArgs, c.PRICE, c.ESCROW_TIME
		)).to.be.reverted;
		expect(error.toString()).to.contain("Seller list coordinates: invalid proof");
	});

	it("List: Seller can list many times with valid proof", async function () {
		const proofArgs = await getListProof(listProofArgs());

		await nightmarket.connect(seller).list(...proofArgs, c.PRICE, c.ESCROW_TIME);
		expect(await nightmarket.numListings()).to.equal(1);
		expect((await nightmarket.listings(0)).seller).to.equal(seller.address);
		expect((await nightmarket.listings(0)).keyCommitment).to.equal(KEY_COMMITMENT);
		expect((await nightmarket.listings(0)).isActive).to.equal(true);

		await nightmarket.connect(seller).list(...proofArgs, c.PRICE, c.ESCROW_TIME);
		expect(await nightmarket.numListings()).to.equal(2);
		expect((await nightmarket.listings(1)).seller).to.equal(seller.address);
		expect((await nightmarket.listings(1)).keyCommitment).to.equal(KEY_COMMITMENT);
		expect((await nightmarket.listings(1)).isActive).to.equal(true);
	});

	it("Delist: Seller can delist", async function () {
		const dupeListingId = 1;
		await nightmarket.connect(seller).delist(dupeListingId);
		expect((await nightmarket.listings(1)).isActive).to.equal(false);
	});

	it("Ask: Buyers can make orders", async function () {
		// Construct wallets used to compute the sharedSecrets
		const sellerPrivateKey = hre.config.networks.hardhat.accounts[0].privateKey;
		const sellerSigningKey = new utils.SigningKey(sellerPrivateKey);

		const buyerPrivateKey = hre.config.networks.hardhat.accounts[1].privateKey;
		const buyerSigningKey = new utils.SigningKey(buyerPrivateKey);

		console.log("Seller private key");
		console.log(sellerPrivateKey);
		// Note: we convert a ecdsa pubkey (hex format) to a eddsa pubkey (point format)
		const buyerPubKey = genPubKey(F.e(buyerSigningKey.publicKey)); 		// key is in hex format though....
		// TODO(later): genEcdh is potentially unsafe bc of the previous conversion step
		const sharedKey = genEcdhSharedKey(F.e(sellerPrivateKey), buyerPubKey);	// key is in hex format through...
		console.log("Shared key is");
		console.log(sharedKey);

		// might need tsignore
		const sharedhash = mimcHash(0)(F.e(sharedKey[0]), F.e(sharedKey[1])).toString();
		const expectedkeyhash = BigNumber.from(sharedhash);
		console.log("Expected key hash is");
		console.log(expectedkeyhash);

		const error: any = await expect(nightmarket.connect(buyer).ask(0, expectedkeyhash)).to.be.reverted;
		expect(error.toString()).to.contain('Payment is incorrect');

		const desiredListing = 0;
		await nightmarket.connect(buyer).ask(desiredListing, expectedkeyhash, { value: c.PRICE });
		const order = await nightmarket.getOrder(desiredListing, 0);
		console.log(order);

		expect((await nightmarket.listings(desiredListing)).numOrders).to.equal(1);
		expect(order.buyer).to.equal(buyer.address);
		expect(order.isActive).to.equal(true);
	});

	it("Sale: Proof must be valid", async function () {
		// const receipt_id = poseidon.encrypt(c.KEY, sharedKey, c.NONCE); // in prod, nonces should be different
	});

	it("Refund: Can refund buyers", async function () {
	});
});

describe("Helper functions", function () {
	it("boolToInt works", async function () {
	});

	it("_escrowExpired works", async function () {
	});
});

// Helper fns
function listProofArgs() {
	return {
		PLANETHASH_KEY: c.PLANETHASH_KEY,
		BIOMEBASE_KEY: c.BIOMEBASE_KEY,
		SPACETYPE_KEY: c.SPACETYPE_KEY,
		SCALE: c.SCALE,
		xMirror: c.X_MIRROR,
		yMirror: c.Y_MIRROR,
		listing_id: LISTING_ID,
		nonce: c.NONCE,
		key_commitment: KEY_COMMITMENT,
		planet_id: PLANET_ID,
		biomebase: c.BIOMEBASE,
		seller_address: seller.address,
		x: c.X_COORD,
		y: c.Y_COORD,
		key: c.KEY
	}
}


function getMockProof() {
	return [0, 0, 0, 0, 0, 0, 0, 0]
}

function saleProofArgs() {

}
function getMockSaleProof() {

}
