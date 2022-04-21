/// <reference types="react" />
import { Planet } from '@darkforest_eth/types';
import { Wrapper } from '../../Backend/Utils/Wrapper';
export declare function PlanetCardTitle({ planet, small, }: {
    planet: Wrapper<Planet | undefined>;
    small?: boolean;
}): JSX.Element;
/** Preview basic planet information - used in `PlanetContextPane` and `HoverPlanetPane` */
export declare function PlanetCard({ planetWrapper: p, standalone, }: {
    planetWrapper: Wrapper<Planet | undefined>;
    standalone?: boolean;
}): JSX.Element;
