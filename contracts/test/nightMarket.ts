import { expect } from 'chai';
import { ethers } from 'hardhat';
import { smock } from '@defi-wonderland/smock';
import { mimcHash } from '@darkforest_eth/hashing';
import { default as gameJSON } from '../../artifacts/contracts/darkforest/GetterInterface.sol/IGetter.json';
import * as poseidonCipher from '../../client/util/poseidonCipher.js';
import { getListProof } from '../../client/util/snarkHelper.js';
import { constants, BigNumber } from 'ethers';


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

// Valid planet constants
//@dev: Contracts expect input in format: BigNumber.from(...)
const VALID_X = "1764";
const VALID_Y = "21888242871839275222246405745257275088548364400416034343698204186575808492485";
const PLANETHASH_KEY = 7;

const X_MIRROR = "0";
const Y_MIRROR = "0";
const SCALE = "4096";

// @ts-ignore: String not assignable to Number
const VALID_LOCATION_ID = mimcHash(PLANETHASH_KEY)(VALID_X, VALID_Y).toString();
console.log("valid location id:");
console.log(VALID_LOCATION_ID);

// Invalid planet constants
const UNINITIALIZED_PLANET = 123;
const REVEALED_PLANET = 456;

// List proof constants
const MESSAGE = [VALID_X, VALID_Y];
const KEY = [123, 456];
const LISTING_ID = poseidonCipher.encrypt(MESSAGE, KEY, 0);
console.log(LISTING_ID);
const KEY_COMMITMENT = mimcHash(0)(KEY[0], KEY[1]).toString();
const NONCE = 0;
const BIOMEBASE = 12;

// Sale proof constants
// TODO refactor all constants over to testConstants.js

/**
 * Generates a game mock contract and deploys the Verifiers
 */
before(async function () {
	[seller, buyer, anyone, ...addrs] = await ethers.getSigners();

	const lvFactory = await ethers.getContractFactory("contracts/ListVerifier.sol:Verifier");
	listVerifier = await lvFactory.deploy();

	const svFactory = await ethers.getContractFactory("contracts/SaleVerifier.sol:Verifier");
	saleVerifier = await svFactory.deploy();

	// Construct stubs for the game contract
	fakeGame = await smock.fake(gameJSON.abi);

	// Stub snark constants
	fakeGame.getSnarkConstants.returns({
		DISABLE_ZK_CHECKS: false,
		PLANETHASH_KEY,
		SPACETYPE_KEY: 0,
		BIOMEBASE_KEY: 8,
		PERLIN_MIRROR_X: false,
		PERLIN_MIRROR_Y: false,
		PERLIN_LENGTH_SCALE: 4096
	});

	// Stub planet is initialized
	fakeGame.planetsExtendedInfo.returns({
		isInitialized: true,
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

	// Stub no revealed coordinates
	fakeGame.revealedCoords.returns({
		locationId: 3456345,
		x: 0,
		y: 0,
		revealer: constants.AddressZero
	});
});


describe("NightMarket contract", function () {

	/**
	  * Deploys fresh contract for each unit test
	  */
	beforeEach(async function () {
		const nmFactory = await ethers.getContractFactory("NightMarket");
		nightmarket = await nmFactory.deploy(listVerifier.address, saleVerifier.address, fakeGame.address);
	});

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
				getMockProof(), LISTING_ID, NONCE, KEY_COMMITMENT, UNINITIALIZED_PLANET, BIOMEBASE, 0, 0
			)).to.be.reverted;
		expect(error.toString()).to.contain('Planet doesn\'t exit or is not initialized');

		error = await expect(
			nightmarket.list(
				getMockProof(), LISTING_ID, NONCE, KEY_COMMITMENT, REVEALED_PLANET, BIOMEBASE, 0, 0
			)).to.be.reverted;
		expect(error.toString()).to.contain('Planet coordinates have already been revealed');
	});

	it("List: Seller cannot list with invalid proof", async function () {
		let error: any = await expect(
			nightmarket.list(
				getMockProof(),
				LISTING_ID,
				NONCE,
				KEY_COMMITMENT,
				VALID_LOCATION_ID,
				BIOMEBASE,
				10,
				10
			)).to.be.reverted;
		expect(error.toString()).to.contain('Seller list coordinates: invalid proof');
	});

	it("List: Seller can list with valid proof", async function () {
		const proofArgs = await getListProof(listProofArgs());
		const listingId = await nightmarket.connect(seller).list(
			...proofArgs, 10, 10
		);
		console.log("listing id: ...");
		console.log(listingId);

		// TODOL: Test events: https://docs.ethers.io/v4/cookbook-testing.html
	});

	it("List: Proof is watermarked to seller only", async function () {
		const proofArgs = await getListProof(listProofArgs());
		let error: any = await expect(nightmarket.connect(anyone).list(
			...proofArgs, 10, 10
		)).to.be.reverted;
		expect(error.toString()).to.contain("Seller list coordinates: invalid proof");
	});

	it("Delist: Seller can delist", async function () {
	});

	it("Ask: Buyers can make orders", async function () {
	});

	it("Sale: Proof must be valid", async function () {
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
		// TODO have to somehow get the following values.
		PLANETHASH_KEY: "7",
		BIOMEBASE_KEY: "8", // biomebasekey
		SPACETYPE_KEY: "0", //SPACETYPE_KEY = 
		SCALE,
		xMirror: X_MIRROR, //xMirror = 
		yMirror: Y_MIRROR, //yMirror = 
		listing_id: LISTING_ID,
		nonce: NONCE, // nonce = 
		key_commitment: KEY_COMMITMENT,
		planet_id: VALID_LOCATION_ID,
		biomebase: BIOMEBASE, // key_commitment =
		seller_address: seller.address,
		x: VALID_X, // x
		y: VALID_Y, // y
		key: KEY
	}
}


function getMockProof() {
	// TODO
	return [0, 0, 0, 0, 0, 0, 0, 0]
}

function getSaleInputs() {

}
function getSaleProof() {

}
