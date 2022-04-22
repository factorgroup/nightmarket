import { EthAddress, Planet } from '@darkforest_eth/types';
import { ModalHook } from '../Views/ModalPane';
declare type ScoreboardEntry = {
    playerId: EthAddress;
    twitter?: string;
    score: number;
    topPlanets: Planet[];
};
export declare function calculateRankAndScore(scoreboard: ScoreboardEntry[], account: EthAddress): [number, number];
export declare function LeaderboardPane({ hook }: {
    hook: ModalHook;
}): JSX.Element;
export {};
