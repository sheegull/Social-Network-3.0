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
                {currentAccount &&
                    allPosts
                        .slice(0)
                        .reverse()
                        .map((post, index) => {
                            return (
                                <Post
                                    key={index}
                                    address={post.from}
                                    timestamp={new Date(post.timestamp.toNumber().toString() * 1000)
                                        .toString()
                                        .substring(
                                            0,
                                            new Date(post.timestamp.toNumber().toString() * 1000)
                                                .toString()
                                                .indexOf("GMT")
                                        )}
                                    text={post.text}
                                    //     <div>
                                    //         {currentAccount && (
                                    //             <button
                                    //                 aria-label="favorite"
                                    //                 size="small"
                                    //                 color="primary"
                                    //                 onClick={() => changeLikePost(post.id)}
                                    //             >
                                    //                 <HiOutlineHeart />
                                    //                 {post.likeCount}
                                    //             </button>
                                    //         )}
                                    //     </div>
                                    // </div>
                                />
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

const Post = ({ address, timestamp, text }) => {
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
            </div>
        </div>
    );
};

export default Feed;
