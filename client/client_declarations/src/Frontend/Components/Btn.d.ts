import { DarkForestButton, DarkForestShortcutButton, ShortcutPressedEvent } from '@darkforest_eth/ui';
import React from 'react';
export { DarkForestButton, DarkForestShortcutButton, ShortcutPressedEvent };
export declare const Btn: React.ForwardRefExoticComponent<Partial<Omit<DarkForestButton, "children">> & {
    onClick?: ((e: Event) => unknown) | undefined;
} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export declare const ShortcutBtn: React.ForwardRefExoticComponent<Partial<Omit<DarkForestShortcutButton, "children">> & {
    onClick?: ((e: Event) => unknown) | undefined;
    onShortcutPressed?: ((e: Event) => unknown) | undefined;
} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
