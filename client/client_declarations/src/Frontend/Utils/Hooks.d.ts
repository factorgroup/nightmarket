/**
 * Executes the callback `cb` every `poll` ms
 * @param cb callback to execute
 * @param poll ms to poll
 * @param execFirst if we want to execute the callback on first render
 */
export declare function usePoll(cb: () => void, poll?: number | undefined, execFirst?: boolean | undefined): void;
