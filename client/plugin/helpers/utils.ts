import { utils, BigNumber } from "ethers";
import { mimcHash } from '@darkforest_eth/hashing';

// @ts-ignore
import maciCrypto from 'https://cdn.skypack.dev/maci-crypto';
// @ts-ignore
import ffjavascript from 'https://cdn.skypack.dev/ffjavascript';
const p = ffjavascript.Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const F = new ffjavascript.ZqField(p);

// Not the randomest generator but it'll do
export function genRandomNonce() {
	const max = BigNumber.from((2 ^ 218) - 1);
	return BigNumber.from(utils.randomBytes(32)).mod(max);
}

// @dev: buyer later decrypts key, but no knowledge of password
export function passwordToKey(pw) {
	const pwHash = mimcHash(0)(pw);
	const keypair = maciCrypto.genPubKey(F.e(pwHash));
	return [
		BigNumber.from(keypair[0]),
		BigNumber.from(keypair[1]),
	]
}