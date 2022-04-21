import { WorldCoords } from '@darkforest_eth/types';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import { RGBAVec, TextAlign, TextAnchor } from '../EngineTypes';
import { TEXT_PROGRAM_DEFINITION } from '../Programs/TextProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';
declare type GlyphInfo = {
    x: number;
    y: number;
};
export default class TextRenderer extends GenericRenderer<typeof TEXT_PROGRAM_DEFINITION> {
    bufferCanvas: HTMLCanvasElement;
    quad3Buffer: number[];
    quad2Buffer: number[];
    glyphData: Map<string, GlyphInfo>;
    texIdx: number;
    constructor(manager: WebGLManager, bufferCanvas: HTMLCanvasElement);
    private setTexture;
    private createGlyphs;
    queueTextWorld(text: string, coords: WorldCoords, color?: RGBAVec, offY?: number, // measured in text units - constant screen-coord offset that it useful for drawing nice things
    align?: TextAlign, anchor?: TextAnchor, zIdx?: number): void;
    queueText(text: string, { x, y }: CanvasCoords, color: RGBAVec, align?: TextAlign, anchor?: TextAnchor, zIdx?: number): void;
    private queueGlyph;
    setUniforms(): void;
    flush(): void;
}
export {};
