import { useRecoverPubKey } from "../hooks/use-recoverpubkey";
import { useSharedKeyCommitment } from "../hooks/use-ecdh";
import { useContract } from "../hooks/use-contract";
import { OrderPlacerViewProps } from "../typings/typings";
import { useConnection } from "../hooks/use-connection";
import { FunctionalComponent, h } from "preact";
import { ethers, Transaction } from "ethers";
import { OrderPlacerItem } from "../components/OrderPlacerItem";


export const OrderPlacerView: FunctionalComponent<OrderPlacerViewProps> = (props) => {
	/**
	 * TODO: should add a whole confirmation flow to the transaction + back to market view upon confirmation
	 */
	const { market } = useContract();
	const privateKey = (useConnection()).getPrivateKey();
	const buyerSigningKey = new ethers.utils.SigningKey(privateKey);
	const { pubKey: sellerPublicKey, computedAddress: sellerComputedAddress } = useRecoverPubKey(props.listing.tx as Transaction);
	const { sharedKeyCommitment, sharedKey } = useSharedKeyCommitment(buyerSigningKey, sellerPublicKey);

	const makeOrder = async () => {
		console.log(`ask, shared key commitment:, ${sharedKeyCommitment?.toString()}, seller address: ${sellerComputedAddress}`);
		const ask = await market.ask(props.listing.listingId, sharedKeyCommitment, { value: props.listing.price });
		props.setPlaceOrderView(undefined)
		return ask;
	};

	return (
		<OrderPlacerItem setPlaceOrderView={props.setPlaceOrderView} listing={props.listing} sharedKeyCommitment={sharedKeyCommitment} makeOrder={makeOrder} />
	);
};

