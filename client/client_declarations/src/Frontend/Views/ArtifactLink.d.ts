import { Artifact, LocationId } from '@darkforest_eth/types';
import React from 'react';
import { ModalHandle } from './ModalPane';
export declare function ArtifactLink({ modal, children, artifact, depositOn, }: {
    modal?: ModalHandle;
    artifact: Artifact;
    children: React.ReactNode | React.ReactNode[];
    depositOn?: LocationId;
}): JSX.Element;
