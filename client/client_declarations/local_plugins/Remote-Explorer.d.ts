import type MinerManager from "../src/Backend/Miner/MinerManager";
declare type ExtendedMinerManager = MinerManager & {
    url: string;
    id: number;
    chunkSize: number;
    patternType: string;
};
declare class RemoteExplorerPlugin implements DFPlugin {
    miners: ExtendedMinerManager[];
    id: number;
    constructor();
    addMiner: (url: string, patternType?: string, chunkSize?: number) => ExtendedMinerManager[];
    removeMiner: (miner: ExtendedMinerManager) => ExtendedMinerManager[];
    render(container: HTMLDivElement): Promise<void>;
    destroy(): void;
}
export default RemoteExplorerPlugin;
