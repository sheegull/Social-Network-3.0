import { BsPlus, BsGlobe2, BsGearFill } from "react-icons/bs";

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-gray-900 shadow-lg">
            <SideBarGlobalIcon icon={<BsGlobe2 size="28" />} />
            <Divider />
            <SideBarPlusIcon icon={<BsPlus size="32" />} />
            <SideBarPlusIcon icon={<BsPlus size="32" />} />
            <SideBarPlusIcon icon={<BsPlus size="32" />} />
            <Divider />
            <SideBarGearIcon icon={<BsGearFill size="22" />} />
        </div>
    );
};

const SideBarGlobalIcon = ({ icon, text = "Global" }) => (
    <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
);

const SideBarPlusIcon = ({ icon, text = "Plus" }) => (
    <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
);

const SideBarGearIcon = ({ icon, text = "Setting" }) => (
    <div className="sidebar-icon2 group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
