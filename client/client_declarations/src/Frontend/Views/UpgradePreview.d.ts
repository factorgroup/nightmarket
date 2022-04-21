/// <reference types="react" />
import { Planet, Upgrade, UpgradeBranchName } from '@darkforest_eth/types';
export declare function UpgradePreview({ planet, upgrade, branchName, cantUpgrade, }: {
    planet: Planet | undefined;
    upgrade: Upgrade | undefined;
    branchName: UpgradeBranchName | undefined;
    cantUpgrade: boolean;
}): JSX.Element;
