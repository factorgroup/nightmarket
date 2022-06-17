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
	view: 'market' | 'mylistings';
};

const listingStyles = {
	listing: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
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
	/**
	 * TODO: format in function to get proper market data.
	 */
	const { delist } = useMarket();
	const { listing } = props;
	const listingId = listing.event.args!.listingId.toString();
	const locationId = listing.event.args!.locationId.toString();
	const biomebase = listing.event.args!.biombase.toString();
	const isActive = listing.isActive.toString();
	const url = `https://blockscout.com/xdai/mainnet/tx/${listing.event.transactionHash}`;
	const inMyListing = props.view === 'mylistings';
	const action = inMyListing ? () => delist(listingId) : () => (console.log('order'));
	const buttonChildren = inMyListing ? "delist" : "order"
	const buttonDisabled = inMyListing ? !listing.isActive : false;
	return (
		<div style={listingStyles.listing}>
			{[
				<div > <a target="_blank" href={url}>{listingId}</a></div>,
				<div style={listingStyles.longText}> {locationId} </div>,
				<div style={listingStyles.longText}> {biomebase} </div>,
				<div style={listingStyles.longText}> {listing.escrowTime.toString()} </div>,
				<div style={listingStyles.longText}> {listing.price.toString()} </div>,
				<div style={listingStyles.longText}> {listing.numOrders.toString()} </div>,
				<div style={listingStyles.longText}> {isActive} </div>,
				<Button disabled={buttonDisabled} children={(buttonChildren)} style={{ width: "100%" }} onClick={action} />,
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
				<div> Escrow time </div>,
				<div> Price </div>,
				<div> Num orders </div>,
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
					<ListingItem view={'mylistings'} listing={listing} />
				)
				)
			}
		</div>
	);
}