const chai = require("chai");
const path = require("path");
const assert = chai.assert;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const wasm_tester = require("circom_tester").wasm;

// const poseidonPerm = require("../../client/poseidonPerm.js");
const poseidonCipher = require("../../client/poseidonCipher.js");

describe("Poseidon", function () {

	this.timeout(100000);

	it("Should PoseidonEncryptCheck l = 4", async () => {
		const circuit4 = await wasm_tester(path.join(__dirname, "circuits", "poseidon4_test.circom"));

		// TODO try this with longer messages. sanity check if 1 plaintext is ok with weijie
		// plaintext can be elements in F
		const message = [1, 2, 3, 4];
		const key = [123, 456];

		const ciphertext = poseidonCipher.encrypt(message, key, 0);
		console.log("Target ciphertext:");
		console.log(ciphertext);
		const decrypted = poseidonCipher.decrypt(ciphertext, key, 0, message.length);
		console.log("Target message:");
		console.log(decrypted);

		const inputs = {
			"nonce": 0,
			key,
			ciphertext,
			message
		};
		const w = await circuit4.calculateWitness(inputs, true);
		await circuit4.assertOut(w, { "out": 1 });
		await circuit4.checkConstraints(w);
	});

	// it("Should encrypt", async () => {
	// 	const circuit = await wasm_tester(path.join(__dirname, "..", "poseidon", "poseidon.circom"));

	// 	let witness;
	// 	witness = await circuit.calculateWitness({ "a": 2, "b": 4 }, true);
	// 	console.log(witness);
	// 	// assert(Fr.eq(Fr.e(witness[1]), Fr.e(1)));
	// });
});