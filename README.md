# WiP: df-zkmarketplace

A zero knowledge marketplace for Dark Forest coordinates.
A 0xParc Learning Group project - work in progress.
## Potential Spec
- Sellers can list valid Dark Forest coordinates
- Multiple buyers can purchase these coordinates
- Sellers can attest their planet has certain biomes. *Trivial? Listing circuit can just output: `biomeperlin(x, y)`*
- [undedided] Buyers can bid. Theres a bidding mechanism

## Potential Stack
- circom/snarkjs/hardhat stack
- smart contracts for escrow logic
- [?] where to store proofs... ipfs or just onchain if small enough
- plugin: generates proofs, verifies proofs (incl proof outputs like coord_hashes), makes trx to contracts, decrypts final coordinates for buyer

## Circuit Design
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
function list(TODO)
function bid(TODO) ??
function close(TODO) // closes sale and issues refunds if any

## Acknowledgements
- 0xParc
- @phated and @ichub plugins [DF plugins](https://github.com/darkforest-eth/plugins)
- [DF Circuits](https://github.com/darkforest-eth/circuits)
- [EthMarketPlace](https://github.com/nulven/EthDataMarketplace)