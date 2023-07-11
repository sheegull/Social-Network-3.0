const { ethers } = require("hardhat");
const { assert } = require("console");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("dsns", function () {
  // helper functions
  async function deployContract() {
    const [owner, user1, user2] = await ethers.getSigners();

    const Dsns = await ethers.getContractFactory("dsns");
    const dsns = await Dsns.deploy();
    await dsns.deployed();

    return { owner, user1, user2, dsns };
  }

  describe("uploadPost", function () {
    it("Should return error", async function () {
      const { owner, dsns } = await loadFixture(deployContract);

      expect(dsns.uploadPost("")).to.be.revertedWith("Cannot pass an empty text");
    });

    it("Should upload a post", async function () {
      const { owner, user1, dsns } = await loadFixture(deployContract);

      // TEST #1 by owner
      let tx = await dsns.uploadPost("hello world!");
      await tx.wait();

      let postCount = await dsns.postCount();
      expect(postCount).to.equal(1);

      let post = await dsns.posts(postCount);
      expect(post.id).to.equal(1);
      expect(post.text).to.equal("hello world!");
      expect(post.from).to.equal(owner.address);
      expect(post.likeCount).to.equal(0);

      // TEST #2 by user1
      // check emit test
      await expect(dsns.connect(user1).uploadPost("new world!")).to.emit(dsns, "NewPosted");

      postCount = await dsns.postCount();
      expect(postCount).to.equal(2);

      post = await dsns.posts(postCount);
      expect(post.id).to.equal(2);
      expect(post.text).to.equal("new world!");
      expect(post.from).to.equal(user1.address);
      expect(post.likeCount).to.equal(0);
    });
  });

  describe("changeLikePost", function () {
    it("Should add/remove like", async function () {
      const { owner, user1, user2, dsns } = await loadFixture(deployContract);

      let tx = await dsns.connect(user1).uploadPost("hello world!");
      await tx.wait();

      let postCount = await dsns.postCount();
      expect(postCount).to.equal(1);

      let post = await dsns.posts(postCount);
      expect(post.id).to.equal(1);
      expect(post.text).to.equal("hello world!");
      expect(post.from).to.equal(user1.address);
      expect(post.likeCount).to.equal(0);

      // add likeCount
      let addLike = await dsns.changeLikePost(postCount);
      await addLike.wait();

      post = await dsns.posts(postCount);
      expect(post.id).to.equal(1);
      expect(post.likeCount).to.equal(1);

      // remove likeCount
      let removeLike = await dsns.changeLikePost(postCount);
      await removeLike.wait();

      post = await dsns.posts(postCount);
      expect(post.id).to.equal(1);
      expect(post.likeCount).to.equal(0);

      // addLike by other user
      addLike = await dsns.connect(user2).changeLikePost(postCount);
      await addLike.wait();

      post = await dsns.posts(postCount);
      expect(post.id).to.equal(1);
      expect(post.likeCount).to.equal(1);

      addLike = await dsns.connect(user2).changeLikePost(postCount);
      await addLike.wait();

      post = await dsns.posts(postCount);
      expect(post.id).to.equal(1);
      expect(post.likeCount).to.be.reverted;
    });
  });

  describe("getAllPosts", function () {
    it("Should return all the posts", async function () {
      const { owner, user1, dsns } = await loadFixture(deployContract);

      let tx = await dsns.uploadPost("hello world!");
      await tx.wait();

      let allPosts = await dsns.getAllPosts();
      expect(allPosts.length).to.equal(1);

      tx = await dsns.connect(user1).uploadPost("new world!");
      await tx.wait();

      allPosts = await dsns.getAllPosts();
      expect(allPosts.length).to.equal(2);
    });
  });

  describe("getLikesPost", function () {
    it("Should return users who have liked the post", async function () {
      const { owner, user1, user2, dsns } = await loadFixture(deployContract);

      let tx = await dsns.uploadPost("hello world!");
      await tx.wait();

      let postCount = await dsns.postCount();
      expect(postCount).to.equal(1);

      let addLike = await dsns.connect(user1).changeLikePost(postCount);
      await addLike.wait();

      addLike = await dsns.connect(user2).changeLikePost(postCount);
      await addLike.wait();

      post = await dsns.posts(postCount);
      expect(post.id).to.equal(1);
      expect(post.likeCount).to.equal(2);

      let LikesPost = await dsns.getLikesPost(postCount);
      expect(LikesPost.length).to.equal(2);
      expect(LikesPost[0].from).to.equal(user1.address);
      expect(LikesPost[0].isLiked).to.equal(true);
      expect(LikesPost[1].from).to.equal(user2.address);
      expect(LikesPost[1].isLiked).to.equal(true);
    });
  });
});
