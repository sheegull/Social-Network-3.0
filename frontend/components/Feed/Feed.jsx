import TopNav from "../TopNav/TopNav";
import PostBox from "../Form/PostBox";
import { IoTime } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import { HiOutlineHeart } from "react-icons/hi2";
import { MdFavorite } from "react-icons/md";

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
            {isLoading ? (
                <button disabled type="button" className="loading-content">
                    <svg
                        aria-hidden="true"
                        role="status"
                        className="loading"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                        />
                    </svg>
                    Transaction...
                </button>
            ) : (
                ""
            )}
            <div className="content-list">
                {currentAccount && (
                    <div className="sort-content">
                        <button onClick={sortByTimestamp}>
                            <SortByTimestampIcon
                                icon={<IoTime size="20" />}
                                icon2={<BiSort size="20" />}
                            />
                        </button>
                        <br />
                        <button onClick={sortByLike}>
                            <SortByLikeIcon
                                icon={<MdFavorite size="20" />}
                                icon2={<BiSort size="20" />}
                            />
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

const SortByTimestampIcon = ({ icon, icon2, text = "Sort By Date" }) => (
    <div className="sort-date-button group">
        {icon}
        {icon2}
        <span className="sort-tooltip group-hover:scale-100">{text}</span>
    </div>
);
const SortByLikeIcon = ({ icon, icon2, text = "Sort By Like" }) => (
    <div className="sort-like-button group">
        {icon}
        {icon2}
        <span className="sort-tooltip group-hover:scale-100">{text}</span>
    </div>
);
const LikeIcon = ({ icon }) => <div className="like-icon group">{icon}</div>;

export default Feed;
