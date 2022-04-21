import { EthAddress } from "@darkforest_eth/types";
/**
 * Represents an account with which the user plays the game.
 */
export interface Account {
    address: EthAddress;
    Key: string;
}
/**
 * Returns the list of accounts that are logged into the game.
 */
export declare function getAccounts(): Account[];
/**
 * Adds the given account, and saves it to localstorage.
 */
export declare function addAccount(Key: string): void;
