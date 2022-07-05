import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { listingStyles } from "../helpers/theme";
import { useMarket } from "../hooks/use-market";
import { ListingItemProps, ListingRowProps } from "../typings/typings";
import { Button } from "./Button";

export const ListingItem: FunctionalComponent<ListingItemProps> = (props) => {
	const [ disabledButton, setdisabledButton ] = useState(props.buttonDisabled);
	const onClickAction = async () => {
		if (props.buttonChildren == "confirm") {
			setdisabledButton(true);
			await props.onClickAction();
			
		}
		else {
			props.onClickAction();
		}
	};
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
				<Button disabled={disabledButton} theme={props.actionButtonTheme}
					children={(props.buttonChildren)}
					style={{ width: "100%" }} onClick={async () => await onClickAction()} />,
			]}
		</div>
	);
};

type ListingHeaderRowProps = {
	sortBy: { current: string, previous: string; };
	setSortBy: any;
};

export const ListingHeaderRow: FunctionalComponent<ListingHeaderRowProps> = (props) => {
	const clickableStyle = { cursor: "pointer" };
	return (
		<div style={listingStyles.listing}>
			{[
				<div style={clickableStyle} onClick={() => props.setSortBy({ previous: props.sortBy.current, current: 'id' })}> ListID ▲</div>,
				<div>LocID</div>,
				<div> Biomebase </div>,
				<div style={clickableStyle} onClick={() => props.setSortBy({ previous: props.sortBy.current, current: 'escrow' })}>Escrow ▲</div>,
				<div style={clickableStyle} onClick={() => props.setSortBy({ previous: props.sortBy.current, current: 'price' })}> Price ▲</div>,
				<div style={clickableStyle} onClick={() => props.setSortBy({ previous: props.sortBy.current, current: 'numorders' })}> Orders ▲</div>,
				<div style={clickableStyle} onClick={() => props.setSortBy({ previous: props.sortBy.current, current: 'active' })}> Active ▲</div>
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
	const [ confirmDelist, setConfirmDelist ] = useState(false);
	const { listing } = props;
	const inMyListing = props.view === 'mylistings';

	const isActive = listing.isActive.toString();
	const url = `https://blockscout.com/xdai/mainnet/tx/${listing.txHash}`;

	const onClickAction = inMyListing ? (confirmDelist ? async () => await delist(listing.listingId) : () => setConfirmDelist(true)) : () => props.orderview(listing);
	const actionButtonTheme = inMyListing ? (confirmDelist ? "green" : "default") : "default";
	const buttonChildren = inMyListing ? (confirmDelist ? "confirm" : "delist") : "details";

	const onClickOrders = () => props.listordersview(props.listing);

	const buttonDisabled = inMyListing ? !listing.isActive : false;
	const styleOrderDiv = listing.numOrders > 0 ? { ...listingStyles.longText, cursor: "pointer", textDecoration: "underline" } : listingStyles.longText;

	return (
		<ListingItem
			listing={listing} buttonDisabled={buttonDisabled} buttonChildren={buttonChildren}
			url={url} linkMultipleOrder={styleOrderDiv} actionButtonTheme={actionButtonTheme}
			onClickOrders={onClickOrders} onClickAction={onClickAction}
		/>
	);
};