import { Planet } from '@darkforest_eth/types';
import { DarkForestIcon } from '@darkforest_eth/ui';
import React from 'react';
import { StatIdx } from '../../_types/global/GlobalTypes';
export declare const Icon: React.ForwardRefExoticComponent<Partial<Omit<DarkForestIcon, "children">> & {} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export { IconType } from '@darkforest_eth/ui';
export declare const RankIcon: ({ planet }: {
    planet: Planet | undefined;
}) => JSX.Element;
export declare const BranchIcon: ({ branch }: {
    branch: number;
}) => JSX.Element;
export declare const StatIcon: ({ stat }: {
    stat: StatIdx;
}) => JSX.Element;
/**
 Allow for tweaking the size of an icon based on the context.
 Biome & Spacetype Notifications should fill the notification box
 Others should be 3/4's the size and centered
*/
interface AlertIcon {
    height?: string;
    width?: string;
}
export declare const Quasar: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundRuins: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundSpacetimeRip: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundSilver: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundTradingPost: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundSpace: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundDeepSpace: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundDeadSpace: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundPirates: ({ height, width }: AlertIcon) => JSX.Element;
export declare const Generic: ({ height, width }: AlertIcon) => JSX.Element;
export declare const ArtifactFound: ({ height, width }: AlertIcon) => JSX.Element;
export declare const ArtifactProspected: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundOcean: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundForest: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundGrassland: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundTundra: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundSwamp: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundDesert: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundIce: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundWasteland: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundLava: ({ height, width }: AlertIcon) => JSX.Element;
export declare const FoundCorrupted: ({ height, width }: AlertIcon) => JSX.Element;
export declare const PlanetAttacked: ({ height, width }: AlertIcon) => JSX.Element;
export declare const PlanetLost: ({ height, width }: AlertIcon) => JSX.Element;
export declare const PlanetConquered: ({ height, width }: AlertIcon) => JSX.Element;
export declare const MetPlayer: ({ height, width }: AlertIcon) => JSX.Element;
export declare const TxAccepted: ({ height, width }: AlertIcon) => JSX.Element;
export declare const TxConfirmed: ({ height, width }: AlertIcon) => JSX.Element;
export declare const TxInitialized: ({ height, width }: AlertIcon) => JSX.Element;
export declare const TxDeclined: ({ height, width }: AlertIcon) => JSX.Element;
