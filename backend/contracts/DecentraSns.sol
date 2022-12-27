// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DecentraSns {
    // postIds を簡単に追跡するために提供するライブラリを呼び出しています。
    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    // postid --> Post
    mapping(uint256 => Post) public posts;

    struct Post {
        uint256 id;
        address from;
        string message;
        uint256 timestamp;
        uint256 like;
        bool likeFlg;
    }

    // 新しくpostが作成されたときに呼び出されるイベント
    event PostCreated(
        uint256 id,
        address from,
        string message,
        uint256 timestamp,
        uint256 like,
        bool likeFlg
    );

    constructor() {
        console.log("success");
    }

    // 投稿機能の関数
    function uploadPost(string memory _message) public {
        uint256 newPostId = _postIds.current();
        uint256 _timestamp = block.timestamp;
        uint256 initLike = 0;
        bool initLikeFlg = false;

        // 文字数制限（0文字投稿禁止）
        require(bytes(_message).length > 0, "Cannnot pass an empty message");

        // コントラクトにpostを追加
        posts[newPostId] = Post(
            newPostId,
            msg.sender,
            _message,
            _timestamp,
            initLike,
            initLikeFlg
        );
        _postIds.increment();

        // postが作成されたのでイベント発火
        emit PostCreated(
            newPostId,
            msg.sender,
            _message,
            _timestamp,
            initLike,
            initLikeFlg
        );
    }
}
