import { PerlinConfig } from '@darkforest_eth/hashing';
import { Chunk } from '../../../../_types/global/GlobalTypes';
import Renderer from '../Renderer';
import { GameGLManager } from '../WebGL/GameGLManager';
import { PerlinRenderer } from './PerlinRenderer';
import RectRenderer from './RectRenderer';
export default class BackgroundRenderer {
    manager: GameGLManager;
    renderer: Renderer;
    perlinRenderer: PerlinRenderer;
    borderRenderer: RectRenderer;
    constructor(manager: GameGLManager, config: PerlinConfig, thresholds: [number, number, number]);
    drawChunks(exploredChunks: Iterable<Chunk>, highPerfMode: boolean, drawChunkBorders: boolean): void;
    fillPerlin(): void;
    flush(): void;
}
