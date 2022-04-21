import { WorldCoords } from '@darkforest_eth/types';
import Viewport from './Viewport';
export declare class ViewportAnimation {
    readonly timeStarted: number;
    readonly coordsStart: WorldCoords;
    readonly coordsEnd: WorldCoords;
    readonly heightStart: number;
    readonly heightEnd: number;
    readonly durationMs: number;
    constructor(timeStarted: number, coordsStart: WorldCoords, coordsEnd: WorldCoords, heightStart: number, heightEnd: number, durationMs: number);
    static between(timeStarted: number, from: WorldCoords, to: WorldCoords, heightStart: number, heightEnd: number): ViewportAnimation;
    apply(percent: number, viewport: Viewport): void;
}
export declare class AnimationManager {
    private currentAnimation?;
    stopCurrentAnimation(): void;
    replaceAnimation(animation: ViewportAnimation): void;
}
