/// <reference types="react" />
/**
 * Given a timestamp, displays the amount of time until the timestamp from now in hh:mm:ss format.
 * If the timestamp is in the past, displays the given hardcoded value.
 */
export declare function TimeUntil({ timestamp, ifPassed }: {
    timestamp: number;
    ifPassed: string;
}): JSX.Element;
export declare function formatDuration(msDuration: number): string;
