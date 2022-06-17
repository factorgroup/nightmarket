import { Contract, Signer, Event as EthersEvent } from "ethers";
import { Listing } from "../components/MyListingsContext";


/**
 * The issue: orders made on listing are available within the smart contract listings mapping(uint256 => listing)
 * !but! the listing details are actually available on the Listing event
 */
export const getListings = async (market: Contract) => {
    const nListings: number = (await market.numListings()).toNumber();
    const listings: Listing[] = [];
    for (let listingId = 0; listingId < nListings; listingId++) {
        let listing = await market.listings(listingId) as Listing;
        // 
        const [ listingEvent ] = await market.queryFilter(market.filters.Listed(null, listingId));
        listing = {
            ...listing,
            event: listingEvent
        };
        listings.push(listing);
    }
    return await Promise.all(listings);
};

export const getListingsForAddress = (listings: Listing[], address: string) => {
    return listings.filter(listing => listing.seller == address);
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
