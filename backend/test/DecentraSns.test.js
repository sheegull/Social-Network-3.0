const { ethers } = require("hardhat");
const { assert } = require("console");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("DecentraSns", function () {
    // ヘルパー関数
    async function deployContract() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const DsnsContractFactory = await hre.ethers.getContractFactory("DecentraSns");
        const decentrasns = await DsnsContractFactory.deploy();
        await decentrasns.deployed();

        return { owner, addr1, addr2, decentrasns };
    }

    // 新規投稿機能の確認
    describe("uploadPost", function () {
        it("Should return error", async function () {
            const { owner, decentrasns } = await loadFixture(deployContract);
            await expect(decentrasns.connect(owner).uploadPost("")).to.be.revertedWith(
                "Cannot pass an empty text"
            );
        });

        it("Should return the uploadPost", async function () {
            const { owner, addr1, decentrasns } = await loadFixture(deployContract);
            let txn = await decentrasns.uploadPost("owner: test #1");
            await txn.wait();

            // await expect(decentrasns.)
        });
    });

    // describe("uploadPost", function () {
    //     it("Should track posts uploaded by users", async function () {
    //         const { addr1, decentrasns } = await loadFixture(deployContract);
    //         // ユーザーが新規投稿
    //         // await expect(decentrasns.connect(addr1).uploadPost(text))
    //         //     .to.emit(decentrasns, "PostCreated")
    //         //     .withArgs(0, addr1.address, text, await decentrasns.send("evm_mine"), 0, false);
    //         // const postIds = await decentrasns._postIds();
    //         // expect(postIds).to.equal(1);
    //         const postTxn = await decentrasns.connect(addr1).uploadPost("addr1 post#1");
    //         await postTxn.wait();
    //         const postTxn2 = await decentrasns.connect(addr1).uploadPost("addr1 post#2");
    //         await postTxn2.wait();
    //         const postTxn3 = await decentrasns.connect(addr1).uploadPost("addr1 post#3");
    //         await postTxn3.wait();
    //         const postTxn4 = await decentrasns.uploadPost("addr2 post#1");
    //         await postTxn4.wait();
    //         const postTxn5 = await decentrasns.uploadPost("addr2 post#2");
    //         await postTxn5.wait();
    //     });
    // });
});
