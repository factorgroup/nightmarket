import * as hre from "hardhat";
import { expect } from "chai";
import { smock } from "@defi-wonderland/smock";
import { default as gameJSON } from '../../artifacts/contracts/darkforest/GetterInterface.sol/IGetter.json';
import { ethers } from "ethers";

let deployer, fakeDeployer, listVerifier, saleVerifier, deployedNMFactory, fakeGame;

describe("NightMarket Factory contract", async () => {

    before(async () => {

        [ deployer, fakeDeployer, ] = await hre.ethers.getSigners();

        const lvFactory = await hre.ethers.getContractFactory("contracts/ListVerifier.sol:Verifier");
        listVerifier = await lvFactory.deploy();

        const svFactory = await hre.ethers.getContractFactory("contracts/SaleVerifier.sol:Verifier");
        saleVerifier = await svFactory.deploy();

        fakeGame = await smock.fake(gameJSON.abi);

        const factoryNightMarketFactory = await hre.ethers.getContractFactory("NightMarketFactory");
        deployedNMFactory = await factoryNightMarketFactory.deploy(listVerifier.address, saleVerifier.address);

    });

    it("setNightMarket(address _gameContract) should revert if NM already deployed ", async () => {
        const txInitNm = await deployedNMFactory.setNightMarket(fakeGame.address);
        const error: any = await (
            expect(deployedNMFactory.setNightMarket(fakeGame.address)).to.be.reverted
        );
        expect(error.toString()).to.contain("NM already init. for game contract");
    });

    it("updateNightMarket(address _gameContract) should revert if NM not deployed", async () => {
        const error: any = await (
            expect(deployedNMFactory.updateNightMarket(ethers.constants.AddressZero)).to.be.reverted
        );
        expect(error.toString()).to.contain("NM not init. for game contract");
    });

    it("updateNightMarket(address _gameContract) should revert if msg.sender is not owner", async () => {
        const error: any = await (
            expect(deployedNMFactory.connect(fakeDeployer).updateNightMarket(fakeGame.address)).to.be.reverted
        );
        expect(error.toString()).to.contain("Can't update NM address if not owner");
    });
});