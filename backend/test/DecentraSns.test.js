const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("DecentraSns", function () {
    it("construct", async function () {
        const DsnsContractFactory = await hre.ethers.getContractFactory("DecentraSns");
        const DsnsContract = await DsnsContractFactory.deploy();
        await DsnsContract.deployed();

        console.log("Contract deployed to: ", DsnsContract.address);
    });
});
