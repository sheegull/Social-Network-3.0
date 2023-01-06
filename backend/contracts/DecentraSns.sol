// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract decentrasns is ERC721URIStorage {
    uint256 public postCount;

    struct Post {
        uint256 id;
        string text;
        address from;
        uint256 timestamp;
        uint256 likeCount;
    }

    struct Like {
        address from;
        bool isLiked;
    }

    // Post[] public posts;
    mapping(uint256 => Post) public posts;
    // postId と Like構造体を紐付ける
    mapping(uint256 => Like[]) public likes;

    event NewPosted(
        uint256 id,
        string text,
        address indexed from,
        uint256 timestamp,
        uint256 likeCount
    );

    event LikePost(uint256 postId, bool isLiked);

    constructor() ERC721("decentrasns", "DSNS") {}

    // post機能
    function uploadPost(string memory _text) public {
        // 0文字投稿禁止
        require(bytes(_text).length > 0, "Cannot pass an empty text");
        postCount++;

        // Post memory newPost;
        // newPost.id = postCount;
        // newPost.text = _text;
        // newPost.from = msg.sender;
        // newPost.timestamp = block.timestamp;
        // newPost.likeCount = 0;
        // posts.push(newPost);

        // 新規Postを作成
        posts[postCount] = Post({
            id: postCount,
            text: _text,
            from: msg.sender,
            timestamp: block.timestamp,
            likeCount: 0
        });

        emit NewPosted(postCount, _text, msg.sender, block.timestamp, 0);
    }

    // いいね・取り消し機能
    function changeLikePost(uint256 _postId) public {
        bool _exists = false;
        for (uint256 i = 0; i < likes[_postId].length; i++) {
            if (likes[_postId][i].from == msg.sender) {
                _exists = true;
                // いいね取り消し
                if (likes[_postId][i].isLiked) {
                    likes[_postId][i].isLiked = false;
                    emit LikePost(_postId, false);
                    posts[_postId].likeCount--;
                } else {
                    // いいね追加
                    likes[_postId][i].isLiked = true;
                    emit LikePost(_postId, true);
                    posts[_postId].likeCount++;
                }
            }
        }
        // 新規いいね追加
        if (!_exists) {
            posts[_postId].likeCount++;
            likes[_postId].push(Like(msg.sender, true));
            emit LikePost(_postId, true);
        }
    }

    // 全post取得機能
    function getAllPosts() public view returns (Post[] memory _posts) {
        // memoryとして保持するため、postCount分の長さを_posts配列に渡す
        _posts = new Post[](postCount);

        for (uint256 i = 0; i < _posts.length; i++) {
            // postsのPost.id=1から始まっているため
            _posts[i] = posts[i + 1];
        }
    }

    // postにいいねをしているユーザー取得
    function getLikesPost(
        uint256 _postId
    ) public view returns (Like[] memory _likes) {
        Like[] memory temp = new Like[](likes[_postId].length);
        uint256 count = 0;
        // _postIdのpostにいいねしているユーザー数を把握
        for (uint256 i = 0; i < likes[_postId].length; i++) {
            if (likes[_postId][i].isLiked) {
                temp[count] = likes[_postId][i];
                count++;
            }
        }

        // memoryとして保持するため、求めた長さを_likes配列に渡す
        _likes = new Like[](count);
        for (uint256 i = 0; i < count; i++) {
            _likes[i] = temp[i];
        }
    }
}
