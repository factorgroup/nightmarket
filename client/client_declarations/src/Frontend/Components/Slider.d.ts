import { DarkForestSlider, DarkForestSliderHandle } from '@darkforest_eth/ui';
import React from 'react';
export { DarkForestSlider, DarkForestSliderHandle };
export declare const Slider: React.ForwardRefExoticComponent<Partial<Omit<DarkForestSlider, "children">> & {
    onChange?: ((e: Event) => unknown) | undefined;
} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export declare const SliderHandle: React.ForwardRefExoticComponent<Partial<Omit<DarkForestSliderHandle, "children">> & {
    onChange?: ((e: Event) => unknown) | undefined;
} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
