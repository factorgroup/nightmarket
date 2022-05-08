import { encrypt } from "./poseidon";
import { mimcHash } from "@darkforest_eth/hashing";
import { Planet } from "@darkforest_eth/types";
import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";
declare const df: GameManager;
declare const ui: GameUIManager;

// @ts-ignore
import { Scalar, ZqField } from 'https://cdn.skypack.dev/ffjavascript-browser@0.0.3';
const F = new ZqField(Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617"));

// Generates and formats input arguments that go into a proof
export function genListProofArgs(planet: Planet, nonce, key) {
	console.log("generating list prof args...");
	const c = df.getContractConstants();
	const loc = df.getLocationOfPlanet(planet.locationId);
	const [x, y] = [loc?.coords.x, loc?.coords.y];

	const biomebase = loc?.coords ? df.biomebasePerlin(loc?.coords, true) : 999;
	const listing_id = encrypt([x, y], key, nonce);
	const key_commitment = mimcHash(0)(F.e(key[0]), F.e(key[1])).toString();

	// planetid: e.g. "00001c17eda95a4a2da0ca82a2389..."
	const planet_id = (planet.locationId).replace(/^0+/, '0x');

	const inputs = {
		PLANETHASH_KEY: c.PLANETHASH_KEY,
		BIOMEBASE_KEY: c.BIOMEBASE_KEY,
		SPACETYPE_KEY: c.SPACETYPE_KEY,
		SCALE: c.PERLIN_LENGTH_SCALE,
		xMirror: c.PERLIN_MIRROR_X ? 1 : 0,
		yMirror: c.PERLIN_MIRROR_Y ? 1 : 0,
		listing_id,
		nonce,
		key_commitment,
		planet_id,
		biomebase,
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