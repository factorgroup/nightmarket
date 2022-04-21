import { LocatablePlanet, Planet } from '@darkforest_eth/types';
export declare function StatText({ planet, getStat, }: {
    planet: Planet | undefined;
    getStat: (p: Planet) => number;
}): JSX.Element;
export declare const SilverText: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const SilverCapText: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const EnergyText: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const EnergyCapText: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare function PlanetEnergyLabel({ planet }: {
    planet: Planet | undefined;
}): JSX.Element;
export declare function PlanetSilverLabel({ planet }: {
    planet: Planet | undefined;
}): JSX.Element;
export declare const DefenseText: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const RangeText: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const SpeedText: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const EnergyGrowthText: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const SilverGrowthText: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const PlanetLevelText: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const PlanetRankText: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const LevelRankText: ({ planet, delim, }: {
    planet: Planet | undefined;
    delim?: string | undefined;
}) => JSX.Element;
export declare const LevelRankTextEm: ({ planet, delim, }: {
    planet: Planet | undefined;
    delim?: string | undefined;
}) => JSX.Element;
export declare const BiomeLabel: ({ planet }: {
    planet: LocatablePlanet;
}) => JSX.Element;
export declare const OptionalBiomeLabel: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const PlanetTypeLabel: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const PlanetBiomeTypeLabel: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare function PlanetOwnerLabel({ planet, showYours, color, }: {
    planet: Planet | undefined;
    showYours?: boolean;
    color?: boolean;
}): JSX.Element;
