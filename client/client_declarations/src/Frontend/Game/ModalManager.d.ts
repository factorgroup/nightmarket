/// <reference types="node" />
import { Monomitter } from "@darkforest_eth/events";
import { CursorState, ModalId, ModalPosition, WorldCoords } from "@darkforest_eth/types";
import { EventEmitter } from "events";
import type PersistentChunkStore from "../../Backend/Storage/PersistentChunkStore";
declare class ModalManager extends EventEmitter {
    static instance: ModalManager;
    lastIndex: number;
    cursorState: CursorState;
    persistentChunkStore: PersistentChunkStore;
    modalPositions: Map<ModalId, ModalPosition>;
    modalPositions$: Monomitter<Map<ModalId, ModalPosition>>;
    readonly activeModalId$: Monomitter<string>;
    readonly modalPositionChanged$: Monomitter<ModalId>;
    constructor(persistentChunkStore: PersistentChunkStore, modalPositions: Map<ModalId, ModalPosition>);
    static create(persistentChunkStore: PersistentChunkStore): Promise<ModalManager>;
    getIndex(): number;
    getCursorState(): CursorState;
    setCursorState(newstate: CursorState): void;
    acceptInputForTarget(input: WorldCoords): void;
    getModalPosition(modalId: ModalId): ModalPosition | undefined;
    getModalPositions(modalIds?: ModalId[]): Map<ModalId, ModalPosition>;
    clearModalPosition(modalId: ModalId): void;
    setModalPosition(modalId: ModalId, pos: ModalPosition): void;
    setModalState(modalId: ModalId, state: ModalPosition["state"]): void;
}
export default ModalManager;
