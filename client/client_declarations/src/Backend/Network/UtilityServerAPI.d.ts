/// <reference types="react" />
import { EthAddress, RegisterResponse, SignedMessage, WhitelistStatusResponse } from '@darkforest_eth/types';
import { TerminalHandle } from '../../Frontend/Views/Terminal';
import { AddressTwitterMap } from '../../_types/darkforest/api/UtilityServerAPITypes';
export declare const enum EmailResponse {
    Success = 0,
    Invalid = 1,
    ServerError = 2
}
export declare const submitInterestedEmail: (email: string) => Promise<EmailResponse>;
export declare const submitUnsubscribeEmail: (email: string) => Promise<EmailResponse>;
export declare const submitPlayerEmail: (request?: SignedMessage<{
    email: string;
}> | undefined) => Promise<EmailResponse>;
export declare type RegisterConfirmationResponse = {
    /**
     * If the whitelist registration is successful,
     * this is populated with the hash of the
     * transaction.
     */
    txHash?: string;
    /**
     * If the whitelist registration is unsuccessful,
     * this is populated with the error message explaining
     * why.
     */
    errorMessage?: string;
    /**
     * If the whitelist registration is unsuccessful, this
     * is true if the client is able to retry registration.
     */
    canRetry?: boolean;
};
/**
 * Starts the registration process for the user then
 * polls for success.
 */
export declare function callRegisterAndWaitForConfirmation(key: string, address: EthAddress, terminal: React.MutableRefObject<TerminalHandle | undefined>): Promise<RegisterConfirmationResponse>;
export declare const whitelistStatus: (address: EthAddress) => Promise<WhitelistStatusResponse | null>;
/**
 * Submits a whitelist key to register the given player to the game. Returns null if there was an
 * error.
 */
export declare const submitWhitelistKey: (key: string, address: EthAddress) => Promise<RegisterResponse | null>;
export declare const requestDevFaucet: (address: EthAddress) => Promise<boolean>;
/**
 * Swallows all errors. Either loads the address to twitter map from the webserver in 5 seconds, or
 * returan empty map.
 */
export declare const tryGetAllTwitters: () => Promise<AddressTwitterMap>;
export declare const getAllTwitters: () => Promise<AddressTwitterMap>;
export declare const verifyTwitterHandle: (verifyMessage: SignedMessage<{
    twitter: string;
}>) => Promise<boolean>;
export declare const disconnectTwitter: (disconnectMessage: SignedMessage<{
    twitter: string;
}>) => Promise<boolean>;
