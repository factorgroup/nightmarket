import { EthConnection } from '@darkforest_eth/network';
import type { Contract, providers, Wallet } from 'ethers';
/**
 * Loads the game contract, which is responsible for updating the state of the game.
 */
export declare function loadDiamondContract<T extends Contract>(address: string, provider: providers.JsonRpcProvider, signer?: Wallet): Promise<T>;
export declare function getEthConnection(): Promise<EthConnection>;
