import { Rectangle } from '@darkforest_eth/types';
import { Dispatch, SetStateAction } from 'react';
import GameManager from '../../Backend/GameLogic/GameManager';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
export declare type Hook<T> = [T, Dispatch<SetStateAction<T>>];
declare global {
    interface Window {
        snarkjs: any;
        df?: GameManager;
        ui?: GameUIManager;
    }
}
export declare type HashConfig = {
    planetHashKey: number;
    spaceTypeKey: number;
    biomebaseKey: number;
    perlinLengthScale: number;
    perlinMirrorX: boolean;
    perlinMirrorY: boolean;
    planetRarity: number;
};
export declare const enum StatIdx {
    EnergyCap = 0,
    EnergyGro = 1,
    Range = 2,
    Speed = 3,
    Defense = 4,
    SpaceJunk = 5
}
export interface MinerWorkerMessage {
    chunkFootprint: Rectangle;
    workerIndex: number;
    totalWorkers: number;
    planetRarity: number;
    jobId: number;
    useMockHash: boolean;
    planetHashKey: number;
    spaceTypeKey: number;
    biomebaseKey: number;
    perlinLengthScale: number;
    perlinMirrorX: boolean;
    perlinMirrorY: boolean;
}
export interface RevealCountdownInfo {
    myLastRevealTimestamp?: number;
    currentlyRevealing: boolean;
    revealCooldownTime: number;
}
export interface ClaimCountdownInfo {
    myLastClaimTimestamp?: number;
    currentlyClaiming: boolean;
    claimCooldownTime: number;
}
