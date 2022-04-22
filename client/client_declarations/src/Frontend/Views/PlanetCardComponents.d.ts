import { Artifact, Planet, TooltipName } from '@darkforest_eth/types';
import React from 'react';
export declare const TimesTwo: () => JSX.Element;
export declare const Halved: () => JSX.Element;
export declare const RowTip: ({ name, children }: {
    name: TooltipName;
    children: React.ReactNode;
}) => JSX.Element;
export declare const TitleBar: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare function PlanetActiveArtifact({ artifact, planet, }: {
    artifact: Artifact;
    planet: Planet | undefined;
}): JSX.Element;
