/*
    Prove: I have (...) such that:
    - ECDH(buyerPubKey, myPrivKey) => sharedkey
    - Encrypt(key[0], key[1], sharedkey) => receipt
    - MiMCSponge(x,y,PLANETKEY) = planet_id commitment
    - Hash(key[0],key[1],0) = same key as before
*/

pragma circom 2.0.3;

include "ecdh.circom";

// Q: include paths cannot be circular? Given: `a > b > c`, c include a => "duplicated callable simple ... template already in use"
// I want to do "include ../util/poseidon.circom" instead of duplicating circuits
include "poseidon.circom";
include "../../node_modules/circomlib/circuits/mimcsponge.circom";

template Sale () {
	// public inputs
    signal input buyer_pub_key[2];
    signal input receipt_id[4];         // Seller encrypts(key[2], kx,ky)
	signal input nonce;                 // Needed to decrypt key[2]

    // private inputs
    signal input seller_prv_key;
    signal input key[2];                // Preimage: keys to unlock xy coordinates
	
    // outputs
    signal output key_commitment;        // Should be same as in the listing
    signal output shared_key_commitment; // Note: Buyer precalcs H(shared_key) upon purchse, verified by contract

    // Commit to original key[2]
    component m = MultiMiMC7(2, 91);
    m.in[0] <== key[0];
    m.in[1] <== key[1];
    m.k <== 0;
    key_commitment <== m.out;

    // Verify shared key is calculated correctly
    component ecdh = Ecdh();
    ecdh.public_key[0] <== buyer_pub_key[0];
    ecdh.public_key[1] <== buyer_pub_key[1];
    ecdh.private_key <== seller_prv_key;

    // Shared key
    signal kx;
    signal ky;
    kx <== ecdh.shared_key[0];
    ky <== ecdh.shared_key[1];

    // Commit H(shared_key) or calculate the seller's pub key (ECDSA privToPub is too many constraints?)
    // So buyer can check if seller used a correct private key s.t. they can reconstruct the shared key
    component mm = MiMCSponge(2, 220, 1);
    mm.ins[0] <== kx;
    mm.ins[1] <== ky;
    mm.k <== 0;
    shared_key_commitment <== mm.outs[0];

    // Constrain that `key[2]` is correctly encrypted with shared_key
    component p = PoseidonEncryptCheck(2);

    for (var i = 0; i <4; i++) {
        p.ciphertext[i] <== receipt_id[i];
    }

    // Implicit: nonce < 2^218
    p.nonce <== nonce;
    p.message[0] <== key[0];
    p.message[1] <== key[1];
    p.key[0] <== kx;
    p.key[1] <== ky;
    p.out === 1;
}

component main { public [ buyer_pub_key, receipt_id, nonce ] } = Sale();