import { Planet, WorldCoords } from '@darkforest_eth/types';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import { RUINS_PROGRAM_DEFINITION } from '../Programs/RuinsProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';
export declare class RuinsRenderer extends GenericRenderer<typeof RUINS_PROGRAM_DEFINITION> {
    quad3Buffer: number[];
    quad2Buffer: number[];
    constructor(manager: WebGLManager);
    queueRuinsScreen(planet: Planet, center: CanvasCoords, radius: number, z: number): void;
    private queueBloom;
    queueRuins(planet: Planet, centerW: WorldCoords, radiusW: number): void;
    setUniforms(): void;
}
