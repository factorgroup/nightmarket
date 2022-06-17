import { h } from "preact";
import { useListings } from "../hooks/use-listings";
import { ListingGridHeaderRow, ListingItem } from "./MyListingsView";

export function MarketView() {
	const listings = useListings();

	return (
		<div style={{ display: "grid", gridRowGap: "4px" }}>
			<ListingGridHeaderRow />
			{
				listings.map((listing) => (
					<ListingItem view={'market'} listing={listing} />
				)
				)
			}
		</div>
	);
}