import { Event as EthersEvent } from "ethers";
import { ComponentChildren, createContext, h } from "preact";
import { useState } from "preact/hooks";

export type Listing = {
    seller: string;
    keyCommitment: BigInt;
    price: BigInt;
    escrowTime: BigInt;
    numOrders: BigInt;
    isActive: boolean;
    txEvent: EthersEvent
    // mapping(uint256 => Order) orders; (?)
};

export const MyListingsContext = createContext<Listing[]>([]);

type MyListingsProviderProps = {
    children: ComponentChildren;
    listings: Listing[];
};

export const MyListingsProvider = (props: MyListingsProviderProps) => {
    const [ listings, setListings ] = useState<Listing[]>(props.listings);

    return (
        <MyListingsContext.Provider value={listings} children={props.children} />
    );
};