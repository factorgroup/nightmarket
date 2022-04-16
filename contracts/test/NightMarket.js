const { expect } = require("chai");
const { ethers } = require("hardhat");
const { smock } = require("@defi-wonderland/smock");

const gameJSON = require("../../artifacts/contracts/darkforest/GetterInterface.sol/IGetter.json");

// Hash imports
const { mimcHash } = require("@darkforest_eth/hashing");
const poseidonCipher = require("../../client/poseidonCipher.js");
const { formatDiagnosticsWithColorAndContext } = require("typescript");
const { isAddress } = require("ethers/lib/utils");
const { constants, BigNumber } = require("ethers");
const { defaultAbiCoder } = require("@ethersproject/abi");


// Contracts
let nightmarket;
let listVerifier;
let saleVerifier;
let fakeGame;

// Accounts
let seller;
let buyer;
let anyone;

// Planet constants used by tests
const VALID_X = 1764;
const VALID_Y = 21888242871839275222246405745257275088548364400416034343698204186575808492485;
let VALID_LOCATION_ID;

const UNINITIALIZED_PLANET = 123;
const REVEALED_PLANET = 456;

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

	fakeGame.getSnarkConstants.returns({
		DISABLE_ZK_CHECKS: false,
		PLANETHASH_KEY: 7,
		SPACETYPE_KEY: 0,
		BIOMEBASE_KEY: 8,
		PERLIN_MIRROR_X: false,
		PERLIN_MIRROR_Y: false,
		PERLIN_LENGTH_SCALE: 0
	});

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

	// this.hex = hex;
	// this.id = BigNumber.from(`0x${hex}`);
	VALID_LOCATION_ID = mimcHash(fakeGame.PLANETHASH_KEY)(VALID_X.toString(), VALID_Y.toString());
	console.log(VALID_LOCATION_ID.toString());
	VALID_LOCATION_ID = 8494374857485429681618758289952517922713085356205028291274975976067104607094;//BigNumber.from(VALID_LOCATION_ID.toString()).toNumber();
	console.log(VALID_LOCATION_ID);

	// Stub valid planet, TODO fix this
	fakeGame.revealedCoords.returns({
		locationId: 0,
		x: VALID_X,
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

		// Note: I would do to.be.revertedWith(error), but this is annoyingly broken in waffle
		let error = await expect(
			nightmarket.list(
				getListProof(), getListingId(), 0, 0, UNINITIALIZED_PLANET, 0, 0, 0
			)).to.be.reverted;
		console.log(error.toString());
		expect(error.toString()).to.contain('Planet doesn\'t exit or is not initialized');

		error = await expect(
			nightmarket.list(
				getListProof(), getListingId(), 0, 0, REVEALED_PLANET, 0, 0, 0
			)).to.be.reverted;
		expect(error.toString()).to.contain('Planet coordinates have already been revealed');
	});

	it("List: Seller can list", async function () {
		// TODO test for events: https://docs.ethers.io/v4/cookbook-testing.html
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
// Must compute within the field...

// basically these will be refactored as part of plugin
function getListingId() {
	return [0, 0, 0, 0]
}
function getListInputs() {
	// const listing_id = poseidonCipher.encrypt(message, key, 0);
}

function getListProof() {
	// TODO
	return [0, 0, 0, 0, 0, 0, 0, 0]
}

function getSaleInputs() {

}
function getSaleProof() {

}

function revertError(e) {
	return `Error: VM Exception while processing transaction: reverted with reason string '` + e + `'`
}