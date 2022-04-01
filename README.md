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
- `/circuits`: Circom circuits including submoduled dependencies
- `/circuits/test`: Circuit unit tests
- `/client`: Dark Forest plugin code
- `/contracts`: Contract and verifier code

## Potential Spec
- Sellers can list valid Dark Forest coordinates at a fixed price
- Multiple buyers can purchase these coordinates
- Sellers can attest their planet has certain biomes
- [nice to have] Buyers can bid for coordinate
- [nice to have] Seller stakes penalty for nonresponsiveness
- [nice to have] Buyers can put up bounties for planets they'd like to dox

## Circuit Design
#### LIST
Prove: Seller has (x,y) coords, and sell a `KEY` used to encrypt it
- `hash(XY,PLANETHASH_KEY) ==> valid_coord` // I know a valid data/coordinate
- `ENCODE(XY, KEY)` // I encrypted data with key, via OTP
- `hash(KEY)` // I commit to the secret key

#### SALE
Prove: Seller encrypted `KEY` with a `SHARED_KEY` from a ECDH key exchange with Buyer
- `SHAREDKEY <== ecdh(sellerPrivKey, buyerPubKey)` // An ECDH shared key
- `ENCODE(KEY, SHARED_KEY)` // Encrypt KEY, s.t. buyer can decrypt offline
- `hash(KEY) ==> output` // I encrypted the correct key
- `BUYER_PUBKEY ==> output` // I used the correct buyer key

#### ONETIMEPAD
TODO: a symmetric encryption circuit: `secret + key`,
- `ENCODE`
- `DECODE`

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
- [Maci](https://github.com/appliedzkp/maci/)
- ...