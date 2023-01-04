import TopNav from "../TopNav/TopNav";
import { BsPlusCircleFill } from "react-icons/bs";

const Feed = () => {
    return (
        <div className="content-container">
            <TopNav />
            <div className="content-list">
                <Post
                    name="Ada"
                    timestamp="one week ago"
                    text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
                />
                <Post name="Leon" timestamp="one week ago" text={`Lorem ipsum dolor. `} />
                <Post name="Jill" timestamp="5 days ago" text={`Lorem.`} />
                <Post
                    name="Ellie"
                    timestamp="4 days ago"
                    text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. `}
                />
                <Post
                    name="Chris"
                    timestamp="4 days ago"
                    text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
                />
                <Post
                    name="Claire"
                    timestamp="2 days ago"
                    text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. `}
                />
                <Post
                    name="Albert"
                    timestamp="22 hours ago"
                    text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. ☺️ `}
                />
                <Post
                    name="Rebecca"
                    timestamp="3 hours ago"
                    text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.`}
                />
                <Post
                    name="H.U.N.K"
                    timestamp="Just now"
                    text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
                />
            </div>
            <BottomBar />
        </div>
    );
};

const BottomBar = () => (
    <div className="bottom-bar">
        <PlusIcon />
        <input type="text" placeholder="Enter message..." className="bottom-bar-input" />
    </div>
);

const Post = ({ name, timestamp, text }) => {
    const seed = Math.round(Math.random() * 100);
    return (
        <div className={"post"}>
            <div className="avatar-wrapper">
                <img
                    src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
                    alt=""
                    className="avatar"
                />
            </div>

            <div className="post-content">
                <p className="post-owner">
                    {name}
                    <small className="timestamp">{timestamp}</small>
                </p>
                <p className="post-text">{text}</p>
            </div>
        </div>
    );
};

const PlusIcon = () => (
    <BsPlusCircleFill size="22" className="text-yellow-600 shadow-lg mx-2 text-primary" />
);

export default Feed;
