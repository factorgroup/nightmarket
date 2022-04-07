const chai = require("chai");
const path = require("path");
const assert = chai.assert;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const wasm_tester = require("circom_tester").wasm;

const { mimcHash } = require("@darkforest_eth/hashing");

const poseidonCipher = require("../../client/poseidonCipher.js");

describe("List coordinates test", function () {

	this.timeout(100000);

	it("Should list correctly", async () => {
		const circuit = await wasm_tester(path.join(__dirname, "..", "list", "list.circom"));

		const PLANETHASH_KEY = 7;
		const x = "1764";
		const y = "21888242871839275222246405745257275088548364400416034343698204186575808492485";
		const message = [x, y];
		const key = [123, 456];

		const listing_id = poseidonCipher.encrypt(message, key, 0);

		const key_commitment = mimcHash(0)(key[0], key[1]).toString();
		const planet_id = mimcHash(PLANETHASH_KEY)(x, y).toString();

		let witness;
		witness = await circuit.calculateWitness(
			{
				PLANETHASH_KEY,
				"BIOMEBASE_KEY": 8,
				"SCALE": 4096,
				"xMirror": 0,
				"yMirror": 0,
				listing_id,
				"nonce": 0,
				key_commitment,
				planet_id,
				"biomebase": 12,
				"seller_address": 1234,
				x,
				y,
				key,

			}, true);

		// Check watermark (arbirary test but demonstrates the purpose)
		await circuit.assertOut(witness, { seller_address: 1234 });

		await circuit.checkConstraints(witness);
	});
});