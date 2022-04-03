const chai = require("chai");
const path = require("path");
const assert = chai.assert;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

// what is this... 
const wasm_tester = require("circom_tester").wasm;

describe("List coordinates test", function () {

	this.timeout(100000);

	it("Should create a list circuit", async () => {
		const circuit = await wasm_tester(path.join(__dirname, "..", "market", "list.circom"));

		let witness;
		witness = await circuit.calculateWitness(
			{
				"PLANETHASH_KEY": 7,
				"BIOMEBASE_KEY": 8,
				"SCALE": 4096,
				"xMirror": 0,
				"yMirror": 0,
				"x": "1764",
				"y": "21888242871839275222246405745257275088548364400416034343698204186575808492485",
				"key": 1
			}, true);
		console.log(witness);
		// assert(Fr.eq(Fr.e(witness[1]), Fr.e(1)));
	});
});