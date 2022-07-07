export async function deployFactory (hre, listVerifierAddress: string, saleVerifierAddress: string) {
    /**
     * Deploy a factory contract. You probably don't need to do this. 
     * A factory is already deployed at NIGHTMARKET_FACTORY_ADDR, see client/plugin/helpers/constants.ts
     */
    const factoryNightMarketFactory = await hre.ethers.getContractFactory("NightMarketFactory");
    const deployedNMFactoryTx = await factoryNightMarketFactory.deploy(listVerifierAddress, saleVerifierAddress);
    const deployedNMFactoryAddress = deployedNMFactoryTx.address;

    console.log(
        {
            deployedNMFactoryAddress
        }
    );
}

export async function deployNM (hre, gameAddress: string, factoryAddress: string) {
    /**
     * Deploy a new NightMarket. It will be instantiated by a NightMarket factory.
     * You probably want to deploy a new NightMarket for your game
     * You can use the factory which is at address NIGHTMARKET_FACTORY_ADDR, see client/plugin/helpers/constants.ts
     */
    const factoryNightMarketFactory = await hre.ethers.getContractFactory("NightMarketFactory");
    const NMFactory = factoryNightMarketFactory.attach(factoryAddress);
    const txSet = await NMFactory.setNightMarket(gameAddress);
    console.log("Waiting for tx confirmations...")
    const confirms = await txSet.wait(5);
    const nmAddress = await NMFactory.gameToMarket(gameAddress);
    console.log(
        {
            nmAddress
        }
    );
}