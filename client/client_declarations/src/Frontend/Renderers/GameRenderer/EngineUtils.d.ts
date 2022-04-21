import { Planet } from '@darkforest_eth/types';
import { RGBVec } from './EngineTypes';
export declare const glsl: (arr: TemplateStringsArray, ...args: any[]) => string;
export default class EngineUtils {
    static getNow: () => number;
    static fillTexture(gl: WebGL2RenderingContext): void;
    static rgbVecToHex(rgb: RGBVec): string;
    private static rotateIndices;
    static rotateQuad(b: number[], angle: number): void;
    static rotateQuadVec2(b: number[], angle: number): void;
    private static translateIndices;
    static translateQuad(b: number[], t: [number, number]): void;
    static translateQuadVec2(b: number[], t: [number, number]): void;
    static makeEmptyQuad(): number[];
    static makeEmptyQuadVec2(): number[];
    static makeEmptyDoubleQuad(): number[];
    static makeQuad(x1: number, y1: number, x2: number, y2: number, z: number): number[];
    static makeQuadBuffered(b: number[], // quadBuffer
    x1: number, y1: number, x2: number, y2: number, z: number): void;
    static makeQuadVec2(x1: number, y1: number, x2: number, y2: number): number[];
    static makeQuadVec2Buffered(b: number[], // quadBuffer
    x1: number, y1: number, x2: number, y2: number): void;
    static makeDoubleQuadBuffered(b: number[], ax1: number, ay1: number, ax2: number, ay2: number, bx1: number, by1: number, bx2: number, by2: number): void;
    static getPlanetZIndex: (planet: Planet) => number;
}
