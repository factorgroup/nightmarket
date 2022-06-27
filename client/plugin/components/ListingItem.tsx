import { FunctionalComponent, h } from "preact";
import { listingStyles } from "../helpers/theme";
import { useMarket } from "../hooks/use-market";
import { ListingItemProps, ListingRowProps } from "../typings/typings";
import { Button } from "./Button";

export const ListingItem: FunctionalComponent<ListingItemProps> = (props) => {
	return (
		<div style={listingStyles.listing}>
			{[
				<div > <a target="_blank" href={props.url}>{props.listing.listingId}</a></div>,
				<div style={listingStyles.longText}> {props.listing.locationId} </div>,
				<div style={listingStyles.longText}> {props.listing.biomebase} </div>,
				<div style={listingStyles.longText}> {props.listing.escrowTime.toString()} </div>,
				<div style={listingStyles.longText}> {props.listing.price.toString()} </div>,
				<div style={props.linkMultipleOrder} onClick={props.onClickOrders}> {props.listing.numOrders.toString()} </div>,
				<div style={listingStyles.longText}> {props.listing.isActive.toString()} </div>,
				<Button disabled={props.buttonDisabled} children={(props.buttonChildren)} style={{ width: "100%" }} onClick={props.onClickAction} />,
			]}
		</div>
	);
};

export const ListingHeaderRow: FunctionalComponent = () => {
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

export const ListingRow: FunctionalComponent<ListingRowProps> = (props) => {
	/**
	 * TODO: format in function to get proper market data.
	 * Remove check on whether event is present: keep it for now as no best option
	 */

	const { delist } = useMarket();
	const { listing } = props;
	const inMyListing = props.view === 'mylistings';

	const isActive = listing.isActive.toString();
	const url = `https://blockscout.com/xdai/mainnet/tx/${listing.txHash}`;

	const onClickAction = inMyListing ? () => delist(listing.listingId) : () => props.orderview(listing);
	const onClickOrders = () => props.listordersview(props.listing);

	const buttonChildren = inMyListing ? "delist" : "details";
	const buttonDisabled = inMyListing ? !listing.isActive : false;
	const styleOrderDiv = listing.numOrders > 0 ? { ...listingStyles.longText, cursor: "pointer" } : listingStyles.longText;

	return (
		<ListingItem
			listing={listing} buttonDisabled={buttonDisabled} buttonChildren={buttonChildren}
			url={url} linkMultipleOrder={styleOrderDiv} 
			onClickOrders={onClickOrders} onClickAction={onClickAction}
		/>
	);
};