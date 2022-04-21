/// <reference types="react" />
import { Artifact, LocatablePlanet } from '@darkforest_eth/types';
import { ModalHandle } from '../../Views/ModalPane';
export declare function ManageArtifactsPane({ planet, artifactsInWallet, artifactsOnPlanet, playerAddress, modal, }: {
    planet: LocatablePlanet;
    artifactsInWallet: Artifact[];
    artifactsOnPlanet: Array<Artifact | undefined>;
    playerAddress: string;
    modal: ModalHandle;
}): JSX.Element;
