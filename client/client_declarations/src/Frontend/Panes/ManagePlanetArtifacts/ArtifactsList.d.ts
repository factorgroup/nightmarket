import { Artifact, Upgrade } from '@darkforest_eth/types';
import React from 'react';
import { ModalHandle } from '../../Views/ModalPane';
export declare function ArtifactsList({ artifacts, sortBy, modal, actions, }: {
    artifacts: Array<Artifact | undefined>;
    sortBy: keyof Upgrade | undefined;
    modal: ModalHandle;
    actions: (artifact: Artifact) => React.ReactElement | undefined;
}): JSX.Element;
