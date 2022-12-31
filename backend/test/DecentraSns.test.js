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

    describe("uploadPost", function () {
        it("Should return error", async function () {
            const { owner, decentrasns } = await loadFixture(deployContract);

            expect(decentrasns.uploadPost("")).to.be.revertedWith("Cannot pass an empty text");
        });

        it("Should upload a post", async function () {
            const { owner, user1, decentrasns } = await loadFixture(deployContract);

            // TEST #1 by owner
            let tx = await decentrasns.uploadPost("hello world!");
            await tx.wait();

            let postCount = await decentrasns.postCount();
            expect(postCount).to.equal(1);

            let post = await decentrasns.posts(postCount);
            expect(post.id).to.equal(1);
            expect(post.text).to.equal("hello world!");
            expect(post.author).to.equal(owner.address);
            // expect(post.timestamp).to.equal(Date.now());

            // await expect(tx)
            //     .to.emit(decentrasns, "NewPosted")
            //     .withArgs(1, "hello world!", owner.address, Date.now());

            // TEST #2 by user1
            tx = await decentrasns.connect(user1).uploadPost("new world!");
            await tx.wait();

            postCount = await decentrasns.postCount();
            expect(postCount).to.equal(2);

            post = await decentrasns.posts(postCount);
            expect(post.id).to.equal(2);
            expect(post.text).to.equal("new world!");
            expect(post.author).to.equal(user1.address);
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
