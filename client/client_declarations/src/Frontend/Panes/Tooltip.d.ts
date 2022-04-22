import { TooltipName } from '@darkforest_eth/types';
import React from 'react';
/**
 * Each {@link TooltipName} has a corresponding tooltip element.
 */
export interface TooltipTriggerProps {
    /**
     * The name of the tooltip element to display. You can see all the concrete tooltip contents in
     * the file called {@link TooltipPanes}. Set to `undefined` to not render the tooltip.
     */
    name: TooltipName | undefined;
    /**
     * A {@link TooltipTrigger} wraps this child, and causes a tooltip to appear when the user hovers
     * over it.
     */
    children: React.ReactNode;
    /**
     * You can append some dynamic content to the given tooltip by setting this field to a React node.
     */
    extraContent?: React.ReactNode;
    /**
     * You can optionally style the tooltip trigger element, not the tooltip itself.
     */
    style?: React.CSSProperties;
}
export interface TooltipProps extends TooltipTriggerProps {
    top: number;
    left: number;
}
/**
 * When the player hovers over this element, triggers the tooltip with the given name to be
 * displayed on top of everything.
 */
export declare function TooltipTrigger(props: TooltipTriggerProps): JSX.Element;
/**
 * At any given moment, there can only be one tooltip visible in the game. This is true because a
 * player only has one mouse cursor on the screen, and therefore can only be hovering over a single
 * {@link TooltipTrigger} element at any given time. This component is responsible for keeping track
 * of which tooltip has been hovered over, and rendering the corresponding content.
 */
export declare function Tooltip(props: TooltipProps): JSX.Element | null;
