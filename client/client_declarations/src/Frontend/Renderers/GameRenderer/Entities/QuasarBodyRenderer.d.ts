import { Planet, WorldCoords } from '@darkforest_eth/types';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import { QUASARBODY_PROGRAM_DEFINITION } from '../Programs/QuasarBodyProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';
export declare class QuasarBodyRenderer extends GenericRenderer<typeof QUASARBODY_PROGRAM_DEFINITION> {
    quad3Buffer: number[];
    quad2Buffer: number[];
    constructor(manager: WebGLManager);
    queueQuasarBodyScreen(planet: Planet, center: CanvasCoords, radius: number, z: number, angle?: number): void;
    queueQuasarBody(planet: Planet, centerW: WorldCoords, radiusW: number, z: number, angle?: number): void;
    setUniforms(): void;
}
