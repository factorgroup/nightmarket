import { Planet, WorldCoords } from '@darkforest_eth/types';
import { WebGLManager } from '../WebGL/WebGLManager';
import BeltRenderer from './BeltRenderer';
import { MineBodyRenderer } from './MineBodyRenderer';
export declare class MineRenderer {
    mineBodyRenderer: MineBodyRenderer;
    beltRenderer: BeltRenderer;
    constructor(manager: WebGLManager);
    queueMineScreen(planet: Planet, centerW: WorldCoords, radiusW: number, z: number): void;
    queueMine(planet: Planet, centerW: WorldCoords, radiusW: number): void;
    flush(): void;
    setUniforms(): void;
}
