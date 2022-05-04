import * as path from 'path';

// @ts-ignore
import { groth16 } from 'https://cdn.skypack.dev/snarkjs';
// might need instead: import * as snarks from 'http://cdn.skypack.dev/@darkforest_eth/snarks';
// @ts-ignore
import { BigNumber } from 'https://cdn.skypack.dev/ethers';

export async function getListProof(inputs: any) {

	const { proof, publicSignals } = await groth16.fullProve(
		inputs,
		path.join(__dirname, "..", "..", "list", "list.wasm"),
		path.join(__dirname, "..", "..", "list", "list.zkey"),
	);

	const callArgs = buildListContractCallArgs(
		proof,
		[
			inputs.listing_id,
			inputs.nonce,
			inputs.key_commitment,
			inputs.planet_id,
			inputs.biomebase
		]
	);

	return callArgs
}

export async function getSaleProof(inputs: any) {
	const { proof, publicSignals } = await groth16.fullProve(
		inputs,
		path.join(__dirname, "..", "..", "sale", "sale.wasm"),
		path.join(__dirname, "..", "..", "sale", "sale.zkey"),
	);

	const callArgs = buildSaleContractCallArgs(
		proof,
		[
			inputs.receipt_id,
			inputs.nonce,
		]
	);

	return callArgs
}


/**
 * A zkSNARK proof (without signals) generated by snarkJS `fullProve`
 */
interface SnarkJSProof {
	pi_a: [string, string, string];
	pi_b: [[string, string], [string, string], [string, string]];
	pi_c: [string, string, string];
}

/**
 * Method for converting the output of snarkJS `fullProve` into args that can be
 * passed into DarkForestCore smart contract functions which perform zk proof
 * verification.
 *
 * @param snarkProof the SNARK proof
 * @param publicSignals the circuit's public signals (i.e. output signals and
 * public input signals)
 */
function buildListContractCallArgs(
	proof: SnarkJSProof,
	publicSignals: string[]
) {
	return [
		[BigNumber.from(proof.pi_a[0]),
		BigNumber.from(proof.pi_a[1]),
		BigNumber.from(proof.pi_b[0][1]),
		BigNumber.from(proof.pi_b[0][0]),
		BigNumber.from(proof.pi_b[1][1]),
		BigNumber.from(proof.pi_b[1][0]),
		BigNumber.from(proof.pi_c[0]),
		BigNumber.from(proof.pi_c[1])],
		[BigNumber.from(publicSignals[0][0]), // coordEncryption
		BigNumber.from(publicSignals[0][1]),
		BigNumber.from(publicSignals[0][2]),
		BigNumber.from(publicSignals[0][3])],
		BigNumber.from(publicSignals[1]), //nonce
		BigNumber.from(publicSignals[2]), //keyCommitment
		BigNumber.from(publicSignals[3]), //locationId
		BigNumber.from(publicSignals[4]), // biomebase
	];
}

function buildSaleContractCallArgs(
	proof: SnarkJSProof,
	publicSignals: string[]
) {
	return [
		[BigNumber.from(proof.pi_a[0]),
		BigNumber.from(proof.pi_a[1]),
		BigNumber.from(proof.pi_b[0][1]),
		BigNumber.from(proof.pi_b[0][0]),
		BigNumber.from(proof.pi_b[1][1]),
		BigNumber.from(proof.pi_b[1][0]),
		BigNumber.from(proof.pi_c[0]),
		BigNumber.from(proof.pi_c[1])],
		[BigNumber.from(publicSignals[0][0]), //keyEncryption
		BigNumber.from(publicSignals[0][1]),
		BigNumber.from(publicSignals[0][2]),
		BigNumber.from(publicSignals[0][3])],
		BigNumber.from(publicSignals[1]) // nonce
	];
}

// async function verifyListProof(proof) {
// 	const vKey = JSON.parse(fs.readFileSync("../list/list.vkey.json"));

// 	const res = await groth16.verify(vKey, publicSignals, proof);

// 	if (res === true) {
// 		console.log("Verification OK");
// 		return true;
// 	} else {
// 		console.log("Invalid proof");
// 		return false;
// 	}
// 	// await fetch(vkpath) top get vkey
// 	// await groth16.verify(vkey, publicInputs, proof);
// }
