import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "../utils/decentrasns.json";

const contractAddress = "0xB66e3Ed7F536F9Bcf19DBFbA9f396B9844499Fc7";
const contractABI = ABI.abi;

export const useDecentrasnsContract = ({ currentAccount }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [decentrasnsContract, setDecentrasnsContract] = useState();
    // 全てのpostを配列で保持する状態変数。
    const [allPosts, setAllPosts] = useState([]);

    // contract呼び出し
    function getDecentrasnsContract() {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // @ts-ignore: ethereum as ethers.providers.ExternalProvider
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const DecentrasnsContract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );
                setDecentrasnsContract(DecentrasnsContract);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 全てのpost取得
    async function getAllPosts() {
        if (!decentrasnsContract) return;
        try {
            const posts = await decentrasnsContract.getAllPosts();
            // 画面表示のため整理
            const postsCleaned = posts.map((post) => {
                return {
                    id: post.id.toNumber(),
                    text: post.text,
                    from: post.from,
                    timestamp: post.timestamp,
                    likeCount: post.likeCount.toNumber(),
                };
            });
            setAllPosts(postsCleaned);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDecentrasnsContract();
        getAllPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAccount]);

    // 新規投稿
    async function uploadPost({ text }) {
        if (!decentrasnsContract) return;
        try {
            const txn = await decentrasnsContract.uploadPost(text);
            console.log("Processing...", txn.hash);
            setIsLoading(true);
            await txn.wait();
            console.log("Done -- ", txn.hash);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    // 新規Post追加状況を監視
    useEffect(() => {
        const onNewPosted = (id, text, from, timestamp, likeCount) => {
            console.log("NewPosted", id, text, from, timestamp, likeCount);
            // eventから渡されたNewPostのデータを追加
            setAllPosts((prevState) => [
                ...prevState,
                {
                    id: id.toNumber(),
                    text: text,
                    from: from,
                    timestamp: timestamp,
                    likeCount: likeCount.toNumber(),
                },
            ]);
        };

        // イベントリスナの登録
        if (decentrasnsContract) {
            decentrasnsContract.on("NewPosted", onNewPosted);
        }

        // イベントリスナの登録を解除
        return () => {
            if (decentrasnsContract) {
                decentrasnsContract.off("NewPosted", onNewPosted);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [decentrasnsContract]);

    return {
        isLoading,
        allPosts,
        uploadPost,
    };
};
