import { EthConnection } from "@darkforest_eth/network";
import { ArtifactId, Biome, EthAddress, LocatablePlanet, LocationId, Planet, SpaceType, WorldLocation } from "@darkforest_eth/types";
import { ContractConstants } from "../../_types/darkforest/api/ContractsAPITypes";
import { AddressTwitterMap } from "../../_types/darkforest/api/UtilityServerAPITypes";
import { ContractsAPI } from "../GameLogic/ContractsAPI";
import PersistentChunkStore from "./PersistentChunkStore";
export declare const enum SinglePlanetDataStoreEvent {
    REFRESHED_PLANET = "REFRESHED_PLANET",
    REFRESHED_ARTIFACT = "REFRESHED_ARTIFACT"
}
interface ReaderDataStoreConfig {
    contractAddress: EthAddress;
    viewer: EthAddress | undefined;
    addressTwitterMap: AddressTwitterMap;
    contractConstants: ContractConstants;
    contractsAPI: ContractsAPI;
    persistentChunkStore: PersistentChunkStore | undefined;
}
/**
 * A data store that allows you to retrieve data from the contract,
 * and combine it with data that is stored in this browser about a
 * particular user.
 */
declare class ReaderDataStore {
    readonly viewer: EthAddress | undefined;
    readonly addressTwitterMap: AddressTwitterMap;
    readonly contractConstants: ContractConstants;
    readonly contractsAPI: ContractsAPI;
    readonly persistentChunkStore: PersistentChunkStore | undefined;
    constructor({ viewer, addressTwitterMap, contractConstants, contractsAPI, persistentChunkStore, }: ReaderDataStoreConfig);
    destroy(): void;
    static create({ connection, viewer, contractAddress, }: {
        connection: EthConnection;
        viewer: EthAddress | undefined;
        contractAddress: EthAddress;
    }): Promise<ReaderDataStore>;
    getViewer(): EthAddress | undefined;
    getTwitter(owner: EthAddress | undefined): string | undefined;
    setPlanetLocationIfKnown(planet: Planet): void;
    loadPlanetFromContract(planetId: LocationId): Promise<Planet | LocatablePlanet>;
    loadArtifactFromContract(artifactId: ArtifactId): Promise<import("@darkforest_eth/types").Artifact>;
    spaceTypeFromPerlin(perlin: number): SpaceType;
    getBiome(loc: WorldLocation): Biome;
}
export default ReaderDataStore;
