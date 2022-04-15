const { expect } = require("chai");
const { ethers } = require("hardhat");

let nmFactory;
let nm;
let seller;
let buyer;
let anyone;

beforeEach(async function () {
	[seller, buyer, anyone, ...addrs] = await ethers.getSigners();

	nmFactory = await ethers.getContractFactory("NightMarket");


	nm = await NightMarket.deploy();
});


describe("NightMarket contract", function () {
	it("Deployment should work", async function () {
		// TODO check snark constants
		const snarkConstants = ;
		expect(await nm.totalSupply()).to.equal(ownerBalance);
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