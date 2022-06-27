import { h } from "preact";
import { useSigner } from "../hooks/use-signer";
import { useListings } from "../hooks/use-listings";
import { useState } from "preact/hooks";
import { getListingsForAddress } from "../helpers/transactions";
import { Listing, ActiveSigner, ListingRowProps, ListingItemProps, ManageOrderItemProps, OrdersViewProps } from "../typings/typings";
import { ListingHeaderRow, ListingRow } from "../components/ListingItem";
import { OrdersListView } from "./OrdersListView";


export function MyListingsView () {
	const listings = useListings();
	const signer = useSigner() as ActiveSigner;
	const [ listOrdersView, setListOrdersView ] = useState<Listing>();
	const [ myListings, setMyListings ] = useState(getListingsForAddress(listings, signer.address));

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
			<ListingHeaderRow />
			{
				myListings.map((listing) => (
					<ListingRow orderview={false} listordersview={setListOrdersView} view={'mylistings'} listing={listing} />
				)
				)
			}
		</div>
	);
}