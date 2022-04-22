# WiP: NightMarket

A zero knowledge marketplace for Dark Forest coordinates.
A 0xParc Learning Group project - work in progress.
## Quicklinks
- [Spec & Brainstorm notes](https://hackmd.io/xrXO2QKeRJWY6WApxRrroQ)
- [Demo slides](https://docs.google.com/presentation/d/1Dk9gZJF_GiitnknPJThJDwokEA1zd0ncwr6Jqawwtq0/edit?usp=sharing)

## Quickstart
- Install: `yarn install`
- Test circuits: `yarn circom:test`
- Deploy circuits: `yarn circom:prod`
- Compile contracts: `yarn sol:compile`
- Test contracts: `yarn sol:test`

## Directory
- `/circuits/list`: Circuits for generating a coordinate listing
- `/circuits/sale`: Circuits for fulfilling a sale to buyer
- `/circuits/utils`: Shared utility circuits
- `/circuits/test`: Circuit unit tests
- `/client`: Dark Forest plugin code
- `/contracts`: Contract and verifier code

## Spec
- Sellers list any valid Dark Forest coordinates at a fixed price
- Multiple buyers can purchase these coordinates
- Sellers can attest their planet has certain biomes

## Circuit Design
#### LIST
Prove: Seller has (x,y) coords, and sell a `KEY` used to encrypt it
- `hash(XY,PLANETHASH_KEY) ==> valid_coord` // commit to a valid data/coordinate
- `ENCODE(XY, KEY)` // encrypt data with key
- `hash(KEY)` // commit to the secret key

#### SALE
Prove: Seller encrypted `KEY` with a `SHARED_KEY` from an (offline) ECDH key exchange with Buyer
- `SHAREDKEY <== ecdh(sellerPrivKey, buyerPubKey)`
- `ENCODE(KEY, SHARED_KEY)`
- `hash(KEY)` // commit to the original key
- `hash(SHAREDKEY)` // commit to the same shared key

#### ENCODE
Scheme: Encryption using a 5-wide Poseidon in SpongeWrap with (0, len=2, Kx ,Ky , N) as input.
- List: 
	- message[0] = planet x coordinate
	- message[1] = planet y coordinate
	- key[0] = left half of `key` being sold
	- key[1] = right half of `key` being sold
- Sale:
	- message[0] = key[0]
	- message[1] = key[1]
	- key[0] = k_x of shared key
	- key[1] = k_y of shared key

## Escrow Contract
- `list(..., listProof, price, escrowTime)`: sellers can list valid coordinates and vary `price` & `escrowTime` for better buyer UX. (Note: it prevents malicious-buyer race condition). Sellers can sell a single coordinate to multiple buyers.
- `delist(...)`: sellers can delist coordinates if they plan to be offline. This helps with seller reputation as this zk marketplace has to be interactive.
- `ask(...)`: buyers can create (duplicate) orders on listings and lock up a payment for `escrowTime` blocks.
- `sale(..., saleProof)`: sellers can close a sale and fulfill a buyer order.
- `refund(...)`: anyone can refund buyers deposit if seller delists or if the `escrowTime` lockup is over.

## Acknowledgements
- 0xParc for study group
- [DF plugins](https://github.com/darkforest-eth/plugins)
- [DF Circuits](https://github.com/darkforest-eth/circuits)
- [EthMarketPlace](https://github.com/nulven/EthDataMarketplace)
- [Maci](https://github.com/appliedzkp/maci/)
- [Poseidon Encryption](https://github.com/iden3/circomlib/pull/60), [Paper](https://drive.google.com/file/d/1EVrP3DzoGbmzkRmYnyEDcIQcXVU7GlOd/view)