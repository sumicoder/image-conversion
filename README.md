# 画像変換ツール

## ダウンロード

1. GitHub の右上にある「Download ZIP」からダウンロードしてください。
2. お好きなフォルダで解答したら準備完了です。

## 使い方

以下の手順で、画像変換プロジェクトをセットアップしてください。

1. **npm のインストール**

```
npm install
```

2. **ファイルのリネーム**
   `conversion.command.sample`ファイルを`conversion.command`にリネームしてください。このファイルは、プロジェクトの実行に必要なスクリプトを含んでいます。

    - Windows の場合は`conversion.bat`に変更したらできるはずです。

3. **`.command`ファイルの内容を編集**
   `conversion.command`ファイルを開き、プロジェクトのパスに合わせて内容を編集してください。具体的には、`cd`コマンドの後に続くパスを、あなたのプロジェクトのディレクトリに変更します。

```
cd /Users/ユーザー/Desktop/image-conversion
```

4.  **画像の配置**
    変換したい画像を`srcImg`ディレクトリ配下に入れてください。ディレクトリごと配置しても問題ありません。

```
📂 srcImg/
├── 📂 top/
│   └── top-sample.png
└── sample.png
```

5.  **コマンド起動**
    `conversion.command`ファイルをダブルクリックしてください。

-   画像の圧縮
-   WebP 変換
-   AVIF 変換

が行われます。

## 補足

### ディレクトリについて

`distImg`ディレクトリは削除しても問題ございません。

### 圧縮栗について

プロジェクトに合わせて圧縮率を変更してください。

```JavaScript
// Compression settings
const config = {
    build: {
        isOptimize: true, // Whether to optimize images
        jpgOptions: { quality: 90 },
        pngOptions: { quality: 90 },
        gifOptions: { quality: 90 },
        webpOptions: { quality: 90 },
        avifOptions: { quality: 70 },
    },
};
```

### AVIF 変換について

プロジェクトで**AVIF が不要な場合**は以下の引数を`true`から`false`に変更してください。

```JavaScript
// Convert to WebP and AVIF
await convertToWebPAndAVIF(file, 'build', true, outputDir); // 第3引数がAVIF変換の真偽値です
```
