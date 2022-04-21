import { ModalName } from '@darkforest_eth/types';
import React from 'react';
import { Hook } from '../../_types/global/GlobalTypes';
import { MaybeShortcutButton } from '../Components/MaybeShortcutButton';
/**
 * A button which allows you to open a modal.
 */
export declare function ModalToggleButton({ modal, hook: [_active, setActive], text, style, ...props }: {
    modal: ModalName;
    hook: Hook<boolean>;
    text?: string;
    style?: React.CSSProperties;
} & React.ComponentProps<typeof MaybeShortcutButton>): JSX.Element;
