# Nightmarket Trusted Setup Ceremony

## What is Trusted Setup
[Explained like I'm 5 slides](https://docs.google.com/presentation/d/1ipvQEkkL-DZdZmwi_PGF_2QaVVyDjWJjTKJdDG3h5Xg/edit?usp=sharing)

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

[see process diagram](https://fvictorio.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5f267294-acb7-4a7b-b68d-a9ffe3fa1c71%2Fdiagram.png?table=block&id=2e2fd7a5-4c9e-429e-8d6b-57caa4b06b68&spaceId=999fcf0b-d32c-46d7-922b-b4a5f30b1f90&width=2000&userId=&cache=v2)


## Setup
0. Install Node/NVM version 14+. 

1. Install snarkjs globally. [Instructions](https://www.npmjs.com/package/snarkjs)

2. Set up repo: 
- `git clone https://github.com/factorgroup/nightmarket.git`
- (Optional) ```git config --global url."https://".insteadOf git://```
- (Optional) disable `postinstall`
- (Optional) `yarn install`

2. (optional) Verify phase 1 (from Hermez) was valid
`snarkjs powersoftau verify pot12_final.ptau`
`snarkjs powersoftau verify pot15_final.ptau`

## Phase 2 MPC (Deadline July 11, midnight EST)
Since we're doing this asynchronously, the first valid PR that is next in the sequence will be accepted. Thank you. 

We repeat steps 16/17 [mentioned here](https://github.com/factorgroup/nightmarket.git) for both circuits.

0. Pull the latest from `main`

1. cd into `/trustedsetup`, run the commands:
`snarkjs zkey contribute list_PREVNUMBER_final.zkey list_YOURNUMBER.zkey --name="YOUR_GITHUB" -v`
and then:
`snarkjs zkey contribute sale_PREVNUMBER_final.zkey sale_YOURNUMBER.zkey --name="YOUR_GITHUB" -v`

Note: Because there's no precommitment to the secret for all contributions, the coordinator applies a randomness beacon after each contribution to prevent adaptive attacks and generates the `final` zkey file for your contribution. So make sure your input file is the `...xxxx_final.zkey` one.

2. Verify this was done correctly
`snarkjs zkey verify ../client/list/list.r1cs ../circuits/pot15_final.ptau list_xxxx.zkey`
`snarkjs zkey verify ../client/sale/sale.r1cs ../circuits/pot12_final.ptau list_xxx.zkey`

3. Upload your zkey files to `/trustedsetup` folder

4. Update the README with your `contribution hashes`

5. Discard your `entropy` string, i.e. the toxic waste!

6. PR into this repo. 

7. The coordinator will apply a random beacon after your contribution

8. Your PR will be merged into `main`
