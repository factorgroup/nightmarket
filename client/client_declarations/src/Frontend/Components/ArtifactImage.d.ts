/// <reference types="react" />
import { ArtifactFileColor } from '@darkforest_eth/gamelogic';
import { Artifact } from '@darkforest_eth/types';
export declare const ARTIFACT_URL = "https://d2wspbczt15cqu.cloudfront.net/v0.6.0-artifacts/";
export declare function ArtifactImage({ artifact, size, thumb, bgColor, }: {
    artifact: Artifact;
    size: number;
    thumb?: boolean;
    bgColor?: ArtifactFileColor;
}): JSX.Element;
