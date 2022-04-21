import { Planet, WorldCoords } from '@darkforest_eth/types';
import { MINE_PROGRAM_DEFINITION } from '../Programs/MineProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';
/** Renderers asteroids at the center of silver mines  */
export declare class MineBodyRenderer extends GenericRenderer<typeof MINE_PROGRAM_DEFINITION> {
    constructor(manager: WebGLManager);
    private queuePoint;
    queueMineScreen(planet: Planet, center: WorldCoords, radius: number, z: number): void;
    queueMine(planet: Planet, centerW: WorldCoords, radiusW: number): void;
    setUniforms(): void;
    flush(): void;
}
