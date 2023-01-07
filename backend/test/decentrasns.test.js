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
            expect(post.from).to.equal(owner.address);
            expect(post.likeCount).to.equal(0);

            // TEST #2 by user1
            // check emit test
            await expect(decentrasns.connect(user1).uploadPost("new world!")).to.emit(
                decentrasns,
                "NewPosted"
            );

            postCount = await decentrasns.postCount();
            expect(postCount).to.equal(2);

            post = await decentrasns.posts(postCount);
            expect(post.id).to.equal(2);
            expect(post.text).to.equal("new world!");
            expect(post.from).to.equal(user1.address);
            expect(post.likeCount).to.equal(0);
        });
    });

    describe("changeLikePost", function () {
        it("Should return error", async function () {
            const { owner, user1, user2, decentrasns } = await loadFixture(deployContract);

            let tx = await decentrasns.connect(user1).uploadPost("hello world!");
            await tx.wait();
            let postCount = await decentrasns.postCount();
            expect(postCount).to.equal(1);

            tx = await decentrasns.connect(user2).uploadPost("new world!");
            await tx.wait();
            let postCount2 = await decentrasns.postCount();
            expect(postCount2).to.equal(2);

            let post = await decentrasns.posts(postCount);
            expect(post.id).to.equal(1);
            expect(post.text).to.equal("hello world!");
            expect(post.from).to.equal(user1.address);
            expect(post.likeCount).to.equal(0);
        });

        it("Should add/remove like", async function () {
            const { owner, user1, user2, decentrasns } = await loadFixture(deployContract);

            let tx = await decentrasns.connect(user1).uploadPost("hello world!");
            await tx.wait();

            let postCount = await decentrasns.postCount();
            expect(postCount).to.equal(1);

            let post = await decentrasns.posts(postCount);
            expect(post.id).to.equal(1);
            expect(post.text).to.equal("hello world!");
            expect(post.from).to.equal(user1.address);
            expect(post.likeCount).to.equal(0);

            // addLike test
            let addLike = await decentrasns.changeLikePost(postCount);
            await addLike.wait();

            post = await decentrasns.posts(postCount);
            expect(post.id).to.equal(1);
            expect(post.likeCount).to.equal(1);

            // removeLike test
            let removeLike = await decentrasns.changeLikePost(postCount);
            await removeLike.wait();

            post = await decentrasns.posts(postCount);
            expect(post.id).to.equal(1);
            expect(post.likeCount).to.equal(0);

            // addLike by other user
            addLike = await decentrasns.connect(user2).changeLikePost(postCount);
            await addLike.wait();

            post = await decentrasns.posts(postCount);
            expect(post.id).to.equal(1);
            expect(post.likeCount).to.equal(1);

            addLike = await decentrasns.connect(user2).changeLikePost(postCount);
            await addLike.wait();

            post = await decentrasns.posts(postCount);
            expect(post.id).to.equal(1);
            expect(post.likeCount).to.be.reverted;
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

    describe("getLikesPost", function () {
        it("Should return users who have liked the post", async function () {
            const { owner, user1, user2, decentrasns } = await loadFixture(deployContract);

            let tx = await decentrasns.uploadPost("hello world!");
            await tx.wait();

            let postCount = await decentrasns.postCount();
            expect(postCount).to.equal(1);

            let addLike = await decentrasns.connect(user1).changeLikePost(postCount);
            await addLike.wait();

            addLike = await decentrasns.connect(user2).changeLikePost(postCount);
            await addLike.wait();

            post = await decentrasns.posts(postCount);
            expect(post.id).to.equal(1);
            expect(post.likeCount).to.equal(2);

            let LikesPost = await decentrasns.getLikesPost(postCount);
            expect(LikesPost.length).to.equal(2);
            expect(LikesPost[0].from).to.equal(user1.address);
            expect(LikesPost[0].isLiked).to.equal(true);
            expect(LikesPost[1].from).to.equal(user2.address);
            expect(LikesPost[1].isLiked).to.equal(true);
        });
    });
});
