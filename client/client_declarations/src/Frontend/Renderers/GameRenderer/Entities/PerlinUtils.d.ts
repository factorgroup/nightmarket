import { PerlinConfig, rand } from '@darkforest_eth/hashing';
import { WorldCoords } from '@darkforest_eth/types';
import { Rectangle } from '../../../../_types/global/GlobalTypes';
declare type Vector = {
    x: number;
    y: number;
};
export declare const valueOf: (v: Vector) => [number, number];
export declare type PerlinRand = ReturnType<typeof rand>;
export declare type GridPoint = WorldCoords & {
    __value: never;
};
export declare const enum PerlinOctave {
    _0 = 0,
    _1 = 1,
    _2 = 2
}
export declare function right(topLeft: GridPoint, scale: number): GridPoint;
export declare function up(topLeft: GridPoint, scale: number): GridPoint;
export declare function isGridPoint(coords: WorldCoords, scale: number): coords is GridPoint;
export declare function getGridPoint(bottomLeft: WorldCoords, scale: number): GridPoint;
export declare function getPerlinChunks(footprint: Rectangle, lengthScale: number): Iterable<Rectangle>;
export declare function getCachedGradient(coords: GridPoint, config: PerlinConfig, pow: PerlinOctave): Vector;
export {};
