import { useState } from "react";
import { BsHash } from "react-icons/bs";
import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa";

const post = ["upload post"];
const like = ["add like", "remove like"];
const sort = ["sort by date", "sort by like"];

const ChannelBar = () => {
    return (
        <div className="channel-bar shadow-lg">
            <ChannelBlock />
            <div className="channel-container">
                <Dropdown header="Post" selections={post} />
                <Dropdown header="Like" selections={like} />
                <Dropdown header="Sort" selections={sort} />
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
                    <FeatureSelection selection={selection} key={index} />
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

const FeatureSelection = ({ selection }) => (
    <div className="dropdown-selection">
        <BsHash size="18" className="text-gray-400" />
        <h5 className="dropdown-selection-text">{selection}</h5>
    </div>
);

const ChannelBlock = () => (
    <div className="channel-block">
        <h5 className="channel-block-text">features</h5>
    </div>
);

export default ChannelBar;
