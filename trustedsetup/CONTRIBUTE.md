# Nightmarket Trusted Setup Ceremony

## Overview
We have 2 circuits: 
1. list: 23850 constraints (2^15)
2. sale: 3421 constraints (2^12)

We use a Groth16 proving system, so we need a 2 phase trusted setup process: 
1. Universal (done)
2. Circuit specific setup (todo)

This gives us a final **zkey** file, which:
1. which generates solidity verifier contracts, used to verify proofs
2. used to create the proofs

[see process](https://fvictorio.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5f267294-acb7-4a7b-b68d-a9ffe3fa1c71%2Fdiagram.png?table=block&id=2e2fd7a5-4c9e-429e-8d6b-57caa4b06b68&spaceId=999fcf0b-d32c-46d7-922b-b4a5f30b1f90&width=2000&userId=&cache=v2)


## Setup
1. Tips for getting up and running: 
- `git clone https://github.com/factorgroup/nightmarket.git`
- ```git config --global url."https://".insteadOf git://```
- disable `postinstall`
- `yarn install`

2. (optional) Verify phase 1 (from Hermez) was valid
`snarkjs powersoftau verify pot15_final.ptau`
supports up to 2^15 constraints


## Ceremony
We repeat steps 16/17 [mentioned here](https://github.com/factorgroup/nightmarket.git) for BOTH circuits separately.

0. Decide ceremony sequence. 0xSage already generated `list_0001.zkey` and `sale_0001.zkey`

1. cd into `/trustedsetup`, run the commands: 
`snarkjs zkey contribute list_????.zkey list_????.zkey --name="your Contributor Name" -v`
and then:
`snarkjs zkey contribute sale_????.zkey sale_????.zkey --name="your Contributor Name" -v`

2. Verify this was done correctly
`snarkjs zkey verify ../client/list/list.r1cs ../circuits/pot15_final.ptau ????.zkey`

2. Upload your zkey files to `/trustedsetup`

3. Update the README with your `contribution hashes`

4. Discard your toxic waste!