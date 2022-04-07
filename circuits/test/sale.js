const { mimcHash } = require("@darkforest_eth/hashing");
const { constants } = require("buffer");
const chai = require("chai");
const path = require("path");
const assert = chai.assert;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const wasm_tester = require("circom_tester").wasm;

const poseidonCipher = require("../../client/poseidonCipher.js");

const Keypair = require("maci-domainobjs").Keypair;

// mimc hashing helpers
const mimc = require("@darkforest_eth/hashing").mimcHash;

describe("Sale test", function () {

	this.timeout(100000);

	it("Should generate sale receipt correctly", async () => {
		const circuit = await wasm_tester(path.join(__dirname, "..", "sale", "sale.circom"));

		const key = [123, 456];
		const nonce = 0;

		const seller_keypair = new Keypair();
		const buyer_keypair = new Keypair();

		const shared_key = Keypair.genEcdhSharedKey(
			seller_keypair.privKey,
			buyer_keypair.pubKey,
		)

		const receipt_id = poseidonCipher.encrypt(key, shared_key, 0);

		// Private intermediate signals
		// const decrypted = poseidonCipher.decrypt(receipt_id, shared_key, 0, key.length);
		// console.log(decrypted);

		// Calculate shared key commitment
		const shared_key_commitment = mimcHash(0)(shared_key[0], shared_key[1]).toString();
		const key_commitment = mimcHash(0)(key[0], key[1]).toString();

		// Used to generate sale.inputs.json:
		// console.log("buyer pub key:");
		// console.log(buyer_keypair.pubKey.asCircuitInputs())
		// console.log("receipt_id:");
		// console.log(receipt_id);
		// console.log("shared:");
		// console.log(shared_key_commitment);
		// console.log("key commit:");
		// console.log(key_commitment);
		// console.log("seller priv:");
		// console.log(seller_keypair.privKey.asCircuitInputs());

		let witness;
		witness = await circuit.calculateWitness(
			{
				"buyer_pub_key": buyer_keypair.pubKey.asCircuitInputs(),
				receipt_id,
				nonce,
				key_commitment,
				shared_key_commitment,
				"seller_prv_key": seller_keypair.privKey.asCircuitInputs(),
				key
			}, true);

		// Shared key is correct
		await circuit.assertOut(witness, { kx: shared_key[0] });
		await circuit.assertOut(witness, { ky: shared_key[1] });

		await circuit.checkConstraints(witness);
	});
});