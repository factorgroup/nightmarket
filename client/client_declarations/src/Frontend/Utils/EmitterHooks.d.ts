/// <reference types="react" />
import { Callback, Monomitter } from '@darkforest_eth/events';
import { Wrapper } from '../../Backend/Utils/Wrapper';
/**
 * Execute something on emitter callback
 * @param emitter `Monomitter` to subscribe to
 * @param callback callback to subscribe
 */
export declare function useEmitterSubscribe<T>(emitter: Monomitter<T>, callback: Callback<T>, deps: React.DependencyList): void;
/**
 * Use returned value from an emitter
 * @param emitter `Monomitter` to subscribe to
 * @param initialVal initial state value
 */
export declare function useEmitterValue<T>(emitter: Monomitter<T>, initialVal: T): T;
/**
 * Use returned value from an emitter, and clone the reference - used to force an update to the UI
 * @param emitter `Monomitter` to subscribe to
 * @param initialVal initial state value
 */
export declare function useWrappedEmitter<T>(emitter: Monomitter<T | undefined>, initialVal: T | undefined): Wrapper<T | undefined>;
