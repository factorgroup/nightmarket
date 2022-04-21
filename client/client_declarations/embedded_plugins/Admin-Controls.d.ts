import type { Subscription } from '@darkforest_eth/events';
import type { ContractMethodName, EthAddress, LocatablePlanet, LocationId, Planet } from '@darkforest_eth/types';
declare class AdminControls implements DFPlugin {
    subscription: Subscription;
    div: HTMLElement;
    button: HTMLButtonElement;
    text: HTMLDivElement;
    selectedPlanet?: Planet;
    render(div: HTMLElement): Promise<void>;
    /**
     * Admin-only function, takes ownership over a planet.
     */
    setOwner(planet: LocatablePlanet, newOwner: EthAddress): Promise<import("@darkforest_eth/types").Transaction<{
        locationId: LocationId;
        newOwner: EthAddress;
        args: Promise<([string, string] | [[string, string], [string, string]] | EthAddress | [string, string, string, string, string, string, string, string])[]>;
        contract: import("@darkforest_eth/contracts/typechain").DarkForest;
        methodName: ContractMethodName;
    }>>;
    destroy(): void;
}
export default AdminControls;
