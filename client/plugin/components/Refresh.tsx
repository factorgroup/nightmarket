import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { clickableLinkStyle } from "../helpers/theme";
import { RefreshHeaderProps } from "../typings/typings";

const refreshListings = async (getListings, setListings, setSortedListings, setRefreshText, market) => {
	setRefreshText("Refreshing, wait...")
	const listings = await getListings(market, true);
	setListings(listings);
	setSortedListings(listings);
	setRefreshText("Refreshed!")
};

export const RefreshHeader: FunctionalComponent<RefreshHeaderProps> = (props) => {
	const [refreshText, setrefreshText] = useState("Refresh ⟳")
	return (
		<div style={{...clickableLinkStyle, color: "blue"}}
			onClick={async () => await refreshListings(props.getListings, props.setListings, props.setSortedListings, setrefreshText, props.market)}>{refreshText}</div>
	);
};
