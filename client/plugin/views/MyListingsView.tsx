import { h, FunctionalComponent } from "preact";
import { useSigner } from "../hooks/use-signer";
import { ActiveSigner } from "../components/SignerContext";
import { useListings } from "../hooks/use-listings";
import { Listing, Order } from "../components/MyListingsContext";
import { Button } from "../components/Button";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { useMarket } from "../hooks/use-market";
import { getListingsForAddress } from "../helpers/transactions";
import { useConnection } from "../hooks/use-connection";
import { BigNumber, ethers } from "ethers";
import { getPublicKey } from "../helpers/pubKeyRetriever";
import { Event as EthersEvent } from "ethers";
import { useContract } from "../hooks/use-contract";
import { getPublicKeyAsPoint as getEDDSAPublicKey } from "../helpers/ed25519";
import { mimcHash } from "@darkforest_eth/hashing";

// @ts-ignore
import { Scalar, ZqField } from 'https://cdn.skypack.dev/ffjavascript-browser@0.0.3';
const F = new ZqField(Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617"));


type ListingItemProps = {
	listing: Listing;
	view: 'market' | 'mylistings';
	orderview: any; // state update, changes view to place order. TODO: provide better type
	listordersview: StateUpdater<Listing | undefined>; // state update. changes view to see all orders for a listed item.
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
	} // TODO: longText should be 
};

const orderStyles = {
	order: {
		display: "grid",
		gridColumnGap: "4px",
		textAlign: "center",
		gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr"
	}
};

type OrdersViewProps = {
	listing: Listing;
};

type OrderItemProps = {
	order: Order;
	listing: Listing;
};

export const OrderItem: FunctionalComponent<OrderItemProps> = (props) => {

	const connection = useConnection();
	const currentAddress = ethers.utils.getAddress(connection.getAddress()); // checksuming address
	const { market } = useContract();
	const [ askTx, setAskTx ] = useState<ethers.providers.TransactionResponse>();
	const [ buyerPubKey, setBuyerPubKey ] = useState<string>();
	const sellerSigningKey = new ethers.utils.SigningKey(connection.getPrivateKey());

	useEffect(() => {
		(async function () {
			const askEvent: EthersEvent[] = await market.queryFilter(market.filters.Asked(props.order.buyer, props.listing.listingId));
			const askTx = await askEvent[ 0 ].getTransaction();
			const buyerPublicKey = getPublicKey(askTx); // get buyer public key from ask tx
			const sharedSecret = sellerSigningKey.computeSharedSecret(buyerPublicKey);
			const buyerAddress = ethers.utils.computeAddress(buyerPublicKey);
			console.log("CONFIRM ORDER SHARED SECRET: ", sharedSecret, "BUYER ADDRESS", buyerAddress);

			const sharedKey = await getEDDSAPublicKey(F.e(sharedSecret));
			const sharedKeyCommitment = mimcHash(0)(F.e(sharedKey.x), F.e(sharedKey.y)).toString();
			const expectedKeyCommitment = BigNumber.from(sharedKeyCommitment);
			setAskTx(askTx);
			setBuyerPubKey(buyerPublicKey);
			
		})();
	}, []);

	const acceptButtonActive = (props.order.isActive && currentAddress == props.listing.seller);
	// TODO: refactor this in proper getSharedSecret() - see MarketView

	// get tx from AskedEvent

	return (
		<div style={orderStyles.order}>
			{[
				<div style={listingStyles.longText}> {props.order.buyer} </div>,
				<div style={listingStyles.longText}> {props.order.created.toString()} </div>,
				<div style={listingStyles.longText}> {props.order.expectedSharedKeyHash.toString()} </div>,
				<div style={listingStyles.longText}> {props.order.isActive.toString()} </div>,
				<Button disabled={!acceptButtonActive} children={('accept')} style={{ width: "100%" }} onClick={() => console.log("hello")} />,
			]}
		</div>
	);
};

export const OrdersView: FunctionalComponent<OrdersViewProps> = (props) => {
	return (
		<div>
			<div>Orders for listing {props.listing.listingId}</div>
			<div>Seller: {props.listing.seller}</div>
			<div style={{ display: "grid", rowGap: "4px" }}>
				{props.listing.orders?.map((order) => <OrderItem listing={props.listing} order={order} />)}
			</div>
		</div>
	);
};

export const ListingItem: FunctionalComponent<ListingItemProps> = (props) => {
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
		<div style={listingStyles.listing}>
			{[
				<div > <a target="_blank" href={url}>{listing.listingId}</a></div>,
				<div style={listingStyles.longText}> {listing.locationId} </div>,
				<div style={listingStyles.longText}> {listing.biomebase} </div>,
				<div style={listingStyles.longText}> {listing.escrowTime.toString()} </div>,
				<div style={listingStyles.longText}> {listing.price.toString()} </div>,
				<div style={styleOrderDiv} onClick={onClickOrders}> {listing.numOrders.toString()} </div>,
				<div style={listingStyles.longText}> {isActive} </div>,
				<Button disabled={buttonDisabled} children={(buttonChildren)} style={{ width: "100%" }} onClick={onClickAction} />,
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
	const [ listOrdersView, setListOrdersView ] = useState<Listing>(); // TODO: refactor in component.
	const [ myListings, setMyListings ] = useState(getListingsForAddress(listings, signer.address));

	if (listOrdersView) {
		return (
			<OrdersView listing={listOrdersView} />
		);
	}

	return (
		<div style={{ display: "grid", rowGap: "4px" }}>
			My listings at address {signer.address}
			<ListingGridHeaderRow />
			{
				myListings.map((listing) => (
					<ListingItem orderview={false} listordersview={setListOrdersView} view={'mylistings'} listing={listing} />
				)
				)
			}
		</div>
	);
}