/** This file contains some common utilities used by the Lobbies UI */
import { Initializers } from '@darkforest_eth/settings';
import React from 'react';
export declare const SAFE_UPPER_BOUNDS: number;
export interface LobbiesPaneProps {
    config: Initializers;
    onUpdate: (change: Partial<Initializers>) => void;
}
export declare const ButtonRow: import("styled-components").StyledComponent<React.ForwardRefExoticComponent<Partial<Omit<import("@darkforest_eth/ui").DarkForestRow, "children">> & {} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>, any, {}, never>;
export declare function LinkButton({ to, shortcut, children, }: React.PropsWithChildren<{
    to: string;
    shortcut?: string;
}>): JSX.Element;
export declare function NavigationTitle({ children }: React.PropsWithChildren<unknown>): JSX.Element;
