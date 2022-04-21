import { SpriteRenderer, WebGLManager } from "@darkforest_eth/renderer";
import { Artifact, ArtifactRarity, ArtifactType, Biome } from "@darkforest_eth/types";
import { mat4 } from "gl-matrix";
import JSZip from "jszip";
declare global {
    interface Window {
        CCapture: any;
    }
}
export declare class GifRenderer extends WebGLManager {
    projectionMatrix: mat4;
    spriteRenderer: SpriteRenderer;
    margin: number;
    canvasDim: number;
    artifactDim: number;
    resolution: number;
    thumb: boolean;
    constructor(canvas: HTMLCanvasElement, dim: number, isThumb: boolean);
    setDim(dim: number): void;
    drawSprite(artifact: Artifact, atFrame?: number | undefined): void;
    getBase64(): string;
    getFileName(video: boolean, type: ArtifactType, biome: Biome, rarity: ArtifactRarity, ancient: boolean): string;
    addSprite(dir: JSZip, type: ArtifactType, biome: Biome, rarity: ArtifactRarity, ancient?: boolean): void;
    addVideo(dir: JSZip, type: ArtifactType, biome: Biome, rarity: ArtifactRarity, ancient?: boolean): Promise<void>;
    addBiomes(videoMode: boolean, dir: JSZip): Promise<void>;
    addAncient(videoMode: boolean, dir: JSZip): Promise<void>;
    getAll(videoMode?: boolean): Promise<void>;
    getAllSprites(): void;
    getAllVideos(): void;
    clear(): void;
}
