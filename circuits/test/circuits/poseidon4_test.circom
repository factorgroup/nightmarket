pragma circom 2.0.3;
include "../../list/poseidon.circom";

component main { public [ ciphertext, nonce ] } = PoseidonEncryptCheck(4);