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
import { ethers, Transaction } from "ethers";
import { useContract } from "../hooks/use-contract";
import { useRecoverPubKey } from "../hooks/use-recoverpubkey";
import { useSharedKeyCommitment } from "../hooks/use-ecdh";
import { useAskTx } from "../hooks/use-asktx";
import { TextInput } from "../components/Input";
import { passwordToKey } from "../helpers/utils";
import { encrypt } from "../helpers/poseidon";
import { getSaleProof } from "client/plugin/helpers/snarks";
import { OrderDetails } from "./MyOrdersView";

type ListingItemProps = {
	listing: Listing;
	view: 'market' | 'mylistings';
	orderview: any; // state update, changes view to place order. TODO: provide better type
	listordersview: StateUpdater<Listing | undefined>; // state update. changes view to see all orders for a listed item.
};

export const listingStyles = {
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

export const orderStyles = {
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

	const { market } = useContract();
	const [ confirm, setConfirm ] = useState(false);
	const [ key, setKey ] = useState([] as string[]);
	const [ password, setPassword ] = useState("");

	const privateKey = (useConnection()).getPrivateKey();
	const currentAddress = ethers.utils.getAddress(useConnection().getAddress()); // checksum needed
	const sellerSigningKey = new ethers.utils.SigningKey(privateKey);
	const askTx = useAskTx(market, props.order.buyer, props.listing.listingId);
	const { pubKey: buyerPublicKey, computedAddress: buyerComputedAddress } = useRecoverPubKey(askTx as Transaction);
	const { sharedKeyCommitment, sharedKey } = useSharedKeyCommitment(sellerSigningKey, buyerPublicKey);

	const acceptButtonActive = (props.order.isActive && currentAddress == props.listing.seller && props.listing.isActive);

	// Convert password inputs into keys
	useEffect(() => {
		setKey(passwordToKey(password));
	}, [ password ]);

	const acceptOrder = async () => {
		const receiptId = encrypt(key, [ sharedKey!.x, sharedKey!.y ], props.listing.nonce!);
		const saleProofArgs = {
			receipt_id: receiptId,
			nonce: props.listing.nonce!.toString(),
			key_commitment: props.listing.keyCommitment.toString(),
			shared_key_commitment: sharedKeyCommitment!.toString(),
			shared_key: [ sharedKey!.x, sharedKey!.y ],
			key: key
		};
		const saleProof = await getSaleProof(saleProofArgs);
		const sale = await market.sale(...saleProof, props.listing.listingId, props.order.orderId, {
			gasLimit: 1000000,
		});
		console.log(`sale tx: ${sale}`)
	};

	if (confirm) {
		return (
			<div style={orderStyles.order}>
				{[
					<TextInput name="password" type="string" value={password} placeholder={"your password"} onChange={setPassword} />,
					<Button children={('confirm')} style={{ width: "100%" }} onClick={async () => await acceptOrder()} />,
					<Button children={('cancel')} style={{ width: "100%" }} onClick={() => setConfirm(false)} />
				]}
			</div>
		);
	}

	return (
		<OrderDetails order={props.order} action={() => setConfirm(true)} childrenAction={'accept'} buttonDisabled={!acceptButtonActive} />
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