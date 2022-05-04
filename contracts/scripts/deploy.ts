import * as hre from 'hardhat';

async function main() {
	// TODO: fix this later, just need it working on any UI for now
	const gameAddress = "0xa98f6b548a748427acfa591a9f24ab840764d129";

	const [deployer] = await hre.ethers.getSigners();
	console.log("Deploying contracts with the account:", deployer.address);
	console.log("Account balance:", (await deployer.getBalance()).toString());

	// const lvFactory = await hre.ethers.getContractFactory("contracts/ListVerifier.sol:Verifier");
	// const listVerifier = await lvFactory.deploy();
	const listAddress = "0x43869DE76b4739cd9E484df40f307D115C08A892";

	// const svFactory = await hre.ethers.getContractFactory("contracts/SaleVerifier.sol:Verifier");
	// const saleVerifier = await svFactory.deploy();
	const saleAddress = "0xa5067E2fcc7C5d74f19b1cD17B48B121B0077146";
	const nightmarketAddress = "0x1a83aD07b70C4564F24Dc1d7d2438c36CA3a34f1";
	// const nmFactory = await hre.ethers.getContractFactory("NightMarket");
	// const nightmarket = await nmFactory.deploy(listAddress, saleAddress, gameAddress);

	// console.log("List verifier address:", listVerifier.address);
	// console.log("Sale verifier address:", saleVerifier.address);
	// console.log("NightMarket address:", nightmarket.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});