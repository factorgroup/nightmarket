import { ComponentChildren, createContext, h } from "preact";
import { useState } from "preact/hooks";
import { BigNumber, Event as EthersEvent, Transaction } from "ethers";

export type Order = {
    buyer: string;
    expectedSharedKeyHash: BigNumber;
    created: BigNumber;
    isActive: boolean;
    orderId: number;
};

export type Listing = {
    seller: string;
    keyCommitment: number;
    price: number;
    escrowTime: number;
    numOrders: number;
    isActive: boolean;
    nonce?: number;
    orders?:  Order[];
    listingId: number;
    locationId?: number | 'NA';
    biomebase?: number | 'NA';
    txHash?: string | 'NA';
    tx?: Transaction | 'NA';
};

export const ListingsContext = createContext<Listing[]>([]);

type ListingsProviderProps = {
    children: ComponentChildren;
    listings: Listing[];
};


export const ListingsProvider = (props: ListingsProviderProps) => {
    const [ listings, setListings ] = useState<Listing[]>(props.listings);

    return (
        <ListingsContext.Provider value={listings} children={props.children} />
    );
};