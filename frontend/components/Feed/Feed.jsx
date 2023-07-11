import TopNav from "../TopNav/TopNav";
import PostBox from "../Form/PostBox";
import { HiOutlineHeart } from "react-icons/hi2";
import { BiSort } from "react-icons/bi";
import { IoTime } from "react-icons/io5";

import { MdFavorite } from "react-icons/md";

import { useWallet } from "../../hooks/useWallet";
import { useDsnsContract } from "../../hooks/useDsnsContract";
import Loading from "../Loading/Loading";

const Feed = () => {
    const { currentAccount } = useWallet();
    const {
        isLoading,
        allPosts,
        likePosts,
        uploadPost,
        changeLikePost,
        sortByTimestamp,
        sortByLike,
    } = useDsnsContract({
        currentAccount,
    });

    return (
        <div className="content-container">
            <TopNav />
            <Loading isLoading={isLoading} />
            <div className="content-list">
                {/* sort-button設置 */}
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
                {/* 全てのpostsを表示 */}
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
                                    {/* いいねボタン設置 */}
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
            {/* 投稿ボタン設置 */}
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
            {/* 表示用のアバター用意
            レンダリングごとにアバターが変わることに注意 */}
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
