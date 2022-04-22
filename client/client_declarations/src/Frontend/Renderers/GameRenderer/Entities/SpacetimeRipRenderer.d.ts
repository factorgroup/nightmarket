import { Planet, WorldCoords } from '@darkforest_eth/types';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import { SPACETIMERIP_PROGRAM_DEFINITION } from '../Programs/SpacetimeRipProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';
export declare class SpacetimeRipRenderer extends GenericRenderer<typeof SPACETIMERIP_PROGRAM_DEFINITION> {
    quad3Buffer: number[];
    quad2Buffer: number[];
    constructor(manager: WebGLManager);
    queueRipScreen(planet: Planet, center: CanvasCoords, radius: number, z: number): void;
    queueRip(planet: Planet, centerW: WorldCoords, radiusW: number): void;
    setUniforms(): void;
}
