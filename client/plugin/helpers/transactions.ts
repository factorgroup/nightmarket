import { eventLogger } from "@df_client/src/Backend/Network/EventLogger";
import { Contract, Signer, Event as EthersEvent, BigNumber } from "ethers";
import { Listing, Order } from "../components/MyListingsContext";


/**
 * The issue: orders made on listing are available within the smart contract listings mapping(uint256 => listing)
 * !but! the listing details are actually available on the Listing event
 */


const getOrders = async (market: Contract, listingId: number, numOrders: number) => {
    const orders: Order[] = [];
    for (let orderId = 0; orderId < numOrders; orderId++) {
        let order = await market.getOrder(listingId, orderId);
        orders.push(order);
    }
    return orders;
};

export const getListings = async (market: Contract, addEvent: boolean) => {
    const nListings: number = (await market.numListings()).toNumber();
    const listings: Listing[] = [];
    for (let listingId = 0; listingId < nListings; listingId++) {
        let contractListing = await market.listings(listingId);

        let listing = {
            listingId: listingId,
            seller: contractListing.seller,
            keyCommitment: contractListing.keyCommitment,
            price: contractListing.price,
            escrowTime: contractListing.escrowTime,
            numOrders: contractListing.numOrders,
            isActive: contractListing.isActive
        } as Listing;

        let listingEvent;
        if (addEvent) {
            [ listingEvent ] = await market.queryFilter(market.filters.Listed(null, listingId));
        }
        const locationId = addEvent ? listingEvent.args!.locationId.toString() : 'NA';
        const biomebase = addEvent ? listingEvent.args!.biombase.toString() : 'NA';
        const txHash = addEvent ? listingEvent.args!.transactionHash : 'NA';
        const tx = addEvent ? await listingEvent.getTransaction() : 'NA';

        const orders = listing.numOrders > 0 ? await getOrders(market, listingId, listing.numOrders) : undefined;


        listing = {
            ...listing,
            locationId: locationId,
            biomebase: biomebase,
            txHash: txHash,
            tx: tx,
            orders: orders
        };

        listings.push(listing);
    }
    return await Promise.all(listings);
};

export const getListingsForAddress = (listings: Listing[], address: string) => {
    return listings.filter(listing => listing.seller == address);
};

export const getListingsWithOrdersFromAddress = (listings: Listing[], address: string) => {
    let allOrders: { orders: Order[], listing: Listing; }[] = []; // an array of objects with arrays of orders passed by address for a corresponding listing
    listings.forEach((listing) => {
        if (listing.numOrders > 0) {
            const orders = listing.orders!.filter((order) => order.buyer == address);
            if (orders.length > 0) {
                const addressOrders = {
                    listing: listing,
                    orders: orders
                };
                allOrders.push(addressOrders);
            }
        }
    });
    return allOrders;
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
