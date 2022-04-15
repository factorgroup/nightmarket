const { expect } = require("chai");
const { ethers } = require("hardhat");
const { smock } = require("@defi-wonderland/smock");

const gameJSON = require("../../artifacts/contracts/darkforest/GetterInterface.sol/IGetter.json");

const { mimcHash } = require("@darkforest_eth/hashing");

// Contracts
let nightmarket;
let listVerifier;
let saleVerifier;
let fakeGame;

// Accounts
let seller;
let buyer;
let anyone;

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
	});

	fakeGame.revealedCoords.returns({
		locationId: ,
		x: 1764,
		y: 21888242871839275222246405745257275088548364400416034343698204186575808492485,
		revealer: anyone
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

	it("List: Coordinate must be valid", async function () {

		const locationId = mimcHash(PLANETHASH_KEY)(9, 9).toString();

		const UNINITIALIZED_PLANET = 123;
		const REVEALED_PLANET = 456;

		fakeGame.planetsExtendedInfo.whenCalledWith(UNINITIALIZED_PLANET).returns({
			isInitialized: false,
		});

		fakeGame.revealedCoords.whenCalledWith(REVEALED_PLANET), returns({
			locationId: 0,
			x: 0,
			y: 0,
			revealer: anyone
		});

		const zk = await nightmarket.list(createListInput(...));
		// await expect().to.be.revertedWith('error');
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
function createListInput() {

	// uint256[8] memory _proof,
	// 	uint256[4] memory _coordEncryption,
	// 		uint256 _nonce,
	// 			uint256 _keyCommitment,
	// 				uint256 _locationId,
	// 					uint256 _biomebase,
	// 						uint256 _price,
	// 							uint64 _escrowTime
}

function createSaleInput() {

	// uint256[8] memory _proof,
	// 	uint256[4] memory _coordEncryption,
	// 		uint256 _nonce,
	// 			uint256 _keyCommitment,
	// 				uint256 _locationId,
	// 					uint256 _biomebase,
	// 						uint256 _price,
	// 							uint64 _escrowTime
}