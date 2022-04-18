const { expect } = require("chai");
const { ethers } = require("hardhat");
const { smock } = require("@defi-wonderland/smock");

const gameJSON = require("../../artifacts/contracts/darkforest/GetterInterface.sol/IGetter.json");

// Hash imports
const { mimcHash } = require("@darkforest_eth/hashing");
const poseidonCipher = require("../../client/util/poseidonCipher.js");
const { constants, BigNumber } = require("ethers");

const { getListProof } = require("../../build/client/util/snarkHelper.js");

// Contracts
let nightmarket;
let listVerifier;
let saleVerifier;
let fakeGame;

// Accounts
let seller;
let buyer;
let anyone;

// Valid planet constants
//@dev: Contracts expect input in format: BigNumber.from(...)
const VALID_X = "1764";
const VALID_Y = "21888242871839275222246405745257275088548364400416034343698204186575808492485";
const PLANETHASH_KEY = 7;
const VALID_LOCATION_ID = mimcHash(PLANETHASH_KEY)(VALID_X, VALID_Y).toString();

// Invalid planet constants
const UNINITIALIZED_PLANET = 123;
const REVEALED_PLANET = 456;

// List proof constants
const MESSAGE = [VALID_X, VALID_Y];
const KEY = [123, 456];
const LISTING_ID = poseidonCipher.encrypt(MESSAGE, KEY, 0);
const KEY_COMMITMENT = mimcHash(0)(KEY[0], KEY[1]).toString();
const NONCE = 0;
const BIOMEBASE = 12;

// Sale proof constants


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

/**
 * Deploys fresh contract for each unit test
 */
beforeEach(async function () {
	const nmFactory = await ethers.getContractFactory("NightMarket");
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
		let error = await expect(
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

	it("List: Seller can list with valid proof", async function () {
		// Test invalid proof
		let error = await expect(
			nightmarket.list(
				getMockProof(), LISTING_ID, NONCE, KEY_COMMITMENT, VALID_LOCATION_ID, BIOMEBASE, 10, 10
			)).to.be.reverted;
		expect(error.toString()).to.contain('Seller list coordinates: invalid proof');


		// TODO different seller cannot reuse valid proof

		const callArgs = await getListProof(...makeListArgs());

		console.log(`call args`);
		console.log(callArgs);

		const listingId = await nightmarket.connect(seller).list(
			...callArgs, 10, 10
		);

		// TODO: hand calculate the proof
		console.log(listingId);

		// Test events: https://docs.ethers.io/v4/cookbook-testing.html
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
function makeListArgs() {

	return [
		// TODO have to somehow get the following values.
		"7",
		BIOMEBASE_KEY = 8,
		SPACETYPE_KEY = "0",
		SCALE = "4096",
		xMirror = "0",
		yMirror = "0",
		listing_id = [
			"12753447148121167434357839709858966792033157573827016815156583788306586540522",
			"13920243683402356497076284133493391890541532189944281037309009108625911765854",
			"10521252423187961468633215951909647732214307577253186066693148916796996049063",
			"4839923218478346912757596955602860545458748119976948681246370335467809039368"
		],
		nonce = "0",
		key_commitment = KEY_COMMITMENT,
		planet_id = VALID_LOCATION_ID,
		biomebase = "12",
		seller_address = seller.address,
		x = "1764",
		y = "21888242871839275222246405745257275088548364400416034343698204186575808492485",
		key = [
			"123",
			"456"
		]
	]
}
function getMockProof() {
	// TODO
	return [0, 0, 0, 0, 0, 0, 0, 0]
}

function getSaleInputs() {

}
function getSaleProof() {

}
