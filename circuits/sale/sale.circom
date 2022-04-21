/*
    Prove:
    - Encrypt(key[0], key[1], sharedkey) => receipt_ids
    - MiMCSponge(key[0], key[1],0) = key commitment
    - MiMCSponge(sharedkey,sharedkey, 0) = sharedkey commitment
*/

pragma circom 2.0.3;

include "../util/poseidon.circom";
include "../../node_modules/circomlib/circuits/mimcsponge.circom";

template Sale () {
	// public inputs
    signal input receipt_id[4];             // Seller encrypts(key[2], kx,ky)
	signal input nonce;                     // Needed to decrypt key[2]
    signal input key_commitment;            // Should be same as in the listing
    signal input shared_key_commitment;     // Contract verifies buyer has the same

    // private inputs
    signal input shared_key[2];                    // The computed shared key
    signal input key[2];                     // Original keys to unlock xy coordinates

    // Commit to the original key[2]
    component m = MiMCSponge(2, 220, 1);
    m.ins[0] <== key[0];
    m.ins[1] <== key[1];
    m.k <== 0;
    key_commitment === m.outs[0];

    // Constrain H(shared_key) is same as buyer's expectation
    component mm = MiMCSponge(2, 220, 1);
    mm.ins[0] <== shared_key[0];
    mm.ins[1] <== shared_key[1];
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
    p.key[0] <== shared_key[0];
    p.key[1] <== shared_key[1];
    p.out === 1;
}

component main { public [ receipt_id, nonce, key_commitment, shared_key_commitment ] } = Sale();