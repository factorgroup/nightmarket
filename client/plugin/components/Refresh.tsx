import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { clickableLinkStyle } from "../helpers/theme";
import { getListings, getListingsForAddress } from "../helpers/transactions";
import { useContract } from "../hooks/use-contract";
import { useSigner } from "../hooks/use-signer";
import { ActiveSigner, RefreshHeaderProps } from "../typings/typings";

const refreshListings = async (setListings, setSortedListings, setRefreshText, setMyListings, market, signer) => {
	setRefreshText("Refreshing, wait...");
	const listings = await getListings(market, true);
	setListings(listings); // context update
	if (typeof setMyListings != 'undefined') {
		// update sorting with personal listings
		const myListings = getListingsForAddress(listings, signer.address);
		setMyListings(myListings);
		setSortedListings(myListings);
	}
	else {
		// general view on listings
		setSortedListings(listings);
	}
	setRefreshText("Refreshed!");
};

export const RefreshHeader: FunctionalComponent<RefreshHeaderProps> = (props) => {
	const [ refreshText, setrefreshText ] = useState("Refresh ⟳");
	const signer = useSigner() as ActiveSigner;
	const { market } = useContract();
	const buttonStyle = refreshText === "Refresh ⟳" ? { ...clickableLinkStyle, color: "blue" } : { color: "blue" }
	return (
		<div style={buttonStyle}
			onClick={async () => await refreshListings(props.setListings,
				props.setSortedListings, setrefreshText, props.setMyListings,
				market, signer)}>{refreshText}</div>
	);
};
