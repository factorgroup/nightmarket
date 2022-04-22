import { Artifact, WorldCoords } from '@darkforest_eth/types';
import { RenderedArtifact } from '../../../../Backend/GameLogic/ArtifactUtils';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import { RGBVec } from '../EngineTypes';
import { SPRITE_PROGRAM_DEFINITION } from '../Programs/SpriteProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';
export declare class SpriteRenderer extends GenericRenderer<typeof SPRITE_PROGRAM_DEFINITION> {
    private posBuffer;
    private texBuffer;
    private rectposBuffer;
    private loaded;
    private thumb;
    private texIdx;
    private flip;
    constructor(manager: WebGLManager, thumb?: boolean, flip?: boolean);
    private loadAtlas;
    private loadTexture;
    queueArtifact(artifact: RenderedArtifact, pos: CanvasCoords, width?: number, alpha?: number, atFrame?: number | undefined, color?: RGBVec | undefined, theta?: number | undefined): void;
    /** Queue artifact to worldcoords, centered */
    queueArtifactWorld(artifact: RenderedArtifact, posW: CanvasCoords, widthW: number, alpha?: number, atFrame?: number | undefined, color?: RGBVec | undefined, theta?: number | undefined): void;
    queueSprite(artifact: RenderedArtifact, topLeft: CanvasCoords, width: number, alpha: number, color?: RGBVec | undefined, atFrame?: number | undefined, theta?: number | undefined): void;
    queueOutline(artifact: RenderedArtifact, { x, y }: CanvasCoords, width: number, alpha: number, theta: number | undefined, color?: RGBVec): void;
    queueIconWorld(artifact: Artifact, topLeft: WorldCoords, widthW: number, maxWidth?: number): void;
    setUniforms(): void;
    flush(): void;
}
