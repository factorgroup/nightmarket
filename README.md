# WiP: NightMarket

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
- `/circuits/list`: Circuits for generating a coordinate listing
- `/circuits/sale`: Circuits for conducting a sale/exchange
- `/circuits/utils`: Shared utility circuits
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
- `ENCODE(XY, KEY)` // I encrypted data with key
- `hash(KEY)` // I commit to the secret key

#### SALE
Prove: Seller encrypted `KEY` with a `SHARED_KEY` from a ECDH key exchange with Buyer
- `SHAREDKEY <== ecdh(sellerPrivKey, buyerPubKey)` // An ECDH shared key
- `ENCODE(KEY, SHARED_KEY)` // Encrypt KEY, s.t. buyer can decrypt offline
- `hash(KEY) ==> output` // I encrypted the correct key
- `BUYER_PUBKEY ==> output` // I used the correct buyer key

#### DECRYPT
Scheme: Encryption using Poseidon hashes, 5-wide, `l = 2`, where
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

## Escrow Contract (TODO)
- function list(TODO)
- function bid(TODO) ??
- function close(TODO) // closes sale and issues refunds if any

## Acknowledgements
- 0xParc for study group
- [DF plugins](https://github.com/darkforest-eth/plugins)
- [DF Circuits](https://github.com/darkforest-eth/circuits)
- [EthMarketPlace](https://github.com/nulven/EthDataMarketplace)
- [Maci](https://github.com/appliedzkp/maci/)
- [Poseidon Encryption](https://github.com/iden3/circomlib/pull/60), [Paper](https://drive.google.com/file/d/1EVrP3DzoGbmzkRmYnyEDcIQcXVU7GlOd/view)