# Trusted Setup Ceremony

This is a chronology of the trusted setup ceremony conducted for circuits `list.circom` and `sale.circom` before productionalizing Nightmarket. 

The random beacon needs a VDF, so we just use the Ethereum block hash at the latest block number. 

Contribution [instructions here](https://github.com/factorgroup/nightmarket/blob/main/trustedsetup/CONTRIBUTE.md)

### List Circuit
| Contribution | Contributor | Hash | 
| -------- | -------- | -------- |
| list_0000.zkey | N/A | N/A|
| list_0001.zkey | [0xSage](https://github.com/0xSage) |1244f6bb a7f2351f 959db669 dbe3e56f 099e54a9 73b9708b fdf1b9fb 39ab0641 da61c9cd f93d2eca 31b87f21 8b13c7c0 2505b6d1 f7847e90 4fd8c3dc 98d2a623|
|list_0001_randomized.zkey| [Block 15110552](https://etherscan.io/block/15110552) |3eba52b5 0bda6f74 e03f8c07 a736e24c eaa79c38 10ff1b65 3c57f937 54b25d4f 4a884418 a75c0843 b0477c1e 01e5b2da eb378d94 fa4fbbed 635f1ff1 b2b97bb3|
|list_0002.zkey|[dmpierre](https://github.com/dmpierre)|TBA|
|list_0002_randomized.zkey| Block # |TBA|
|list_0003.zkey|[gnostic7](https://github.com/gnostic7)|TBA|
|list_0003_randomized.zkey| Block # |TBA|
|list_0004.zkey|[dan-factor](https://github.com/dan-factor) |TBA|
|list_0004_randomized.zkey| Block # |TBA|

### Sale Circuit
| Contribution | Contributor | Hash |
| -------- | -------- | -------- |
| sale_0000.zkey | N/A | N/A|
| sale_0001.zkey | [0xSage](https://github.com/0xSage) |501ed545 0e1fd1e7 7783aa50 99f95766 d48609cb 6c23c24e ed174e1a b07382dd bd757248 61480fe8 1a548f74 a35543af 956559a3 317b1ce4 31685a16 c6701944|
|sale_0001_randomized.zkey| [Block 15110552](https://etherscan.io/block/15110552) |a61ed849 14a6e996 ec8f9081 5d351393 b54357df 8a03274f 9bd306be 6937b9c9 ced4f2e5 81b3d260 4796c42d 34003b95 7ef7cddc 162ad537 99eca1bd 7241437a|
|sale_0002.zkey|[dmpierre](https://github.com/dmpierre)||
|sale_0002_randomized.zkey| Block # ||
|sale_0003.zkey|[gnostic7](https://github.com/gnostic7)||
|sale_0003_randomized.zkey| Block # ||
|sale_0004.zkey|[dan-factor](https://github.com/dan-factor)||
|sale_0004_randomized.zkey| Block # ||
