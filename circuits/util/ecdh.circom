/*
	Copied from: https://github.com/appliedzkp/maci/blob/master/circuits/circom/ecdh.circom
  Modified to return Point: containing both x,y coordinates, instead of just x
*/

pragma circom 2.0.3;

include "../../node_modules/circomlib/circuits/mimc.circom";
include "../../node_modules/circomlib/circuits/escalarmulany.circom";

// TODO: Check if public key is on the point
template Ecdh() {
  // Note: private key
  // Needs to be hashed, and then pruned before
  // supplying it to the circuit
  signal input private_key;
  signal input public_key[2];

  signal output shared_key[2];

  component privBits = Num2Bits(253);
  privBits.in <== private_key;

  component mulFix = EscalarMulAny(253);
  mulFix.p[0] <== public_key[0];
  mulFix.p[1] <== public_key[1];

  for (var i = 0; i < 253; i++) {
    mulFix.e[i] <== privBits.out[i];
  }

  shared_key[0] <== mulFix.out[0];
  shared_key[1] <== mulFix.out[1];
}