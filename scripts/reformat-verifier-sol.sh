#!/bin/bash
# Patches circom_tester v0.0.10+ to work
# Replaces all instances of invoking `circom` with `circom2`
echo "Reformat verifier.sol..."
tsc
node ./build/exportVerifier.js list
node ./build/exportVerifier.js sale