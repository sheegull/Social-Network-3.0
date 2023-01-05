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
                {/* <Post
                    name="Ada"
                    timestamp="one week ago"
                    text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
                />
                <Post name="Leon" timestamp="one week ago" text={`Lorem ipsum dolor. `} />
                <Post name="Jill" timestamp="5 days ago" text={`Lorem.`} />
                <Post
                    name="Ellie"
                    timestamp="4 days ago"
                    text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. `}
                /> */}
                {currentAccount &&
                    allPosts
                        .slice(0)
                        .reverse()
                        .map((post, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        width: "600px",
                                        backgroundColor: "gray",
                                        marginTop: "16px",
                                        padding: "8px",
                                    }}
                                >
                                    <div>#{post.id}</div>
                                    <div>@{post.from}</div>
                                    <div>
                                        Posted at:
                                        {new Date(post.timestamp.toNumber().toString() * 1000)
                                            .toString()
                                            .substring(
                                                0,
                                                new Date(
                                                    post.timestamp.toNumber().toString() * 1000
                                                )
                                                    .toString()
                                                    .indexOf("GMT")
                                            )}
                                    </div>
                                    <div className="text">Text:{post.text}</div>
                                    <div>
                                        {currentAccount && (
                                            <button
                                                aria-label="favorite"
                                                size="small"
                                                color="primary"
                                                onClick={() => changeLikePost(post.id)}
                                            >
                                                <HiOutlineHeart />
                                                {post.likeCount}
                                            </button>
                                        )}
                                    </div>
                                </div>
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

const Post = ({ name, timestamp, text }) => {
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
                    {name}
                    <small className="timestamp">{timestamp}</small>
                </p>
                <p className="post-text">{text}</p>
            </div>
        </div>
    );
};

export default Feed;
