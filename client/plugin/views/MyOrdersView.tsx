import { Transaction } from "ethers";
import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { Button } from "../components/Button";
import { Listing, Order } from "../components/MyListingsContext";
import { getListingsWithOrdersFromAddress } from "../helpers/transactions";
import { useContract } from "../hooks/use-contract";
import { useListings } from "../hooks/use-listings";
import { useSigner } from "../hooks/use-signer";
import { OrderDetailsProps, ActiveSigner } from "../typings/typings";
import { listingStyles, orderStyles } from "./MyListingsView";


export const OrderDetails: FunctionalComponent<OrderDetailsProps> = (props: OrderDetailsProps) => {
	return (
		<div style={orderStyles.order}>
			{[
				<div style={listingStyles.longText}> {props.order.buyer} </div>,
				<div style={listingStyles.longText}> {props.order.created.toString()} </div>,
				<div style={listingStyles.longText}> {props.order.expectedSharedKeyHash.toString()} </div>,
				<div style={listingStyles.longText}> {props.order.isActive.toString()} </div>,
				<Button disabled={props.buttonDisabled} children={(props.childrenAction)} style={{ width: "100%" }} onClick={props.action} />,
			]}
		</div>
	);
};

export function MyOrdersView () {
	const signer = useSigner() as ActiveSigner;
	const listings = useListings();
	const { market } = useContract();
	const [ myOrders, setMyOrders ] = useState<{ orders: Order[], listing: Listing; }[]>(getListingsWithOrdersFromAddress(listings, signer.address));
	const refund = async (listing: Listing, order: Order): Promise<Transaction> => {
		const tx = await market.refund(listing.listingId, order.orderId);
		console.log("refund tx: ", tx);
		return tx;
	};

	return (
		<div>
			My orders for address {signer.address}
			<div style={{ display: "grid", rowGap: "4px" }}>
				{myOrders.map((listing) => (
					<div style={{ display: "grid", rowGap: "4px" }}>
						{listing.orders.map((order) => (
							<OrderDetails order={order} action={async () => await refund(listing.listing, order)} childrenAction={'refund'} buttonDisabled={!order.isActive} />
						)
						)}
					</div>
				)
				)
				}
			</div>
		</div>
	);
}