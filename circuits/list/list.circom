/*
    Prove: I have (x,y, key) such that:
    - Encrypt(xy, key) => listing_id
    - MiMCSponge(x,y) = planet_id
    - Hash(key) = key_commitment
    - perlin(x, y) = biomebase
*/

pragma circom 2.0.3;

include "../../node_modules/circomlib/circuits/mimcsponge.circom";
include "Perlin.circom";

template List () {
    // Public Inputs
    signal input PLANETHASH_KEY;
    signal input BIOMEBASE_KEY;
    signal input SCALE; // must be power of 2 at most 16384 so that DENOMINATOR works
    signal input xMirror; // 1 is true, 0 is false
    signal input yMirror; // 1 is true, 0 is false
	
    // Private inputs (Expected format: uint256)
    signal input x;
    signal input y;
    signal input key;
	
    // Public outputs
    signal output listing_id;
    signal output key_commitment;
    signal output planet_id;
    signal output biomebase;

    // Constrain that seller correctly & symmetrically encrypted (x,y) with key
    // TODO: replace with encryption/decryption function, not hash
    // component sym_encrypt = ...;
    // sym_encrypt.ins[0] <== x;
    // sym_encrypt.ins[1] <== y;
    // sym_encrypt.k <== key;
    listing_id <== 5; // sym_encrypt.outs[0];

    // Commit to this key, so seller has to provide the same upon sale
    // component hasher = ...;
    // hasher.in <== key;
    // hasher.k <== ?;
    key_commitment <== 4; //hasher.out

    // Commit to planet_id, so contract can verify the coordinate is in game
    component mimc = MiMCSponge(2, 220, 1);
    mimc.ins[0] <== x;
    mimc.ins[1] <== y;
    mimc.k <== PLANETHASH_KEY;
    planet_id <== mimc.outs[0];

    // Calculate biomebase, because perlin requires knowledge of (x,y)
    component perlin = MultiScalePerlin();
    perlin.p[0] <== x;
    perlin.p[1] <== y;
    perlin.SCALE <== SCALE;
    perlin.xMirror <== xMirror;
    perlin.yMirror <== yMirror;
    perlin.KEY <== BIOMEBASE_KEY;
    biomebase <== perlin.out;
}

component main { public [ PLANETHASH_KEY, BIOMEBASE_KEY, SCALE, xMirror, yMirror ] } = List();
