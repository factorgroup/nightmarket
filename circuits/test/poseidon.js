const chai = require("chai");
const path = require("path");
const assert = chai.assert;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const wasm_tester = require("circom_tester").wasm;

const poseidonCipher = require("../../client/poseidonCipher.js");

describe("Poseidon", function () {

	this.timeout(100000);

	// Sanity checking PoseidonEncryptCheck circuit works on base case
	it("Should PoseidonEncryptCheck l = 4", async () => {
		const circuit4 = await wasm_tester(path.join(__dirname, "circuits", "poseidon4_test.circom"));

		const message = [1239485, 2, 3, 4];
		const key = [123, 456];

		const ciphertext = poseidonCipher.encrypt(message, key, 0);
		const decrypted = poseidonCipher.decrypt(ciphertext, key, 0, message.length);

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

	// Testing nightmarket's main use case:
	// list:
	// message[0] = x coordinate
	// message[1] = y coordinate
	// key[0] = left half of key
	// key[1] = right half of key
	// sale:
	// message[0] = key[0]
	// message[1] = key[1]
	it("Should PoseidonEncryptCheck l = 2", async () => {
		const circuit4 = await wasm_tester(path.join(__dirname, "circuits", "poseidon2_test.circom"));

		// xy coordinates.
		const message = [1764, 21888242871839275222246405745257275088548364400416034343698204186575808492485];
		const key = [123, 456];

		const ciphertext = poseidonCipher.encrypt(message, key, 0);
		const decrypted = poseidonCipher.decrypt(ciphertext, key, 0, message.length);

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
});