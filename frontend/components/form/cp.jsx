import styles from "./Form.module.css";
import { useState } from "react";

export default function PostBox({ uploadPost }) {
    const [textValue, setTextValue] = useState("");

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.title}>Upload your message 🔥</div>
                <textarea
                    name="text"
                    placeholder="text"
                    id="input_text"
                    onChange={(e) => setTextValue(e.target.value)}
                    className={styles.text}
                />

                <div className={styles.button}>
                    <button
                        onClick={() => {
                            uploadPost(textValue);
                        }}
                    >
                        Post{" "}
                    </button>
                </div>
            </div>
        </div>
    );
}
