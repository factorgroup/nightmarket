/**
 * Typed single pub / sub pattern, inspired by:
 * https://github.com/loilo/monomitter/blob/master/monomitter.mjs
 */
export declare type Callback<T> = (o: T) => void;
export declare type Subscription = {
    unsubscribe: () => void;
};
export declare type Monomitter<T> = {
    publish: (o: T) => void;
    subscribe: (cb: Callback<T>) => Subscription;
    clear: () => void;
};
/**
 * Constructs a new event emitter, whose purpose is to emit values of the given type.
 *
 * @param emitLatestOnSubscribe - if this is true, upon subscription immediately emit
 *                                the most recently set value, if there is one
 */
export declare function monomitter<T>(emitLatestOnSubscribe?: boolean): Monomitter<T>;
