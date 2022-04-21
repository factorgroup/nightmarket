import { DarkForestModal, PositionChangedEvent } from '@darkforest_eth/ui';
import React from 'react';
export { DarkForestModal, PositionChangedEvent };
export declare const Modal: React.ForwardRefExoticComponent<Partial<Omit<DarkForestModal, "children">> & {
    onMouseDown?: ((e: Event) => unknown) | undefined;
    onPositionChanged?: ((e: Event) => unknown) | undefined;
} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
