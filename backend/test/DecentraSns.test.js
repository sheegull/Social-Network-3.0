const { ethers } = require("hardhat");
const { assert } = require("console");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { deflateRawSync } = require("zlib");

describe("decentrasns", function () {
    // ヘルパー関数
    async function deployContract() {
        const [owner, user1, user2] = await ethers.getSigners();

        const Decentrasns = await ethers.getContractFactory("decentrasns");
        const decentrasns = await Decentrasns.deploy();
        await decentrasns.deployed();

        return { owner, user1, user2, decentrasns };
    }

    async function getTimestamp() {
        const block = await ethers.provider.getBlockNumber();
        const blockTimestamp = (await ethers.provider.getBlock(block)).timestamp + 1;

        return blockTimestamp;
    }

    describe("uploadPost", function () {
        it("Should return error", async function () {
            const { owner, decentrasns } = await loadFixture(deployContract);

            expect(decentrasns.uploadPost("")).to.be.revertedWith("Cannot pass an empty text");
        });

        it("Should upload a post", async function () {
            const { owner, user1, decentrasns } = await loadFixture(deployContract);
            const { blockTimestamp } = await loadFixture(getTimestamp);

            // TEST #1 by owner
            // await expect(decentrasns.uploadPost("hello world!"))
            //     .to.emit(decentrasns, "NewPosted")
            //     .withArgs(1, "hello world!", owner.address, blockTimestamp);

            let tx = await decentrasns.uploadPost("hello world!");
            await tx.wait();

            let postCount = await decentrasns.postCount();
            expect(postCount).to.equal(1);

            let post = await decentrasns.posts(postCount);
            expect(post.id).to.equal(1);
            expect(post.text).to.equal("hello world!");
            expect(post.from).to.equal(owner.address);
            // await expect(await post.timestamp).to.equal(blockTimestamp);

            // TEST #2 by user1
            tx = await decentrasns.connect(user1).uploadPost("new world!");
            await tx.wait();

            postCount = await decentrasns.postCount();
            expect(postCount).to.equal(2);

            post = await decentrasns.posts(postCount);
            expect(post.id).to.equal(2);
            expect(post.text).to.equal("new world!");
            expect(post.from).to.equal(user1.address);
            // expect(post.timestamp).to.equal(Date.now());

            // await expect(tx)
            //     .to.emit(decentrasns, "NewPosted")
            //     .withArgs(2, "new world!", user1.address, Date.now());
        });
    });

    describe("getAllPosts", function () {
        it("Should return all the posts", async function () {
            const { owner, user1, decentrasns } = await loadFixture(deployContract);

            let tx = await decentrasns.uploadPost("hello world!");
            await tx.wait();

            let allPosts = await decentrasns.getAllPosts();
            expect(allPosts.length).to.equal(1);

            tx = await decentrasns.connect(user1).uploadPost("new world!");
            await tx.wait();

            allPosts = await decentrasns.getAllPosts();
            expect(allPosts.length).to.equal(2);
        });
    });
});
