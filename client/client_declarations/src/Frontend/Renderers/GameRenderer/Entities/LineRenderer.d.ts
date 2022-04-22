import { WorldCoords } from '@darkforest_eth/types';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import { RGBAVec } from '../EngineTypes';
import { LINE_PROGRAM_DEFINITION } from '../Programs/LineProgram';
import { GameGLManager } from '../WebGL/GameGLManager';
import { GenericRenderer } from '../WebGL/GenericRenderer';
export default class LineRenderer extends GenericRenderer<typeof LINE_PROGRAM_DEFINITION> {
    constructor(glManager: GameGLManager);
    private getOffset;
    queueLine(start: CanvasCoords, end: CanvasCoords, color?: RGBAVec, width?: number, zIdx?: number, dashed?: boolean): void;
    queueLineWorld(start: WorldCoords, end: WorldCoords, color?: RGBAVec, width?: number, zIdx?: number, dashed?: boolean): void;
    setUniforms(): void;
    flush(): void;
}
