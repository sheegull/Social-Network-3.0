// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DecentraSns {
    // postIds を簡単に追跡するために提供するライブラリを呼び出しています。
    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

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

    mapping(address => uint256[]) public likedList;

    // 新しくpostが作成されたときに呼び出されるイベント
    event newPosted(
        uint256 id,
        address indexed from,
        string text,
        uint256 timestamp,
        uint256 like,
        bool isLiking
    );

    // 新しくpostがいいねされたときに呼び出されるイベント
    event newLiked(
        uint256 id,
        address indexed from,
        string text,
        uint256 timestamp,
        uint256 like,
        bool isLiking
    );

    constructor() {
        console.log("contract initialize");
    }

    // 投稿機能
    function uploadPost(string memory _text) public {
        uint256 newPostId = _postIds.current();

        Post memory newPost;
        newPost.id = newPostId + 1;
        newPost.from = msg.sender;
        newPost.text = _text;
        newPost.timestamp = block.timestamp;
        newPost.like = 0;
        newPost.isLiking = false;

        // 文字数制限（0文字投稿禁止）
        require(bytes(_text).length > 0, "Cannot pass an empty text");

        allPosts.push(newPost);
        _postIds.increment();

        // postが作成されたのでイベント発火
        emit newPosted(
            newPostId + 1,
            msg.sender,
            _text,
            block.timestamp,
            0,
            false
        );
    }

    // いいね機能
    function addLike(uint256 _id) public {
        // 二重いいねを禁止
        for (uint256 i = 0; i < likedList[msg.sender].length; i++) {
            if (likedList[msg.sender][i] == _id) {
                return;
            }
        }

        // いいね数の更新
        allPosts[_id].like++;
        likedList[msg.sender].push(_id);

        // likeの状態を保持させないため、Response用の配列を作る
        Post[] memory resPosts = allPosts;
        resPosts[_id].isLiking = true;

        // postにいいねが増えたのでイベント発火
        emit newLiked(
            resPosts[_id].id,
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
            resPosts[_id].id,
            resPosts[_id].from,
            resPosts[_id].text,
            resPosts[_id].timestamp,
            resPosts[_id].like,
            resPosts[_id].isLiking
        );
    }

    // TLにある全投稿を取得
    function getAllPosts() public view returns (Post[] memory) {
        Post[] memory resPosts = allPosts;
        // 投稿が0の場合
        if (resPosts.length == 0) {
            return resPosts;
        }

        //
        for (uint256 i = 0; i < resPosts.length; i++) {
            if (allPosts[i].id == _id) {
                result = allPosts[i];
                break;
            }
        }
        return result;
    }
}
