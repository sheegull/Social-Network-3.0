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
        string text;
        uint256 timestamp;
        uint256 like;
        bool isLiking;
    }

    // 新しくpostが作成されたときに呼び出されるイベント
    event PostCreated(
        uint256 id,
        address from,
        string text,
        uint256 timestamp,
        uint256 like,
        bool isLiking
    );

    constructor() {
        console.log("success");
    }

    function print(uint256 number) public view {
        console.log(number);
    }

    // 投稿機能の関数
    function uploadPost(string memory _text) public {
        uint256 newPostId = _postIds.current();
        uint256 _timestamp = block.timestamp;
        uint256 initLike = 0;
        bool initIsLiking = false;

        // 文字数制限（0文字投稿禁止）
        require(bytes(_text).length > 0, "Cannnot pass an empty text");

        // コントラクトにpostを追加
        posts[newPostId] = Post(
            newPostId,
            msg.sender,
            _text,
            _timestamp,
            initLike,
            initIsLiking
        );
        _postIds.increment();

        // postが作成されたのでイベント発火
        emit PostCreated(
            newPostId,
            msg.sender,
            _text,
            _timestamp,
            initLike,
            initIsLiking
        );
    }
}
