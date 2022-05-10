import { h } from "preact";
import { MyListings } from "../components/MyListings";
import { useMarket } from "../hooks/use-market";

const styles = {
	display: "grid",
	width: "100%",
	padding: "8px",
	gridRowGap: "16px",
};

export function MyListingsView() {
	const { listings } = useMarket();
	// TOdo filter for must my listings

	return (
		<div style={styles}>
			My listings...
			<MyListings
				// title="My listings for sale"
				// empty="You don't have any listings listed for sale"
				listings={listings}
			/>
		</div>
	)
}