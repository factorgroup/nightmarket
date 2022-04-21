import { NetworkHealthSummary } from '@darkforest_eth/types';
/**
 * The Dark Forest webserver keeps track of network health, this function loads that information
 * from the webserver.
 */
export declare function loadNetworkHealth(): Promise<NetworkHealthSummary>;
