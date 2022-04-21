import { Planet } from '@darkforest_eth/types';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import Viewport from '../../../Game/Viewport';
import { RGBVec } from '../EngineTypes';
import { ASTEROID_PROGRAM_DEFINITION } from '../Programs/AsteroidProgram';
import { GameGLManager } from '../WebGL/GameGLManager';
import { GenericRenderer } from '../WebGL/GenericRenderer';
export default class AsteroidRenderer extends GenericRenderer<typeof ASTEROID_PROGRAM_DEFINITION> {
    viewport: Viewport;
    constructor(manager: GameGLManager);
    queueAsteroid(planet: Planet, centerW: CanvasCoords, radiusW: number, color: RGBVec): void;
    setUniforms(): void;
    flush(): void;
}
