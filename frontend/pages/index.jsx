import { useState } from "react";
import Layout from "../components/layout/Layout";
import { useWallet } from "../hooks/useWallet";
import SideBar from "../components/Sidebar/Sidebar";
import ChannelBar from "../components/ChannelBar/ChannelBar";
import Feed from "../components/Feed/Feed";
import Login from "../components/Form/Login";

const Home = () => {
    const { currentAccount, connectWallet } = useWallet();
    const [useGuestMode, setUseGuestMode] = useState(false);

    const handleGuestMode = () => {
        setUseGuestMode(true);
    };

    return (
        <Layout home>
            {/* main page */}
            {currentAccount || useGuestMode ? (
                <div className="flex">
                    <SideBar />
                    <ChannelBar />
                    <Feed />
                </div>
            ) : (
                // login page
                <div className="flex">
                    <Login connectWallet={connectWallet} handleGuestMode={handleGuestMode} />
                </div>
            )}
        </Layout>
    );
};

export default Home;
