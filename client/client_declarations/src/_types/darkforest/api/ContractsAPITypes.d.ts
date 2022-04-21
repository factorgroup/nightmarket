import { ArtifactPointValues, EthAddress, UpgradeBranches } from '@darkforest_eth/types';
import { BigNumber as EthersBN } from 'ethers';
export declare const enum ZKArgIdx {
    PROOF_A = 0,
    PROOF_B = 1,
    PROOF_C = 2,
    DATA = 3
}
export declare const enum InitArgIdxs {
    LOCATION_ID = 0,
    PERLIN = 1,
    RADIUS = 2,
    PLANETHASH_KEY = 3,
    SPACETYPE_KEY = 4,
    PERLIN_LENGTH_SCALE = 5,
    PERLIN_MIRROR_X = 6,
    PERLIN_MIRROR_Y = 7
}
export declare const enum MoveArgIdxs {
    FROM_ID = 0,
    TO_ID = 1,
    TO_PERLIN = 2,
    TO_RADIUS = 3,
    DIST_MAX = 4,
    PLANETHASH_KEY = 5,
    SPACETYPE_KEY = 6,
    PERLIN_LENGTH_SCALE = 7,
    PERLIN_MIRROR_X = 8,
    PERLIN_MIRROR_Y = 9,
    SHIPS_SENT = 10,
    SILVER_SENT = 11,
    ARTIFACT_SENT = 12
}
export declare const enum UpgradeArgIdxs {
    LOCATION_ID = 0,
    UPGRADE_BRANCH = 1
}
export declare const enum ContractEvent {
    PlayerInitialized = "PlayerInitialized",
    ArrivalQueued = "ArrivalQueued",
    PlanetUpgraded = "PlanetUpgraded",
    PlanetHatBought = "PlanetHatBought",
    PlanetTransferred = "PlanetTransferred",
    PlanetInvaded = "PlanetInvaded",
    PlanetCaptured = "PlanetCaptured",
    LocationRevealed = "LocationRevealed",
    ArtifactFound = "ArtifactFound",
    ArtifactDeposited = "ArtifactDeposited",
    ArtifactWithdrawn = "ArtifactWithdrawn",
    ArtifactActivated = "ArtifactActivated",
    ArtifactDeactivated = "ArtifactDeactivated",
    PlanetSilverWithdrawn = "PlanetSilverWithdrawn",
    AdminOwnershipChanged = "AdminOwnershipChanged",
    PauseStateChanged = "PauseStateChanged",
    LobbyCreated = "LobbyCreated"
}
export declare const enum ContractsAPIEvent {
    PlayerUpdate = "PlayerUpdate",
    PlanetUpdate = "PlanetUpdate",
    PauseStateChanged = "PauseStateChanged",
    ArrivalQueued = "ArrivalQueued",
    ArtifactUpdate = "ArtifactUpdate",
    RadiusUpdated = "RadiusUpdated",
    LocationRevealed = "LocationRevealed",
    /**
     * The transaction has been queued for future execution.
     */
    TxQueued = "TxQueued",
    /**
     * The transaction has been removed from the queue and is
     * calculating arguments in preparation for submission.
     */
    TxProcessing = "TxProcessing",
    /**
     * The transaction is queued, but is prioritized for execution
     * above other queued transactions.
     */
    TxPrioritized = "TxPrioritized",
    /**
     * The transaction has been submitted and we are awaiting
     * confirmation.
     */
    TxSubmitted = "TxSubmitted",
    /**
     * The transaction has been confirmed.
     */
    TxConfirmed = "TxConfirmed",
    /**
     * The transaction has failed for some reason. This
     * could either be a revert or a purely client side
     * error. In the case of a revert, the transaction hash
     * will be included in the transaction object.
     */
    TxErrored = "TxErrored",
    /**
     * The transaction was cancelled before it left the queue.
     */
    TxCancelled = "TxCancelled",
    PlanetTransferred = "PlanetTransferred",
    PlanetClaimed = "PlanetClaimed",
    LobbyCreated = "LobbyCreated"
}
export declare type UpgradeArgs = [string, string];
export declare type MoveArgs = [
    [
        string,
        string
    ],
    [
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ],
    [
        string,
        string
    ],
    [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
    ]
];
export declare type ClaimArgs = [
    [
        string,
        string
    ],
    [
        [string, string],
        [string, string]
    ],
    [
        string,
        string
    ],
    [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
    ]
];
export declare type DepositArtifactArgs = [string, string];
export declare type WithdrawArtifactArgs = [string, string];
export declare type PlanetTypeWeights = [number, number, number, number, number];
export declare type PlanetTypeWeightsByLevel = [
    PlanetTypeWeights,
    PlanetTypeWeights,
    PlanetTypeWeights,
    PlanetTypeWeights,
    PlanetTypeWeights,
    PlanetTypeWeights,
    PlanetTypeWeights,
    PlanetTypeWeights,
    PlanetTypeWeights,
    PlanetTypeWeights
];
export declare type PlanetTypeWeightsBySpaceType = [
    PlanetTypeWeightsByLevel,
    PlanetTypeWeightsByLevel,
    PlanetTypeWeightsByLevel,
    PlanetTypeWeightsByLevel
];
export interface ContractConstants {
    ADMIN_CAN_ADD_PLANETS: boolean;
    WORLD_RADIUS_LOCKED: boolean;
    WORLD_RADIUS_MIN: number;
    DISABLE_ZK_CHECKS: boolean;
    PLANETHASH_KEY: number;
    SPACETYPE_KEY: number;
    BIOMEBASE_KEY: number;
    PERLIN_LENGTH_SCALE: number;
    PERLIN_MIRROR_X: boolean;
    PERLIN_MIRROR_Y: boolean;
    TOKEN_MINT_END_SECONDS: number;
    MAX_NATURAL_PLANET_LEVEL: number;
    TIME_FACTOR_HUNDREDTHS: number;
    /**
     * The perlin value at each coordinate determines the space type. There are four space
     * types, which means there are four ranges on the number line that correspond to
     * each space type. This function returns the boundary values between each of these
     * four ranges: `PERLIN_THRESHOLD_1`, `PERLIN_THRESHOLD_2`, `PERLIN_THRESHOLD_3`.
     */
    PERLIN_THRESHOLD_1: number;
    PERLIN_THRESHOLD_2: number;
    PERLIN_THRESHOLD_3: number;
    INIT_PERLIN_MIN: number;
    INIT_PERLIN_MAX: number;
    SPAWN_RIM_AREA: number;
    BIOME_THRESHOLD_1: number;
    BIOME_THRESHOLD_2: number;
    PLANET_RARITY: number;
    /**
       The chance for a planet to be a specific level.
       Each index corresponds to a planet level (index 5 is level 5 planet).
       The lower the number the lower the chance.
       Note: This does not control if a planet spawns or not, just the level
       when it spawns.
     */
    PLANET_LEVEL_THRESHOLDS: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
    PLANET_TRANSFER_ENABLED: boolean;
    PLANET_TYPE_WEIGHTS: PlanetTypeWeightsBySpaceType;
    ARTIFACT_POINT_VALUES: ArtifactPointValues;
    /**
     * How much score silver gives when withdrawing.
     * Expressed as a percentage integer.
     * (100 is 100%)
     */
    SILVER_SCORE_VALUE: number;
    SPACE_JUNK_ENABLED: boolean;
    /**
       Total amount of space junk a player can take on.
       This can be overridden at runtime by updating
       this value for a specific player in storage.
     */
    SPACE_JUNK_LIMIT: number;
    /**
       The amount of junk that each level of planet
       gives the player when moving to it for the
       first time.
     */
    PLANET_LEVEL_JUNK: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
    /**
       The speed boost a movement receives when abandoning
       a planet.
     */
    ABANDON_SPEED_CHANGE_PERCENT: number;
    /**
       The range boost a movement receives when abandoning
       a planet.
     */
    ABANDON_RANGE_CHANGE_PERCENT: number;
    PHOTOID_ACTIVATION_DELAY: number;
    LOCATION_REVEAL_COOLDOWN: number;
    CLAIM_PLANET_COOLDOWN?: number;
    defaultPopulationCap: number[];
    defaultPopulationGrowth: number[];
    defaultSilverCap: number[];
    defaultSilverGrowth: number[];
    defaultRange: number[];
    defaultSpeed: number[];
    defaultDefense: number[];
    defaultBarbarianPercentage: number[];
    planetLevelThresholds: number[];
    planetCumulativeRarities: number[];
    upgrades: UpgradeBranches;
    adminAddress: EthAddress;
    GAME_START_BLOCK: number;
    CAPTURE_ZONES_ENABLED: boolean;
    CAPTURE_ZONE_COUNT: number;
    CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL: number;
    CAPTURE_ZONE_RADIUS: number;
    CAPTURE_ZONE_PLANET_LEVEL_SCORE: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
    CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED: number;
    CAPTURE_ZONES_PER_5000_WORLD_RADIUS: number;
}
export declare type ClientMockchainData = null | undefined | number | string | boolean | EthersBN | ClientMockchainData[] | {
    [key in string | number]: ClientMockchainData;
};
export declare const enum PlanetEventType {
    ARRIVAL = 0
}
