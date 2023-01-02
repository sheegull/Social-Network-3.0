import Head from "next/head";
import styles from "./Layout.module.css";
import Link from "next/link";

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.png" />
                <meta
                    name="description"
                    content="It is a message dapp that exchanges text and AVAX"
                />
                <title>Messenger</title>
            </Head>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <div>← Back to home</div>
                    </Link>
                </div>
            )}
        </div>
    );
}
