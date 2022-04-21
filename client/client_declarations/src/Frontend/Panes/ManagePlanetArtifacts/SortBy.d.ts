/// <reference types="react" />
import { Upgrade } from '@darkforest_eth/types';
export declare function SortBy({ sortBy, setSortBy, }: {
    sortBy: keyof Upgrade | undefined;
    setSortBy: (k: keyof Upgrade | undefined) => void;
}): JSX.Element;
