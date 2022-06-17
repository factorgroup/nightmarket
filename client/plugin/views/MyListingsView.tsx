import { h, FunctionalComponent } from "preact";
import { useSigner } from "../hooks/use-signer";
import { ActiveSigner } from "../components/SignerContext";
import { useListings } from "../hooks/use-listings";
import { Listing } from "../components/MyListingsContext";
import { Button } from "../components/Button";
import { useState } from "preact/hooks";
import { useMarket } from "../hooks/use-market";
import { getListingsForAddress } from "../helpers/transactions";

type ListingItemProps = {
	listing: Listing;
};

const listingStyles = {
	listing: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
		gridColumnGap: "4px",
		textAlign: "center"
	},
	longText: {
		overflow: "hidden",
		"text-overflow": "ellipsis",
		"white-space": "nowrap"
	}
};

export const ListingItem: FunctionalComponent<ListingItemProps> = (props) => {
	const { delist } = useMarket();
	const { listing } = props;
	const listingId = listing.event.args!.listingId.toString();
	const locationId = listing.event.args!.locationId.toString();
	const biomebase = listing.event.args!.biombase.toString();
	const isActive = listing.isActive.toString();
	const url = `https://blockscout.com/xdai/mainnet/tx/${listing.event.transactionHash}`;
	return (
		<div style={listingStyles.listing}>
			{[
				<div > <a target="_blank" href={url}>{listingId}</a></div>,
				<div style={listingStyles.longText}> {locationId} </div>,
				<div style={listingStyles.longText}> {biomebase} </div>,
				<div style={listingStyles.longText}> {isActive} </div>,
				<Button disabled={!listing.isActive} children={("delist")} style={{ width: "100%" }} onClick={() => delist(listingId)} />,
			]}
		</div>
	);
};

export const ListingGridHeaderRow: FunctionalComponent = () => {
	return (
		<div style={listingStyles.listing}>
			{[
				<div> Listing ID </div>,
				<div> Location ID </div>,
				<div> Biomebase </div>,
				<div> Active </div>
			]}
		</div>
	);
};

export function MyListingsView () {
	const listings = useListings();
	const signer = useSigner() as ActiveSigner;
	const [ myListings, setMyListings ] = useState(getListingsForAddress(listings, signer.address));
	return (
		<div style={{ display: "grid", gridRowGap: "4px" }}>
			My listings at address {signer.address}
			<ListingGridHeaderRow />
			{
				myListings.map((listing) => (
					<ListingItem listing={listing} />
				)
				)
			}
		</div>
	);
}