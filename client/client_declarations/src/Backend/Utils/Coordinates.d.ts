import { CanvasCoords, WorldCoords } from '@darkforest_eth/types';
export declare const coordsEqual: (a: WorldCoords, b: WorldCoords) => boolean;
export declare const distL2: (a: CanvasCoords | WorldCoords, b: CanvasCoords | WorldCoords) => number;
export declare const vectorLength: (a: CanvasCoords | WorldCoords) => number;
export declare const normalizeVector: (a: WorldCoords) => WorldCoords;
export declare const scaleVector: (a: WorldCoords, k: number) => {
    x: number;
    y: number;
};
