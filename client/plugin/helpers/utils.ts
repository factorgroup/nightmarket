// @ts-ignore
import { mimcHash } from 'https://cdn.skypack.dev/@darkforest_eth/hashing';
// @ts-ignore
import { utils, BigNumber } from 'https://cdn.skypack.dev/ethers';
// @ts-ignore
import maciCrypto from 'https://cdn.skypack.dev/maci-crypto';

// @ts-ignore
// import ffjavascript from 'https://cdn.skypack.dev/ffjavascript';
// import { Scalar, ZqField } from "../../ffjavascript";
// const p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
// const F = new ZqField(p);

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

// @dev: buyer later decrypts key, but has no knowledge of seller password
export function passwordToKey(pw): BigInt[] {
	const pwHash = utils.keccak256(utils.toUtf8Bytes(pw));
	console.log("pwHash");
	console.log(pwHash);
	const bn = BigNumber.from(pwHash);
	console.log("bn");
	console.log(pwHash);
	const keypair = maciCrypto.genPubKey(bn);
	console.log("keypair");
	console.log(keypair);
	const result = [
		keypair[0],
		keypair[1],
	];
	console.log(result)
	return result
}