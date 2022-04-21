import { PixelCoords } from '../../../Backend/Procedural/ProcgenUtils';
import { RGBVec } from '../GameRenderer/EngineTypes';
import { WebGLManager } from '../GameRenderer/WebGL/WebGLManager';
export declare class PathRenderer {
    private manager;
    private program;
    private matrixULoc;
    private posA;
    private colorA;
    constructor(manager: WebGLManager);
    drawPath(arr: PixelCoords[], color: RGBVec): void;
}
