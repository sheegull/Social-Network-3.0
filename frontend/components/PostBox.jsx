import styles from "./Form.module.css";
import { useState } from "react";

export default function SendMessageForm({ sendMessage }) {
    const [textValue, setTextValue] = useState("");

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.title}>Send your message !</div>
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
                            sendMessage(textValue);
                        }}
                    >
                        send{" "}
                    </button>
                </div>
            </div>
        </div>
    );
}
