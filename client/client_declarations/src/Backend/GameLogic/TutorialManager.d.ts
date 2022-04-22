/// <reference types="node" />
import { EventEmitter } from "events";
import GameUIManager from "./GameUIManager";
export declare const enum TutorialManagerEvent {
    StateChanged = "StateChanged"
}
export declare const enum TutorialState {
    None = 0,
    HomePlanet = 1,
    SendFleet = 2,
    SpaceJunk = 3,
    Spaceship = 4,
    Deselect = 5,
    ZoomOut = 6,
    MinerMove = 7,
    MinerPause = 8,
    Terminal = 9,
    HowToGetScore = 10,
    ScoringDetails = 11,
    Valhalla = 12,
    AlmostCompleted = 13,
    Completed = 14
}
declare class TutorialManager extends EventEmitter {
    static instance: TutorialManager;
    tutorialState: TutorialState;
    uiManager: GameUIManager;
    constructor(uiManager: GameUIManager);
    static getInstance(uiManager: GameUIManager): TutorialManager;
    setTutorialState(newState: TutorialState): void;
    advance(): void;
    shouldSkipState(state: TutorialState): boolean;
    reset(): void;
    complete(): void;
    acceptInput(state: TutorialState): void;
}
export default TutorialManager;
