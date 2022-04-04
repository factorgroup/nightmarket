pragma circom 2.0.3;
include "../../utils/poseidon.circom";

component main { public [ nonce, ciphertext ] } = PoseidonEncryptCheck(4);