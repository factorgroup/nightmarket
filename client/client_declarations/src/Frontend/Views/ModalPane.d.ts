import { ModalId } from '@darkforest_eth/types';
import React from 'react';
import { PaneProps } from '../Components/GameWindowComponents';
export declare type ModalProps = PaneProps & {
    title: string | React.ReactNode;
    style?: CSSStyleDeclaration & React.CSSProperties;
    visible: boolean;
    onClose: () => void;
    id: ModalId;
    hideClose?: boolean;
    helpContent?: () => React.ReactNode;
    width?: string;
    initialPosition?: {
        x: number;
        y: number;
    };
};
/**
 * A modal has a {@code content}, and also optionally many {@link ModalFrames} pushed on top of it.
 */
export interface ModalFrame {
    title: string;
    element: () => React.ReactElement;
    helpContent?: React.ReactElement;
}
/**
 * @todo Add things like open, close, set position, etc.
 */
export interface ModalHandle {
    push(frame: ModalFrame): void;
    popAll(): void;
    pop(): void;
    id: string;
    isActive: boolean;
}
export declare function ModalPane({ style, children, title, visible, onClose, hideClose, helpContent, width, initialPosition, id, }: ModalProps): JSX.Element | null;
