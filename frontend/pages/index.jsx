import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import RequireWallet from "../components/layout/RequireWallet";
import { useWallet } from "../hooks/useWallet";
import { useDecentrasnsContract } from "../hooks/useDecentrasnsContract";
import PostBox from "../components/Form/PostBox";
import { HiOutlineHeart } from "react-icons/hi2";
import SideBar from "../components/Sidebar/Sidebar";
import ChannelBar from "../components/ChannelBar/ChannelBar";
import Feed from "../components/Feed/Feed";

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
        <Layout home>
            <RequireWallet currentAccount={currentAccount} connectWallet={connectWallet}>
                <div className="flex">
                    <SideBar />
                    <ChannelBar />
                    <Feed />
                </div>
                <div className="mainContainer">
                    <div className="dataContainer">
                        {/* {isLoading ? (
                            <div>Loading...</div>
                        ) : (
                            <PostBox
                                uploadPost={(text) => {
                                    uploadPost({ text });
                                }}
                            />
                        )} */}
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
                    </div>
                </div>
            </RequireWallet>
        </Layout>
    );
};

export default Home;
