import { Artifact, EmojiFlagBody, Planet, PlanetMessage, QueuedArrival, Upgrade } from '@darkforest_eth/types';
import { ContractConstants } from '../../_types/darkforest/api/ContractsAPITypes';
export declare const blocksLeftToProspectExpiration: (currentBlockNumber: number, prospectedBlockNumber?: number | undefined) => number;
export declare const prospectExpired: (currentBlockNumber: number, prospectedBlockNumber: number) => boolean;
export declare const isFindable: (planet: Planet, currentBlockNumber?: number | undefined) => boolean;
export declare const isProspectable: (planet: Planet) => boolean;
export declare const updatePlanetToTime: (planet: Planet, planetArtifacts: Artifact[], atTimeMillis: number, contractConstants: ContractConstants, setPlanet?: (p: Planet) => void) => void;
export declare const applyUpgrade: (planet: Planet, upgrade: Upgrade, unApply?: boolean) => void;
/**
 * @param previous The previously calculated state of a planet
 * @param current The current calculated state of the planet
 * @param arrival The Arrival that caused the state change
 */
export interface PlanetDiff {
    previous: Planet;
    current: Planet;
    arrival: QueuedArrival;
}
export declare const arrive: (toPlanet: Planet, artifactsOnPlanet: Artifact[], arrival: QueuedArrival, arrivingArtifact: Artifact | undefined, contractConstants: ContractConstants) => PlanetDiff;
/**
 * @todo ArrivalUtils has become a dumping ground for functions that should just live inside of a
 * `Planet` class.
 */
export declare function getEmojiMessage(planet: Planet | undefined): PlanetMessage<EmojiFlagBody> | undefined;
/**
 * @todo - planet class
 * @param rangeBoost A multiplier to be applied to the resulting range.
 * Currently used for calculating boost associated with abandoning a planet.
 */
export declare function getRange(planet: Planet, percentEnergySending?: number, rangeBoost?: number): number;
