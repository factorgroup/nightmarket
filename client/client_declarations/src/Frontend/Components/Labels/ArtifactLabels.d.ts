/// <reference types="react" />
import { Artifact, ArtifactRarity } from '@darkforest_eth/types';
export declare const ArtifactRarityText: ({ rarity }: {
    rarity: ArtifactRarity;
}) => JSX.Element;
export declare const ArtifactBiomeText: ({ artifact }: {
    artifact: Artifact;
}) => JSX.Element;
export declare const ArtifactTypeText: ({ artifact }: {
    artifact: Artifact;
}) => JSX.Element;
export declare const StyledArtifactRarityLabel: import("styled-components").StyledComponent<"span", any, {
    rarity: ArtifactRarity;
}, never>;
export declare const ArtifactRarityLabel: ({ rarity }: {
    rarity: ArtifactRarity;
}) => JSX.Element;
export declare const ArtifactRarityLabelAnim: ({ rarity }: {
    rarity: ArtifactRarity;
}) => JSX.Element;
export declare const ArtifactRarityBiomeTypeText: ({ artifact }: {
    artifact: Artifact;
}) => JSX.Element;
