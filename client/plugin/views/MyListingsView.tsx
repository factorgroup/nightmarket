import { h } from "preact";
import { useSigner } from "../hooks/use-signer";
import { useListings } from "../hooks/use-listings";
import { useState } from "preact/hooks";
import { getListingsForAddress } from "../helpers/transactions";
import { Listing, ActiveSigner, ListingRowProps, ListingItemProps, ManageOrderItemProps, OrdersViewProps } from "../typings/typings";
import { ListingHeaderRow, ListingRow } from "../components/ListingItem";
import { OrdersListView } from "./OrdersListView";
import { sortListings } from "../helpers/utils";


export function MyListingsView () {
	const signer = useSigner() as ActiveSigner;
	const { listings, setListings } = useListings();
	const [ myListings, setMyListings ] = useState(getListingsForAddress(listings, signer.address));
	const [ sortBy, setSortBy ] = useState({ current: 'id', previous: 'id' });
	const [ listOrdersView, setListOrdersView ] = useState<Listing>();
	
	const [ sortedListings, setSortedListings ] = useState(myListings);

	if (sortBy.current != sortBy.previous) {
		const sorted = sortListings(myListings, sortBy);
		setSortedListings(sortedListings);
		setSortBy({ previous: sortBy.current, current: sortBy.current });
	}

	if (listOrdersView) {
		// List orders for a particular listing
		return (
			<OrdersListView listing={listOrdersView} />
		);
	}

	// List all listings
	return (
		<div style={{ display: "grid", rowGap: "4px" }}>
			My listings at address {signer.address}
			<ListingHeaderRow sortBy={sortBy} setSortBy={setSortBy} />
			{
				sortedListings.map((listing) => (
					<ListingRow orderview={false} listordersview={setListOrdersView} view={'mylistings'} listing={listing} />
				)
				)
			}
		</div>
	);
}