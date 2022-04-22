/// <reference types="react" />
import { BiomebaseSnarkContractCallArgs, BiomebaseSnarkInput, InitSnarkContractCallArgs, InitSnarkInput, MoveSnarkContractCallArgs, MoveSnarkInput, RevealSnarkContractCallArgs, RevealSnarkInput, SnarkJSProofAndSignals } from "@darkforest_eth/snarks";
import { PerlinConfig } from "@darkforest_eth/types";
import { BigInteger } from "big-integer";
import FastQueue from "fastq";
import { LRUMap } from "mnemonist";
import { TerminalHandle } from "../../Frontend/Views/Terminal";
import { HashConfig } from "../../_types/global/GlobalTypes";
declare type ZKPTask = {
    taskId: number;
    input: unknown;
    circuit: string;
    zkey: string;
    onSuccess: (proof: SnarkJSProofAndSignals) => void;
    onError: (e: Error) => void;
};
declare type SnarkInput = RevealSnarkInput | InitSnarkInput | MoveSnarkInput | BiomebaseSnarkInput;
declare class SnarkProverQueue {
    taskQueue: FastQueue.queue;
    taskCount: number;
    constructor();
    doProof(input: SnarkInput, circuit: string, zkey: string): Promise<SnarkJSProofAndSignals>;
    execute(task: ZKPTask, cb: (err: Error | null, result: SnarkJSProofAndSignals | null) => void): Promise<void>;
}
declare class SnarkArgsHelper {
    /**
     * How many snark results to keep in an LRU cache.
     */
    static readonly DEFAULT_SNARK_CACHE_SIZE = 20;
    readonly useMockHash: boolean;
    readonly snarkProverQueue: SnarkProverQueue;
    readonly terminal: React.MutableRefObject<TerminalHandle | undefined>;
    readonly hashConfig: HashConfig;
    readonly spaceTypePerlinOpts: PerlinConfig;
    readonly biomebasePerlinOpts: PerlinConfig;
    readonly planetHashMimc: (...inputs: number[]) => BigInteger;
    moveSnarkCache: LRUMap<string, MoveSnarkContractCallArgs>;
    constructor(hashConfig: HashConfig, terminal: React.MutableRefObject<TerminalHandle | undefined>, useMockHash: boolean);
    static create(hashConfig: HashConfig, terminal: React.MutableRefObject<TerminalHandle | undefined>, fakeHash?: boolean): SnarkArgsHelper;
    setSnarkCacheSize(size: number): void;
    getRevealArgs(x: number, y: number): Promise<RevealSnarkContractCallArgs>;
    getInitArgs(x: number, y: number, r: number): Promise<InitSnarkContractCallArgs>;
    getMoveArgs(x1: number, y1: number, x2: number, y2: number, r: number, distMax: number): Promise<MoveSnarkContractCallArgs>;
    getFindArtifactArgs(x: number, y: number): Promise<BiomebaseSnarkContractCallArgs>;
    fakeRevealProof(x: number, y: number): SnarkJSProofAndSignals;
    fakeInitProof(x: number, y: number, r: number): SnarkJSProofAndSignals;
    fakeMoveProof(x1: number, y1: number, x2: number, y2: number, r: number, distMax: number): SnarkJSProofAndSignals;
    fakeBiomebaseProof(x: number, y: number): SnarkJSProofAndSignals;
}
export default SnarkArgsHelper;
