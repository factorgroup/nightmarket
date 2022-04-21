import { Monomitter } from "@darkforest_eth/events";
import { Abstract, ArrivalWithTimer, Artifact, ArtifactId, Biome, Chunk, ClaimedLocation, EthAddress, LocatablePlanet, LocationId, Planet, PlanetLevel, PlanetType, QueuedArrival, Radii, RevealedLocation, SpaceType, Transaction, TransactionCollection, VoyageId, WorldCoords, WorldLocation, Wormhole } from "@darkforest_eth/types";
import { ContractConstants } from "../../_types/darkforest/api/ContractsAPITypes";
import { PlanetDiff } from "./ArrivalUtils";
import { LayeredMap } from "./LayeredMap";
declare type CoordsString = Abstract<string, "CoordString">;
/**
 * Representation of the objects which exist in the world.
 */
export declare class GameObjects {
    /**
     * This is a data structure that allows us to efficiently calculate which planets are visible on
     * the player's screen given the viewport's position and size.
     */
    readonly layeredMap: LayeredMap;
    /**
     * This address of the player that is currently logged in.
     *
     * @todo move this, along with all other objects relating to the currently logged-on player into a
     * new field: {@code player: PlayerInfo}
     */
    readonly address: EthAddress | undefined;
    /**
     * Cached index of all known planet data.
     *
     * Warning!
     *
     * This should NEVER be set to directly! Any time you want to update a planet, you must call the
     * {@link GameObjects#setPlanet()} function. Following this rule enables us to reliably notify
     * other parts of the client when a particular object has been updated. TODO: what is the best way
     * to do this?
     *
     * @todo extract the pattern we're using for the field tuples
     *   - {planets, myPlanets, myPlanetsUpdated, planetUpdated$}
     *   - {artifacts, myArtifacts, myArtifactsUpdated, artifactUpdated$}
     *
     *   into some sort of class.
     */
    readonly planets: Map<LocationId, Planet>;
    /**
     * Cached index of planets owned by the player.
     *
     * @see The same warning applys as the one on {@link GameObjects.planets}
     */
    readonly myPlanets: Map<LocationId, Planet>;
    /**
     * Cached index of all known artifact data.
     *
     * @see The same warning applys as the one on {@link GameObjects.planets}
     */
    readonly artifacts: Map<ArtifactId, Artifact>;
    /**
     * Cached index of artifacts owned by the player.
     *
     * @see The same warning applys as the one on {@link GameObjects.planets}
     */
    readonly myArtifacts: Map<ArtifactId, Artifact>;
    /**
     * Map from artifact ids to wormholes.
     */
    readonly wormholes: Map<ArtifactId, Wormhole>;
    /**
     * Set of all planet ids that we know have been interacted-with on-chain.
     */
    readonly touchedPlanetIds: Set<LocationId>;
    /**
     * Map of arrivals to timers that fire when an arrival arrives, in case that handler needs to be
     * cancelled for whatever reason.
     */
    readonly arrivals: Map<VoyageId, ArrivalWithTimer>;
    /**
     * Map from a location id (think of it as the unique id of each planet) to all the ids of the
     * voyages that are arriving on that planet. These include both the player's own voyages, and also
     * any potential invader's voyages.
     */
    readonly planetArrivalIds: Map<LocationId, VoyageId[]>;
    /**
     * Map from location id (unique id of each planet) to some information about the location at which
     * this planet is located, if this client happens to know the coordinates of this planet.
     */
    readonly planetLocationMap: Map<LocationId, WorldLocation>;
    /**
     * Map from location ids to, if that location id has been revealed on-chain, the world coordinates
     * of that location id, as well as some extra information regarding the circumstances of the
     * revealing of this planet.
     */
    readonly revealedLocations: Map<LocationId, RevealedLocation>;
    /**
     * Map from location ids to, if that location id has been claimed on-chain, the world coordinates
     * of that location id, as well as some extra information regarding the circumstances of the
     * revealing of this planet.
     */
    readonly claimedLocations: Map<LocationId, ClaimedLocation>;
    /**
     * Some of the game's parameters are downloaded from the blockchain. This allows the client to be
     * flexible, and connect to any compatible set of Dark Forest contracts, download the parameters,
     * and join the game, taking into account the unique configuration of those specific Dark Forest
     * contracts.
     */
    readonly contractConstants: ContractConstants;
    /**
     * Map from a stringified representation of an x-y coordinate to an object that contains some more
     * information about the world at that location.
     */
    readonly coordsToLocation: Map<CoordsString, WorldLocation>;
    /**
     * Transactions that are currently in flight.
     */
    readonly transactions: TransactionCollection;
    /**
     * Event emitter which publishes whenever a planet is updated.
     */
    readonly planetUpdated$: Monomitter<LocationId>;
    /**
     * Event emitter which publishes whenever an artifact has been updated.
     */
    readonly artifactUpdated$: Monomitter<ArtifactId>;
    /**
     * Whenever a planet is updated, we publish to this event with a reference to a map from location
     * id to planet. We need to rethink this event emitter because it currently publishes every time
     * that any planet is updated, and if a lot of them are updated at once (which i think is the case
     * once every two minutes) then this event emitter will publish a shitton of events.
     * TODO: rethink this
     */
    readonly myPlanetsUpdated$: Monomitter<Map<LocationId, Planet>>;
    /**
     * Whenever one of the player's artifacts are updated, this event emitter publishes. See
     * {@link GameObjects.myPlanetsUpdated$} for more info.
     */
    readonly myArtifactsUpdated$: Monomitter<Map<ArtifactId, Artifact>>;
    constructor(address: EthAddress | undefined, touchedPlanets: Map<LocationId, Planet>, allTouchedPlanetIds: Set<LocationId>, revealedLocations: Map<LocationId, RevealedLocation>, claimedLocations: Map<LocationId, ClaimedLocation>, artifacts: Map<ArtifactId, Artifact>, allChunks: Iterable<Chunk>, unprocessedArrivals: Map<VoyageId, QueuedArrival>, unprocessedPlanetArrivalIds: Map<LocationId, VoyageId[]>, contractConstants: ContractConstants, worldRadius: number);
    getWormholes(): Iterable<Wormhole>;
    getArtifactById(artifactId?: ArtifactId): Artifact | undefined;
    getArtifactsOwnedBy(addr: EthAddress): Artifact[];
    getPlanetArtifacts(planetId: LocationId): Artifact[];
    getArtifactsOnPlanetsOwnedBy(addr: EthAddress): Artifact[];
    getPlanetWithId(planetId: LocationId, updateIfStale?: boolean): Planet | undefined;
    getPlanetLevel(planetId: LocationId): PlanetLevel | undefined;
    getPlanetDetailLevel(planetId: LocationId): number | undefined;
    /**
     * received some artifact data from the contract. update our stores
     */
    replaceArtifactFromContractData(artifact: Artifact): void;
    replaceArtifactsFromContractData(artifacts: Iterable<Artifact>): void;
    /**
     * Given a planet id, update the state of the given planet by calling the given update function.
     * If the planet was updated, then also publish the appropriate event.
     */
    updatePlanet(id: LocationId, updateFn: (p: Planet) => void): void;
    /**
     * Given a planet id, update the state of the given planet by calling the given update function.
     * If the planet was updated, then also publish the appropriate event.
     */
    updateArtifact(id: ArtifactId | undefined, updateFn: (p: Artifact) => void): void;
    /**
     * received some planet data from the contract. update our stores
     */
    replacePlanetFromContractData(planet: Planet, updatedArrivals?: QueuedArrival[], updatedArtifactsOnPlanet?: ArtifactId[], revealedLocation?: RevealedLocation, claimerEthAddress?: EthAddress): void;
    getPlanetWithCoords(coords: WorldCoords): LocatablePlanet | undefined;
    getPlanetWithLocation(location: WorldLocation | undefined): Planet | undefined;
    isPlanetInContract(planetId: LocationId): boolean;
    /**
     * Called when we load chunk data into memory (on startup), when we're loading all revealed locations (on startup),
     * when miner has mined a new chunk while exploring, and when a planet's location is revealed onchain during the course of play
     * Adds a WorldLocation to the planetLocationMap, making it known to the player locally
     * Sets an unsynced default planet in the PlanetMap this.planets
     * IMPORTANT: This is the only way a LocatablePlanet gets constructed
     * IMPORTANT: Idempotent
     */
    addPlanetLocation(planetLocation: WorldLocation): void;
    markLocationRevealed(revealedLocation: RevealedLocation): void;
    getLocationOfPlanet(planetId: LocationId): WorldLocation | undefined;
    /**
     * Returns all planets in the game.
     *
     * Warning! Simply iterating over this is not performant, and is meant for scripting.
     *
     * @tutorial For plugin developers!
     */
    getAllPlanets(): Iterable<Planet>;
    /**
     * Returns all planets in the game, as a map from their location id to the planet.
     *
     * @tutorial For plugin developers!
     * @see Warning in {@link GameObjects.getAllPlanets()}
     */
    getAllPlanetsMap(): Map<LocationId, Planet>;
    /**
     * Returns all the planets in the game which this client is aware of that have an owner, as a map
     * from their id to the planet
     *
     * @tutorial For plugin developers!
     * @see Warning in {@link GameObjects.getAllPlanets()}
     */
    getAllOwnedPlanets(): Planet[];
    /**
     * Returns all voyages that are scheduled to arrive at some point in the future.
     *
     * @tutorial For plugin developers!
     * @see Warning in {@link GameObjects.getAllPlanets()}
     */
    getAllVoyages(): QueuedArrival[];
    /**
     * We call this function whenever the user requests that we send a transaction to the blockchain
     * with their localstorage wallet. You can think of it as one of the hubs which connects
     * `GameObjects` to the rest of the world.
     *
     * Inside this function, we update the relevant internal game objects to reflect that the user has
     * requested a particular action. Additionally, we publish the appropriate events to the relevant
     * {@link Monomitter} instances that are stored in this class.
     *
     * In the case of something like prospecting for an artifact, this allows us to display a spinner
     * text which says "Prospecting..."
     *
     * In the case of the user sending energy from one planet to another planet, this allows us to
     * display a dashed line between the two planets in their new voyage.
     *
     * Whenever we update an entity, we must do it via that entity's type's corresponding
     * `set<EntityType>` function, in order for us to publish these events.
     *
     * @todo: this entire function could be automated by implementing a new interface called
     * {@code TxFilter}.
     */
    onTxIntent(tx: Transaction): void;
    /**
     * Whenever a transaction that the user initiated either succeeds or fails, we need to clear the
     * fact that it was in progress from the event's corresponding entities. For example, whenever a
     * transaction that sends a voyage from one planet to another either succeeds or fails, we need to
     * remove the dashed line that connected them.
     *
     * Making sure that we never miss something here is very tedious.
     *
     * @todo Make this less tedious.
     */
    clearUnconfirmedTxIntent(tx: Transaction): void;
    getPlanetMap(): Map<LocationId, Planet>;
    getArtifactMap(): Map<ArtifactId, Artifact>;
    getMyPlanetMap(): Map<LocationId, Planet>;
    getMyArtifactMap(): Map<ArtifactId, Artifact>;
    getRevealedLocations(): Map<LocationId, RevealedLocation>;
    getClaimedLocations(): Map<LocationId, ClaimedLocation>;
    setClaimedLocation(claimedLocation: ClaimedLocation): void;
    /**
     * Gets all the planets with the given ids, giltering out the ones that we don't have.
     */
    getPlanetsWithIds(locationIds: LocationId[], updateIfStale?: boolean): Planet[];
    /**
     * Gets all the planets that are within {@code radius} world units from the given coordinate. Fast
     * because it uses {@link LayeredMap}.
     */
    getPlanetsInWorldCircle(coords: WorldCoords, radius: number): LocatablePlanet[];
    /**
     * Gets the ids of all the planets that are both within the given bounding box (defined by its
     * bottom left coordinate, width, and height) in the world and of a level that was passed in via
     * the `planetLevels` parameter. Fast because it uses {@link LayeredMap}.
     */
    getPlanetsInWorldRectangle(worldX: number, worldY: number, worldWidth: number, worldHeight: number, levels: number[], planetLevelToRadii: Map<number, Radii>, updateIfStale?: boolean): LocatablePlanet[];
    forceTick(locationId: LocationId): void;
    /**
     * Set a planet into our cached store. Should ALWAYS call this when setting a planet.
     * `this.planets` and `this.myPlanets` should NEVER be accessed directly!
     * This function also handles managing planet update messages and indexing the map of owned planets.
     * @param planet the planet to set
     */
    setPlanet(planet: Planet): void;
    /**
     * Set an artifact into our cached store. Should ALWAYS call this when setting an artifact.
     * `this.artifacts` and `this.myArtifacts` should NEVER be accessed directly!
     * This function also handles managing artifact update messages and indexing the map of owned artifacts.
     * @param artifact the artifact to set
     */
    setArtifact(artifact: Artifact): void;
    /**
     * Emit notifications based on a planet's state change
     */
    emitArrivalNotifications({ previous, current, arrival }: PlanetDiff): void;
    removeArrival(planetId: LocationId, arrivalId: VoyageId): void;
    processArrivalsForPlanet(planetId: LocationId, arrivals: QueuedArrival[]): ArrivalWithTimer[];
    clearOldArrivals(planet: Planet): void;
    planetLevelFromHexPerlin(hex: LocationId, perlin: number): PlanetLevel;
    spaceTypeFromPerlin(perlin: number): SpaceType;
    static getSilverNeeded(planet: Planet): number;
    static planetCanUpgrade(planet: Planet): boolean;
    planetTypeFromHexPerlin(hex: LocationId, perlin: number): PlanetType;
    getBiome(loc: WorldLocation): Biome;
    /**
     * returns the data for an unowned, untouched planet at location
     * most planets in the game are untouched and not stored in the contract,
     * so we need to generate their data optimistically in the client
     */
    defaultPlanetFromLocation(location: WorldLocation): LocatablePlanet;
    updatePlanetIfStale(planet: Planet): void;
    /**
     * returns timestamp (seconds) that planet will reach percent% of energycap
     * time may be in the past
     */
    getEnergyCurveAtPercent(planet: Planet, percent: number): number;
    /**
     * returns timestamp (seconds) that planet will reach percent% of silcap if
     * doesn't produce silver, returns undefined if already over percent% of silcap,
     * returns undefined
     */
    getSilverCurveAtPercent(planet: Planet, percent: number): number | undefined;
    /**
     * Returns the EthAddress of the player who can control the owner:
     * if the artifact is on a planet, this is the owner of the planet
     * if the artifact is on a voyage, this is the initiator of the voyage
     * if the artifact is not on either, then it is the owner of the artifact NFT
     */
    getArtifactController(artifactId: ArtifactId): EthAddress | undefined;
    /**
     * Get all of the incoming voyages for a given location.
     */
    getArrivalIdsForLocation(location: LocationId | undefined): VoyageId[] | undefined;
    /**
     * Whether or not we're already asking the game to give us spaceships.
     */
    isGettingSpaceships(): boolean;
}
export {};
