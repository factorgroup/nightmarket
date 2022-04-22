import { mat4 } from 'gl-matrix';
import Renderer from '../Renderer';
import { WebGLManager } from './WebGLManager';
export declare class GameGLManager extends WebGLManager {
    renderer: Renderer;
    gl: WebGL2RenderingContext;
    stencil: boolean;
    projectionMatrix: mat4;
    isHighPerf: boolean;
    constructor(engine: Renderer, glCanvas: HTMLCanvasElement);
    clear(): void;
}
