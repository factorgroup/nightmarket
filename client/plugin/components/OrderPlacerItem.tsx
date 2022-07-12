import { Button } from "../components/Button";
import { clickableLinkStyle, orderPlacerStyles } from "../helpers/theme";
import { BigNumber } from "ethers";
import { OrderPlacerItemProps } from "../typings/typings";
import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

export const OrderPlacerItem: FunctionalComponent<OrderPlacerItemProps> = (props) => {
    const [buttonDisabled, setbuttonDisabled] = useState(!props.listing.isActive)
    const [ confirmOrder, setConfirmOrder ] = useState(false);
    const buttonTheme = confirmOrder ? "green" : "default";
    const keyCommitmentRowTitle = props.sharedKeyCommitment ? 'Shared key commitment' : '';
    const sharedKeyCommitment = props.sharedKeyCommitment ? props.sharedKeyCommitment : BigNumber.from(0);
    const buttonChildren = confirmOrder ? "confirm" : "order";

    const orderPlacer = async () => {
        setbuttonDisabled(true)
        await props.makeOrder();
    };
    
    return (
        <div>
            <div style={clickableLinkStyle}><a onClick={() => props.setPlaceOrderView(undefined)}>← Back to market</a></div>
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
                <Button theme={buttonTheme} disabled={buttonDisabled} children={(buttonChildren)} style={{ width: "100%" }}
                    onClick={async () => await (confirmOrder ? orderPlacer() : setConfirmOrder(true))} />
            </div>
        </div>
    );
};