// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DecentraSns {
    // postIds を簡単に追跡するために提供するライブラリを呼び出しています。
    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    struct User {
        address id;
        // string iconUrl;
    }

    struct Post {
        uint256 id;
        address from;
        string text;
        uint256 timestamp;
        uint256 like;
        bool isLiking;
    }

    // 全投稿を格納する配列
    Post[] public allPosts;

    mapping(address => User) public users;
    mapping(address => Post[]) public likedList;

    // 新しくpostが作成されたときに呼び出されるイベント
    event newPosted(address indexed from);

    // 新しくpostがいいねされたときに呼び出されるイベント
    event newLiked(
        uint256 postId,
        address indexed from,
        string text,
        uint256 timestamp,
        uint256 like,
        bool isLiking
    );

    constructor() {
        console.log("success");
    }

    // 投稿機能
    function uploadPost(string memory _text) public {
        uint256 newPostId = _postIds.current();

        Post memory newPost;
        Post.id = newPostId + 1;
        Post.from = msg.sender;
        Post.text = _text;
        Post.timestamp = block.timestamp;
        Post.like = 0;
        Post.isLiking = false;

        // 文字数制限（0文字投稿禁止）
        require(bytes(_text).length > 0, "Cannnot pass an empty text");

        allPosts.push(newPost);
        _postIds.increment();

        // postが作成されたのでイベント発火
        emit newPosted(msg.sender);
    }

    // いいね機能
    function addLike(uint256 _id) public {
        // 二重いいねを禁止
        for (uint256 i = 0; i < likedList[msg.sender].length; i++) {
            if (likedList[msg.sender][i].id == _id) return;
        }

        // いいね数の更新
        allPosts[_id].like++;
        likedList[msg.sender].push(_id);

        // likeの状態を保持させないため、Response用の配列を作る
        Post[] memory resPosts = allPosts;
        resPosts[_id].isLiking = true;

        // postにいいねが増えたのでイベント発火
        emit newLiked(
            resPosts[_id].postId,
            resPosts[_id].from,
            resPosts[_id].text,
            resPosts[_id].timestamp,
            resPosts[_id].like,
            resPosts[_id].isLiking
        );
    }

    // いいね取り消し機能
    function removeLike(uint256 _id) public {
        // いいね数の更新
        allPosts[_id].like--;
        likedList[msg.sender].push(_id);

        // likeの状態を保持させないため、Response用の配列を作る
        Post[] memory resPosts = allPosts;
        resPosts[_id].isLiking = false;

        // postのいいねが減ったのでイベント発火
        emit newLiked(
            resPosts[_id].postId,
            resPosts[_id].from,
            resPosts[_id].text,
            resPosts[_id].timestamp,
            resPosts[_id].like,
            resPosts[_id].isLiking
        );
    }
}
