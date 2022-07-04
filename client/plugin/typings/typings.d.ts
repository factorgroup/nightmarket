import { BigNumber, Signer } from "ethers";
import { ComponentChildren } from "preact";

/**
 * Contract types
 */
export type Order = {
    buyer: string;
    expectedSharedKeyHash: BigNumber;
    created: BigNumber;
    isActive: boolean;
    orderId: number;
};

export type Listing = {
    seller: string;
    keyCommitment: number;
    price: number;
    escrowTime: number;
    numOrders: number;
    isActive: boolean;
    nonce?: BigNumber;
    orders?:  Order[];
    listingId: number;
    locationId?: number | 'NA';
    biomebase?: number | 'NA';
    txHash?: string | 'NA';
    tx?: Transaction | 'NA';
};

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

type OrderPlacerItemProps = {
	listing: Listing;
	sharedKeyCommitment: BigNumber | undefined;
	makeOrder: () => Promise<Transaction>;
};

type OrdersViewProps = {
	listing: Listing;
};

type OrderPlacerViewProps = {
    listing: Listing;
    setPlaceOrderView: StateUpdater<Listing | undefined>;
};

type ManageOrderItemProps = {
	order: Order;
	listing: Listing;
};

type ListingRowProps = {
	listing: Listing;
	view: 'market' | 'mylistings';
	orderview: any; // state update, changes view to place order. TODO: provide better type
	listordersview: StateUpdater<Listing | undefined>; // state update. changes view to see all orders for a listed item.
};

type OrderItemProps = {
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

type ListingItemProps = {
	linkMultipleOrder: {};
	url: string;
	listing: Listing;
	buttonDisabled: boolean;
	buttonChildren: string;
    actionButtonTheme: string;
	onClickOrders: () => void;
	onClickAction: () => void;
};