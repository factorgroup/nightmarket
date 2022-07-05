import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { useListings } from "../hooks/use-listings";
import { ListingHeaderRow, ListingRow } from "../components/ListingItem";
import { OrdersListView } from "./OrdersListView";
import { Listing } from "../typings/typings";
import { OrderPlacerView } from "./OrderPlacerView";
import { sortListings } from "../helpers/utils";
import { getListings } from "../helpers/transactions";
import { useContract } from "../hooks/use-contract";
import { RefreshHeader } from "../components/Refresh";

export const MarketView: FunctionalComponent = () => {
	const { listings, setListings } = useListings();
	const { market } = useContract();
	const [ sortedListings, setSortedListings ] = useState<Listing[]>(listings);
	const [ sortBy, setSortBy ] = useState({ current: 'id', previous: 'id' });

	const [ placeOrderView, setPlaceOrderView ] = useState<Listing>();
	const [ listOrdersView, setListOrdersView ] = useState<Listing>();

	if (sortBy.current != sortBy.previous) {
		const sorted = sortListings(listings, sortBy);
		setSortedListings(sorted);
		setSortBy({ previous: sortBy.current, current: sortBy.current });
	}

	if (placeOrderView) {
		// View a single order for order placement (from market view)
		return (
			<OrderPlacerView setPlaceOrderView={setPlaceOrderView} listing={placeOrderView} />
		);
	}

	if (listOrdersView) {
		// View a list of orders (from market or mylistings view)
		return (
			<OrdersListView listing={listOrdersView} />
		);
	}

	// View all listings (market view)
	return (
		<div>
			<RefreshHeader getListings={getListings} setListings={setListings} setSortedListings={setSortedListings} market={market} />
			<div style={{ display: "grid", gridRowGap: "4px" }}>
				<ListingHeaderRow sortBy={sortBy} setSortBy={setSortBy} />
				{
					sortedListings.map((listing) => (
						<ListingRow orderview={setPlaceOrderView} listordersview={setListOrdersView} view={'market'} listing={listing} />
					)
					)
				}
			</div>
		</div>
	);
};