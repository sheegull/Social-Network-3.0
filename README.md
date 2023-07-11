# Social-Network-3.0 💫

[MVP Demo](https://social-network-3-0.vercel.app/)

Goerli testnetに小さなテキストデータのスニペットを投稿できる分散型ソーシャルネットワークアプリケーションです。

プロフィール機能は実装しておりません。プロフィール画像はレンダリングごとに自動で適用されるため、毎回画像が変化します。

## 環境
```
node.js v16.18.1
npm 8.19.2
solidity 0.8.18
hardhat 2.16.1
react 18.2.0
next 13.1.1
tailwindcss 3.2.4

goerli testnet
metamask
alchemy
```

## 機能
<br />

- ユーザーが自分のウォレットをWEBアプリケーションに接続できる。
<br />

  https://user-images.githubusercontent.com/89774989/210957122-49ad7d31-9feb-4244-aa46-0382c7cd07a9.mp4

<br />

- ユーザーがWEBアプリケーションのグローバルタイムラインに投稿をアップロードできる

    - 投稿は、投稿日時がUTCで表示される
    - 投稿には、いいね！の数が表示される
    - 投稿者のウォレットアドレスが表示される
    - 0文字制限
    - Loading

<br />

  https://user-images.githubusercontent.com/89774989/210958729-e1192913-f381-4662-94ab-79ac9a98e1f5.mp4

<br />

- ユーザーはどの投稿にも「いいね！」をつけることができる

    - 1ユーザーにつき1投稿に1「いいね！」まで
    - 「いいね！」をもう一度することで「いいね！」を取り消すことができる

<br />

  https://user-images.githubusercontent.com/89774989/210960624-2a1c6e53-b5fa-4bcf-9903-c9cd55020883.mp4

<br />

  https://user-images.githubusercontent.com/89774989/210960766-625d8809-94c7-49a4-a067-5e98a62ec0c7.mp4

<br />

- グローバルタイムラインは、すべてのユーザーの投稿を見ることができる

    - ユーザーは、アップロード時間と「いいね！」の数に基づいて、タイムラインをソートすることができる

<br />

  https://user-images.githubusercontent.com/89774989/210961387-8c00bf1a-3a87-4852-b256-89a9316f0884.mp4

<br />

## contract

```
npx hardhat test


  dsns
    contract success
    uploadPost
      ✔ Should return error (1580ms)
      ✔ Should upload a post (97ms)
    changeLikePost
      ✔ Should add/remove like (137ms)
    getAllPosts
      ✔ Should return all the posts (58ms)
    getLikesPost
      ✔ Should return users who have liked the post (73ms)


  5 passing (2s)
```

```
npx hardhat run scripts/deploy.js --network goerli
deploy success 🎉🎉
Contract deployed to:  0x4AC26d0686EB3A52dD0b218C2B0F00c543f152AF
```
