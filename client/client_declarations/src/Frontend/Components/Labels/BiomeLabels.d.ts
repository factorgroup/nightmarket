/// <reference types="react" />
import { Artifact, Biome, LocatablePlanet, Planet } from '@darkforest_eth/types';
/** Renders colored text corresponding to a biome */
export declare const BiomeLabel: import("styled-components").StyledComponent<"span", any, {
    biome: Biome;
}, never>;
/** Renders animated colored text corresponding to a biome */
export declare const BiomeLabelAnim: ({ biome }: {
    biome: Biome;
}) => JSX.Element;
export declare const PlanetBiomeLabelAnim: ({ planet }: {
    planet: LocatablePlanet;
}) => JSX.Element;
export declare const OptionalPlanetBiomeLabelAnim: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const ArtifactBiomeLabel: ({ artifact }: {
    artifact: Artifact;
}) => JSX.Element;
export declare const ArtifactBiomeLabelAnim: ({ artifact }: {
    artifact: Artifact;
}) => JSX.Element;
