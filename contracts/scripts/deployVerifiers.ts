import * as hre from 'hardhat';

async function main () {

	const [ deployer ] = await hre.ethers.getSigners();

	console.log("Deploying contracts with the account:", deployer.address);
	console.log("Account balance:", (await deployer.getBalance()).toString());

	const lvFactory = await hre.ethers.getContractFactory("contracts/ListVerifier.sol:Verifier");
	const listVerifier = await lvFactory.deploy();
	let wait = await listVerifier.deployed();

	const svFactory = await hre.ethers.getContractFactory("contracts/SaleVerifier.sol:Verifier");
	const saleVerifier = await svFactory.deploy();
	wait = await saleVerifier.deployed();

	console.log({
		listVerifier: listVerifier.address,
		saleVerifier: saleVerifier.address
	});

}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});