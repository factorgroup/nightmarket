/// <reference types="react" />
/// <reference types="node" />
import type { DarkForest } from "@darkforest_eth/contracts/typechain";
import { Monomitter, Subscription } from "@darkforest_eth/events";
import { EthConnection } from "@darkforest_eth/network";
import { Artifact, ArtifactId, Chunk, ClaimedCoords, ClaimedLocation, Diagnostics, EthAddress, LocatablePlanet, LocationId, NetworkHealthSummary, Planet, PlanetLevel, PlanetMessageType, Player, QueuedArrival, Radii, Rectangle, RevealedCoords, RevealedLocation, SignedMessage, SpaceType, Transaction, TxIntent, UnconfirmedActivateArtifact, UnconfirmedBuyHat, UnconfirmedCapturePlanet, UnconfirmedDeactivateArtifact, UnconfirmedDepositArtifact, UnconfirmedFindArtifact, UnconfirmedInvadePlanet, UnconfirmedMove, UnconfirmedPlanetTransfer, UnconfirmedProspectPlanet, UnconfirmedReveal, UnconfirmedUpgrade, UnconfirmedWithdrawArtifact, UnconfirmedWithdrawSilver, Upgrade, VoyageId, WorldCoords, WorldLocation, Wormhole } from "@darkforest_eth/types";
import { BigInteger } from "big-integer";
import { BigNumber, Contract, ContractInterface, providers } from "ethers";
import { EventEmitter } from "events";
import NotificationManager from "../../Frontend/Game/NotificationManager";
import { Diff } from "../../Frontend/Utils/EmitterUtils";
import UIEmitter from "../../Frontend/Utils/UIEmitter";
import { TerminalHandle } from "../../Frontend/Views/Terminal";
import { ContractConstants } from "../../_types/darkforest/api/ContractsAPITypes";
import { AddressTwitterMap } from "../../_types/darkforest/api/UtilityServerAPITypes";
import { HashConfig, RevealCountdownInfo } from "../../_types/global/GlobalTypes";
import MinerManager from "../Miner/MinerManager";
import { MiningPattern, SpiralPattern, SwissCheesePattern, TowardsCenterPattern, TowardsCenterPatternV2 } from "../Miner/MiningPatterns";
import { SerializedPlugin } from "../Plugins/SerializedPlugin";
import PersistentChunkStore from "../Storage/PersistentChunkStore";
import SnarkArgsHelper from "../Utils/SnarkArgsHelper";
import { CaptureZoneGenerator } from "./CaptureZoneGenerator";
import { ContractsAPI } from "./ContractsAPI";
import { GameObjects } from "./GameObjects";
export declare enum GameManagerEvent {
    PlanetUpdate = "PlanetUpdate",
    DiscoveredNewChunk = "DiscoveredNewChunk",
    InitializedPlayer = "InitializedPlayer",
    InitializedPlayerError = "InitializedPlayerError",
    ArtifactUpdate = "ArtifactUpdate",
    Moved = "Moved"
}
declare class GameManager extends EventEmitter {
    /**
     * This variable contains the internal state of objects that live in the game world.
     */
    readonly entityStore: GameObjects;
    /**
     * Kind of hacky, but we store a reference to the terminal that the player sees when the initially
     * load into the game. This is the same exact terminal that appears inside the collapsable right
     * bar of the game.
     */
    readonly terminal: React.MutableRefObject<TerminalHandle | undefined>;
    /**
     * The ethereum address of the player who is currently logged in. We support 'no account',
     * represented by `undefined` in the case when you want to simply load the game state from the
     * contract and view it without be able to make any moves.
     */
    readonly account: EthAddress | undefined;
    /**
     * Map from ethereum addresses to player objects. This isn't stored in {@link GameObjects},
     * because it's not techincally an entity that exists in the world. A player just controls planets
     * and artifacts that do exist in the world.
     *
     * @todo move this into a new `Players` class.
     */
    readonly players: Map<string, Player>;
    /**
     * Allows us to make contract calls, and execute transactions. Be careful about how you use this
     * guy. You don't want to cause your client to send an excessive amount of traffic to whatever
     * node you're connected to.
     *
     * Interacting with the blockchain isn't free, and we need to be mindful about about the way our
     * application interacts with the blockchain. The current rate limiting strategy consists of three
     * points:
     *
     * - data that needs to be fetched often should be fetched in bulk.
     * - rate limit smart contract calls (reads from the blockchain), implemented by
     *   {@link ContractCaller} and transactions (writes to the blockchain on behalf of the player),
     *   implemented by {@link TxExecutor} via two separately tuned {@link ThrottledConcurrentQueue}s.
     */
    readonly contractsAPI: ContractsAPI;
    /**
     * An object that syncs any newly added or deleted chunks to the player's IndexedDB.
     *
     * @todo it also persists other game data to IndexedDB. This class needs to be renamed `GameSaver`
     * or something like that.
     */
    readonly persistentChunkStore: PersistentChunkStore;
    /**
     * Responsible for generating snark proofs.
     */
    readonly snarkHelper: SnarkArgsHelper;
    /**
     * In debug builds of the game, we can connect to a set of contracts deployed to a local
     * blockchain, which are tweaked to not verify planet hashes, meaning we can use a faster hash
     * function with similar properties to mimc. This allows us to mine the map faster in debug mode.
     *
     * @todo move this into a separate `GameConfiguration` class.
     */
    readonly useMockHash: boolean;
    /**
     * Game parameters set by the contract. Stuff like perlin keys, which are important for mining the
     * correct universe, or the time multiplier, which allows us to tune how quickly voyages go.
     *
     * @todo move this into a separate `GameConfiguration` class.
     */
    readonly contractConstants: ContractConstants;
    paused: boolean;
    /**
     * @todo change this to the correct timestamp each round.
     */
    readonly endTimeSeconds: number;
    /**
     * An interface to the blockchain that is a little bit lower-level than {@link ContractsAPI}. It
     * allows us to do basic operations such as wait for a transaction to complete, check the player's
     * address and balance, etc.
     */
    readonly ethConnection: EthConnection;
    /**
     * Each round we change the hash configuration of the game. The hash configuration is download
     * from the blockchain, and essentially acts as a salt, permuting the universe into a unique
     * configuration for each new round.
     *
     * @todo deduplicate this and `useMockHash` somehow.
     */
    readonly hashConfig: HashConfig;
    /**
     * The aforementioned hash function. In debug mode where `DISABLE_ZK_CHECKS` is on, we use a
     * faster hash function. Othewise, in production mode, use MiMC hash (https://byt3bit.github.io/primesym/).
     */
    readonly planetHashMimc: (...inputs: number[]) => BigInteger;
    /**
     * Whenever we refresh the players twitter accounts or scores, we publish an event here.
     */
    readonly playersUpdated$: Monomitter<void>;
    /**
     * Handle to an interval that periodically uploads diagnostic information from this client.
     */
    diagnosticsInterval: ReturnType<typeof setInterval>;
    /**
     * Handle to an interval that periodically refreshes some information about the player from the
     * blockchain.
     *
     * @todo move this into a new `PlayerState` class.
     */
    playerInterval: ReturnType<typeof setInterval>;
    /**
     * Handle to an interval that periodically refreshes the scoreboard from our webserver.
     */
    scoreboardInterval: ReturnType<typeof setInterval>;
    /**
     * Handle to an interval that periodically refreshes the network's health from our webserver.
     */
    networkHealthInterval: ReturnType<typeof setInterval>;
    /**
     * Manages the process of mining new space territory.
     */
    minerManager?: MinerManager;
    /**
     * Continuously updated value representing the total hashes per second that the game is currently
     * mining the universe at.
     *
     * @todo keep this in {@link MinerManager}
     */
    hashRate: number;
    /**
     * The spawn location of the current player.
     *
     * @todo, make this smarter somehow. It's really annoying to have to import world coordinates, and
     * get them wrong or something. Maybe we need to mark a planet, once it's been initialized
     * contract-side, as the homeworld of the user who initialized on it. That way, when you import a
     * new account into the game, and you import map data that contains your home planet, the client
     * would be able to automatically detect which planet is the player's home planet.
     *
     * @todo move this into a new `PlayerState` class.
     */
    homeLocation: WorldLocation | undefined;
    /**
     * Sometimes the universe gets bigger... Sometimes it doesn't.
     *
     * @todo move this into a new `GameConfiguration` class.
     */
    worldRadius: number;
    /**
     * Emits whenever we load the network health summary from the webserver, which is derived from
     * diagnostics that the client sends up to the webserver as well.
     */
    networkHealth$: Monomitter<NetworkHealthSummary>;
    paused$: Monomitter<boolean>;
    /**
     * Diagnostic information about the game.
     */
    diagnostics: Diagnostics;
    /**
     * Subscription to act on setting changes
     */
    settingsSubscription: Subscription | undefined;
    /**
     * Setting to allow players to start game without plugins that were running during the previous
     * run of the game client. By default, the game launches plugins that were running that were
     * running when the game was last closed.
     */
    safeMode: boolean;
    get planetRarity(): number;
    /**
     * Generates capture zones.
     */
    captureZoneGenerator: CaptureZoneGenerator;
    constructor(terminal: React.MutableRefObject<TerminalHandle | undefined>, account: EthAddress | undefined, players: Map<string, Player>, touchedPlanets: Map<LocationId, Planet>, allTouchedPlanetIds: Set<LocationId>, revealedCoords: Map<LocationId, RevealedCoords>, claimedCoords: Map<LocationId, ClaimedCoords>, worldRadius: number, unprocessedArrivals: Map<VoyageId, QueuedArrival>, unprocessedPlanetArrivalIds: Map<LocationId, VoyageId[]>, contractsAPI: ContractsAPI, contractConstants: ContractConstants, persistentChunkStore: PersistentChunkStore, snarkHelper: SnarkArgsHelper, homeLocation: WorldLocation | undefined, useMockHash: boolean, artifacts: Map<ArtifactId, Artifact>, ethConnection: EthConnection, paused: boolean);
    uploadDiagnostics(): Promise<void>;
    refreshNetworkHealth(): Promise<void>;
    refreshScoreboard(): Promise<void>;
    getEthConnection(): EthConnection;
    destroy(): void;
    static create({ connection, terminal, contractAddress, }: {
        connection: EthConnection;
        terminal: React.MutableRefObject<TerminalHandle | undefined>;
        contractAddress: EthAddress;
    }): Promise<GameManager>;
    hardRefreshPlayer(address?: EthAddress): Promise<void>;
    softRefreshPlanet(planetId: LocationId): Promise<void>;
    hardRefreshPlanet(planetId: LocationId): Promise<void>;
    bulkHardRefreshPlanets(planetIds: LocationId[]): Promise<void>;
    hardRefreshArtifact(artifactId: ArtifactId): Promise<void>;
    onTxSubmit(tx: Transaction): void;
    onTxConfirmed(tx: Transaction): void;
    onTxReverted(tx: Transaction): void;
    onTxCancelled(tx: Transaction): void;
    /**
     * Gets the address of the player logged into this game manager.
     */
    getAccount(): EthAddress | undefined;
    /**
     * Get the thing that handles contract interaction.
     */
    getContractAPI(): ContractsAPI;
    /**
     * Gets the address of the `DarkForest` contract, which is the 'backend' of the game.
     */
    getContractAddress(): EthAddress;
    /**
     * Gets the twitter handle of the given ethereum account which is associated
     * with Dark Forest.
     */
    getTwitter(address: EthAddress | undefined): string | undefined;
    /**
     * The game ends at a particular time in the future - get this time measured
     * in seconds from the epoch.
     */
    getEndTimeSeconds(): number;
    /**
     * Dark Forest tokens can only be minted up to a certain time - get this time measured in seconds from epoch.
     */
    getTokenMintEndTimeSeconds(): number;
    /**
     * Gets the rarity of planets in the universe
     */
    getPlanetRarity(): number;
    /**
     * returns timestamp (seconds) that planet will reach percent% of energycap
     * time may be in the past
     */
    getEnergyCurveAtPercent(planet: Planet, percent: number): number;
    /**
     * returns timestamp (seconds) that planet will reach percent% of silcap if
     * doesn't produce silver, returns undefined if already over percent% of silcap,
     */
    getSilverCurveAtPercent(planet: Planet, percent: number): number | undefined;
    /**
     * Returns the upgrade that would be applied to a planet given a particular
     * upgrade branch (defense, range, speed) and level of upgrade.
     */
    getUpgrade(branch: number, level: number): Upgrade;
    /**
     * Gets a list of all the players in the game (not just the ones you've
     * encounterd)
     */
    getAllPlayers(): Player[];
    /**
     * Gets either the given player, or if no address was provided, gets the player that is logged
     * this client.
     */
    getPlayer(address?: EthAddress): Player | undefined;
    /**
     * Gets all the map chunks that this client is aware of. Chunks may have come from
     * mining, or from importing map data.
     */
    getExploredChunks(): Iterable<Chunk>;
    /**
     * Gets the ids of all the planets that are both within the given bounding box (defined by its bottom
     * left coordinate, width, and height) in the world and of a level that was passed in via the
     * `planetLevels` parameter.
     */
    getPlanetsInWorldRectangle(worldX: number, worldY: number, worldWidth: number, worldHeight: number, levels: number[], planetLevelToRadii: Map<number, Radii>, updateIfStale?: boolean): LocatablePlanet[];
    /**
     * Returns whether or not the current round has ended.
     */
    isRoundOver(): boolean;
    /**
     * Gets the radius of the playable area of the universe.
     */
    getWorldRadius(): number;
    /**
     * Gets the total amount of silver that lives on a planet that somebody owns.
     */
    getWorldSilver(): number;
    /**
     * Gets the total amount of energy that lives on a planet that somebody owns.
     */
    getUniverseTotalEnergy(): number;
    /**
     * Gets the total amount of silver that lives on planets that the given player owns.
     */
    getSilverOfPlayer(player: EthAddress): number;
    /**
     * Gets the total amount of energy that lives on planets that the given player owns.
     */
    getEnergyOfPlayer(player: EthAddress): number;
    getPlayerScore(addr: EthAddress): number | undefined;
    getPlayerSpaceJunk(addr: EthAddress): number | undefined;
    getPlayerSpaceJunkLimit(addr: EthAddress): number | undefined;
    getDefaultSpaceJunkForPlanetLevel(level: number): number;
    initMiningManager(homeCoords: WorldCoords, cores?: number): void;
    /**
     * Sets the mining pattern of the miner. This kills the old miner and starts this one.
     */
    setMiningPattern(pattern: MiningPattern): void;
    /**
     * Gets the mining pattern that the miner is currently using.
     */
    getMiningPattern(): MiningPattern | undefined;
    /**
     * Set the amount of cores to mine the universe with. More cores equals faster!
     */
    setMinerCores(nCores: number): void;
    /**
     * Whether or not the miner is currently exploring space.
     */
    isMining(): boolean;
    /**
     * Changes the amount of move snark proofs that are cached.
     */
    setSnarkCacheSize(size: number): void;
    /**
     * Gets the rectangle bounding the chunk that the miner is currently in the process
     * of hashing.
     */
    getCurrentlyExploringChunk(): Rectangle | undefined;
    /**
     * Whether or not this client has successfully found and landed on a home planet.
     */
    hasJoinedGame(): boolean;
    /**
     * Returns info about the next time you can broadcast coordinates
     */
    getNextRevealCountdownInfo(): RevealCountdownInfo;
    /**
     * gets both deposited artifacts that are on planets i own as well as artifacts i own
     */
    getMyArtifacts(): Artifact[];
    /**
     * Gets the planet that is located at the given coordinates. Returns undefined if not a valid
     * location or if no planet exists at location. If the planet needs to be updated (because
     * some time has passed since we last updated the planet), then updates that planet first.
     */
    getPlanetWithCoords(coords: WorldCoords): LocatablePlanet | undefined;
    /**
     * Gets the planet with the given hash. Returns undefined if the planet is neither in the contract
     * nor has been discovered locally. If the planet needs to be updated (because some time has
     * passed since we last updated the planet), then updates that planet first.
     */
    getPlanetWithId(planetId: LocationId | undefined): Planet | undefined;
    /**
     * Gets a list of planets in the client's memory with the given ids. If a planet with the given id
     * doesn't exist, no entry for that planet will be returned in the result.
     */
    getPlanetsWithIds(planetId: LocationId[]): Planet[];
    getStalePlanetWithId(planetId: LocationId): Planet | undefined;
    /**
     * Get the score of the currently logged-in account.
     */
    getMyScore(): number | undefined;
    /**
     * Gets the artifact with the given id. Null if no artifact with id exists.
     */
    getArtifactWithId(artifactId?: ArtifactId): Artifact | undefined;
    /**
     * Gets the artifacts with the given ids, including ones we know exist but haven't been loaded,
     * represented by `undefined`.
     */
    getArtifactsWithIds(artifactIds?: ArtifactId[]): Array<Artifact | undefined>;
    /**
     * Gets the level of the given planet. Returns undefined if the planet does not exist. Does
     * NOT update the planet if the planet is stale, which means this function is fast.
     */
    getPlanetLevel(planetId: LocationId): PlanetLevel | undefined;
    /**
     * Gets the location of the given planet. Returns undefined if the planet does not exist, or if
     * we do not know the location of this planet NOT update the planet if the planet is stale,
     * which means this function is fast.
     */
    getLocationOfPlanet(planetId: LocationId): WorldLocation | undefined;
    /**
     * Gets all voyages that have not completed.
     */
    getAllVoyages(): QueuedArrival[];
    /**
     * Gets all planets. This means all planets that are in the contract, and also all
     * planets that have been mined locally. Does not update planets if they are stale.
     * NOT PERFORMANT - for scripting only.
     */
    getAllPlanets(): Iterable<Planet>;
    /**
     * Gets a list of planets that have an owner.
     */
    getAllOwnedPlanets(): Planet[];
    /**
     * Gets a list of the planets that the player logged into this `GameManager` owns.
     */
    getMyPlanets(): Planet[];
    /**
     * Gets a map of all location IDs whose coords have been publically revealed
     */
    getRevealedLocations(): Map<LocationId, RevealedLocation>;
    /**
     * Gets a map of all location IDs which have been claimed.
     */
    getClaimedLocations(): Map<LocationId, ClaimedLocation>;
    /**
     * Each coordinate lives in a particular type of space, determined by a smooth random
     * function called 'perlin noise.
     */
    spaceTypeFromPerlin(perlin: number): SpaceType;
    /**
     * Gets the amount of hashes per second that the miner manager is calculating.
     */
    getHashesPerSec(): number;
    /**
     * Signs the given twitter handle with the  key of the current user. Used to
     * verify that the person who owns the Dark Forest account was the one that attempted
     * to link a twitter to their account.
     */
    getSignedTwitter(twitter: string): Promise<string>;
    /**
     * Gets the  key of the burner wallet used by this account.
     */
    getKey(): string | undefined;
    /**
     * Gets the balance of the account measured in Eth (i.e. in full units of the chain).
     */
    getMyBalanceEth(): number;
    /**
     * Gets the balance of the account
     */
    getMyBalance(): BigNumber;
    /**
     * Returns the monomitter which publishes events whenever the player's balance changes.
     */
    getMyBalance$(): Monomitter<BigNumber>;
    /**
     * Gets all moves that this client has queued to be uploaded to the contract, but
     * have not been successfully confirmed yet.
     */
    getUnconfirmedMoves(): Transaction<UnconfirmedMove>[];
    /**
     * Gets all upgrades that this client has queued to be uploaded to the contract, but
     * have not been successfully confirmed yet.
     */
    getUnconfirmedUpgrades(): Transaction<UnconfirmedUpgrade>[];
    getUnconfirmedWormholeActivations(): Transaction<UnconfirmedActivateArtifact>[];
    /**
     * Gets the location of your home planet.
     */
    getHomeCoords(): WorldCoords | undefined;
    /**
     * Gets the hash of the location of your home planet.
     */
    getHomeHash(): LocationId | undefined;
    /**
     * Gets the HASH CONFIG
     */
    getHashConfig(): HashConfig;
    /**
     * Whether or not the given rectangle has been mined.
     */
    hasMinedChunk(chunkLocation: Rectangle): boolean;
    getChunk(chunkFootprint: Rectangle): Chunk | undefined;
    getChunkStore(): PersistentChunkStore;
    /**
     * The perlin value at each coordinate determines the space type. There are four space
     * types, which means there are four ranges on the number line that correspond to
     * each space type. This function returns the boundary values between each of these
     * four ranges: `PERLIN_THRESHOLD_1`, `PERLIN_THRESHOLD_2`, `PERLIN_THRESHOLD_3`.
     */
    getPerlinThresholds(): [number, number, number];
    /**
     * Starts the miner.
     */
    startExplore(): void;
    /**
     * Stops the miner.
     */
    stopExplore(): void;
    setRadius(worldRadius: number): void;
    refreshTwitters(): Promise<void>;
    setPlayerTwitters(twitters: AddressTwitterMap): void;
    /**
     * Once you have posted the verification tweet - complete the twitter-account-linking
     * process by telling the Dark Forest webserver to look at that tweet.
     */
    submitVerifyTwitter(twitter: string): Promise<boolean>;
    checkGameHasEnded(): boolean;
    /**
     * Gets the timestamp (ms) of the next time that we can broadcast the coordinates of a planet.
     */
    getNextBroadcastAvailableTimestamp(): number;
    /**
     * Gets the amount of time (ms) until the next time the current player can broadcast a planet.
     */
    timeUntilNextBroadcastAvailable(): number;
    /**
     * Gets the timestamp (ms) of the next time that we can claim a planet.
     */
    getNextClaimAvailableTimestamp(): number;
    getCaptureZones(): Set<import("@darkforest_eth/types").CaptureZone>;
    /**
     * Reveals a planet's location on-chain.
     */
    revealLocation(planetId: LocationId): Promise<Transaction<UnconfirmedReveal>>;
    invadePlanet(locationId: LocationId): Promise<Transaction<UnconfirmedInvadePlanet>>;
    capturePlanet(locationId: LocationId): Promise<Transaction<UnconfirmedCapturePlanet>>;
    /**
     * Attempts to join the game. Should not be called once you've already joined.
     */
    joinGame(beforeRetry: (e: Error) => Promise<boolean>): Promise<void>;
    getSpaceships(): Promise<void>;
    /**
     *
     * computes the WorldLocation object corresponding to a set of coordinates
     * very slow since it actually calculates the hash; do not use in render loop
     */
    locationFromCoords(coords: WorldCoords): WorldLocation;
    /**
     * Initializes a new player's game to start at the given home planet. Must have already
     * initialized the player on the contract.
     */
    addAccount(coords: WorldCoords): Promise<boolean>;
    findRandomHomePlanet(): Promise<LocatablePlanet>;
    prospectPlanet(planetId: LocationId, bypassChecks?: boolean): Promise<Transaction<UnconfirmedProspectPlanet>>;
    /**
     * Calls the contract to find an artifact on the given planet.
     */
    findArtifact(planetId: LocationId, bypassChecks?: boolean): Promise<Transaction<UnconfirmedFindArtifact>>;
    getContractConstants(): ContractConstants;
    /**
     * Submits a transaction to the blockchain to deposit an artifact on a given planet.
     * You must own the planet and you must own the artifact directly (can't be locked in contract)
     */
    depositArtifact(locationId: LocationId, artifactId: ArtifactId): Promise<Transaction<UnconfirmedDepositArtifact>>;
    /**
     * Withdraws the artifact that is locked up on the given planet.
     */
    withdrawArtifact(locationId: LocationId, artifactId: ArtifactId, bypassChecks?: boolean): Promise<Transaction<UnconfirmedWithdrawArtifact>>;
    activateArtifact(locationId: LocationId, artifactId: ArtifactId, wormholeTo: LocationId | undefined, bypassChecks?: boolean): Promise<Transaction<UnconfirmedActivateArtifact>>;
    deactivateArtifact(locationId: LocationId, artifactId: ArtifactId, bypassChecks?: boolean): Promise<Transaction<UnconfirmedDeactivateArtifact>>;
    withdrawSilver(locationId: LocationId, amount: number, bypassChecks?: boolean): Promise<Transaction<UnconfirmedWithdrawSilver>>;
    /**
     * We have two locations which planet state can live: on the server, and on the blockchain. We use
     * the blockchain for the 'physics' of the universe, and the webserver for optional 'add-on'
     * features, which are cryptographically secure, but live off-chain.
     *
     * This function loads the planet states which live on the server. Plays nicely with our
     * notifications system and sets the appropriate loading state values on the planet.
     */
    refreshServerPlanetStates(planetIds: LocationId[]): Promise<void>;
    /**
     * If you are the owner of this planet, you can set an 'emoji' to hover above the planet.
     * `emojiStr` must be a string that contains a single emoji, otherwise this function will throw an
     * error.
     *
     * The emoji is stored off-chain in a postgres database. We verify planet ownership via a contract
     * call from the webserver, and by verifying that the request to add (or remove) an emoji from a
     * planet was signed by the owner.
     */
    setPlanetEmoji(locationId: LocationId, emojiStr: string): Promise<void>;
    /**
     * If you are the owner of this planet, you can delete the emoji that is hovering above the
     * planet.
     */
    clearEmoji(locationId: LocationId): Promise<void>;
    submitDisconnectTwitter(twitter: string): Promise<void>;
    /**
     * The planet emoji feature is built on top of a more general 'Planet Message' system, which
     * allows players to upload pieces of data called 'Message's to planets that they own. Emojis are
     * just one type of message. Their implementation leaves the door open to more off-chain data.
     */
    submitPlanetMessage(locationId: LocationId, type: PlanetMessageType, body: unknown): Promise<void>;
    /**
     * Checks that a message signed by {@link GameManager#signMessage} was signed by the address that
     * it claims it was signed by.
     */
    verifyMessage(message: SignedMessage<unknown>): Promise<boolean>;
    /**
     * Submits a transaction to the blockchain to move the given amount of resources from
     * the given planet to the given planet.
     */
    move(from: LocationId, to: LocationId, forces: number, silver: number, artifactMoved?: ArtifactId, abandoning?: boolean, bypassChecks?: boolean): Promise<Transaction<UnconfirmedMove>>;
    /**
     * Submits a transaction to the blockchain to upgrade the given planet with the given
     * upgrade branch. You must own the planet, and have enough silver on it to complete
     * the upgrade.
     */
    upgrade(planetId: LocationId, branch: number, _bypassChecks?: boolean): Promise<Transaction<UnconfirmedUpgrade>>;
    /**
     * Submits a transaction to the blockchain to buy a hat for the given planet. You must own the
     * planet. Warning costs real xdai. Hats are permanently locked to a planet. They are purely
     * cosmetic and a great way to BM your opponents or just look your best. Just like in the real
     * world, more money means more hat.
     */
    buyHat(planetId: LocationId, _bypassChecks?: boolean): Promise<Transaction<UnconfirmedBuyHat>>;
    transferOwnership(planetId: LocationId, newOwner: EthAddress, bypassChecks?: boolean): Promise<Transaction<UnconfirmedPlanetTransfer>>;
    /**
     * Makes this game manager aware of a new chunk - which includes its location, size,
     * as well as all of the planets contained in that chunk. Causes the client to load
     * all of the information about those planets from the blockchain.
     */
    addNewChunk(chunk: Chunk): GameManager;
    listenForNewBlock(): void;
    /**
     * To add multiple chunks at once, use this function rather than `addNewChunk`, in order
     * to load all of the associated planet data in an efficient manner.
     */
    bulkAddNewChunks(chunks: Chunk[]): Promise<void>;
    /**
     * Gets the maximuim distance that you can send your energy from the given planet,
     * using the given percentage of that planet's current silver.
     */
    getMaxMoveDist(planetId: LocationId, sendingPercent: number): number;
    /**
     * Gets the distance between two planets. Throws an exception if you don't
     * know the location of either planet. Takes into account wormholes.
     */
    getDist(fromId: LocationId, toId: LocationId): number;
    /**
     * Gets the distance between two coordinates in space.
     */
    getDistCoords(fromCoords: WorldCoords, toCoords: WorldCoords): number;
    /**
     * Gets all the planets that you can reach with at least 1 energy from
     * the given planet. Does not take into account wormholes.
     */
    getPlanetsInRange(planetId: LocationId, sendingPercent: number): Planet[];
    /**
     * Gets the amount of energy needed in order for a voyage from the given to the given
     * planet to arrive with your desired amount of energy.
     */
    getEnergyNeededForMove(fromId: LocationId, toId: LocationId, arrivingEnergy: number, abandoning?: boolean): number;
    /**
     * Gets the amount of energy that would arrive if a voyage with the given parameters
     * was to occur. The toPlanet is optional, in case you want an estimate that doesn't include
     * wormhole speedups.
     */
    getEnergyArrivingForMove(fromId: LocationId, toId: LocationId | undefined, distance: number | undefined, sentEnergy: number, abandoning?: boolean): number;
    /**
     * Gets the active artifact on this planet, if one exists.
     */
    getActiveArtifact(planet: Planet): Artifact | undefined;
    /**
     * If there's an active artifact on either of these planets which happens to be a wormhole which
     * is active and targetting the other planet, return the wormhole boost which is greater. Values
     * represent a multiplier.
     */
    getWormholeFactors(fromPlanet: Planet, toPlanet: Planet): {
        distanceFactor: number;
        speedFactor: number;
    } | undefined;
    /**
     * Gets the amount of time, in seconds that a voyage between from the first to the
     * second planet would take.
     */
    getTimeForMove(fromId: LocationId, toId: LocationId, abandoning?: boolean): number;
    /**
     * Gets the temperature of a given location.
     */
    getTemperature(coords: WorldCoords): number;
    /**
     * Load the serialized versions of all the plugins that this player has.
     */
    loadPlugins(): Promise<SerializedPlugin[]>;
    /**
     * Overwrites all the saved plugins to equal the given array of plugins.
     */
    savePlugins(savedPlugins: SerializedPlugin[]): Promise<void>;
    /**
     * Whether or not the given planet is capable of minting an artifact.
     */
    isPlanetMineable(p: Planet): boolean;
    /**
     * Returns constructors of classes that may be useful for developing plugins.
     */
    getConstructors(): {
        MinerManager: typeof MinerManager;
        SpiralPattern: typeof SpiralPattern;
        SwissCheesePattern: typeof SwissCheesePattern;
        TowardsCenterPattern: typeof TowardsCenterPattern;
        TowardsCenterPatternV2: typeof TowardsCenterPatternV2;
    };
    /**
     * Gets the perlin value at the given location in the world. SpaceType is based
     * on this value.
     */
    spaceTypePerlin(coords: WorldCoords, floor: boolean): number;
    /**
     * Gets the biome perlin valie at the given location in the world.
     */
    biomebasePerlin(coords: WorldCoords, floor: boolean): number;
    /**
     * Helpful for listening to user input events.
     */
    getUIEventEmitter(): UIEmitter;
    getCaptureZoneGenerator(): CaptureZoneGenerator;
    /**
     * Emits when new capture zones are generated.
     */
    get captureZoneGeneratedEmitter(): Monomitter<import("./CaptureZoneGenerator").CaptureZonesGeneratedEvent>;
    getNotificationsManager(): NotificationManager;
    getWormholes(): Iterable<Wormhole>;
    /** Return a reference to the planet map */
    getPlanetMap(): Map<LocationId, Planet>;
    /** Return a reference to the artifact map */
    getArtifactMap(): Map<ArtifactId, Artifact>;
    /** Return a reference to the map of my planets */
    getMyPlanetMap(): Map<LocationId, Planet>;
    /** Return a reference to the map of my artifacts */
    getMyArtifactMap(): Map<ArtifactId, Artifact>;
    getPlanetUpdated$(): Monomitter<LocationId>;
    getArtifactUpdated$(): Monomitter<ArtifactId>;
    getMyPlanetsUpdated$(): Monomitter<Map<LocationId, Planet>>;
    getMyArtifactsUpdated$(): Monomitter<Map<ArtifactId, Artifact>>;
    /**
     * Returns an instance of a `Contract` from the ethersjs library. This is the library we use to
     * connect to the blockchain. For documentation about how `Contract` works, see:
     * https://docs.ethers.io/v5/api/contract/contract/
     *
     * Also, registers your contract in the system to make calls against it and to reload it when
     * necessary (such as the RPC endpoint changing).
     */
    loadContract<T extends Contract>(contractAddress: string, contractABI: ContractInterface): Promise<T>;
    testNotification(): void;
    /**
     * Gets a reference to the game's internal representation of the world state. This includes
     * voyages, planets, artifacts, and active wormholes,
     */
    getGameObjects(): GameObjects;
    forceTick(locationId: LocationId): void;
    /**
     * Gets some diagnostic information about the game. Returns a copy, you can't modify it.
     */
    getDiagnostics(): Diagnostics;
    /**
     * Updates the diagnostic info of the game using the supplied function. Ideally, each spot in the
     * codebase that would like to record a metric is able to update its specific metric in a
     * convenient manner.
     */
    updateDiagnostics(updateFn: (d: Diagnostics) => void): void;
    /**
     * Listen for changes to a planet take action,
     * eg.
     * waitForPlanet("yourAsteroidId", ({current}) => current.silverCap / current.silver > 90)
     * .then(() => {
     *  // Send Silver to nearby planet
     * })
     *
     * @param locationId A locationId to watch for updates
     * @param predicate a function that accepts a Diff and should return a truth-y value, value will be passed to promise.resolve()
     * @returns a promise that will resolve with results returned from the predicate function
     */
    waitForPlanet<T>(locationId: LocationId, predicate: ({ current, previous }: Diff<Planet>) => T | undefined): Promise<T>;
    getSafeMode(): boolean;
    setSafeMode(safeMode: boolean): void;
    getAddress(): EthAddress | undefined;
    isAdmin(): boolean;
    /**
     * Right now the only buffs supported in this way are
     * speed/range buffs from Abandoning a planet.
     *
     * The abandoning argument is used when interacting with
     * this function programmatically.
     */
    getSpeedBuff(abandoning: boolean): number;
    getRangeBuff(abandoning: boolean): number;
    getSnarkHelper(): SnarkArgsHelper;
    submitTransaction<T extends TxIntent>(txIntent: T, overrides?: providers.TransactionRequest): Promise<Transaction<T>>;
    getContract(): DarkForest;
    getPaused(): boolean;
    getPaused$(): Monomitter<boolean>;
}
export default GameManager;
