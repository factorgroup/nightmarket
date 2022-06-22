/**
 * Util for retrieving the public key associated to an eth address
 */
import { utils } from 'ethers';

function getRawTransaction (tx) {

    // Change relevant fields for EIP 1559
    const txFields = {
        gasLimit: tx.gasLimit,
        value: tx.value,
        nonce: tx.nonce,
        data: tx.data,
        chainId: tx.chainId,
        to: tx.to,
        type: 2,
        maxFeePerGas: tx.maxFeePerGas,
        maxPriorityFeePerGas: tx.maxPriorityFeePerGas
    } 

    const sigFields = {
        v: tx.v,
        r: tx.r,
        s: tx.s
    }
    // Seriailze the signed transaction
    const raw = utils.serializeTransaction(txFields, sigFields);

    // Double check things went well
    if (utils.keccak256(raw) !== tx.hash) { throw new Error("serializing failed!"); }

    return raw;
}

function getExpandedSignature (tx) {
    return {
        r: tx.r,
        s: tx.s,
        v: tx.v
    };
}

export function getPublicKey (tx) {
    const rawTx = getRawTransaction(tx);
    const msgHash = utils.keccak256(rawTx);
    const msgBytes = utils.arrayify(msgHash);
    const expandedSig = getExpandedSignature(tx);
    const signature = utils.joinSignature(expandedSig);
    const recoveredPubKey = utils.recoverPublicKey(msgBytes, signature);
    return recoveredPubKey;
}

