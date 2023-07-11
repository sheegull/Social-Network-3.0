import Image from "next/image";
import metamaskLogo from "../../public/metamask.png";
import twitterLogo from "../../public/twitter.svg";

const TWITTER_HANDLE = "sheegull";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const Login = ({ connectWallet, handleGuestMode }) => {
    return (
        <div className="login-container">
            <Image alt="metamask" src={metamaskLogo} width={160} height={160} priority={true} />
            <div className="login-text">
                <p>Social Network 3.0🧜</p>
                <p>Connect to Metamask</p>
            </div>
            <div className="connectWallet-button" onClick={() => connectWallet()}>
                Connect Wallet
            </div>
            <div className="guestMode-button" onClick={() => handleGuestMode()}>
                ゲストの方はこちら
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

export default Login;
