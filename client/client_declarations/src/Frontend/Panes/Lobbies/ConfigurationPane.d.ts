/// <reference types="react" />
import { Initializers } from '@darkforest_eth/settings';
export declare function ConfigurationPane({ startingConfig, onCreate, }: {
    startingConfig: Initializers;
    onCreate: (config: Partial<Initializers>) => Promise<void>;
}): JSX.Element;
