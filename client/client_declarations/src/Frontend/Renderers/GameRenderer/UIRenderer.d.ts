import Renderer from './Renderer';
export declare class UIRenderer {
    renderer: Renderer;
    constructor(renderer: Renderer);
    queueBorders(): void;
    queueMousePath(): void;
    private queueRectAtPlanet;
    queueSelectedRect(): void;
    queueHoveringRect(): void;
    drawMiner(): void;
    queueSelectedRangeRing(): void;
}
