import { useEffect, useState } from "react";

export const useWallet = () => {
    // ユーザアカウントのアドレスを格納するための状態変数を定義
    const [currentAccount, setCurrentAccount] = useState();

    // walletに接続
    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }
            // ユーザーに対してウォレットへのアクセス許可を求める
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            if (!Array.isArray(accounts)) return;
            console.log("Connected: ", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };

    // walletの接続状況を確認
    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                console.log("Make sure you have MetaMask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }
            // ユーザーのウォレットへアクセスが許可されているかどうかを確認
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (!Array.isArray(accounts)) return;
            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setCurrentAccount(account);
            } else {
                console.log("No authorized account found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        currentAccount,
        connectWallet,
    };
};
