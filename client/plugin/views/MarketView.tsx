import { BigNumber, ethers, Transaction } from "ethers";
import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { Button } from "../components/Button";
import { Listing } from "../components/MyListingsContext";
import { useConnection } from "../hooks/use-connection";
import { useListings } from "../hooks/use-listings";
import { ListingGridHeaderRow, ListingItem, OrdersView } from "./MyListingsView";
import { useRecoverPubKey } from "../hooks/use-recoverpubkey";
import { useSharedKeyCommitment } from "../hooks/use-ecdh";
import { useContract } from "../hooks/use-contract";


type OrderItemProps = {
	listing: Listing;
};

const orderStyles = { // TODO: unify all styles in single file
	order: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		columnGap: "4px",
		rowGap: "4px",
	},
	longText: {
		overflow: "hidden",
		"text-overflow": "ellipsis",
		"white-space": "nowrap"
	}
};
export const OrderView: FunctionalComponent<OrderItemProps> = (props) => {
	/**
	 * TODO: should add a whole confirmation flow to the transaction + back to market view upon confirmation
	 */
	const { market } = useContract();
	const privateKey = (useConnection()).getPrivateKey();
	const buyerSigningKey = new ethers.utils.SigningKey(privateKey);
	const { pubKey: sellerPublicKey, computedAddress: sellerComputedAddress } = useRecoverPubKey(props.listing.tx as Transaction);
	const { sharedKeyCommitment } = useSharedKeyCommitment(buyerSigningKey, sellerPublicKey);

	const makeOrder = async () => {
		console.log(`ask, shared key commitment:, ${sharedKeyCommitment?.toString()}, seller address: ${sellerComputedAddress}`);
		const ask = await market.ask(props.listing.listingId, sharedKeyCommitment, { value: props.listing.price });

	};

	return (
		<OrderPlacer listing={props.listing} sharedKeyCommitment={sharedKeyCommitment} makeOrder={makeOrder}/>
	);
};

type OrderPlacerProps = {
	listing: Listing;
	sharedKeyCommitment: BigNumber | undefined;
	makeOrder: () => void;
};

export const OrderPlacer: FunctionalComponent<OrderPlacerProps> = (props: OrderPlacerProps) => {
	const keyCommitmentRowTitle = props.sharedKeyCommitment ? 'Shared key commitment' : '';

	return (
		<div>
			<div>Place Order on Listing {props.listing.listingId}</div>
			<div style={orderStyles.order}>
				<div>Seller</div>
				<div>{props.listing.seller}</div>
				<div>Location ID</div>
				<div style={orderStyles.longText}>{props.listing.locationId}</div>
				<div>Biomebase</div>
				<div style={orderStyles.longText}>{props.listing.biomebase}</div>
				<div >Escrow time</div>
				<div style={orderStyles.longText}>{props.listing.escrowTime.toString()}</div>
				<div>Price</div>
				<div style={orderStyles.longText}>{props.listing.price.toString()}</div>
				<div>{keyCommitmentRowTitle}</div>
				<div style={orderStyles.longText}>{props.sharedKeyCommitment}</div>
			</div>
			<div>
				<Button disabled={!props.listing.isActive} children={('order')} style={{ width: "100%" }} onClick={async () => await props.makeOrder()} />
			</div>
		</div>
	);
};

export const MarketView: FunctionalComponent = () => {
	const listings = useListings();
	const [ orderView, setOrderView ] = useState<Listing>();
	const [ listOrdersView, setListOrdersView ] = useState<Listing>(); // TODO: refactor in component.

	if (orderView) {
		return <OrderView listing={orderView} />;
	}

	if (listOrdersView) {

		return (
			<OrdersView listing={listOrdersView} />
		);
	}

	return (
		<div style={{ display: "grid", gridRowGap: "4px" }}>
			<ListingGridHeaderRow />
			{
				listings.map((listing) => (
					<ListingItem orderview={setOrderView} listordersview={setListOrdersView} view={'market'} listing={listing} />
				)
				)
			}
		</div>
	);
};