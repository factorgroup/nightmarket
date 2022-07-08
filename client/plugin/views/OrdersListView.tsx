import { h, FunctionalComponent } from "preact";
import { useConnection } from "../hooks/use-connection";
import { ethers, Transaction } from "ethers";
import { useContract } from "../hooks/use-contract";
import { useRecoverPubKey } from "../hooks/use-recoverpubkey";
import { useSharedKeyCommitment } from "../hooks/use-ecdh";
import { useAskTx } from "../hooks/use-asktx";
import { TextInput } from "../components/Input";
import { passwordToKey } from "../helpers/utils";
import { OrderItem } from "./MyOrdersView";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button";
import { ManageOrderItemProps, OrdersViewProps } from "../typings/typings";
import { orderStyles } from "../helpers/theme";
import { useMarket } from "../hooks/use-market";
import { RefreshHeader } from "../components/Refresh";

export const ManageOrderItem: FunctionalComponent<ManageOrderItemProps> = (props) => {

	const { market } = useContract();
	const [ confirm, setConfirm ] = useState(false);
	const [ key, setKey ] = useState([] as string[]);
	const [ password, setPassword ] = useState("");
	const { sale } = useMarket();
	const [ saleConfirmDisabled, setsaleConfirmDisabled ] = useState(false);
	const privateKey = (useConnection()).getPrivateKey();
	const currentAddress = ethers.utils.getAddress(useConnection().getAddress()); // checksum needed
	const sellerSigningKey = new ethers.utils.SigningKey(privateKey);
	const askTx = useAskTx(market, props.order!.buyer, props.listing.listingId);
	const { pubKey: buyerPublicKey } = useRecoverPubKey(askTx as Transaction);
	const { sharedKeyCommitment, sharedKey } = useSharedKeyCommitment(sellerSigningKey, buyerPublicKey);

	const acceptButtonActive = (props.order!.isActive && currentAddress == props.listing.seller && props.listing.isActive);

	useEffect(() => {
		setKey(passwordToKey(password));
	}, [ password ]);

	const confirmSale = async () => {
		setsaleConfirmDisabled(true);
		await sale(props.listing.listingId, props.order!.orderId, key, sharedKey,
			props.listing.nonce!.toBigInt(), props.listing.keyCommitment,
			sharedKeyCommitment);
		setConfirm(false);

	};

	if (confirm) {
		return (
			<div style={orderStyles.order}>
				{[
					<TextInput name="password" type="string" value={password} placeholder={"your password"} onChange={setPassword} />,
					<Button disabled={saleConfirmDisabled} theme="green" children={('sell')} style={{ width: "100%" }}
						onClick={async () => await confirmSale()} />,
					<Button disabled={saleConfirmDisabled} theme="red" children={('cancel')} style={{ width: "100%" }} onClick={() => setConfirm(false)} />
				]}
			</div>
		);
	}

	return (
		// refunded at false since seller is accepting an order here.
		<OrderItem refunded={false} order={props.order!} action={() => setConfirm(true)} childrenAction={'accept'} buttonDisabled={!acceptButtonActive} />
	);
};

export const OrdersListView: FunctionalComponent<OrdersViewProps> = (props) => {
	/**
	 * TODO: implement refreshing orders list from here.
	 */
	const [ refreshOrders, setrefreshOrders ] = useState(false);

	return (
		<div>
			<div>Orders for listing {props.listing.listingId}</div>
			<div>Seller: {props.listing.seller}</div>
			<div style={{ display: "grid", rowGap: "4px" }}>
				{props.listing.orders?.map((order) => <ManageOrderItem listing={props.listing} order={order} />)}
			</div>
		</div>
	);
};
