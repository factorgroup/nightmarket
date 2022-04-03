module.exports = {
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
				circuit: "list.circom",
				// (optional) Input path for witness input file, inferred from `name` if unspecified
				input: "list.json",
				// (optional) Output path for wasm file, inferred from `name` if unspecified
				wasm: "circuits/market/list.wasm",
				// (optional) Output path for zkey file, inferred from `name` if unspecified
				zkey: "list.zkey",
				// Used when specifying `--deterministic` instead of the default of all 0s
				beacon: "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f",
			},
			{
				// (required) The name of the circuit
				name: "sale",
				version: 2,
				protocol: "groth16",
				circuit: "sale.circom",
				input: "sale.json",
				wasm: "circuits/sale/sale.wasm",
				zkey: "sale.zkey",
				beacon: "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f",
			},
		],
	},
};