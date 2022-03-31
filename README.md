# WiP: df-zkmarketplace

A zero knowledge marketplace for Dark Forest coordinates.
A 0xParc Learning Group project - work in progress.
## Quicklinks
- [Figma specs](https://www.figma.com/file/PEnVhZNRhVW9TbZ8obqglX/zkdf-market?node-id=0%3A1)
- [Team Brainstorm notes](https://hackmd.io/xrXO2QKeRJWY6WApxRrroQ)
- [Demo slides](https://docs.google.com/presentation/d/1Dk9gZJF_GiitnknPJThJDwokEA1zd0ncwr6Jqawwtq0/edit?usp=sharing)

## Quickstart
- Install: `yarn install`
- Test circuits: `yarn test`
- Deploy circuits: `circom:prod`

## Directory
- Circuit dependencies (not on npm) are submoduled under `/circuits`

## Potential Spec
- Sellers can list valid Dark Forest coordinates at a fixed price
- Multiple buyers can purchase these coordinates
- Sellers can attest their planet has certain biomes
- [nice to have] Buyers can bid for coordinate
- [nice to have] Seller stakes penalty for nonresponsiveness
- [nice to have] Buyers can put up bounties for planets they'd like to dox

## Potential Circuit Design
#### LIST
Prove: I have `DATA`, *i.e. xy coords*, and sell a `KEY` used to symmetrically encrypt this `DATA`
- `hash(DATA,PLANETHASH_KEY) ==> valid_coord` // I know a valid data/coordinate
- `sym_encrypt(DATA, KEY)` // I symmetrically encrypted data s.t. it can be decrypted with key
- `hash(KEY)` // I commit to the secret key used for encryption

#### SALE
Prove: I encrypted `KEY` correctly with the `BUYER_PUBKEY`
- `asym_encrypt(KEY, BUYER_PUBKEY) ==> output` // I asymmetrically encrypted a key with a buyers pubkey
- `hash(KEY) ==> output` // I encrypted the correct key
- `BUYER_PUBKEY ==> output` // I used the correct buyer key

#### SYMMETRIC ENCRYPTION
- TODO: Maybe a one time pad

#### EDCSA ASYMMETRIC ENCRYPTION
Hopefully can find existing library for this... otherwise, nontrivial

## Escrow Contract (TODO)
- function list(TODO)
- function bid(TODO) ??
- function close(TODO) // closes sale and issues refunds if any

## Acknowledgements
- 0xParc for study group
- [DF plugins](https://github.com/darkforest-eth/plugins)
- [DF Circuits](https://github.com/darkforest-eth/circuits)
- [EthMarketPlace](https://github.com/nulven/EthDataMarketplace)
- [0xParc ECDSA](https://github.com/0xPARC/circom-ecdsa)
- TODO: find ecdsa signWithPub circuit