import { constants } from 'ethers';

export const PLANETHASH_KEY = 7;
export const BIOMEBASE_KEY = 8;
export const SPACETYPE_KEY = 8;
export const SCALE = 4096;
export const X_MIRROR = 0;
export const Y_MIRROR = 0;

export const NONCE = 0;
export const BIOMEBASE = 12;

// Private
export const X_COORD = "1764";
export const Y_COORD = "21888242871839275222246405745257275088548364400416034343698204186575808492485";
export const KEY = [
	"123",
	"456"
]

// Formatted for contracts
export const SNARK_CONSTANTS = {
	DISABLE_ZK_CHECKS: false,
	PLANETHASH_KEY,
	SPACETYPE_KEY,
	BIOMEBASE_KEY,
	PERLIN_MIRROR_X: false,
	PERLIN_MIRROR_Y: false,
	PERLIN_LENGTH_SCALE: SCALE
}

export const PLANET_EXTENDED_INFO = {
	isInitialized: true,
	createdAt: 0,
	lastUpdated: 0,
	perlin: 0,
	spaceType: 1,
	upgradeState0: 0,
	upgradeState1: 0,
	upgradeState2: 0,
	hatLevel: 0,
	hasTriedFindingArtifact: false,
	prospectedBlockNumber: 0,
	destroyed: false,
	spaceJunk: 0
}

export const REVEALED_COORDS = {
	locationId: 3456345,
	x: 0,
	y: 0,
	revealer: constants.AddressZero
}
