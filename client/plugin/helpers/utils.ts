// @ts-ignore
import { mimcHash } from 'https://cdn.skypack.dev/@darkforest_eth/hashing';
// @ts-ignore
import { hashToInt } from 'https://cdn.skypack.dev/@darkforest_eth/serde';
// @ts-ignore
import { utils, BigNumber } from 'https://cdn.skypack.dev/ethers';

import { Listing } from "../typings/typings";

/**
 * Returns random BigInt under 2**218, req for poseidon encrypt
 * Not the randomest generator but it'll do for nonce
 */
export function genRandomNonce(): string {
	const max = BigNumber.from(2).pow(128).sub(1);
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

export const sortListings = (listings: Listing[], sortBy: { current: string, previous: string; }): Listing[] => {
    let sortedListings;
	if (sortBy.current === 'escrow') {
		sortedListings = listings.sort((listingA, listingB) => listingA.escrowTime - listingB.escrowTime);
	}
	else if (sortBy.current === 'id') {
		sortedListings = listings.sort((listingA, listingB) => listingA.listingId - listingB.listingId);
	}
	else if (sortBy.current === 'price') {
		sortedListings = listings.sort((listingA, listingB) => listingA.price - listingB.price);
	}
	else if (sortBy.current === 'numorders') {
		sortedListings = listings.sort((listingA, listingB) => listingA.numOrders - listingB.numOrders);
	}
	else if (sortBy.current === 'active') {
		sortedListings = listings.sort((listingA, listingB) => Number(listingB.isActive)-Number(listingA.isActive)); // true before false here
	}
    return sortedListings;
};