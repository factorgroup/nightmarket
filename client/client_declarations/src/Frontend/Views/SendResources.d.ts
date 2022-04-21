/// <reference types="react" />
import { Planet } from '@darkforest_eth/types';
import { Wrapper } from '../../Backend/Utils/Wrapper';
export declare function SendResources({ planetWrapper: p, onToggleSendForces, onToggleAbandon, }: {
    planetWrapper: Wrapper<Planet | undefined>;
    onToggleSendForces: () => void;
    onToggleAbandon: () => void;
}): JSX.Element;
