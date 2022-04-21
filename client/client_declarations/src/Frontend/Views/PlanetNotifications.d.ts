/// <reference types="react" />
import { EthAddress, Planet } from '@darkforest_eth/types';
import { Wrapper } from '../../Backend/Utils/Wrapper';
export declare const enum PlanetNotifType {
    PlanetCanUpgrade = 0,
    Claimed = 1,
    DistanceFromCenter = 2,
    CanAddEmoji = 3
}
export declare function getNotifsForPlanet(planet: Planet | undefined, account: EthAddress | undefined): PlanetNotifType[];
export declare const DistanceFromCenterRow: ({ planet }: {
    planet: Wrapper<Planet | undefined>;
}) => JSX.Element;
export declare const PlanetClaimedRow: ({ planet }: {
    planet: Wrapper<Planet | undefined>;
}) => JSX.Element;
export declare function PlanetNotifications({ notifs, planet, }: {
    notifs: PlanetNotifType[];
    planet: Wrapper<Planet | undefined>;
}): JSX.Element;
