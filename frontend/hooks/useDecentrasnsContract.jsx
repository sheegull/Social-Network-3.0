import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "../utils/decentrasns.json";

const contractAddress = "0xB66e3Ed7F536F9Bcf19DBFbA9f396B9844499Fc7";
const contractABI = ABI.abi;

export const useDecentrasnsContract = ({ currentAccount }) => {
    // txの処理中のフラグを表す状態変数。
    const [processing, setProcessing] = useState(false);
    // contractのオブジェクトを格納する状態変数。
    const [decentrasnsContract, setDecentrasnsContract] = useState();
    // postを配列で保持する状態変数。
    const [posts, setPosts] = useState([]);

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

    // 全post取得
    async function getAllPosts() {
        if (!decentrasnsContract) return;
        try {
            const AllPosts = await decentrasnsContract.getAllPosts();
            const postsCleaned = AllPosts.map((post) => {
                return {
                    id: post.id,
                    text: post.text,
                    from: post.from,
                    timestamp: post.timestamp,
                    likeCount: post.likeCount,
                };
            });
            setPosts(postsCleaned);
        } catch (error) {
            console.log(error);
        }
    }

    // async function sendMessage({ text, receiver, tokenInEther }) {
    //     if (!decentrasnsContract) return;
    //     try {
    //         const tokenInWei = ethers.utils.parseEther(tokenInEther);
    //         console.log(
    //             "call post with receiver:[%s], token:[%s]",
    //             receiver,
    //             tokenInWei.toString()
    //         );
    //         const txn = await decentrasnsContract.post(text, receiver, {
    //             gasLimit: 300000,
    //             value: tokenInWei,
    //         });
    //         console.log("Processing...", txn.hash);
    //         setProcessing(true);
    //         await txn.wait();
    //         console.log("Done -- ", txn.hash);
    //         setProcessing(false);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        getDecentrasnsContract();
        getAllPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAccount, ethereum]);

    // useEffect(() => {
    //     // NewMessageのイベントリスナ
    //     const onNewMessage = (sender, receiver, depositInWei, timestamp, text, isPending) => {
    //         console.log("NewMessage from %s to %s", sender, receiver);
    //         // 自分宛のメッセージの場合setPostsを編集します。
    //         // 各APIの使用によりアドレス英字が大文字小文字の違いが出る場合がありますが, その違いはアドレス値において区別されません。
    //         if (receiver.toLocaleLowerCase() === currentAccount) {
    //             setPosts((prevState) => [
    //                 ...prevState,
    //                 {
    //                     sender: sender,
    //                     receiver: receiver,
    //                     depositInWei: depositInWei,
    //                     timestamp: new Date(timestamp.toNumber() * 1000),
    //                     text: text,
    //                     isPending: isPending,
    //                 },
    //             ]);
    //         }
    //     };

    //     /* イベントリスナの登録をします */
    //     if (decentrasnsContract) {
    //         decentrasnsContract.on("NewMessage", onNewMessage);
    //     }

    //     /* イベントリスナの登録を解除します */
    //     return () => {
    //         if (decentrasnsContract) {
    //             decentrasnsContract.off("NewMessage", onNewMessage);
    //         }
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [decentrasnsContract]);

    return {
        processing,
        posts,
        // sendMessage,
    };
};
