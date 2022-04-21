import { EthAddress } from '@darkforest_eth/types';
import React from 'react';
export declare function AccountLabel({ includeAddressIfHasTwitter, ethAddress, width, style, }: {
    includeAddressIfHasTwitter?: boolean;
    ethAddress?: EthAddress;
    width?: string;
    style?: React.CSSProperties;
}): JSX.Element;
/**
 * Link to a twitter account.
 */
export declare function TwitterLink({ twitter, color }: {
    twitter: string;
    color?: string;
}): JSX.Element;
