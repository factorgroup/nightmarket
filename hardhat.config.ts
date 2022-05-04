import { task } from 'hardhat/config';
import 'hardhat-circom';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// The xdai config, but it isn't added to networks unless we have a PRIVATEKEY
const xdai = {
	url: "https://rpc-df.xdaichain.com/",
	accounts: [`${process.env.XDAI_PRIVATEKEY}`],
	chainId: 100,
	gasMultiplier: 5,
};

module.exports = {
	solidity: "0.8.13",
	networks: {
		hardhat: {
			accounts: [
				{
					privateKey: "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
					balance: "10000000000000000000000"
				},
				{
					privateKey: "0x499001d75778eb171b3ab6638deb936c840cb4ece21be6b53526e81990e48bce",
					balance: "10000000000000000000000"
				},
				{
					privateKey: "0x5364d14f699055a4148c53b7bbcb2c8acea3580aad2ffc3553b60061ddc989d1",
					balance: "10000000000000000000000"
				}
			]
		},
		// ONly add xdai configs if developer set envvars, otherwise hardhat complains
		...(process.env.XDAI_PRIVATEKEY ? { xdai } : undefined),
	},
	circom: {
		// (optional) Base path for files being read, defaults to `./circuits/`
		inputBasePath: "./circuits/",
		// (optional) Base path for files being output, defaults to `./circuits/`
		outputBasePath: "./client/",
		// (required) The final ptau file, relative to inputBasePath, from a Phase 1 ceremony
		ptau: "pot15_final.ptau",
		// (required) Each object in this array refers to a separate circuit
		circuits: [
			{
				// (required) The name of the circuit
				name: "list",
				// (optional) The circom version used to compile circuits (1 or 2), defaults to 2
				version: 2,
				// (optional) Protocol used to build circuits ("groth16" or "plonk"), defaults to "groth16"
				protocol: "groth16",
				// (optional) Input path for circuit file, inferred from `name` if unspecified
				circuit: "list/list.circom",
				// (optional) Input path for witness input file, inferred from `name` if unspecified
				input: "list/list.json",
				// (optional) Output path for wasm file, inferred from `name` if unspecified
				wasm: "list/list.wasm",
				// (optional) Output path for zkey file, inferred from `name` if unspecified
				zkey: "list/list.zkey",
				r1cs: "list/list.r1cs",
				vkey: "list/list.vkey.json",
				// Used when specifying `--deterministic` instead of the default of all 0s
				beacon: "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f",
			},
			{
				name: "sale",
				version: 2,
				protocol: "groth16",
				circuit: "sale/sale.circom",
				input: "sale/sale.json",
				wasm: "sale/sale.wasm",
				zkey: "sale/sale.zkey",
				r1cs: "sale/sale.r1cs",
				vkey: "sale/sale.vkey.json",
				beacon: "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f",
			},
		],
	},
};