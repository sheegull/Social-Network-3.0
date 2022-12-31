// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract decentrasns {
    uint256 tokenCount;
    uint256 postCount;

    struct Post {
        uint256 id;
        string text;
        address author;
        uint256 timestamp;
    }

    // postId と postの構造体をマッピング
    mapping(uint256 => Post) public posts;

    // 新規投稿時に発火するイベント
    event NewPosted(
        uint256 id,
        string text,
        address indexed author,
        uint256 timestamp
    );

    constructor() {
        console.log("first smart contract");
    }

    // post機能
    function uploadPost(string memory _text) public {
        // 0文字投稿禁止
        require(bytes(_text).length > 0, "Cannot pass an empty text");
        postCount++;

        // 新規postをpostsに紐付ける
        posts[postCount] = Post(postCount, _text, msg.sender, block.timestamp);

        // postが作成されたのでイベント発火
        emit NewPosted(postCount, _text, msg.sender, block.timestamp);
    }
}
