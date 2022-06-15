import { Contract, Signer, Event as EthersEvent } from "ethers";
import { Listing } from "../components/MyListingsContext";

export const getListings = async (market: Contract, listedTxEvents: EthersEvent[]) => {
    const listings = listedTxEvents.map(async (txEvent) => {
        const listingId = txEvent.args!.listingId.toString();
        const listing = await market.listings(listingId);
        return {
            ...listing,
            txEvent
        } as Listing;
    });
    return await Promise.all(listings);
};

export const getTxs = async (market: Contract, signer: Signer) => {
    const address = await signer.getAddress();
    const listedTxEvents = await market.queryFilter(market.filters.Listed(address));
    /**
     * Fetch whether listed locations are active
     */

    // const delistedTxEvents = await market.queryFilter(market.filters.Delisted(await signer.getAddress()));
    return listedTxEvents;
};
