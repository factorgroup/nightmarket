import { Planet } from '@darkforest_eth/types';
import React from 'react';
export declare function StatText({ planet, getStat, style, buff, }: {
    planet: Planet | undefined;
    getStat: (p: Planet) => number;
    style?: React.CSSProperties;
    buff?: number;
}): JSX.Element;
export declare function GrowthText({ planet, getStat, style, }: {
    planet: Planet | undefined;
    getStat: (p: Planet) => number;
    style?: React.CSSProperties;
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
export declare const RangeText: ({ planet, buff }: {
    planet: Planet | undefined;
    buff?: number | undefined;
}) => JSX.Element;
export declare const JunkText: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const SpeedText: ({ planet, buff }: {
    planet: Planet | undefined;
    buff?: number | undefined;
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
export declare const PlanetTypeLabelAnim: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const PlanetBiomeTypeLabelAnim: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const PlanetLevel: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const PlanetRank: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
/**
 * Either 'yours' in green text,
 */
export declare function PlanetOwnerLabel({ planet, abbreviateOwnAddress, colorWithOwnerColor, }: {
    planet: Planet | undefined;
    abbreviateOwnAddress?: boolean;
    colorWithOwnerColor?: boolean;
}): JSX.Element;
