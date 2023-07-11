import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "../utils/dsns.json";

const contractAddress = "0x4AC26d0686EB3A52dD0b218C2B0F00c543f152AF";
const contractABI = ABI.abi;

export const useDsnsContract = ({ currentAccount }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [timeIsSorted, setTimeIsSorted] = useState(false);
    const [likeIsSorted, setLikeIsSorted] = useState(false);
    const [dsnsContract, setDsnsContract] = useState();
    // 全てのpostを配列で保持する状態変数
    const [allPosts, setAllPosts] = useState([]);
    // 全てのいいねがされたpostを保持する状態変数
    const [likePosts, setLikePosts] = useState([]);

    // contract呼び出し
    function getDsnsContract() {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const DsnsContract = new ethers.Contract(contractAddress, contractABI, signer);
                setDsnsContract(DsnsContract);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 全てのpost取得
    async function getAllPosts() {
        if (!dsnsContract) return;
        try {
            const posts = await dsnsContract.getAllPosts();
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
        getDsnsContract();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAccount]);

    useEffect(() => {
        getAllPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAccount, likePosts]);

    // 新規投稿
    async function uploadPost({ text }) {
        if (!dsnsContract) return;
        try {
            const txn = await dsnsContract.uploadPost(text, {
                gasLimit: 300000,
            });
            console.log("Processing...", txn.hash);
            setIsLoading(true);
            await txn.wait();
            console.log("Done -- ", txn.hash);
            setIsLoading(false);
        } catch (error) {
            alert("cannot upload an empty post");
            console.log(error);
            setIsLoading(false);
        }
    }

    // いいね機能
    async function changeLikePost(postId) {
        if (!dsnsContract) return;
        try {
            const txn = await dsnsContract.changeLikePost(postId, {
                gasLimit: 300000,
            });
            console.log("Processing...", txn.hash);
            setIsLoading(true);
            await txn.wait();
            console.log("Done -- ", txn.hash);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    // アップロード時間順にソート
    async function sortByTimestamp() {
        const result = allPosts.sort(function (a, b) {
            if (!timeIsSorted) {
                setTimeIsSorted(true);
                return a.timestamp < b.timestamp ? 1 : -1;
            } else {
                setTimeIsSorted(false);
                return a.timestamp > b.timestamp ? 1 : -1;
            }
        });
        setAllPosts(result);
    }

    // いいね数順にソート
    async function sortByLike() {
        const result = allPosts.sort(function (a, b) {
            if (!likeIsSorted) {
                setLikeIsSorted(true);
                return a.likeCount > b.likeCount ? 1 : -1;
            } else {
                setLikeIsSorted(false);
                return a.likeCount < b.likeCount ? 1 : -1;
            }
        });
        setAllPosts(result);
    }

    // 新規Post/Like追加状況を監視
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

        const onLikePost = (postId, isLiked) => {
            console.log("LikePost", postId, isLiked);
            // eventから渡されたLikePostのデータを追加
            setLikePosts((prevState) => [
                ...prevState,
                {
                    postId: postId.toNumber(),
                    isLiked: isLiked,
                },
            ]);
        };

        // イベントリスナの登録
        if (dsnsContract) {
            dsnsContract.on("NewPosted", onNewPosted);
            dsnsContract.on("LikePost", onLikePost);
        }

        // イベントリスナの登録を解除
        return () => {
            if (dsnsContract) {
                dsnsContract.off("NewPosted", onNewPosted);
                dsnsContract.off("LikePost", onLikePost);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dsnsContract]);

    return {
        isLoading,
        allPosts,
        likePosts,
        uploadPost,
        changeLikePost,
        sortByTimestamp,
        sortByLike,
    };
};
