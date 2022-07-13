import * as hre from 'hardhat';
import { getPublicKey as getPublicKeyFromtx } from '../../client/plugin/helpers/pubKeyRetriever';
import { utils } from "@noble/ed25519";
import { ZqField, Scalar } from "ffjavascript";

import * as poseidon from '../../client/util/poseidonCipher.js';
const F = new ZqField(Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617"));

const TX_LIST_HASH = "<TX_LIST_HASH>";
const TX_SALE_HASH = "<TX_SALE_HASH>";

async function main () {
    const nmFactory = await hre.ethers.getContractFactory("NightMarket");
    const privateKeyBuyer = hre.config.networks.xdai.accounts[ 0 ];
    const privateSigningKeyBuyer = new hre.ethers.utils.SigningKey(privateKeyBuyer);
    
    const txSale = await hre.ethers.provider.getTransaction(TX_SALE_HASH);
    const txList = await hre.ethers.provider.getTransaction(TX_LIST_HASH);

    const pubKeySeller = await getPublicKeyFromtx(txSale);
    const sharedSecret = privateSigningKeyBuyer.computeSharedSecret(pubKeySeller.pubKey);
    const pubKey = await utils.getExtendedPublicKey(F.e(sharedSecret));

    const parsedSaleTx = nmFactory.interface.parseTransaction(txSale);
    const parsedListTx = nmFactory.interface.parseTransaction(txList);


    let encryptedKey = parsedSaleTx.args._keyEncryption;
    encryptedKey = encryptedKey.map((x) => x.toBigInt());

    const key = poseidon.decrypt(encryptedKey, [ pubKey.point.x, pubKey.point.y ], parsedSaleTx.args._nonce.toBigInt(), 2); // OK

    let coordsEncrypted = parsedListTx.args._coordEncryption.map((x) => x.toBigInt());
    const coords = poseidon.decrypt(coordsEncrypted, key, parsedListTx.args._nonce.toBigInt(), 2);
    console.log(coords[ 0 ], coords[ 1 ], coords[ 1 ] - F.p);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });