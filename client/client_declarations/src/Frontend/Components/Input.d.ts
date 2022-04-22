import { DarkForestCheckbox, DarkForestColorInput, DarkForestNumberInput, DarkForestTextInput } from '@darkforest_eth/ui';
import React from 'react';
export { DarkForestCheckbox, DarkForestColorInput, DarkForestNumberInput, DarkForestTextInput };
export declare const Checkbox: React.ForwardRefExoticComponent<Partial<Omit<DarkForestCheckbox, "children">> & {
    onChange?: ((e: Event) => unknown) | undefined;
} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export declare const ColorInput: React.ForwardRefExoticComponent<Partial<Omit<DarkForestColorInput, "children">> & {
    onChange?: ((e: Event) => unknown) | undefined;
} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export declare const NumberInput: React.ForwardRefExoticComponent<Partial<Omit<DarkForestNumberInput, "children">> & {
    onChange?: ((e: Event) => unknown) | undefined;
} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export declare const TextInput: React.ForwardRefExoticComponent<Partial<Omit<DarkForestTextInput, "children">> & {
    onChange?: ((e: Event) => unknown) | undefined;
    onBlur?: ((e: Event) => unknown) | undefined;
} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
