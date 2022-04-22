/// <reference types="node" />
import { EventEmitter } from "events";
import { Contract, providers } from "ethers";
import { EthTxType } from "@darkforest_eth/types";
import EthConnection from "./EthConnection";
import { ThrottledConcurrentQueue } from "./ThrottledConcurrentQueue";
import UIStateStorageManager from "../Storage/UIStateStorageManager";
export interface QueuedTxRequest {
    onSubmissionError: (e: Error) => void;
    onReceiptError: (e: Error) => void;
    onTransactionResponse: (e: providers.TransactionResponse) => void;
    onTransactionReceipt: (e: providers.TransactionReceipt) => void;
    type: EthTxType;
    actionId: string;
    contract: Contract;
    args: unknown[];
    overrides: providers.TransactionRequest;
}
export interface PendingTransaction {
    submitted: Promise<providers.TransactionResponse>;
    confirmed: Promise<providers.TransactionReceipt>;
}
export declare class TxExecutor extends EventEmitter {
    /**
     * tx is considered to have errored if haven't successfully
     * submitted to mempool within 30s
     */
    static readonly TX_SUBMIT_TIMEOUT = 30000;
    /**
     * we refresh the nonce if it hasn't been updated in this amount of time
     */
    static readonly NONCE_STALE_AFTER_MS: number;
    /**
     * don't allow users to submit txs if balance falls below
     */
    static readonly MIN_BALANCE_ETH = 0.002;
    txQueue: ThrottledConcurrentQueue;
    lastTransaction: number;
    nonce: number;
    eth: EthConnection;
    uiStateStorageManager: UIStateStorageManager;
    constructor(ethConnection: EthConnection, uiStateStorageManager: UIStateStorageManager, nonce: number);
    /**
     * Schedules this transaction to execute once all of the transactions
     * ahead of it have completed.
     */
    makeRequest<T, U>(type: EthTxType, actionId: string, contract: Contract, args: unknown[], overrides?: providers.TransactionRequest): PendingTransaction;
    maybeUpdateNonce(): Promise<void>;
    checkBalance(): Promise<void>;
    execute: (txRequest: QueuedTxRequest) => Promise<void>;
}
