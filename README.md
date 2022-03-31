# WiP: df-zkmarketplace

A zero knowledge marketplace for Dark Forest coordinates.
A 0xParc Learning Group project - work in progress.
## Quicklinks
- [Figma specs](https://www.figma.com/file/PEnVhZNRhVW9TbZ8obqglX/zkdf-market?node-id=0%3A1)
- [Team Brainstorm notes](https://hackmd.io/xrXO2QKeRJWY6WApxRrroQ)

## Quickstart
- Install: `yarn install`
- Test circuits: `yarn test`
- Deploy circuits: `circom:prod`

## Potential Spec
- Sellers can list valid Dark Forest coordinates at a fixed price
- Multiple buyers can purchase these coordinates
- Sellers can attest their planet has certain biomes. *Trivial? Listing circuit can just output: `biomeperlin(x, y)`*
- [nice to have] Buyers can bid for coordinate.
- [nice to have] Seller stakes penalty for nonresponsiveness
- [nice to have] Buyers can put up bounties for planets they'd like to dox

## Potential Circuit Design
#### LIST
Prove: I have `DATA`, *i.e. xy coords*, and sell a `SECRET` used to encrypt/decrypt this `DATA`
- `hash(DATA,PLANETHASH_KEY) ==> valid_coord` // output
- `hash(DATA, SECRET)` // I encrypted data correctly
- `hash(SECRET)` // I commit to the secret used for encryption

#### SALE
Prove: I encrypted `SECRET` correctly with the `BUYER_PUBKEY`
- `hash(SECRET) ==> output` // checked by contract
- `hash(SECRET, BUYER_PUBKEY) ==> output` // checked by contract
- `BUYER_PUBKEY` // watermark, checked by contract

## Escrow Contract (TODO)
- function list(TODO)
- function bid(TODO) ??
- function close(TODO) // closes sale and issues refunds if any

## Acknowledgements
- 0xParc
- @phated and @ichub plugins [DF plugins](https://github.com/darkforest-eth/plugins)
- [DF Circuits](https://github.com/darkforest-eth/circuits)
- [EthMarketPlace](https://github.com/nulven/EthDataMarketplace)