/*
    Prove: I have (x,y, key) such that:
    - Poseidon_Encrypt(xy, key) => listing_id
    - MiMCSponge(x,y) = planet_id
    - Hash(key) = key_commitment
    - perlin(x, y) = biomebase
*/

pragma circom 2.0.3;
include "../../node_modules/circomlib/circuits/mimcsponge.circom";
include "Perlin.circom";
include "poseidon.circom";

template List () {
    // Public constant inputs
    // TODO(later): just use constants here?
    signal input PLANETHASH_KEY;
    signal input BIOMEBASE_KEY;
    signal input SCALE;
    signal input xMirror;
    signal input yMirror;

    // Public inputs
    signal input listing_id[4];     // Seller encrypts(xy, key[2])
    signal input nonce;             // Needed to encrypt/decrypt xy
    signal input key_commitment;    // H(key[0], key[1], k=0)
    signal input planet_id;         // H(x, y, k=PLANETHASH_KEY)
    signal input biomebase;         // Biomebase depends on knowledge of xy
    signal input seller_address;    // Watermarks proof to the seller

    // Private inputs
    signal input x;                 // preimage: x coordinate
    signal input y;                 // preimage: y coordinate
    signal input key[2];            // the actual secret being sold

    // Watermark proofs to the seller address
    signal seller_square;
    seller_square <== seller_address * seller_address;

    // Commit to key[2], so seller has to provide the same upon sale
    component m = MiMCSponge(2, 220, 1);
    m.ins[0] <== key[0];
    m.ins[1] <== key[1];
    m.k <== 0;
    key_commitment === m.outs[0];

    // Commit to planet_id, so contract can verify the coordinate is in game
    component mimc = MiMCSponge(2, 220, 1);
    mimc.ins[0] <== x;
    mimc.ins[1] <== y;
    mimc.k <== PLANETHASH_KEY;
    planet_id === mimc.outs[0];

    // Calculate biomebase, because perlin requires knowledge of (x,y)
    component perlin = MultiScalePerlin();
    perlin.p[0] <== x;
    perlin.p[1] <== y;
    perlin.SCALE <== SCALE;
    perlin.xMirror <== xMirror;
    perlin.yMirror <== yMirror;
    perlin.KEY <== BIOMEBASE_KEY;
    biomebase === perlin.out;

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

component main { public [ PLANETHASH_KEY, BIOMEBASE_KEY, SCALE, xMirror, yMirror, listing_id, nonce, key_commitment, planet_id, biomebase, seller_address ] } = List();
