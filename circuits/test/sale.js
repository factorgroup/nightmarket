const { mimcHash } = require("@darkforest_eth/hashing");
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

		// generate sale.json:
		// console.log(buyer_keypair.pubKey.asCircuitInputs())
		// console.log(seller_keypair.privKey.asCircuitInputs());
		// console.log(receipt_id);

		let witness;
		witness = await circuit.calculateWitness(
			{
				"buyer_pub_key": buyer_keypair.pubKey.asCircuitInputs(),
				"seller_prv_key": seller_keypair.privKey.asCircuitInputs(),
				receipt_id,
				nonce,
				key
			}, true);

		// Shared key is correct
		await circuit.assertOut(witness, { kx: shared_key[0] });
		await circuit.assertOut(witness, { ky: shared_key[1] });

		// Key commitments should be same as list step
		await circuit.assertOut(witness, { key_commitment: Fr.e("15488153922764572103791346072220088476028580425369450813882298926667172836509") });
		await circuit.assertOut(witness, { shared_key_commitment: Fr.e(shared_key_commitment) });
		await circuit.checkConstraints(witness);
	});
});