const { expect } = require("chai");
const { ethers } = require("hardhat");
const { smock } = require("@defi-wonderland/smock");

const gameJSON = require("../../artifacts/contracts/darkforest/GetterInterface.sol/IGetter.json");
const listJSON = require("../../artifacts/contracts/ListVerifier.sol/Verifier.json");
const saleJSON = require("../../artifacts/contracts/SaleVerifier.sol/Verifier.json");

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

	fakeGame = await smock.fake(gameJSON.abi);

	// Stubs
	fakeGame.getSnarkConstants.returns({
		DISABLE_ZK_CHECKS: false,
		PLANETHASH_KEY: 7,
		SPACETYPE_KEY: 0,
		BIOMEBASE_KEY: 8,
		PERLIN_MIRROR_X: false,
		PERLIN_MIRROR_Y: false,
		PERLIN_LENGTH_SCALE: 0
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
	});


	it("List: Proof must be valid", async function () {
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