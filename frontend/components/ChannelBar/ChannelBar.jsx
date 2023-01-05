import { useState } from "react";
import { BsHash } from "react-icons/bs";
import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa";

const sort = ["sortByDate", "sortByLike"];
const tip = ["send", "receive"];
const bookmark = ["UNCHAIN", "STAR PASS"];

const ChannelBar = () => {
    return (
        <div className="channel-bar shadow-lg">
            <ChannelBlock />
            <div className="channel-container">
                <Dropdown header="Sort" selections={sort} />
                <Dropdown header="Tip" selections={tip} />
                <Dropdown header="Bookmark" selections={bookmark} />
            </div>
        </div>
    );
};

const Dropdown = ({ header, selections }) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="dropdown">
            <div onClick={() => setExpanded(!expanded)} className="dropdown-header">
                <ChevronIcon expanded={expanded} />
                <h5 className={expanded ? "dropdown-header-text-selected" : "dropdown-header-text"}>
                    {header}
                </h5>
                <FaPlus size="12" className="text-accent text-opacity-80 my-auto ml-auto" />
            </div>
            {expanded &&
                selections &&
                selections.map((selection, index) => (
                    <ActionSelection selection={selection} key={index} />
                ))}
        </div>
    );
};

const ChevronIcon = ({ expanded }) => {
    const chevClass = "text-accent text-opacity-80 my-auto mr-1";
    return expanded ? (
        <FaChevronDown size="14" className={chevClass} />
    ) : (
        <FaChevronRight size="14" className={chevClass} />
    );
};

const ActionSelection = ({ selection }) => (
    <div className="dropdown-selection">
        <BsHash size="24" className="text-gray-400" />
        <h5 className="dropdown-selection-text">{selection}</h5>
    </div>
);

const ChannelBlock = () => (
    <div className="channel-block">
        <h5 className="channel-block-text">actions</h5>
    </div>
);

export default ChannelBar;
