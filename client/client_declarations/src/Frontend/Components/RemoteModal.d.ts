import { ModalId } from '@darkforest_eth/types';
import * as React from 'react';
/**
 * Allows you to instantiate a modal, and render it into the desired element.
 * Useful for loading temporary modals from ANYWHERE in the UI, not just
 * {@link GameWindowLayout}
 */
export declare function RemoteModal({ title, container, children, visible, onClose, id, width, }: React.PropsWithChildren<{
    title: string;
    id: ModalId;
    container: Element;
    visible: boolean;
    onClose: () => void;
    width?: string;
}>): React.ReactPortal;
