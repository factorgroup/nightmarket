/// <reference types="node" />
import { Artifact, Chunk, ContractMethodName, EthTxStatus, LocatablePlanet, Planet, TxIntent } from '@darkforest_eth/types';
import EventEmitter from 'events';
import React from 'react';
export declare const enum NotificationType {
    Tx = 0,
    CanUpgrade = 1,
    BalanceEmpty = 2,
    WelcomePlayer = 3,
    FoundSpace = 4,
    FoundDeepSpace = 5,
    FoundDeadSpace = 6,
    FoundPirates = 7,
    FoundSilver = 8,
    FoundSilverBank = 9,
    FoundTradingPost = 10,
    FoundComet = 11,
    FoundFoundry = 12,
    FoundBiome = 13,
    FoundBiomeOcean = 14,
    FoundBiomeForest = 15,
    FoundBiomeGrassland = 16,
    FoundBiomeTundra = 17,
    FoundBiomeSwamp = 18,
    FoundBiomeDesert = 19,
    FoundBiomeIce = 20,
    FoundBiomeWasteland = 21,
    FoundBiomeLava = 22,
    FoundBiomeCorrupted = 23,
    PlanetLost = 24,
    PlanetWon = 25,
    PlanetAttacked = 26,
    ArtifactProspected = 27,
    ArtifactFound = 28,
    ReceivedPlanet = 29,
    Generic = 30,
    TxInitError = 31
}
export declare type NotificationInfo = {
    type: NotificationType;
    message: React.ReactNode;
    icon: React.ReactNode;
    id: string;
    color?: string;
    txData?: TxIntent;
    txStatus?: EthTxStatus;
};
export declare const enum NotificationManagerEvent {
    Notify = "Notify",
    ClearNotification = "ClearNotification"
}
declare class NotificationManager extends EventEmitter {
    static instance: NotificationManager;
    private constructor();
    static getInstance(): NotificationManager;
    private getIcon;
    reallyLongNotification(): void;
    clearNotification(id: string): void;
    notify(type: NotificationType, message: React.ReactNode): void;
    welcomePlayer(): void;
    foundSpace(chunk: Chunk): void;
    foundDeepSpace(chunk: Chunk): void;
    foundDeadSpace(chunk: Chunk): void;
    foundSilver(planet: Planet): void;
    foundSilverBank(planet: Planet): void;
    foundTradingPost(planet: Planet): void;
    foundPirates(planet: Planet): void;
    foundComet(planet: Planet): void;
    foundBiome(planet: LocatablePlanet): void;
    foundFoundry(planet: LocatablePlanet): void;
    artifactProspected(planet: LocatablePlanet): void;
    artifactFound(planet: LocatablePlanet, artifact: Artifact): void;
    planetConquered(planet: LocatablePlanet): void;
    planetLost(planet: LocatablePlanet): void;
    planetAttacked(planet: LocatablePlanet): void;
    planetCanUpgrade(planet: Planet): void;
    balanceEmpty(): void;
    receivedPlanet(planet: Planet): void;
    txInitError(methodName: ContractMethodName, failureReason: string): void;
}
export default NotificationManager;
