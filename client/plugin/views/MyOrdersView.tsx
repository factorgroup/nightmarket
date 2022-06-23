import { h } from "preact";
import { useState } from "preact/hooks";
import { Listing, Order } from "../components/MyListingsContext";
import { ActiveSigner } from "../components/SignerContext";
import { getListingsWithOrdersFromAddress } from "../helpers/transactions";
import { useListings } from "../hooks/use-listings";
import { useSigner } from "../hooks/use-signer";

export function MyOrdersView () {
	const signer = useSigner() as ActiveSigner;
	const listings = useListings();
	const [ myOrders, setMyOrders ] = useState<{ orders: Order[], listing: Listing; }[]>(getListingsWithOrdersFromAddress(listings, signer.address));
	return (
		<div>
			My orders for address {signer.address}
		</div>
	);
}