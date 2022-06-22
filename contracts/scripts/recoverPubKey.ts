import Common, { Chain, Hardfork } from '@ethereumjs/common';
import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx';
import { Address, toChecksumAddress } from 'ethereumjs-util';

import { ethers } from 'ethers';
import * as hre from 'hardhat';
const publicKeyToAddress = require('ethereum-public-key-to-address');

async function main () {
    const address = "0xfC5632d904f2B40A9D2E215E55bAd747b1F776C6";
    const nmFactory = await hre.ethers.getContractFactory("NightMarket");
    const nm = nmFactory.attach("0x6792e95058514c51aB07533B0bE4B3ADB6FFa1d8");
    const [ ask ] = await nm.queryFilter(nm.filters.Asked(address, 12));
    const tx = await ask.getTransaction();
    const txData = {
        gasLimit: tx.gasLimit.toNumber(),
        value: tx.value.toNumber(),
        nonce: tx.nonce,
        data: tx.data,
        chainId: tx.chainId,
        to: tx.to!,
        type: 2,
        maxFeePerGas: tx.maxFeePerGas!.toNumber(),
        maxPriorityFeePerGas: tx.maxPriorityFeePerGas!.toNumber(),
        s: tx.s!,
        r: tx.r!,
        v: tx.v!
    };

    const common = Common.custom({ chainId: 100 });
    common[ "eips" ] = () => [ 1559 ];
    const t = FeeMarketEIP1559Transaction.fromTxData(txData, { common });
    const pubKey = t.getSenderPublicKey();
    const computedAddress = Address.fromPublicKey(pubKey)

    console.log(address, toChecksumAddress(computedAddress.toString()))

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });