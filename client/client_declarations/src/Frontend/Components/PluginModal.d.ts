import { ModalId } from '@darkforest_eth/types';
import React from 'react';
export declare function PluginModal({ title, container, id, width, onClose, onRender, }: {
    title: string;
    id: ModalId;
    container: Element;
    width?: string;
    onClose: () => void;
    onRender: (el: HTMLDivElement) => void;
}): React.ReactPortal;
