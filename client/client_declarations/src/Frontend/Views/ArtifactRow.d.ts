/// <reference types="react" />
import { Artifact } from '@darkforest_eth/types';
export declare function ArtifactThumb({ artifact, selectedArtifact, onArtifactChange, }: {
    selectedArtifact?: Artifact | undefined;
    onArtifactChange?: (artifact: Artifact | undefined) => void;
    artifact: Artifact;
}): JSX.Element;
export declare function SelectArtifactRow({ selectedArtifact, onArtifactChange, artifacts, }: {
    selectedArtifact?: Artifact | undefined;
    onArtifactChange?: (artifact: Artifact | undefined) => void;
    artifacts: Artifact[];
}): JSX.Element;
