import { FaSearch, FaHashtag, FaRegBell, FaUserCircle, FaMoon } from "react-icons/fa";

const TopNav = () => {
    return (
        <div className="top-navigation">
            <HashtagIcon />
            <Title />
            <ThemeIcon />
            <Search />
            <BellIcon />
            <UserCircle />
        </div>
    );
};

const ThemeIcon = () => {
    return (
        <span onClick={""}>
            <FaMoon size="24" className="top-navigation-icon" />
        </span>
    );
};

const Search = () => (
    <div className="search">
        <input className="search-input" type="text" placeholder="Search..." />
        <FaSearch size="18" className="text-secondary my-auto" />
    </div>
);
const BellIcon = () => <FaRegBell size="24" className="top-navigation-icon" />;
const UserCircle = () => <FaUserCircle size="24" className="top-navigation-icon" />;
const HashtagIcon = () => <FaHashtag size="20" className="title-hashtag" />;
const Title = () => <h5 className="title-text">Global</h5>;

export default TopNav;
