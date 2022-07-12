import { h } from "preact";
import { useSigner } from "../hooks/use-signer";
import { useListings } from "../hooks/use-listings";
import { useState } from "preact/hooks";
import { getListings, getListingsForAddress } from "../helpers/transactions";
import { Listing, ActiveSigner } from "../typings/typings";
import { ListingHeaderRow, ListingRow } from "../components/ListingItem";
import { OrdersListView } from "./OrdersListView";
import { sortListings } from "../helpers/utils";
import { RefreshHeader } from "../components/Refresh";
import { useContract } from "../hooks/use-contract";


export function MyListingsView () {
	const signer = useSigner() as ActiveSigner;
	const { market } = useContract();
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
			<div>
				<OrdersListView
					listing={listOrdersView} />
			</div>
		);
	}

	// List all listings
	return (
		<div style={{ display: "grid", rowGap: "4px" }}>
			<RefreshHeader setListings={setListings} setMyListings={setMyListings} setSortedListings={setSortedListings} />
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