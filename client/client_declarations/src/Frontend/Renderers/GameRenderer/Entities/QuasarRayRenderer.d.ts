import { Planet, WorldCoords } from '@darkforest_eth/types';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import { QUASARRAY_PROGRAM_DEFINITION } from '../Programs/QuasarRayProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';
export declare class QuasarRayRenderer extends GenericRenderer<typeof QUASARRAY_PROGRAM_DEFINITION> {
    quad3Buffer: number[];
    quad2BufferTop: number[];
    quad2BufferBot: number[];
    constructor(manager: WebGLManager);
    queueQuasarRayScreen(top: boolean | undefined, planet: Planet, center: CanvasCoords, radius: number, z: number, angle?: number): void;
    queueQuasarRay(top: boolean | undefined, planet: Planet, centerW: WorldCoords, radiusW: number, z: number, angle?: number): void;
    setUniforms(): void;
}
