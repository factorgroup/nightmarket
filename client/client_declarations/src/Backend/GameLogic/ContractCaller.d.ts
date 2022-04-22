import { ContractFunction } from "ethers";
import { ThrottledConcurrentQueue } from "../Network/ThrottledConcurrentQueue";
export declare class ContractCaller {
    static readonly MAX_RETRIES = 12;
    readonly callQueue: ThrottledConcurrentQueue;
    makeCall<T>(contractViewFunction: ContractFunction<T>, args?: unknown[]): Promise<T>;
}
