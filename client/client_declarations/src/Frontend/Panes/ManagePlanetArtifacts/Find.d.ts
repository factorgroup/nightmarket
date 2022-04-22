import { Planet } from '@darkforest_eth/types';
export declare function Find({ find, isFinding, currentBlockNumber, planet, roundOver, }: {
    find: () => void;
    isFinding: boolean;
    currentBlockNumber: number | undefined;
    planet: Planet;
    roundOver: boolean;
}): JSX.Element;
