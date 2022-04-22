import { PerlinConfig } from '@darkforest_eth/hashing';
import { Chunk } from '../../../../_types/global/GlobalTypes';
import { Vec3 } from '../EngineTypes';
import { PERLIN_PROGRAM_DEFINITION } from '../Programs/PerlinProgram';
import { GameGLManager } from '../WebGL/GameGLManager';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import RectRenderer from './RectRenderer';
export declare class PerlinRenderer extends GenericRenderer<typeof PERLIN_PROGRAM_DEFINITION> {
    manager: GameGLManager;
    config: PerlinConfig;
    posBuffer: number[];
    coordsBuffer: number[];
    rectRenderer: RectRenderer | undefined;
    thresholds: Vec3;
    constructor(manager: GameGLManager, config: PerlinConfig, thresholds: [number, number, number], rectRenderer?: RectRenderer | undefined);
    private bufferGradients;
    private queueRect;
    queueChunk(chunk: Chunk): void;
    setUniforms(): void;
}
