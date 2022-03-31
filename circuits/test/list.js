const chai = require("chai");
const path = require("path");
const assert = chai.assert;

// what is this... 
const wasm_tester = require("circom_tester").wasm;

describe("List coordinates test", function () {

	this.timeout(100000);

	it("Should create a list circuit", async () => {
		const circuit = await wasm_tester(path.join(__dirname, "..", "list", "list.circom"));

		let witness;
		witness = await circuit.calculateWitness({ "a": 2, "b": 4 }, true);
		console.log(witness);
		// assert(Fr.eq(Fr.e(witness[1]), Fr.e(1)));
	});
});