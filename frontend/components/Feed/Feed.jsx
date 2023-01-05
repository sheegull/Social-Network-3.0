import TopNav from "../TopNav/TopNav";
import PostBox from "../Form/PostBox";
import { HiOutlineHeart } from "react-icons/hi2";

import { useState } from "react";
import { useWallet } from "../../hooks/useWallet";
import { useDecentrasnsContract } from "../../hooks/useDecentrasnsContract";

const Feed = () => {
    const { currentAccount, connectWallet } = useWallet();
    const {
        isLoading,
        allPosts,
        likePosts,
        uploadPost,
        changeLikePost,
        sortByTimestamp,
        sortByLike,
    } = useDecentrasnsContract({
        currentAccount,
    });

    return (
        <div className="content-container">
            <TopNav />
            <div className="content-list">
                {currentAccount && (
                    <div className="sort">
                        <button className="sortButton" onClick={sortByTimestamp}>
                            sort Timestamp
                        </button>
                        <br />
                        <button className="sortButton" onClick={sortByLike}>
                            sort LikeCount
                        </button>
                    </div>
                )}
                {currentAccount &&
                    allPosts
                        .slice(0)
                        .reverse()
                        .map((post, index) => {
                            return (
                                <>
                                    <Post
                                        key={index}
                                        id={post.id}
                                        address={post.from}
                                        timestamp={new Date(
                                            post.timestamp.toNumber().toString() * 1000
                                        )
                                            .toString()
                                            .substring(
                                                0,
                                                new Date(
                                                    post.timestamp.toNumber().toString() * 1000
                                                )
                                                    .toString()
                                                    .indexOf("GMT")
                                            )}
                                        text={post.text}
                                        likeCount={post.likeCount}
                                    />
                                    <div className="like-content">
                                        <button onClick={() => changeLikePost(post.id)}>
                                            <LikeIcon icon={<HiOutlineHeart size="16" />} />
                                        </button>
                                        <div className="like-count">{post.likeCount}</div>
                                    </div>
                                </>
                            );
                        })}
            </div>

            <PostBox
                uploadPost={(text) => {
                    uploadPost({ text });
                }}
            />
        </div>
    );
};

const Post = ({ id, address, timestamp, text, likeCount }) => {
    const seed = Math.round(Math.random() * 100);
    return (
        <div className={"post"}>
            <div className="avatar-wrapper">
                <img
                    src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
                    alt=""
                    className="avatar"
                />
            </div>

            <div className="post-content">
                <p className="post-owner">
                    {address}
                    <small className="timestamp">{timestamp}</small>
                </p>
                <p className="post-text">{text}</p>
                {/* <HiOutlineHeart /> */}
                {/* <p>{likeCount}</p> */}
            </div>
        </div>
    );
};

const LikeIcon = ({ icon }) => <div className="like-icon group">{icon}</div>;

export default Feed;
