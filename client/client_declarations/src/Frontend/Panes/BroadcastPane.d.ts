/// <reference types="react" />
import { LocationId } from '@darkforest_eth/types';
import { ModalHandle } from '../Views/ModalPane';
export declare function BroadcastPaneHelpContent(): JSX.Element;
export declare function BroadcastPane({ initialPlanetId, modal: _modal, }: {
    modal: ModalHandle;
    initialPlanetId: LocationId | undefined;
}): JSX.Element;
