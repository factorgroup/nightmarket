import { Chunk } from '../../../../_types/global/GlobalTypes';
import { MASK_PROGRAM_DEFINITION } from '../Programs/MaskProgram';
import { GameGLManager } from '../WebGL/GameGLManager';
import { GenericRenderer } from '../WebGL/GenericRenderer';
export default class MaskRenderer extends GenericRenderer<typeof MASK_PROGRAM_DEFINITION> {
    manager: GameGLManager;
    bgCanvas: HTMLCanvasElement;
    quadBuffer: number[];
    perlinThresholds: number[];
    constructor(manager: GameGLManager);
    queueChunk(chunk: Chunk): void;
    setUniforms(): void;
}
