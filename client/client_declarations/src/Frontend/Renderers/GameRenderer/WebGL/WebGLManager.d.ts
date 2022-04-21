import { mat4 } from 'gl-matrix';
import { RGBAVec } from '../EngineTypes';
export declare class WebGLManager {
    gl: WebGL2RenderingContext;
    projectionMatrix: mat4;
    canvas: HTMLCanvasElement;
    private texIdx;
    constructor(canvas: HTMLCanvasElement, attr?: WebGLContextAttributes);
    setProjectionMatrix(): void;
    clear(bits?: number, color?: RGBAVec): void;
    getTexIdx(): number;
}
