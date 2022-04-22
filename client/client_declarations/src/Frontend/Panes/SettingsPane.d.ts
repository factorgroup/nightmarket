/// <reference types="react" />
import { EthConnection } from '@darkforest_eth/network';
export declare function SettingsPane({ ethConnection, visible, onClose, onOpenPrivate, }: {
    ethConnection: EthConnection;
    visible: boolean;
    onClose: () => void;
    onOpenPrivate: () => void;
}): JSX.Element;
