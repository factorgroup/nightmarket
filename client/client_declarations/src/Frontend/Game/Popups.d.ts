import { EthConnection } from '@darkforest_eth/network';
import { EthAddress, TransactionId, TxIntent } from '@darkforest_eth/types';
import { BigNumber as EthersBN, providers } from 'ethers';
interface OpenConfirmationConfig {
    contractAddress: EthAddress;
    connection: EthConnection;
    id: TransactionId;
    intent: TxIntent;
    overrides?: providers.TransactionRequest;
    from: EthAddress;
    gasFeeGwei: EthersBN;
}
export declare function openConfirmationWindowForTransaction({ contractAddress, connection, id, intent, overrides, from, gasFeeGwei, }: OpenConfirmationConfig): Promise<void>;
export {};
