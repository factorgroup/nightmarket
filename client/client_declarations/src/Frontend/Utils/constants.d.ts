import * as bigInt from 'big-integer';
declare const MIN_CHUNK_SIZE = 16;
/**
 * @tutorial to speed up the game's background rendering code, it is possible to set this value to
 * be a higher power of two. This means that smaller chunks will be merged into larger chunks via
 * the algorithms implemented in {@link ChunkUtils}.
 *
 * {@code Math.floor(Math.pow(2, 16))} should be large enough for most.
 */
declare const MAX_CHUNK_SIZE: number;
declare const LOCATION_ID_UB: bigInt.BigInteger;
export { MIN_CHUNK_SIZE, MAX_CHUNK_SIZE, LOCATION_ID_UB };
export declare const enum DFZIndex {
    MenuBar = 4,
    HoverPlanet = 1001,
    Modal = 1001,
    Tooltip = 16000000,
    Notification = 1000
}
