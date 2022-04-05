/*
    Prove: I have (...) such that:
    - ECDH(buyerPubKey, myPrivKey) => sharedkey
    - Encrypt(key[0], key[1], sharedkey) => receipt
    - MiMCSponge(x,y,PLANETKEY) = planet_id commitment
    - Hash(key[0],key[1],0) = same key as before
*/

pragma circom 2.0.3;

include "ecdh.circom";

template Sale () {
	// public inputs
    signal input buyerPubKey;
	
    // private inputs
    signal input sellerPrivKey;
	
    // outputs
    signal output c;

    // intermediate sigs
    signal sharedKey;
}

/* INPUT = {
    "a": "5",
    "b": "77"
} */

component main { public [ buyerPubKey ] } = Sale();