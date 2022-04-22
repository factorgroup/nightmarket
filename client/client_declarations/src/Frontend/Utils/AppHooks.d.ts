/// <reference types="react" />
import { Artifact, ArtifactId, EthAddress, Leaderboard, LocationId, Planet, Player, Transaction, TransactionId } from '@darkforest_eth/types';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { ModalHandle } from '../Views/ModalPane';
export declare const useUIManager: () => GameUIManager, UIManagerProvider: import("react").Provider<GameUIManager>;
export declare const useTopLevelDiv: () => HTMLDivElement, TopLevelDivProvider: import("react").Provider<HTMLDivElement>;
export declare function useOverlayContainer(): HTMLDivElement | null;
/**
 * Get the currently used account on the client.
 * @param uiManager instance of GameUIManager
 */
export declare function useAccount(uiManager: GameUIManager): EthAddress | undefined;
/**
 * Hook which gets you the player, and updates whenever that player's twitter or score changes.
 */
export declare function usePlayer(uiManager: GameUIManager, ethAddress?: EthAddress): Wrapper<Player | undefined>;
/**
 * Create a subscription to the currently selected planet.
 * @param uiManager instance of GameUIManager
 */
export declare function useSelectedPlanet(uiManager: GameUIManager): Wrapper<Planet | undefined>;
export declare function useSelectedPlanetId(uiManager: GameUIManager, defaultId?: LocationId): Wrapper<LocationId | undefined>;
export declare function usePlanet(uiManager: GameUIManager, locationId: LocationId | undefined): Wrapper<Planet | undefined>;
/**
 * Create a subscription to the currently hovering planet.
 * @param uiManager instance of GameUIManager
 */
export declare function useHoverPlanet(uiManager: GameUIManager): Wrapper<Planet | undefined>;
export declare function useHoverArtifact(uiManager: GameUIManager): Wrapper<Artifact | undefined>;
export declare function useHoverArtifactId(uiManager: GameUIManager): Wrapper<ArtifactId | undefined>;
export declare function useMyArtifacts(uiManager: GameUIManager): Wrapper<Artifact[]>;
export declare function useMyArtifactsList(uiManager: GameUIManager): Artifact[];
export declare function usePlanetArtifacts(planet: Wrapper<Planet | undefined>, uiManager: GameUIManager): Artifact[];
export declare function usePlanetInactiveArtifacts(planet: Wrapper<Planet | undefined>, uiManager: GameUIManager): Artifact[];
export declare function useActiveArtifact(planet: Wrapper<Planet | undefined>, uiManager: GameUIManager): Artifact | undefined;
/**
 * Create a subscription to the currently selected artifact.
 * @param uiManager instance of GameUIManager
 */
export declare function useSelectedArtifact(uiManager: GameUIManager): Wrapper<Artifact | undefined>;
export declare function useArtifact(uiManager: GameUIManager, artifactId: ArtifactId): Wrapper<Artifact | undefined>;
/** Loads the leaderboard */
export declare function useLeaderboard(poll?: number | undefined): {
    leaderboard: Leaderboard | undefined;
    error: Error | undefined;
};
export declare function usePopAllOnSelectedPlanetChanged(modal: ModalHandle, startingId: LocationId | undefined): void;
export declare type TransactionRecord = Record<TransactionId, Transaction>;
/**
 * Creates subscriptions to all contract transaction events to keep an up to date
 * list of all transactions and their states.
 */
export declare function useTransactionLog(): Wrapper<TransactionRecord>;
export declare function usePaused(): boolean;
