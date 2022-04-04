const chai = require("chai");
const path = require("path");
const assert = chai.assert;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const wasm_tester = require("circom_tester").wasm;

const poseidonCipher = require("../../client/poseidonCipher.js");

describe("List coordinates test", function () {

	this.timeout(100000);

	it("Should list correctly", async () => {
		const circuit = await wasm_tester(path.join(__dirname, "..", "list", "list.circom"));
		const circuit4 = await wasm_tester(path.join(__dirname, "circuits", "poseidon2_test.circom"));

		const x = "1764";
		const y = "21888242871839275222246405745257275088548364400416034343698204186575808492485";
		const message = [x, y];
		const key = [123, 456];

		const listing_id = poseidonCipher.encrypt(message, key, 0);

		let witness;
		witness = await circuit.calculateWitness(
			{
				"PLANETHASH_KEY": 7,
				"BIOMEBASE_KEY": 8,
				"SCALE": 4096,
				"xMirror": 0,
				"yMirror": 0,
				x,
				y,
				key,
				listing_id
			}, true);

		// Checked against output.json from https://github.com/darkforest-eth/circuits
		await circuit.assertOut(witness, { biomebase: 12 });
		await circuit.assertOut(witness, { planet_id: Fr.e("15744909102780347355599901106611655633588302959081107425005702788497286612323") });

		// Check encryption steps
		await circuit.assertOut(witness, { key_commitment: 4 });
		// TODO: impl this step
		await circuit.assertOut(witness, { nonce: 0 });

		// assert(Fr.eq(Fr.e(witness[1]), Fr.e(1)));
	});
});