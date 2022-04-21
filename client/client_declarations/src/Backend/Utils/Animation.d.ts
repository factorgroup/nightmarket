import { DFAnimation, DFStatefulAnimation, PlanetLevel } from '@darkforest_eth/types';
export declare function sinusoidalAnimation(rps: number): DFAnimation;
export declare function easeInAnimation(durationMs: number, delayMs?: number): DFAnimation;
export declare function emojiEaseOutAnimation(durationMs: number, emoji: string): DFStatefulAnimation<string>;
export declare function constantAnimation(constant: number): DFAnimation;
export declare function planetLevelToAnimationSpeed(level: PlanetLevel): number;
