import { Button } from "../components/Button";
import { orderPlacerStyles } from "../helpers/theme";
import { BigNumber } from "ethers";
import { OrderPlacerItemProps } from "../typings/typings";
import { FunctionalComponent, h } from "preact";

export const OrderPlacerItem: FunctionalComponent<OrderPlacerItemProps> = (props) => {
    const keyCommitmentRowTitle = props.sharedKeyCommitment ? 'Shared key commitment' : '';
    const sharedKeyCommitment = props.sharedKeyCommitment ? props.sharedKeyCommitment : BigNumber.from(0);

    return (
        <div>
            <div>Place Order on Listing {props.listing.listingId}</div>
            <div style={orderPlacerStyles.order}>
                <div>Seller</div>
                <div>{props.listing.seller}</div>
                <div>Location ID</div>
                <div style={orderPlacerStyles.longText}>{props.listing.locationId}</div>
                <div>Biomebase</div>
                <div style={orderPlacerStyles.longText}>{props.listing.biomebase}</div>
                <div >Escrow time</div>
                <div style={orderPlacerStyles.longText}>{props.listing.escrowTime.toString()}</div>
                <div>Price</div>
                <div style={orderPlacerStyles.longText}>{props.listing.price.toString()}</div>
                <div>{keyCommitmentRowTitle}</div>
                <div style={orderPlacerStyles.longText}>{sharedKeyCommitment.toString()}</div>
            </div>
            <div>
                <Button disabled={!props.listing.isActive} children={('order')} style={{ width: "100%" }} onClick={async () => await props.makeOrder()} />
            </div>
        </div>
    );
};