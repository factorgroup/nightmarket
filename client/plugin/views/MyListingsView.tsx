import { h, FunctionalComponent } from "preact";
import { useContract } from "../hooks/use-contract";
import { useTransactions } from "../hooks/use-mytransactions";
import { useSigner } from "../hooks/use-signer";
import { ActiveSigner } from "../components/SignerContext";
import { Event as EthersEvent } from "ethers";
import { useListings } from "../hooks/use-listings";
import { Listing } from "../components/MyListingsContext";

type ListingItemProps = {
	listing: Listing;
};

const listingStyles = {
	listing: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
		gridColumnGap: "4px",
		textAlign: "center"
	},
	longText: {
		overflow: "hidden",
		"text-overflow": "ellipsis",
		"white-space": "nowrap"
	}
};

export const ListingItem: FunctionalComponent<ListingItemProps> = (props) => {
	const { listing } = props;
	const url = `https://blockscout.com/xdai/mainnet/tx/${listing.txEvent.transactionHash}`;
	return (
		<div style={listingStyles.listing}>
			{[
				<div > {listing.txEvent.args!.listingId.toString()} </div>,
				<div style={listingStyles.longText}> {listing.txEvent.args!.locationId.toString()} </div>,
				<div style={listingStyles.longText}> {listing.txEvent.args!.biombase.toString()} </div>,
				<div style={listingStyles.longText}> {listing.isActive.toString()} </div>,
				<div><a target="_blank" href={url}>Tx</a></div>
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
				<div> Active </div>,
				<div> Transaction </div>
			]}
		</div>
	);
};
export function MyListingsView () {
	const market = useContract();
	const { myTransactions }: { myTransactions: EthersEvent[]; } = useTransactions();
	const myListings = useListings();
	const signer = useSigner() as ActiveSigner;
	return (
		<div>
			My listings at address {signer.address}
			<ListingGridHeaderRow />
			{
				myListings.map((listing) => (
					<ListingItem listing={listing} />
				)
				)
			}
		</div>
	);
}