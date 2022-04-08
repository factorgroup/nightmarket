/*
    Prove: I have (...) such that:
    - ECDH(buyerPubKey, myPrivKey) => sharedkey
    - Encrypt(key[0], key[1], sharedkey) => receipt
    - MiMCSponge(x,y,PLANETKEY) = planet_id commitment
    - Hash(key[0],key[1],0) = same key as before
*/

pragma circom 2.0.3;

include "../util/ecdh.circom";
include "../util/poseidon.circom";
include "../../node_modules/circomlib/circuits/mimcsponge.circom";

template Sale () {
	// public inputs
    signal input buyer_pub_key[2];
    signal input receipt_id[4];             // Seller encrypts(key[2], kx,ky)
	signal input nonce;                     // Needed to decrypt key[2]
    signal input key_commitment;            // Should be same as in the listing
    signal input shared_key_commitment;    // Contract verifies buyer has the same

    // private inputs
    signal input seller_prv_key;
    signal input key[2];                    // Preimage: keys to unlock xy coordinates
	
    // Commit to the original key[2]
    component m = MiMCSponge(2, 220, 1);
    m.ins[0] <== key[0];
    m.ins[1] <== key[1];
    m.k <== 0;
    key_commitment === m.outs[0];

    // Verify shared key is calculated correctly
    component ecdh = Ecdh();
    ecdh.public_key[0] <== buyer_pub_key[0];
    ecdh.public_key[1] <== buyer_pub_key[1];
    ecdh.private_key <== seller_prv_key;

    // Shared key, interim signals
    signal kx;
    signal ky;
    kx <== ecdh.shared_key[0];
    ky <== ecdh.shared_key[1];

    // Constrain H(shared_key) is same as buyer's expectation
    component mm = MiMCSponge(2, 220, 1);
    mm.ins[0] <== kx;
    mm.ins[1] <== ky;
    mm.k <== 0;
    shared_key_commitment === mm.outs[0];

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

component main { public [ buyer_pub_key, receipt_id, nonce, key_commitment, shared_key_commitment ] } = Sale();