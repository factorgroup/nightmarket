import { Monomitter } from '@darkforest_eth/events';
import { Artifact, EthAddress, Planet } from '@darkforest_eth/types';
/**
 * Create a monomitter to emit objects with a given id from a cached map of ids to objects.
 * @param objMap the cached map of `<Id, Obj>`
 * @param objId$ the object id to select
 * @param objUpdated$ emitter which indicates when an object has been updated
 */
export declare function getObjectWithIdFromMap<Obj, Id>(objMap: Map<Id, Obj>, objId$: Monomitter<Id | undefined>, objUpdated$: Monomitter<Id>): Monomitter<Obj | undefined>;
/**
 * Create a monomitter to emit objects with a given id from a cached map of ids to objects. Not intended for re-use
 * @param objMap the cached map of `<Id, Obj>`
 * @param objId the object id to select
 * @param objUpdated$ emitter which indicates when an object has been updated
 */
export declare function getDisposableEmitter<Obj, Id>(objMap: Map<Id, Obj>, objId: Id, objUpdated$: Monomitter<Id>): Monomitter<Obj | undefined>;
/**
 * Utility function for setting a game entity into our internal data stores in a way
 * that is friendly to our application. Caches the object into a map, syncs it to a map
 * of our owned objects, and also emits a message that the object was updated.
 * @param objectMap map that caches known objects
 * @param myObjectMap map that caches known objects owned by the user
 * @param address the user's account address
 * @param obj the object we want to cache
 * @param objUpdated$ emitter for announcing object updates
 */
export declare function setObjectSyncState<Obj, Id>(objectMap: Map<Id, Obj>, myObjectMap: Map<Id, Obj>, address: EthAddress | undefined, objUpdated$: Monomitter<Id>, myObjListUpdated$: Monomitter<Map<Id, Obj>>, getId: (o: Obj) => Id, getOwner: (o: Obj) => EthAddress, obj: Obj): void;
/**
 * @param previous The previously emitted state of an object
 * @param current The current emitted state of an object
 */
export interface Diff<Type> {
    previous: Type;
    current: Type;
}
/**
 * Wraps an existing emitter and emits an event with the current and previous values
 * @param emitter an emitter announcing game objects
 */
export declare function generateDiffEmitter<Obj>(emitter: Monomitter<Obj | undefined>): Monomitter<Diff<Obj> | undefined>;
export declare const getPlanetId: (p: Planet) => import("@darkforest_eth/types").LocationId;
export declare const getPlanetOwner: (p: Planet) => EthAddress;
export declare const getArtifactId: (a: Artifact) => import("@darkforest_eth/types").ArtifactId;
export declare const getArtifactOwner: (a: Artifact) => EthAddress;
