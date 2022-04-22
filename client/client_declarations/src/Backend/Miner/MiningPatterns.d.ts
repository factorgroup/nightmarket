import { Rectangle, WorldCoords } from "@darkforest_eth/types";
export declare const enum MiningPatternType {
    Home = 0,
    Target = 1,
    Spiral = 2,
    Cone = 3,
    Grid = 4,
    ETH = 5,
    SwissCheese = 6,
    TowardsCenter = 7,
    TowardsCenterV2 = 8
}
export interface MiningPattern {
    type: MiningPatternType;
    fromChunk: Rectangle;
    nextChunk: (prevLoc: Rectangle) => Rectangle;
}
export declare class SpiralPattern implements MiningPattern {
    type: MiningPatternType;
    fromChunk: Rectangle;
    chunkSideLength: number;
    constructor(center: WorldCoords, chunkSize: number);
    nextChunk(chunk: Rectangle): Rectangle;
}
export declare class SwissCheesePattern implements MiningPattern {
    type: MiningPatternType;
    fromChunk: Rectangle;
    chunkSideLength: number;
    constructor(center: WorldCoords, chunkSize: number);
    nextChunk(chunk: Rectangle): Rectangle;
}
export declare class TowardsCenterPattern implements MiningPattern {
    type: MiningPatternType;
    fromChunk: Rectangle;
    chunkSideLength: number;
    tipX: number;
    tipY: number;
    maxWidth: number;
    constructor(center: WorldCoords, chunkSize: number);
    nextChunk(chunk: Rectangle): Rectangle;
}
export declare class TowardsCenterPatternV2 implements MiningPattern {
    type: MiningPatternType;
    fromChunk: Rectangle;
    chunkSideLength: number;
    rowRadius: number;
    yDominant: boolean;
    slopeToCenter: number;
    constructor(center: WorldCoords, chunkSize: number);
    toChunk(coord: number): number;
    nextChunk(chunk: Rectangle): Rectangle;
}
