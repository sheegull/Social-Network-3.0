import styles from "../styles/Home.module.css";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import RequireWallet from "../components/layout/RequireWallet";
import { useWallet } from "../hooks/useWallet";

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

    return (
        <Layout home>
            <RequireWallet currentAccount={currentAccount} connectWallet={connectWallet}>
                <div className={styles.container}>
                    <main className={styles.main}>
                        <h1 className={styles.title}>Welcome to Messenger 📫</h1>
                        <div className={styles.card}>
                            <Link href="/message/SendMessagePage">
                                <h2>send &rarr;</h2>
                            </Link>
                            <p>send messages and avax to other accounts</p>
                        </div>

                        <div className={styles.card}>
                            <Link href="/message/ConfirmMessagePage">
                                <h2>check &rarr;</h2>
                            </Link>
                            <p>Check messages from other accounts</p>
                        </div>
                    </main>
                </div>
            </RequireWallet>
        </Layout>
    );
};

export default Home;
