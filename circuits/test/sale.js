const { mimcHash } = require("@darkforest_eth/hashing");
const { constants } = require("buffer");
const chai = require("chai");
const path = require("path");
const assert = chai.assert;

const ZqField = require("ffjavascript").ZqField;
const Scalar = require("ffjavascript").Scalar;
const p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const F = new ZqField(p);

const wasm_tester = require("circom_tester").wasm;

const poseidonCipher = require("../../client/util/poseidonCipher.js");

// Note: this is EdDSA keys
const Keypair = require("maci-domainobjs").Keypair;


describe("Sale test", function () {

	this.timeout(100000);

	it("Should generate sale receipt correctly", async () => {
		const circuit = await wasm_tester(path.join(__dirname, "..", "sale", "sale.circom"));

		const key = [F.e("123"), F.e("456")];
		const nonce = "0";

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
		console.log("receipt_id:");
		console.log(receipt_id);
		console.log("Shared key:");
		console.log(shared_key);
		console.log("Shared key commitment:");
		console.log(shared_key_commitment);
		console.log("key commit:");
		console.log(key_commitment);

		let witness;
		witness = await circuit.calculateWitness(
			{
				// "buyer_pub_key": buyer_keypair.pubKey.asCircuitInputs(),
				receipt_id,
				nonce,
				key_commitment,
				shared_key_commitment,
				shared_key,
				// "seller_prv_key": seller_keypair.privKey.asCircuitInputs(),
				key
			}, true);

		await circuit.checkConstraints(witness);
	});
});