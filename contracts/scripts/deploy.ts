import * as hre from 'hardhat';
import { addresses } from "../config/addresses";

async function main () {
	// TODO: fix this later, just need it working on any UI for now
	const gameAddress = addresses.game;

	const [ deployer ] = await hre.ethers.getSigners();
	console.log("Deploying contracts with the account:", deployer.address);
	console.log("Account balance:", (await deployer.getBalance()).toString());

	// const lvFactory = await hre.ethers.getContractFactory("contracts/ListVerifier.sol:Verifier");
	// const listVerifier = await lvFactory.deploy();
	const listAddress = addresses.list;

	// const svFactory = await hre.ethers.getContractFactory("contracts/SaleVerifier.sol:Verifier");
	// const saleVerifier = await svFactory.deploy();
	const saleAddress = addresses.sale;
	const nmFactory = await hre.ethers.getContractFactory("NightMarket");
	const nightmarket = await nmFactory.deploy(listAddress, saleAddress, gameAddress);
	// Resulting address:
	const nightmarketAddress = addresses.nightmarket;
	// console.log("List verifier address:", listVerifier.address);
	// console.log("Sale verifier address:", saleVerifier.address);
	console.log("NightMarket address:", nightmarket.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});