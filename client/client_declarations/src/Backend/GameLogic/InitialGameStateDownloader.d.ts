import { Artifact, ClaimedCoords, LocationId, Planet, Player, QueuedArrival, RevealedCoords, VoyageId } from "@darkforest_eth/types";
import { TerminalHandle } from "../../Frontend/Views/Terminal";
import { ContractConstants } from "../../_types/darkforest/api/ContractsAPITypes";
import { AddressTwitterMap } from "../../_types/darkforest/api/UtilityServerAPITypes";
import PersistentChunkStore from "../Storage/PersistentChunkStore";
import { ContractsAPI } from "./ContractsAPI";
export interface InitialGameState {
    contractConstants: ContractConstants;
    players: Map<string, Player>;
    worldRadius: number;
    allTouchedPlanetIds: LocationId[];
    allRevealedCoords: RevealedCoords[];
    allClaimedCoords?: ClaimedCoords[];
    pendingMoves: QueuedArrival[];
    touchedAndLocatedPlanets: Map<LocationId, Planet>;
    artifactsOnVoyages: Artifact[];
    myArtifacts: Artifact[];
    heldArtifacts: Artifact[][];
    loadedPlanets: LocationId[];
    revealedCoordsMap: Map<LocationId, RevealedCoords>;
    claimedCoordsMap?: Map<LocationId, ClaimedCoords>;
    planetVoyageIdMap: Map<LocationId, VoyageId[]>;
    arrivals: Map<VoyageId, QueuedArrival>;
    twitters: AddressTwitterMap;
    paused: boolean;
}
export declare class InitialGameStateDownloader {
    terminal: TerminalHandle;
    constructor(terminal: TerminalHandle);
    makeProgressListener(prettyEntityName: string): (percent: number) => void;
    download(contractsAPI: ContractsAPI, persistentChunkStore: PersistentChunkStore): Promise<InitialGameState>;
}
