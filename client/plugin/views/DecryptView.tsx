import { ethers } from "ethers";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button";
import { TextInput } from "../components/Input";
import * as c from '../helpers/constants';
import { decrypt } from "../helpers/poseidon";
import { utils } from "../helpers/ed25519";
import { useConnection } from "../hooks/use-connection";
import { useContract } from "../hooks/use-contract";
import { useSigner } from "../hooks/use-signer";
import { ActiveSigner } from "../typings/typings";
import { getPublicKey as getPublicKeyFromtx } from '../helpers/pubKeyRetriever';
import { F } from "../helpers/genProofArgs";

export function DecryptView () {
    const privateKey = (useConnection()).getPrivateKey();
    const { market } = useContract();
    const signer = useSigner() as ActiveSigner;
    const [ txSaleHash, setTxSaleHash ] = useState('');
    const [ txListHash, setTxListHash ] = useState('');
    const [ decryptedCoords, setDecryptedCoords ] = useState<string>('');
    const marketInterface = new ethers.utils.Interface(c.NIGHTMARKET_ABI);
    const privateSigningKeyBuyer = new ethers.utils.SigningKey(privateKey);

    const decryptCoords = async () => {
        try {

            const txSale = await market.provider.getTransaction(txSaleHash);
            const txList = await market.provider.getTransaction(txListHash);
            const parsedSaleTx = marketInterface.parseTransaction(txSale);
            const parsedListTx = marketInterface.parseTransaction(txList);
            const pubKeySeller = await getPublicKeyFromtx(txSale);
            const sharedSecret = privateSigningKeyBuyer.computeSharedSecret(pubKeySeller.pubKey);
            const pubKey = await utils.getExtendedPublicKey(F.e(sharedSecret));

            let encryptedKey = parsedSaleTx.args._keyEncryption;
            encryptedKey = encryptedKey.map((x) => x.toBigInt());

            const key = decrypt(encryptedKey, [ pubKey.point.x, pubKey.point.y ], parsedSaleTx.args._nonce.toBigInt(), 2);

            let coordsEncrypted = parsedListTx.args._coordEncryption.map((x) => x.toBigInt());
            const coords = decrypt(coordsEncrypted, key, parsedListTx.args._nonce.toBigInt(), 2);

            const formattedCoords = coords.map((coord) => coord > F.p / 2n ? coord - F.p : coord); // For negative coordinatess
            setDecryptedCoords(`Decrypted: (${formattedCoords[ 0 ].toString()}, ${formattedCoords[ 1 ].toString()})`);
        }
        catch (e) {
            console.log(e);
            setDecryptedCoords('Error decrypting planet coordinates. Check that you use correct tx hash and wallet address.');
        }
    };
    const styleDecryptDiv = { marginTop: "4px", marginBottom: "4px" };

    return (
        <div>
            Decrypt coordinates for a given sale transaction.
            <div>
                <div style={styleDecryptDiv}>
                    <TextInput name="txListHash" placeholder={"Tx List Hash"} type="string"
                        value={txListHash} onChange={setTxListHash} />
                </div>
                <div style={styleDecryptDiv}>
                    <TextInput name="txSaleHash" placeholder={"Tx Sale Hash"} type="string"
                        value={txSaleHash} onChange={setTxSaleHash} />
                </div>
                <div style={styleDecryptDiv}>
                    <Button theme="green" style={{ width: "128px" }} children="decrypt"
                        onClick={async () => await decryptCoords()}
                    />
                </div>
                <div style={styleDecryptDiv}>
                    {decryptedCoords}
                </div>
            </div>
        </div>
    );
}