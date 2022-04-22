/// <reference types="react" />
import { ArtifactId, LocationId, Upgrade } from '@darkforest_eth/types';
import { ContractConstants } from '../../_types/darkforest/api/ContractsAPITypes';
import { StatIdx } from '../../_types/global/GlobalTypes';
import { ModalHandle } from '../Views/ModalPane';
export declare function UpgradeStatInfo({ upgrades, stat, }: {
    upgrades: (Upgrade | undefined)[];
    stat: StatIdx;
}): JSX.Element;
export declare function ArtifactDetailsHelpContent(): JSX.Element;
export declare function ArtifactDetailsBody({ artifactId, contractConstants, depositOn, noActions, }: {
    artifactId: ArtifactId;
    contractConstants: ContractConstants;
    modal?: ModalHandle;
    depositOn?: LocationId;
    noActions?: boolean;
}): JSX.Element | null;
export declare function ArtifactDetailsPane({ modal, artifactId, depositOn, }: {
    modal: ModalHandle;
    artifactId: ArtifactId;
    depositOn?: LocationId;
}): JSX.Element;
