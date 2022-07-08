import GameManager from "@df_client/src/Backend/GameLogic/GameManager";
import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { AppTitle } from "../components/AppTitle";
import { Button } from "../components/Button";
import { loadNMFactoryContract } from "../helpers/contracts";

declare const df: GameManager;

const deployNM = async (gameAddress: string) => {
    const nmFactoryContract = await loadNMFactoryContract();
    const txInitNm = await nmFactoryContract.setNightMarket(gameAddress);
    const confirms = txInitNm.wait(5);
    const nmAddress = await nmFactoryContract.gameToMarket(gameAddress);
    return nmAddress;
};

type DeployedMessageProps = {
    nmAddress: string;
};

export const DeployedMessage: FunctionalComponent<DeployedMessageProps> = (props) => {
    return (
        <div style={{marginTop: "4px"}}>
            Success! NightMarket deployed at {props.nmAddress}. Restart the plugin to access it.
        </div>
    );
};

export const DeployNMView: FunctionalComponent = () => {
    const [ nightmarketAddress, setnightmarketAddress ] = useState<string>();
    const [ disabledButton, setdisabledButton ] = useState(false);
    const gameAddress = df.getContractAddress();
    const [ confirm, setconfirm ] = useState(false);

    const action = confirm ? async () => {
        setdisabledButton(true);
        const nmAddress = await deployNM(gameAddress);
        setnightmarketAddress(nmAddress);
    } : () => setconfirm(true);

    const buttonTheme = confirm ? "green" : "default";
    const successMessage = nightmarketAddress ? <DeployedMessage nmAddress={nightmarketAddress} /> : <div></div>;

    return (
        <div>
            <AppTitle />
            <div>
                NightMarket not deployed for game {gameAddress}.
            </div>
            <Button theme={buttonTheme} disabled={disabledButton} children={("deploy")} style={{ width: "100%", marginTop: "4px"}} onClick={action} />
            {successMessage}
        </div>

    );
};