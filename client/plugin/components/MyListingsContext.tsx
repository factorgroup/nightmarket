import { ComponentChildren, createContext, h } from "preact";
import { useState } from "preact/hooks";
import { Event as EthersEvent } from "ethers";
export type Order = {
    // TODO: to implement
};

export type Listing = {
    seller: string;
    keyCommitment: BigInt;
    price: BigInt;
    escrowTime: BigInt;
    numOrders: BigInt;
    isActive: boolean;
    orders?: {
        [ listingId: number ]: Order[];
    };
    event: EthersEvent;
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