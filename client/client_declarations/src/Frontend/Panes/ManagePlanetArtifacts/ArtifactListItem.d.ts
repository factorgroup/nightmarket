import { Artifact } from '@darkforest_eth/types';
import React from 'react';
import { ModalHandle } from '../../Views/ModalPane';
export declare function ArtifactListItem({ artifact, actions, modal, }: {
    artifact: Artifact | undefined;
    modal: ModalHandle;
    actions: (artifact: Artifact) => React.ReactElement | undefined;
}): JSX.Element;
