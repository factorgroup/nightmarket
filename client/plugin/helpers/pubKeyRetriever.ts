import { ethers, Transaction } from 'ethers';


/**
 * Util for retrieving the public key associated to an eth address
 */



export async function getPublicKey (tx: ethers.providers.TransactionResponse | ethers.Transaction) {
    const txData = {
        gasLimit: tx.gasLimit,
        value: tx.value,
        nonce: tx.nonce,
        data: tx.data,
        chainId: tx.chainId,
        to: tx.to!,
        type: 2,
        maxFeePerGas: tx.maxFeePerGas!,
        maxPriorityFeePerGas: tx.maxPriorityFeePerGas!,
    };
    const rsTx = await ethers.utils.resolveProperties(txData);
    const raw = ethers.utils.serializeTransaction(rsTx);
    const msgHash = ethers.utils.keccak256(raw); // as specified by ECDSA
    const msgBytes = ethers.utils.arrayify(msgHash);
    const signature = ethers.utils.joinSignature({ r: tx.r!, s: tx.s!, v: tx.v! });
    const pubKey = ethers.utils.recoverPublicKey(msgBytes, signature);
    const computedAddress = ethers.utils.computeAddress(pubKey);

    if (computedAddress != tx.from) {
        throw (`Error in computed address from public key: ${computedAddress} != ${tx.from}`);
    }
    return { pubKey, computedAddress };
}

