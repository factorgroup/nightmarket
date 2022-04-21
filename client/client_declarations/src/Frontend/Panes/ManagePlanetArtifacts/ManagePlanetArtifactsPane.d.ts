/// <reference types="react" />
import { LocationId } from '@darkforest_eth/types';
import { ModalHandle } from '../../Views/ModalPane';
export declare function PlanetInfoHelpContent(): JSX.Element;
export declare function ManagePlanetArtifactsHelpContent(): JSX.Element;
/**
 * This is the place where a user can manage all of their artifacts on a
 * particular planet. This includes prospecting, withdrawing, depositing,
 * activating, and deactivating artifacts.
 */
export declare function ManagePlanetArtifactsPane({ initialPlanetId, modal, }: {
    initialPlanetId: LocationId | undefined;
    modal: ModalHandle;
}): JSX.Element;
