/**
 * React uses referential identity to detect changes, and rerender. Rather
 * than copying an object into a new object, to force a rerender, we can
 * just wrap it in a new {@code Wrapper}, which will force a rerender.
 */
export declare class Wrapper<T> {
    readonly value: T;
    constructor(value: T);
}
