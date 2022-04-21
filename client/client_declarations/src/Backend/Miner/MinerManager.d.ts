/// <reference types="node" />
import { Chunk, PerlinConfig, Rectangle } from "@darkforest_eth/types";
import { EventEmitter } from "events";
import { ChunkStore } from "../../_types/darkforest/api/ChunkStoreTypes";
import { HashConfig } from "../../_types/global/GlobalTypes";
import { MiningPattern } from "./MiningPatterns";
export declare const enum MinerManagerEvent {
    DiscoveredNewChunk = "DiscoveredNewChunk"
}
export declare type workerFactory = () => Worker;
export declare class HomePlanetMinerChunkStore implements ChunkStore {
    initPerlinMin: number;
    initPerlinMax: number;
    minedChunkKeys: Set<string>;
    perlinOptions: PerlinConfig;
    constructor(initPerlinMin: number, initPerlinMax: number, hashConfig: HashConfig);
    addChunk(exploredChunk: Chunk): void;
    hasMinedChunk(chunkFootprint: Rectangle): boolean;
}
declare class MinerManager extends EventEmitter {
    readonly minedChunksStore: ChunkStore;
    readonly planetRarity: number;
    isExploring: boolean;
    miningPattern: MiningPattern;
    workers: Worker[];
    worldRadius: number;
    cores: number;
    exploringChunk: {
        [chunkKey: string]: Chunk;
    };
    exploringChunkStart: {
        [chunkKey: string]: number;
    };
    minersComplete: {
        [chunkKey: string]: number;
    };
    currentJobId: number;
    useMockHash: boolean;
    perlinOptions: PerlinConfig;
    hashConfig: HashConfig;
    workerFactory: workerFactory;
    constructor(minedChunksStore: ChunkStore, miningPattern: MiningPattern, worldRadius: number, planetRarity: number, hashConfig: HashConfig, useMockHash: boolean, workerFactory: workerFactory);
    setMiningPattern(pattern: MiningPattern): void;
    getMiningPattern(): MiningPattern;
    destroy(): void;
    static create(chunkStore: ChunkStore, miningPattern: MiningPattern, worldRadius: number, planetRarity: number, hashConfig: HashConfig, useMockHash?: boolean, workerFactory?: workerFactory): MinerManager;
    initWorker(index: number): void;
    onDiscovered(exploredChunk: Chunk, jobId: number): Promise<void>;
    exploreNext(fromChunk: Rectangle, jobId: number): void;
    setCores(nCores: number): void;
    startExplore(): void;
    stopExplore(): void;
    isMining(): boolean;
    getCurrentlyExploringChunk(): Rectangle | undefined;
    setRadius(radius: number): void;
    nextValidExploreTarget(chunkLocation: Rectangle, jobId: number): Promise<Rectangle | undefined>;
    isValidExploreTarget(chunkLocation: Rectangle): boolean;
    sendMessageToWorkers(chunkToExplore: Rectangle, jobId: number): void;
    chunkLocationToKey(chunkLocation: Rectangle, jobId: number): string;
    chunkKeyToLocation(chunkKey: string): [Rectangle, number] | undefined;
}
export default MinerManager;
