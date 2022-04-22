import { Planet, WorldCoords } from '@darkforest_eth/types';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import Renderer from '../Renderer';
import { WebGLManager } from '../WebGL/WebGLManager';
import { QuasarBodyRenderer } from './QuasarBodyRenderer';
import { QuasarRayRenderer } from './QuasarRayRenderer';
export declare class QuasarRenderer {
    manager: WebGLManager;
    renderer: Renderer;
    quasarBodyRenderer: QuasarBodyRenderer;
    quasarRayRendererTop: QuasarRayRenderer;
    quasarRayRendererBot: QuasarRayRenderer;
    constructor(manager: WebGLManager);
    private getAngle;
    queueQuasarScreen(planet: Planet, center: CanvasCoords, radius: number, z: number): void;
    queueQuasar(planet: Planet, centerW: WorldCoords, radiusW: number): void;
    flush(): void;
    setUniforms(): void;
}
