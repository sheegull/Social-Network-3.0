// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract decentrasns is ERC721URIStorage {
    uint256 public tokenCount;
    uint256 public postCount;

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

    constructor() ERC721("decentrasns", "DSNS") {}

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
