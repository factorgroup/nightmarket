import { h, FunctionalComponent } from "preact";
import { useContract } from "../hooks/use-contract";
import { useTransactions } from "../hooks/use-mytransactions";
import { useSigner } from "../hooks/use-signer";
import { ActiveSigner } from "../components/SignerContext";
import { Event as EthersEvent } from "ethers";
import { useListings } from "../hooks/use-listings";
import { Listing } from "../components/MyListingsContext";
import { Button } from "../components/Button";
import { useState } from "preact/hooks";
import { useMarket } from "../hooks/use-market";

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
	const listingId = listing.txEvent.args!.listingId.toString();
	const url = `https://blockscout.com/xdai/mainnet/tx/${listing.txEvent.transactionHash}`;
	return (
		<div style={listingStyles.listing}>
			{[
				<div > <a target="_blank" href={url}>{listingId}</a></div>,
				<div style={listingStyles.longText}> {listing.txEvent.args!.locationId.toString()} </div>,
				<div style={listingStyles.longText}> {listing.txEvent.args!.biombase.toString()} </div>,
				<div style={listingStyles.longText}> {listing.isActive.toString()} </div>,
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
	const myListings = useListings();
	const signer = useSigner() as ActiveSigner;
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