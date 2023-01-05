import { useState } from "react";

export default function PostBox({ uploadPost }) {
    const [textValue, setTextValue] = useState("");

    return (
        <div className="post-container">
            <div className="post-box">
                <input
                    type="text"
                    placeholder="Enter message..."
                    className="post-box-input"
                    id="input_text"
                    onChange={(e) => setTextValue(e.target.value)}
                />
            </div>
            <div className="post-button">
                <button
                    onClick={() => {
                        uploadPost(textValue);
                    }}
                >
                    <div className="post-button-text">Post</div>
                </button>
            </div>
        </div>
    );
}
