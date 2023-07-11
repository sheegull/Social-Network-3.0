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

  https://github.com/sheegull/Social-Network-3.0/assets/89774989/96f5889c-7e09-4450-9d4b-f70c654fd021

<br />

- ユーザーがWEBアプリケーションのグローバルタイムラインに投稿をアップロードできる

    - 投稿は、投稿日時がUTCで表示される
    - 投稿には、いいね！の数が表示される
    - 投稿者のウォレットアドレスが表示される
    - 0文字制限
    - Loading

<br />

  https://github.com/sheegull/Social-Network-3.0/assets/89774989/044825af-1659-4a1c-920d-a8c0ad3afe4c

<br />

- ユーザーはどの投稿にも「いいね！」をつけることができる

    - 1ユーザーにつき1投稿に1「いいね！」まで
    - 「いいね！」をもう一度することで「いいね！」を取り消すことができる

<br />

  https://github.com/sheegull/Social-Network-3.0/assets/89774989/00dcb734-429d-4042-ac5e-838a36c242cc

<br />

  https://github.com/sheegull/Social-Network-3.0/assets/89774989/ee1e8602-82aa-47e9-aff9-e95644ff752b

<br />

- グローバルタイムラインは、すべてのユーザーの投稿を見ることができる

    - ユーザーは、アップロード時間と「いいね！」の数に基づいて、タイムラインをソートすることができる

<br />

  https://github.com/sheegull/Social-Network-3.0/assets/89774989/11d8b648-c013-409f-89e0-2924e19f4404

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
