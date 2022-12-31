const { ethers } = require("hardhat");
const { assert } = require("console");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("decentrasns", function () {
    // ヘルパー関数
    async function deployContract() {
        const [owner, user1, user2] = await ethers.getSigners();

        const Decentrasns = await ethers.getContractFactory("decentrasns");
        const decentrasns = await Decentrasns.deploy();
        await decentrasns.deployed();

        return { owner, user1, user2, decentrasns };
    }

    describe("uploadPost", function () {
        it("Should return error", async function () {
            const { owner, decentrasns } = await loadFixture(deployContract);

            expect(decentrasns.uploadPost("")).to.be.revertedWith("Cannot pass an empty text");
        });
    });
});
