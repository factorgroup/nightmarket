// @ts-ignore
import { mimcHash } from 'https://cdn.skypack.dev/@darkforest_eth/hashing';
// @ts-ignore
import { hashToInt } from 'https://cdn.skypack.dev/@darkforest_eth/serde';
// @ts-ignore
import { utils, BigNumber } from 'https://cdn.skypack.dev/ethers';

/*
 * Convert a BigInt to a Buffer
 */
const bigInt2Buffer = (i: BigInt): Buffer => {
	let hexStr = i.toString(16)
	while (hexStr.length < 64) {
		hexStr = '0' + hexStr
	}
	return Buffer.from(hexStr, 'hex')
}

/**
 * Returns random BigInt under 2**218, req for poseidon encrypt
 * Not the randomest generator but it'll do for nonce
 */
export function genRandomNonce(): string {
	const max = BigNumber.from(2).pow(218).sub(1);
	const nonce = BigNumber.from(utils.randomBytes(32)).mod(max);
	console.log("calculated nonce:");
	console.log(nonce);
	return nonce.toString();
}

// Deterministicly generates key used to encrypt coordinates
// @dev: buyer later decrypts key, but has no knowledge of seller password
export function passwordToKey(pw): string[] {
	const pwHash = utils.keccak256(utils.toUtf8Bytes(pw)).toString();
	console.log("pwHash");
	console.log(pwHash);
	const password = hashToInt(pwHash.substr(2));
	const keypair = [mimcHash(0)(password).toString(), mimcHash(1)(password).toString()];
	console.log("keypair");
	console.log(keypair);
	return keypair
}