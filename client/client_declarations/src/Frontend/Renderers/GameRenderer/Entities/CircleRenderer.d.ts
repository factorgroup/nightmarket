import { WorldCoords } from '@darkforest_eth/types';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import Viewport from '../../../Game/Viewport';
import { RGBAVec } from '../EngineTypes';
import { CIRCLE_PROGRAM_DEFINITION } from '../Programs/CircleProgram';
import { GameGLManager } from '../WebGL/GameGLManager';
import { GenericRenderer } from '../WebGL/GenericRenderer';
export default class CircleRenderer extends GenericRenderer<typeof CIRCLE_PROGRAM_DEFINITION> {
    quadBuffer: number[];
    viewport: Viewport;
    constructor(manager: GameGLManager);
    queueCircle(center: CanvasCoords, radius: number, color?: RGBAVec, stroke?: number, angle?: number, // percent of arc to render
    dashed?: boolean): void;
    queueCircleWorld(center: WorldCoords, radius: number, // world coords
    color?: RGBAVec, stroke?: number, angle?: number, dashed?: boolean): void;
    queueCircleWorldCenterOnly(center: WorldCoords, radius: number, // canvas coords
    color?: RGBAVec): void;
    setUniforms(): void;
}
