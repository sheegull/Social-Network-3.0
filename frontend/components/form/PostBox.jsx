import { BsPlusCircleFill } from "react-icons/bs";
import { useState } from "react";

const PlusIcon = () => (
    <BsPlusCircleFill size="22" className="text-yellow-500 shadow-lg mx-2 text-primary" />
);

export default function PostBox({ uploadPost }) {
    const [textValue, setTextValue] = useState("");

    return (
        <div className="post-box">
            <PlusIcon />
            <input
                type="text"
                placeholder="Enter message..."
                className="post-box-input"
                id="input_text"
                onChange={(e) => setTextValue(e.target.value)}
            />
            <div className="">
                <button
                    onClick={() => {
                        uploadPost(textValue);
                    }}
                >
                    Post{" "}
                </button>
            </div>
        </div>
    );
}
