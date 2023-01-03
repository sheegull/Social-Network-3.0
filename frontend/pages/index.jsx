import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import RequireWallet from "../components/layout/RequireWallet";
import { useWallet } from "../hooks/useWallet";
import { useDecentrasnsContract } from "../hooks/useDecentrasnsContract";
import SendMessageForm from "../components/postBox";

const style = {
    wrapper: `flex h-screen w-screen overflow-hidden select-none bg-[#121212] text-[#f2f2f2] font-light`,
    content: ` w-full flex justify-between`,
    option: `justify-between w-1/6 mx-10 my-7 `,
    feed: `w-1/2 mr-10 `,
    widgets: "w-1/4 mr-10 my-7 h-screen w-screen overflow-y-scroll scrollbar-hide",
    loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
    walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
    loginContent: `text-3xl font-bold text-center mt-24`,
};

const Home = () => {
    const { currentAccount, connectWallet } = useWallet();
    const { isLoading, allPosts, uploadPost } = useDecentrasnsContract({ currentAccount });
    const [text, setText] = useState("");

    return (
        <Layout home>
            <RequireWallet currentAccount={currentAccount} connectWallet={connectWallet}>
                <div className="mainContainer">
                    <div className="dataContainer">
                        <div className="header">
                            <span role="img" aria-label="hand-wave">
                                👋
                            </span>{" "}
                            WELCOME
                        </div>
                        <div className="bio">メッセージを作成して投稿をBlockchainに記録しよう</div>
                        <br />
                        {/* {currentAccount && (
                            <textarea
                                className="textArea"
                                name="tweetArea"
                                placeholder="メッセージを入力"
                                type="text"
                                id="tweet"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        )} */}
                        {/* <div className="icons">
                            <div className="loading">{isLoading && <div>Loading...</div>}</div>
                            {currentAccount && (
                                <button className="waveButton" onClick={uploadPost}>
                                    投稿
                                </button>
                            )}
                        </div> */}
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : (
                            <SendMessageForm
                                sendMessage={(text) => {
                                    uploadPost({ text });
                                }}
                            />
                        )}
                        {/* {currentAccount && (
                            <div className="sort">
                                <button className="sortButton" onClick={""}>
                                    sort Date
                                </button>
                                <button className="sortButton" onClick={""}>
                                    sort LikeCount
                                </button>
                            </div>
                        )} */}
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
                                                {new Date(
                                                    post.timestamp.toNumber().toString() * 1000
                                                )
                                                    .toString()
                                                    .substring(
                                                        0,
                                                        new Date(
                                                            post.timestamp.toNumber().toString() *
                                                                1000
                                                        )
                                                            .toString()
                                                            .indexOf("GMT")
                                                    )}
                                            </div>
                                            <div className="text">Text:{post.text}</div>
                                            {/* <div>
                                                {!post.likeFlag ? (
                                                    <IconButton
                                                        aria-label="favorite"
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => like(post.postId)}
                                                    >
                                                        <FavoriteBorderIcon />
                                                        {post.likes}
                                                    </IconButton>
                                                ) : (
                                                    <IconButton
                                                        aria-label="favorite"
                                                        size="small"
                                                        color="secondary"
                                                        onClick={() => unlike(post.postId)}
                                                    >
                                                        <FavoriteBorderIcon />
                                                        {post.likes}
                                                    </IconButton>
                                                )}
                                            </div>
                                            <div>
                                                <IconButton
                                                    aria-label="favorite"
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => tip(post.address)}
                                                >
                                                    <PaymentIcon />
                                                    Tip
                                                </IconButton>
                                            </div> */}
                                        </div>
                                    );
                                })}
                    </div>
                </div>
            </RequireWallet>
        </Layout>
    );
};

export default Home;
