/// <reference types="react" />
import { Wrapper } from '../../Backend/Utils/Wrapper';
export declare const keyUp$: import("@darkforest_eth/events").Monomitter<Wrapper<string>>;
export declare const keyDown$: import("@darkforest_eth/events").Monomitter<Wrapper<string>>;
export declare function listenForKeyboardEvents(): void;
export declare function unlinkKeyboardEvents(): void;
export declare function useIsDown(key?: string): boolean;
export declare function useOnUp(key: string, onUp: () => void, deps?: React.DependencyList): void;
