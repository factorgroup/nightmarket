const chai = require("chai");
const path = require("path");
const assert = chai.assert;

const ZqField = require("ffjavascript").ZqField;
const Scalar = require("ffjavascript").Scalar;
const p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const F = new ZqField(p);

const wasm_tester = require("circom_tester").wasm;

const { mimcHash } = require("@darkforest_eth/hashing");

const poseidonCipher = require("../../client/util/poseidonCipher.js");

describe("List coordinates test", function () {

	this.timeout(100000);

	it("Should list correctly", async () => {
		const circuit = await wasm_tester(path.join(__dirname, "..", "list", "list.circom"));

		const PLANETHASH_KEY = 7;
		const x = F.e("1764");
		const y = F.e("21888242871839275222246405745257275088548364400416034343698204186575808492485");
		const message = [x, y];
		const key = [F.e("123"), F.e("456")];

		const listing_id = poseidonCipher.encrypt(message, key, 0);

		const key_commitment = mimcHash(0)(key[0], key[1]).toString();
		const planet_id = mimcHash(PLANETHASH_KEY)(x, y).toString();

		let witness;
		witness = await circuit.calculateWitness(
			{
				PLANETHASH_KEY,
				"BIOMEBASE_KEY": 8,
				"SPACETYPE_KEY": 0,
				"SCALE": 4096,
				"xMirror": 0,
				"yMirror": 0,
				listing_id,
				"nonce": F.e("0"),
				key_commitment,
				planet_id,
				"biomebase": 12,
				"seller_address": F.e("1234"),
				x,
				y,
				key,

			}, true);

		// Check watermark (arbirary test but demonstrates the purpose)
		await circuit.assertOut(witness, { seller_address: 1234 });

		await circuit.checkConstraints(witness);
	});
});