import Renderer from '../Renderer';
export declare class WormholeRenderer {
    renderer: Renderer;
    constructor(renderer: Renderer);
    queueWormholes(): void;
    private drawVoyagePath;
}
