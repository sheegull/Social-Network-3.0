import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import { useWallet } from "../hooks/useWallet";
import { useDecentrasnsContract } from "../hooks/useDecentrasnsContract";
import PostBox from "../components/Form/PostBox";
import { HiOutlineHeart } from "react-icons/hi2";
import SideBar from "../components/Sidebar/Sidebar";
import ChannelBar from "../components/ChannelBar/ChannelBar";
import Feed from "../components/Feed/Feed";
import Image from "next/image";
import metamaskLogo from "../public/metamask.png";
import TopNav from "../components/TopNav/TopNav";
import twitterLogo from "../public/twitter.svg";

const TWITTER_HANDLE = "sheegull";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

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
            {currentAccount ? (
                <div className="flex">
                    <SideBar />
                    <ChannelBar />
                    <Feed />
                </div>
            ) : (
                <div className="flex">
                    <SideBar />
                    <Login connectWallet={connectWallet} />
                </div>
            )}
        </Layout>
    );
};

export default Home;

const Login = ({ connectWallet }) => {
    return (
        <div className="login-container">
            <Image alt="metamask" src={metamaskLogo} width={200} height={200} priority={true} />

            <div className="login-text">
                <p>Welcome to DecentraSNS 🧜</p>
                <p>Connect to Metamask !!</p>
            </div>
            <div className="connectwallet-button" onClick={() => connectWallet()}>
                Connect Wallet
            </div>
            <div className="footer-container">
                <Image alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
                <a
                    className="footer-text"
                    href={TWITTER_LINK}
                    target="_blank"
                    rel="noreferrer"
                >{`built on @${TWITTER_HANDLE}`}</a>
            </div>
        </div>
    );
};

/* <div className="mainContainer">
    <div className="dataContainer">
        {isLoading ? (
            <div>Loading...</div>
        ) : (
            <PostBox
                uploadPost={(text) => {
                    uploadPost({ text });
                }}
            />
        )}
    </div>
</div>; */
