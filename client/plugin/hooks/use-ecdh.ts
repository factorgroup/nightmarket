import { SigningKey } from "ethers/lib/utils";
import { useEffect, useState } from "preact/hooks";
import { getPublicKeyAsPoint as getEDDSAPublicKey } from "../helpers/ed25519";

// @ts-ignore
import { Scalar, ZqField } from 'https://cdn.skypack.dev/ffjavascript-browser@0.0.3';
import { mimcHash } from "@darkforest_eth/hashing";
import { BigNumber } from "ethers";
const F = new ZqField(Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617"));


export function useSharedKeyCommitment (signingKey: SigningKey, publicKey: string) {
    const [ sharedKeyCommitment, setSharedKeyCommitment ] = useState<BigNumber>();
    const [ sharedKey, setSharedKey ] = useState<{x: BigNumber, y: BigNumber}>();
    const sharedSecret = publicKey != '' ? signingKey.computeSharedSecret(publicKey) : '';

    useEffect(() => {
        (async () => {
            if (publicKey != '') {
                const sharedKey = await getEDDSAPublicKey(F.e(sharedSecret));
                const sharedKeyCommitment = mimcHash(0)(F.e(sharedKey.x), F.e(sharedKey.y)).toString();
                const expectedKeyCommitment = BigNumber.from(sharedKeyCommitment);
                setSharedKey(sharedKey);
                setSharedKeyCommitment(expectedKeyCommitment);
            }
        })();
    }, [ publicKey ]);

    return { sharedKeyCommitment, sharedKey };
}