import { ethers } from 'ethers';
import * as hre from 'hardhat';

async function main () {
    const privateKeyHolder = hre.config.networks.hardhat.accounts[ 0 ].privateKey;
    const privateSigningKey = new hre.ethers.utils.SigningKey(privateKeyHolder);

    const address = "<YOUR_ADDRESS_HERE>";

    const nmFactory = (await hre.ethers.getContractFactory("NightMarketFactory")).attach("<NM_FACTORY_ADDRESS>");
    const nmAddress = (await nmFactory.gameToMarket("<GAME_ADDRESS>"));
    const nm = (await hre.ethers.getContractFactory("NightMarket")).attach(nmAddress);

    const [ ask ] = await nm.queryFilter(nm.filters.Asked(address, 12));
    const tx = await ask.getTransaction();
    // delete tx.gasPrice
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
    const pubkey = hre.ethers.utils.recoverPublicKey(msgBytes, signature);
    const computedAddress = hre.ethers.utils.computeAddress(pubkey);


    console.log({
        initialAddress: address,
        pubKey: pubkey,
        computedAddress
    });

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });