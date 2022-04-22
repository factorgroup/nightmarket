import { ArtifactId, Chunk, Planet, Transaction, WorldCoords } from '@darkforest_eth/types';
import React from 'react';
export declare function BlinkCursor(): JSX.Element;
export declare const Green: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const Sub: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const Subber: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const Text: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const White: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const Red: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const Gold: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const Colored: import("styled-components").StyledComponent<"span", any, {
    color: string;
}, never>;
export declare const Blue: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const Invisible: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const Smaller: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const HideSmall: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare function TxLink({ tx }: {
    tx: Transaction;
}): JSX.Element;
export declare function CenterPlanetLink({ planet, children, }: {
    planet: Planet;
    children: React.ReactNode;
}): JSX.Element;
export declare function ArtifactNameLink({ id }: {
    id: ArtifactId;
}): JSX.Element;
export declare function PlanetNameLink({ planet }: {
    planet: Planet;
}): JSX.Element;
export declare function CenterChunkLink({ chunk, children }: {
    chunk: Chunk;
    children: React.ReactNode;
}): JSX.Element;
export declare function FAQ04Link({ children }: {
    children: React.ReactNode;
}): JSX.Element;
export declare const LongDash: () => JSX.Element;
export declare const Coords: ({ coords: { x, y } }: {
    coords: WorldCoords;
}) => JSX.Element;
