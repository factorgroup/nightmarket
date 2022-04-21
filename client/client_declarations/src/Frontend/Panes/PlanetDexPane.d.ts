/// <reference types="react" />
import { Planet } from '@darkforest_eth/types';
export declare function PlanetThumb({ planet }: {
    planet: Planet;
}): JSX.Element;
export declare function PlanetDexPane({ visible, onClose }: {
    visible: boolean;
    onClose: () => void;
}): JSX.Element;
