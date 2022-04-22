import { Planet, WorldCoords } from '@darkforest_eth/types';
import { mat4 } from 'gl-matrix';
import { PLANET_PROGRAM_DEFINITION } from '../Programs/PlanetProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';
export default class PlanetRenderer extends GenericRenderer<typeof PLANET_PROGRAM_DEFINITION> {
    timeMatrix: mat4;
    quad3Buffer: number[];
    quad2Buffer: number[];
    constructor(manager: WebGLManager);
    setUniforms(): void;
    queuePlanetBodyScreen(planet: Planet, radius: number, x1: number, y1: number, x2: number, y2: number): void;
    queuePlanetBody(planet: Planet, centerW: WorldCoords, radiusW: number): void;
}
