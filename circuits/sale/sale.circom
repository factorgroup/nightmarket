/*
    Prove: I have (...) such that:
    - ECDH(buyerPubKey, myPrivKey) => sharedkey
    - Encrypt(key[0], key[1], sharedkey) => receipt
    - MiMCSponge(x,y,PLANETKEY) = planet_id commitment
    - Hash(key[0],key[1],0) = same key as before
*/

pragma circom 2.0.3;

include "ecdh.circom";
include "../../node_modules/circomlib/circuits/mimc.circom";
// include "../../node_modules/circomlib/circuits/mimcsponge.circom";

template Sale () {
	// public inputs
    signal input buyer_pub_key[2];
    signal input receipt_id[4];     // buyer encrypts(key[2], kx,ky)
	signal input nonce;             // Needed to decrypt key[2]

    // private inputs
    signal input seller_prv_key;
    signal input key[2];            // keys which unlock coordinate data
	
    // outputs
    signal output key_commitment;   // contract checks this

    // Commit to original key[2]
    component m = MultiMiMC7(2, 91);
    m.in[0] <== key[0];
    m.in[1] <== key[1];
    m.k <== 0;                      // TODO double check this
    key_commitment <== m.out;

    // Verify shared key is done correctly
    component ecdh = Ecdh();
    ecdh.public_key[0] <== buyer_pub_key[0];
    ecdh.public_key[0] <== buyer_pub_key[1];
    ecdh.private_key <== seller_prv_key;

    // Shared key
    signal kx;
    signal ky;
    kx <== ecdh.shared_key[0];         // Note: this is "twisted format"
    ky <== ecdh.shared_key[1];         // Note: this is "twisted format"

    // Commit H(shared_key) so buyer can check if 
    // TODO

    // Encrypt correctly
    // Constrain that `key[2]` is correctly encrypted with `kx,ky`
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

/* INPUT = {
    "a": "5",
    "b": "77"
} */

component main { public [ buyerPubKey ] } = Sale();