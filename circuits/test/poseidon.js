const chai = require("chai");
const path = require("path");
const assert = chai.assert;

const ZqField = require("ffjavascript").ZqField;
const Scalar = require("ffjavascript").Scalar;
const p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const F = new ZqField(p);

const wasm_tester = require("circom_tester").wasm;

const poseidonCipher = require("../../client/util/poseidonCipher.js");

describe("Poseidon", function () {

	this.timeout(100000);

	// Sanity checking PoseidonEncryptCheck circuit works on base case
	it("Should PoseidonEncryptCheck l = 4", async () => {
		const circuit4 = await wasm_tester(path.join(__dirname, "circuits", "poseidon4_test.circom"));

		const message = [F.e("1239485"), F.e("2"), F.e("3"), F.e("4")];
		const key = [F.e("123"), F.e("456")];

		const ciphertext = poseidonCipher.encrypt(message, key, 0);
		const decrypted = poseidonCipher.decrypt(ciphertext, key, 0, message.length);

		const inputs = {
			"nonce": "0",
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
	// key[0] = left half of key being sold
	// key[1] = right half of key being sold
	// sale:
	// message[0] = key[0]
	// message[1] = key[1]
	// key[0] = sharedkey k_x
	// key[1] = sharedkey k_y
	it("Should PoseidonEncryptCheck l = 2", async () => {
		const circuit4 = await wasm_tester(path.join(__dirname, "circuits", "poseidon2_test.circom"));

		// xy coordinates.
		const message = [F.e("1764"), F.e("21888242871839275222246405745257275088548364400416034343698204186575808492485")];
		const key = [F.e("123"), F.e("456")];

		const ciphertext = poseidonCipher.encrypt(message, key, 0);
		const decrypted = poseidonCipher.decrypt(ciphertext, key, 0, message.length);

		const inputs = {
			"nonce": "0",
			key,
			ciphertext,
			message
		};
		const w = await circuit4.calculateWitness(inputs, true);
		await circuit4.assertOut(w, { "out": 1 });
		await circuit4.checkConstraints(w);
	});
});