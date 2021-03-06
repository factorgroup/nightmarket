import { Transaction } from "ethers";
import { useEffect, useState } from "preact/hooks";
import { getPublicKey } from "../helpers/pubKeyRetriever";

export function useRecoverPubKey (tx: Transaction) {
    const [ pubKey, setPubKey ] = useState('');
    const [ computedAddress, setComputedAddress ] = useState('');

    useEffect(() => {
        (async () => {
            if (tx) {
                const { pubKey, computedAddress } = await getPublicKey(tx);
                setPubKey(pubKey);
                setComputedAddress(computedAddress);
            }
        })();
    }, [ tx ]);

    return {
        pubKey,
        computedAddress
    };
}