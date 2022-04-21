import { Dispatch, SetStateAction } from "react";
import { EthAddress } from "@darkforest_eth/types";
import GameUIManager from "../GameLogic/GameUIManager";
export declare enum UIDataKey {
    terminalEnabled = "terminalEnabled",
    sidebarEnabled = "sidebarEnabled",
    tutorialCompleted = "tutorialCompleted",
    welcomedPlayer = "welcomedPlayer",
    foundSpace = "foundSpace",
    foundDeepSpace = "foundDeepSpace",
    foundDeadSpace = "foundDeadSpace",
    foundPirates = "foundPirates",
    foundSilver = "foundSilver",
    foundComet = "foundComet",
    foundArtifact = "foundArtifact",
    foundSilverBank = "foundSilverBank",
    foundTradingPost = "foundTradingPost",
    notifMove = "notifMove",
    newPlayer = "newPlayer",
    highPerf = "highPerf2",
    shouldFling = "shouldFling",
    /**
     * Same as above, except for a plugin that shows off a brand new
     * plugin capability - drawing on top of the game
     */
    hasAddedCanvasPlugin = "hasAddedCanvasPlugin",
    /**
     * Has this use acknowledged the fact that downloading and running
     * plugins from the internet is dangerous?
     */
    hasAcceptedPluginRisk = "hasAcceptedPluginRisk",
    gasFeeGwei = "gasFeeGwei"
}
export declare type UIData = {
    sidebarEnabled: boolean;
    terminalEnabled: boolean;
    tutorialCompleted: boolean;
    welcomedPlayer: boolean;
    foundSpace: boolean;
    foundDeepSpace: boolean;
    foundDeadSpace: boolean;
    foundPirates: boolean;
    foundSilver: boolean;
    foundComet: boolean;
    foundArtifact: boolean;
    foundSilverBank: boolean;
    foundTradingPost: boolean;
    notifMove: boolean;
    newPlayer: boolean;
    highPerf2: boolean;
    hasAddedReadme: boolean;
    hasAddedCanvasPlugin: boolean;
    hasAcceptedPluginRisk: boolean;
    shouldFling: boolean;
    gasFeeGwei: number;
};
export declare const defaultUserData: UIData;
export declare function useStoredUIState<T extends number | boolean>(key: UIDataKey, gameUIManager: GameUIManager | undefined): [T, Dispatch<SetStateAction<T>>];
declare class UIStateStorageManager {
    static instance: UIStateStorageManager;
    account: EthAddress | undefined;
    contractAddress: string;
    constructor(account: EthAddress | undefined, contractAddress: string);
    static create(account: EthAddress | undefined, contractAddress: string): UIStateStorageManager;
    getKey(): string;
    save(data: UIData): void;
    load(): UIData;
    setUIDataItem<T>(key: UIDataKey, value: T): void;
    getUIDataItem<T>(key: UIDataKey): T;
}
export default UIStateStorageManager;
