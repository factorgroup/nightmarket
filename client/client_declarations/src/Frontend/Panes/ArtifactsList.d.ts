import { Artifact, LocationId } from '@darkforest_eth/types';
import React from 'react';
import { ModalHandle } from '../Views/ModalPane';
export declare function ArtifactsList({ modal, artifacts, depositOn, maxRarity, noArtifactsMessage, }: {
    modal: ModalHandle;
    artifacts: Artifact[];
    depositOn?: LocationId;
    maxRarity?: number;
    noArtifactsMessage?: React.ReactElement;
}): JSX.Element;
export declare function ShipList({ modal, artifacts, depositOn, noShipsMessage, }: {
    modal: ModalHandle;
    artifacts: Artifact[];
    depositOn?: LocationId;
    noShipsMessage?: React.ReactElement;
}): JSX.Element;
export declare function AllArtifacts({ modal, artifacts, depositOn, maxRarity, noArtifactsMessage, noShipsMessage, }: {
    modal: ModalHandle;
    artifacts: Artifact[];
    depositOn?: LocationId;
    maxRarity?: number;
    noArtifactsMessage?: React.ReactElement;
    noShipsMessage?: React.ReactElement;
}): JSX.Element;
