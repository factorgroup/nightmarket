/// <reference types="node" />
import { WorldCoords } from '@darkforest_eth/types';
import { EventEmitter } from 'events';
export declare type MousePos = {
    x: number;
    y: number;
};
export declare const enum WindowManagerEvent {
    StateChanged = "StateChanged",
    MiningCoordsUpdate = "MiningCoordsUpdate",
    TooltipUpdated = "TooltipUpdated",
    CtrlDown = "CtrlDown",
    CtrlUp = "CtrlUp"
}
export declare const enum CursorState {
    Normal = 0,
    TargetingExplorer = 1,
    TargetingForces = 2
}
export declare const enum TooltipName {
    None = 0,
    SilverGrowth = 1,
    SilverCap = 2,
    Silver = 3,
    TwitterHandle = 4,
    Bonus = 5,
    MinEnergy = 6,
    Time50 = 7,
    Time90 = 8,
    Pirates = 9,
    Upgrades = 10,
    PlanetRank = 11,
    MaxLevel = 12,
    FindArtifact = 13,
    ArtifactStored = 14,
    SelectedSilver = 15,
    Rank = 16,
    Score = 17,
    MiningPause = 18,
    MiningTarget = 19,
    HashesPerSec = 20,
    CurrentMining = 21,
    HoverPlanet = 22,
    SilverProd = 23,
    BonusEnergyCap = 24,
    BonusEnergyGro = 25,
    BonusRange = 26,
    BonusSpeed = 27,
    BonusDefense = 28,
    Energy = 29,
    EnergyGrowth = 30,
    Range = 31,
    Speed = 32,
    Defense = 33,
    Clowntown = 34,
    ArtifactBuff = 35,
    ModalHelp = 36,
    ModalPlanetDetails = 37,
    ModalLeaderboard = 38,
    ModalPlanetDex = 39,
    ModalUpgradeDetails = 40,
    ModalTwitterVerification = 41,
    ModalTwitterBroadcast = 42,
    ModalHats = 43,
    ModalSettings = 44,
    ModalYourArtifacts = 45,
    ModalFindArtifact = 46,
    ModalPlugins = 47,
    ModalWithdrawSilver = 48
}
declare class WindowManager extends EventEmitter {
    static instance: WindowManager;
    private mousePos;
    private mousedownPos;
    private lastZIndex;
    private cursorState;
    private currentTooltip;
    private constructor();
    static getInstance(): WindowManager;
    setTooltip(tooltip: TooltipName): void;
    getTooltip(): TooltipName;
    getClickDelta(): MousePos;
    getIndex(): number;
    getCursorState(): CursorState;
    setCursorState(newstate: CursorState): void;
    acceptInputForTarget(input: WorldCoords): void;
}
export default WindowManager;
