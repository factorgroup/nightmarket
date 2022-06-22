import { BigNumber, ethers } from "ethers";
import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { Button } from "../components/Button";
import { Listing } from "../components/MyListingsContext";
import { getPublicKey } from "../helpers/pubKeyRetriever";
import { useConnection } from "../hooks/use-connection";
import { useListings } from "../hooks/use-listings";
import { ListingGridHeaderRow, ListingItem, OrdersView } from "./MyListingsView";

import { getPublicKeyAsPoint as getEDDSAPublicKey } from "../helpers/ed25519";

// @ts-ignore
import { Scalar, ZqField } from 'https://cdn.skypack.dev/ffjavascript-browser@0.0.3';
import { mimcHash } from "@darkforest_eth/hashing";
import { useContract } from "../hooks/use-contract";
const F = new ZqField(Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617"));

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
	const [ keyCommitment, setkeyCommitment ] = useState<BigNumber>();
	const { market } = useContract();
	const connection = useConnection();
	const privateKey = connection.getPrivateKey();
	const buyerSigningKey = new ethers.utils.SigningKey(privateKey); // TODO: refactor this in proper getSharedSecret() - see MyListingsView
	const sellerPublicKey = getPublicKey(props.listing.tx); // get seller public key from listing tx
	const sharedSecret = buyerSigningKey.computeSharedSecret(sellerPublicKey);
	const sellerAddress = ethers.utils.computeAddress(sellerPublicKey);
	

	const makeOrder = async (keyCommitment: BigNumber) => {
		console.log("ASK ORDER SHARED SECRET: ", sharedSecret, "SELLER ADDRESS", sellerAddress);
		// const ask = await market.ask(props.listing.listingId, keyCommitment, { value: props.listing.price });

	};

	/**
	 * TODO: should add a whole confirmation flow to the transaction.
	 */

	const calculateExpecteddKeyCommitment = async () => {
		const sharedKey = await getEDDSAPublicKey(F.e(sharedSecret));
		const sharedKeyCommitment = mimcHash(0)(F.e(sharedKey.x), F.e(sharedKey.y)).toString();
		const expectedKeyCommitment = BigNumber.from(sharedKeyCommitment);
		setkeyCommitment(expectedKeyCommitment);
		const ask = await makeOrder(expectedKeyCommitment);
		console.log("Ask placed");
	};



	const keyCommitmentRowTitle = keyCommitment ? 'Shared key commitment' : '';

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
				<div style={orderStyles.longText}>{keyCommitment ? keyCommitment.toString() : ''}</div>
			</div>
			<div>
				<Button disabled={!props.listing.isActive} children={('order')} style={{ width: "100%" }} onClick={async () => await calculateExpecteddKeyCommitment()} />
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