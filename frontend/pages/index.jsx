import Layout from "../components/layout/Layout";
import { useWallet } from "../hooks/useWallet";
import SideBar from "../components/Sidebar/Sidebar";
import ChannelBar from "../components/ChannelBar/ChannelBar";
import Feed from "../components/Feed/Feed";
import Login from "../components/Form/Login";

const Home = () => {
    const { currentAccount, connectWallet } = useWallet();

    return (
        <Layout home>
            {/* main page */}
            {currentAccount ? (
                <div className="flex">
                    <SideBar />
                    <ChannelBar />
                    <Feed />
                </div>
            ) : (
                // login page
                <div className="flex">
                    {/* <SideBar /> */}
                    <Login connectWallet={connectWallet} />
                </div>
            )}
        </Layout>
    );
};

export default Home;
