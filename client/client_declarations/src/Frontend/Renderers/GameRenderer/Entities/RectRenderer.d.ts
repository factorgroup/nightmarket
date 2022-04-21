import { WorldCoords } from '@darkforest_eth/types';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import { Chunk } from '../../../../_types/global/GlobalTypes';
import { RGBVec } from '../EngineTypes';
import { RECT_PROGRAM_DEFINITION } from '../Programs/RectProgram';
import { GameGLManager } from '../WebGL/GameGLManager';
import { GenericRenderer } from '../WebGL/GenericRenderer';
export default class RectRenderer extends GenericRenderer<typeof RECT_PROGRAM_DEFINITION> {
    quad3Buffer: number[];
    quad2Buffer: number[];
    constructor(manager: GameGLManager);
    queueRect({ x, y }: CanvasCoords, width: number, height: number, color?: RGBVec, stroke?: number, zIdx?: number): void;
    queueRectWorld(coords: WorldCoords, width: number, height: number, color?: RGBVec, stroke?: number, zIdx?: number): void;
    queueRectCenterWorld(center: WorldCoords, width: number, height: number, color?: RGBVec, stroke?: number, zIdx?: number): void;
    queueChunkBorder(chunk: Chunk): void;
    setUniforms(): void;
}
