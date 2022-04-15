const { expect } = require("chai");
const { ethers } = require("hardhat");
const { smock } = require("@defi-wonderland/smock");

const gameJSON = require("../../artifacts/contracts/darkforest/GetterInterface.sol/IGetter.json");

// Hash imports
const { mimcHash } = require("@darkforest_eth/hashing");
const poseidonCipher = require("../../client/poseidonCipher.js");
const { formatDiagnosticsWithColorAndContext } = require("typescript");
const { isAddress } = require("ethers/lib/utils");
const { constants } = require("ethers");


// Contracts
let nightmarket;
let listVerifier;
let saleVerifier;
let fakeGame;

// Accounts
let seller;
let buyer;
let anyone;

// A valid planet used by tests
let VALID_LOCATION_ID;
let VALID_X;
let VALID_Y;

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
		hasTriedFindingArtifact: 0,
		prospectedBlockNumber: 0,
		destroyed: false,
		spaceJunk: 0
	});

	// console.log('is valid address?');
	// console.log(isAddress(anyone));
	// anyone.getAddress()

	fakeGame.revealedCoords.returns({
		locationId: 546783,
		x: 0,
		y: 0,
		revealer: constants.AddressZero
	});

	// Initialize a valid planet
	VALID_X = "1764";
	VALID_Y = "21888242871839275222246405745257275088548364400416034343698204186575808492485";
	VALID_LOCATION_ID = mimcHash(fakeGame.PLANETHASH_KEY)(9, 9).toString();

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

	it("List: Coordinate must be valid", async function () {

		const UNINITIALIZED_PLANET = 123;
		const REVEALED_PLANET = 456;

		let defaultInfo = await fakeGame.planetsExtendedInfo(9999);
		fakeGame.planetsExtendedInfo.whenCalledWith(UNINITIALIZED_PLANET).returns(() => {
			defaultInfo.isInitialized = false;
			console.log("logging modified info");
			console.log(i);
			return i
		}
		);

		// fakeGame.revealedCoords.whenCalledWith(REVEALED_PLANET).returns({
		// 	locationId: REVEALED_PLANET
		// });

		// TODO: inputs need to be correctly formatted
		const list = await nightmarket.list(getListProof(), getListingId(), 0, 0, 9999, 0, 0, 0);
		await expect(list).to.be.revertedWith('error');
	});

	it("List: Proof must be valid", async function () {
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
