import { AttribType } from '../EngineTypes';
export declare type GLArray = Float32Array | Uint8Array;
/**
 * Helper class - essentially an implementation of ArrayList from Java, but using
 * typed JS Arrays so that we can efficiently write our WebGL data without converting.
 */
export declare class AttribArray {
    /**
     * A typed array, representing the data in this array.
     */
    array: GLArray;
    /**
     * The number of bytes per data entry in this array.
     */
    private size;
    /**
     * The WebGL data type that this array represents.
     */
    private type;
    constructor(type: AttribType, startSize?: number);
    /**
     * Initialize a new blank array of size this.size.
     */
    private createArray;
    /**
     * Initialize a new array of 2x the length, and copy in the old data.
     */
    private doubleLen;
    /**
     * Copy in an array of data starting at an index. Writing past the maximum
     * array length will trigger doubleLen().
     *
     * @param els - The array of data to copy.
     * @param idx - The array index to start at.
     */
    set(els: ArrayLike<number>, idx: number): void;
}
