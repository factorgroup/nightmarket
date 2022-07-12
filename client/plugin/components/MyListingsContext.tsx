import { ComponentChildren, createContext, h } from "preact";
import { useState } from "preact/hooks";
import { Listing } from "../typings/typings";

export const ListingsContext = createContext<{listings: Listing[], setListings: any}>({listings: [], setListings: null});

type ListingsProviderProps = {
    children: ComponentChildren;
    listings: Listing[];
};


export const ListingsProvider = (props: ListingsProviderProps) => {
    const [ listings, setListings ] = useState<Listing[]>(props.listings);

    return (
        <ListingsContext.Provider value={{listings, setListings}} children={props.children} />
    );
};