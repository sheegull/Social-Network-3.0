import Head from "next/head";
import styles from "./Layout.module.css";
import Link from "next/link";

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link
                    rel="icon"
                    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚙️</text></svg>"
                />
                <meta name="description" content="It is a Social-Network 3.0" />
                <title>D-SNS</title>
            </Head>
            <main>{children}</main>
            {/* {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <div>← Back to home</div>
                    </Link>
                </div>
            )} */}
        </div>
    );
}
