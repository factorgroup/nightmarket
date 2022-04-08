pragma circom 2.0.3;
include "../../util/poseidon.circom";

component main { public [ ciphertext, nonce ] } = PoseidonEncryptCheck(4);