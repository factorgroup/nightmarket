// @ts-ignore
import { mimcHash } from 'https://cdn.skypack.dev/@darkforest_eth/hashing';
// @ts-ignore
import { hashToInt } from 'https://cdn.skypack.dev/@darkforest_eth/serde';
// @ts-ignore
import { utils, BigNumber } from 'https://cdn.skypack.dev/ethers';

/**
 * Returns random BigInt under 2**218, req for poseidon encrypt
 * Not the randomest generator but it'll do for nonce
 */
export function genRandomNonce(): string {
	const max = BigNumber.from(2).pow(218).sub(1);
	const nonce = BigNumber.from(utils.randomBytes(32)).mod(max);
	return nonce.toString();
}

// Deterministicly generates key used to encrypt coordinates
// @dev: buyer later decrypts key, but has no knowledge of seller password
export function passwordToKey(pw): string[] {
	const pwHash = utils.keccak256(utils.toUtf8Bytes(pw)).toString();
	const password = hashToInt(pwHash.substr(2));
	const keypair = [mimcHash(0)(password).toString(), mimcHash(1)(password).toString()];
	return keypair
}