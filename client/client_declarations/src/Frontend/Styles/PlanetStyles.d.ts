import { Biome, Planet } from '@darkforest_eth/types';
export declare const BiomeTextColors: Record<Biome, string>;
export declare const BiomeBackgroundColors: Record<Biome, string>;
export declare function planetBackground({ planet }: {
    planet: Planet | undefined;
}): "" | import("styled-components").FlattenSimpleInterpolation;
