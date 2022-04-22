import { Artifact, ArtifactId, ArtifactRarity, ArtifactType, Biome, Planet, PlanetLevel } from '@darkforest_eth/types';
export declare const RelicsList: ArtifactType[];
export declare function isRelic(type: ArtifactType): boolean;
export declare function isBasic(type: ArtifactType): boolean;
/** Convert an `artifactId` to an int in [0, 255] */
export declare function artifactRoll(id: ArtifactId): number;
export interface RenderedArtifact extends Partial<Artifact> {
    artifactType: ArtifactType;
    planetBiome: Biome;
    rarity: ArtifactRarity;
    id: ArtifactId;
}
export declare function isAncient(artifact: RenderedArtifact): boolean;
/** Really, really shitty workaround to add a `return true` or `return false` to the above `isAncient`. Used in `GifRenderer.ts` */
export declare function setForceAncient(force: boolean): void;
export declare function artifactAvailableTimestamp(artifact: Artifact): number;
export declare function isActivated(artifact: Artifact | undefined): boolean;
export declare function getActivatedArtifact(artifacts: Artifact[]): Artifact | undefined;
export declare function getArtifactDebugName(a?: Artifact): string;
export declare const hasUnconfirmedArtifactTx: (p: Planet | undefined) => boolean;
export declare const biomeName: (biome: Biome) => string;
export declare const rarityName: (rarity: ArtifactRarity) => string;
export declare const rarityNameFromArtifact: (a: Artifact) => string;
export declare function artifactBiomeName(artifact: Artifact): string;
export declare const levelFromRarity: (rarity: ArtifactRarity) => PlanetLevel;
export declare const enum ArtifactFileColor {
    BLUE = 0,
    APP_BACKGROUND = 1
}
export declare function artifactFileName(videoMode: boolean, thumb: boolean, artifact: RenderedArtifact, color: ArtifactFileColor, debugProps?: {
    forceAncient: boolean;
    skipCaching: boolean;
} | undefined): string;
export declare function getActiveBlackDomain(artifacts: Artifact[]): Artifact | undefined;
