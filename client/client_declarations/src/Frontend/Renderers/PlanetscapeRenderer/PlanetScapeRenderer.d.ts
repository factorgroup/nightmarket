import { Planet } from '@darkforest_eth/types';
import { mat4 } from 'gl-matrix';
import GameUIManager from '../../../Backend/GameLogic/GameUIManager';
import { WebGLManager } from '../GameRenderer/WebGL/WebGLManager';
export declare class PlanetscapeRenderer extends WebGLManager {
    planet: Planet | undefined;
    projectionMatrix: mat4;
    private uiManager;
    private artifacts;
    private moonCtx;
    private moonCanvas;
    private frameRequestId;
    private TICK_SIZE;
    private pathRenderer;
    private spriteRenderer;
    private isPaused;
    constructor(canvas: HTMLCanvasElement, moonCanvas: HTMLCanvasElement, uiManager: GameUIManager);
    setPaused(isPaused?: boolean): void;
    destroy(): void;
    private loop;
    setPlanet(planet: Planet | undefined): void;
    private drawHill;
    private drawScape;
    private flushArtifactOnce;
    private queueArtifacts;
    private draw;
    private drawMoon;
}
