import styles from "./RequireWallet.module.css";
import Image from "next/image";
import metamaskLogo from "../../public/metamask.png";

const style = {
    wrapper: `flex h-screen w-screen overflow-hidden select-none bg-[#121212] text-[#f2f2f2] font-light`,
    content: ` w-full flex justify-between`,
    option: `justify-between w-1/6 mx-10 my-7 `,
    feed: `w-1/2 mr-10 `,
    widgets: "w-1/4 mr-10 my-7 h-screen w-screen overflow-y-scroll scrollbar-hide",
    loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
    connectWalletButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
    loginContent: `text-3xl font-bold text-center leading-10 mt-28`,
};

// walletへの接続状況で LoginPage or HomePage を表示
export default function RequireWallet({ children, currentAccount, connectWallet }) {
    return (
        <div>
            {currentAccount ? (
                <div>
                    <div className={styles.wallet}>
                        <p className={styles.title}>wallet: </p>
                        <p>{currentAccount}</p>
                    </div>
                    {children}
                </div>
            ) : (
                <div className={style.loginContainer}>
                    <Image
                        alt="metamask"
                        src={metamaskLogo}
                        width={200}
                        height={200}
                        priority={true}
                    />
                    <div className={style.connectWalletButton} onClick={() => connectWallet()}>
                        Connect Wallet
                    </div>
                    <div className={style.loginContent}>
                        <p>Welcome to DecentraSNS 🧜</p>
                        <p>Connect to Metamask !!</p>
                    </div>
                </div>
            )}
        </div>
    );
}
