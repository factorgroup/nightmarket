import { ArtifactRarity } from '@darkforest_eth/types';
import { RenderedArtifact } from '../../../Backend/GameLogic/ArtifactUtils';
export declare const ARTIFACTS_URL = "public/sprites/artifacts.png";
export declare const ARTIFACTS_THUMBS_URL = "public/sprites/artifactthumbs.png";
export declare const GLASS_URL = "public/sprites/glass.png";
export declare function loadSprite(imageUrl: string): Promise<HTMLImageElement>;
export declare function loadArtifactAtlas(): Promise<HTMLImageElement>;
export declare function loadArtifactThumbAtlas(): Promise<HTMLImageElement>;
export declare const SPRITES_HORIZONTALLY = 16;
export declare const SPRITES_VERTICALLY = 16;
export declare const SPRITESHEET_WIDTH_PX: number;
export declare const SPRITESHEET_HEIGHT_PX: number;
export declare type SpriteRectangle = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
/**
 * Represents where in the sprite sheet an artifact lives.
 */
declare type SpriteSet = {
    shiny: SpriteRectangle;
    normal: SpriteRectangle;
};
/**
 * Represents a sprite that doesn't exist.
 */
export declare const EMPTY_SPRITE: SpriteRectangle;
export declare const EMPTY_SET: SpriteSet;
export declare function isShiny(rarity: ArtifactRarity): boolean;
export declare function spriteFromArtifact(artifact: RenderedArtifact): SpriteRectangle;
export {};
