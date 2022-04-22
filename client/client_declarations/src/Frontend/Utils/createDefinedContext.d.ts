import React from 'react';
declare type ContextHookWithProvider<T> = {
    useDefinedContext: () => T;
    provider: React.Provider<T>;
};
/**
 * Return a hook and a provider which return a value that must be defined. Normally is difficult
 * because `React.createContext()` defaults to `undefined`.
 *
 * `useDefinedContext()` must be called inside of `provider`, otherwise an error will be thrown.
 */
export declare function createDefinedContext<T>(): ContextHookWithProvider<T>;
export {};
