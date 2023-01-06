import { useState, useRef } from "react";

export default function PostBox({ uploadPost }) {
    const [textValue, setTextValue] = useState("");
    const inputRef = useRef();

    return (
        <div className="post-container">
            <div className="post-box">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter message..."
                    className="post-box-input"
                    id="input_text"
                    onChange={(e) => setTextValue(e.target.value)}
                />
                <button
                    className="post-button"
                    onClick={() => {
                        uploadPost(textValue);
                        inputRef.current.value = "";
                    }}
                >
                    Post
                </button>
            </div>
        </div>
    );
}
