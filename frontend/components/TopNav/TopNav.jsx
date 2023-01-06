import { FaHashtag, FaUserCircle } from "react-icons/fa";
import { useWallet } from "../../hooks/useWallet";

// header
const TopNav = () => {
    const { currentAccount, connectWallet } = useWallet();
    return (
        <div className="top-navigation">
            <HashtagIcon />
            <Title />
            <Address currentAccount={currentAccount} connectWallet={connectWallet} />
            <UserCircle />
        </div>
    );
};

const Title = () => <h5 className="title-text">Global</h5>;
const HashtagIcon = () => <FaHashtag size="20" className="title-hashtag" />;
const Address = ({ currentAccount }) => <p className="address-text">{currentAccount}</p>;
const UserCircle = () => <FaUserCircle size="24" className="top-navigation-icon" />;

export default TopNav;
