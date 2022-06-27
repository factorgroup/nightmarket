import { ComponentChildren, createContext, h } from "preact";
import { useState } from "preact/hooks";
import { Listing } from "../typings/typings";

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