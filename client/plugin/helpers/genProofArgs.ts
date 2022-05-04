import { encrypt } from "./poseidon";
import { mimcHash } from "@darkforest_eth/hashing";
import { Planet } from "@darkforest_eth/types";
import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";
declare const df: GameManager;
declare const ui: GameUIManager;

// TODO replace this
// @ts-ignore
import ffjavascript from 'https://cdn.skypack.dev/ffjavascript';
const p = ffjavascript.Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const F = new ffjavascript.ZqField(p);

// Generates and formats input arguments that go into a proof
export function genListProofArgs(planet: Planet, nonce, key) {
	const c = df.getContractConstants();

	const loc = df.getLocationOfPlanet(planet.locationId);
	const [x, y] = [loc?.coords.x, loc?.coords.y];

	const listing_id = encrypt([x, y], key, nonce)
	const key_commitment = mimcHash(0)(F.e(key[0]), F.e(key[1])).toString();

	const inputs = {
		PLANETHASH_KEY: c.PLANETHASH_KEY,
		BIOMEBASE_KEY: c.BIOMEBASE_KEY,
		SPACETYPE_KEY: c.SPACETYPE_KEY,
		SCALE: c.PERLIN_LENGTH_SCALE,
		xMirror: c.PERLIN_MIRROR_X,
		yMirror: c.PERLIN_MIRROR_Y,
		listing_id,
		nonce,
		key_commitment,
		planet_id: planet.locationId,
		biomebase: c.BIOMEBASE_KEY,
		seller_address: df.getAccount(),
		x,
		y,
		key
	}

	console.log(inputs);

	return inputs;
}

export function genSaleProofArgs() {

}