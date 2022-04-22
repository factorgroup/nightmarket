import { Player, QueuedArrival } from '@darkforest_eth/types';
import Renderer from '../Renderer';
export default class VoyageRenderer {
    renderer: Renderer;
    constructor(renderer: Renderer);
    drawFleet(voyage: QueuedArrival, _player: Player | undefined): void;
    queueVoyages(): void;
    private drawVoyagePath;
}
