import { Signer } from "ethers";
import { ComponentChildren } from "preact";

/**
 * FC Props
 */
 type SignerProviderProps = {
    children: ComponentChildren;
    signer: Signer;
};

export type ActiveSigner = {
    address: string;
    signer: Signer;
};

type OrderPlacerProps = {
	listing: Listing;
	sharedKeyCommitment: BigNumber | undefined;
	makeOrder: () => Promise<Transaction>;
};

type OrdersViewProps = {
	listing: Listing;
};

type OrderItemProps = {
	order?: Order;
	listing: Listing;
};

type ListingItemProps = {
	listing: Listing;
	view: 'market' | 'mylistings';
	orderview: any; // state update, changes view to place order. TODO: provide better type
	listordersview: StateUpdater<Listing | undefined>; // state update. changes view to see all orders for a listed item.
};

type OrderDetailsProps = {
	order: Order;
	action: (() => void) | (() => Promise<Transaction>);
	childrenAction: string;
	buttonDisabled: boolean;
};

type AppViewProps = {
	contract: { market: Contract; };
	signer: Signer;
	txs: EthersEvent[];
	listings: Listing[];
	connection: EthConnection;
};

type SignerProviderProps = {
    children: ComponentChildren;
    signer: Signer;
};

export type ActiveSigner = {
    address: string;
    signer: Signer;
};