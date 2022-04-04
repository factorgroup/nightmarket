pragma circom 2.0.3;
include "../../utils/poseidon.circom";

component main { public [ ciphertext, nonce ] } = PoseidonEncryptCheck(4);