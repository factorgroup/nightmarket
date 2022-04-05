/*
    Prove: I have (x,y, key) such that:
    - Poseidon_Encrypt(xy, key) => listing_id
    - MiMCSponge(x,y) = planet_id
    - Hash(key) = key_commitment
    - perlin(x, y) = biomebase
*/

pragma circom 2.0.3;
include "../../node_modules/circomlib/circuits/mimc.circom";
include "../../node_modules/circomlib/circuits/mimcsponge.circom";
include "Perlin.circom";
include "poseidon.circom";

template List () {
    // Public Inputs
    signal input PLANETHASH_KEY;
    signal input BIOMEBASE_KEY;
    signal input SCALE;             // must be power of 2 at most 16384 so that DENOMINATOR works
    signal input xMirror;           // 1 is true, 0 is false
    signal input yMirror;           // 1 is true, 0 is false
    signal input listing_id[4];     // buyer encrypts(xy, key[2])
    signal input nonce;             // Needed to decrypt xy

    // Private inputs (Expected format: uint256)
    signal input x;
    signal input y;
    signal input key[2];            // the actual secret being sold
	
    signal output key_commitment;   // H(key[0], key[1], k=0)
    signal output planet_id;        // H(x, y, k=PLANETHASH_KEY)
    signal output biomebase;

    // Commit to key[2], so seller has to provide the same upon sale
    component m = MultiMiMC7(2, 91);
    m.in[0] <== key[0];
    m.in[1] <== key[1];
    m.k <== 0;                      // TODO double check this
    key_commitment <== m.out;

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

    // Constrain that `listing_id` is correctly encrypted with `key`
    component p = PoseidonEncryptCheck(2);
    
    for (var i = 0; i <4; i++) {
        p.ciphertext[i] <== listing_id[i];
    }

    // Implicit: nonce < 2^218
    p.nonce <== nonce;
    p.message[0] <== x;
    p.message[1] <== y;
    p.key[0] <== key[0];
    p.key[1] <== key[1];
    p.out === 1;
}

component main { public [ PLANETHASH_KEY, BIOMEBASE_KEY, SCALE, xMirror, yMirror, listing_id, nonce ] } = List();
