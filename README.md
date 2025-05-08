# 画像変換ツール

## 使い方 for Mac

**Mac の方**は以下の手順です。

1. **ダウンロード**

    GitHub の右上にある「Download ZIP」からダウンロードして、お好きな場所で解凍してください。

2. **ファイルのリネーム**

    `conversion.command.sample`ファイルを`conversion.command`にリネームしてください。このファイルは、プロジェクトの実行に必要なスクリプトを含んでいます。

3. **`.command`ファイルの内容を編集**

    `conversion.command`ファイルを開き、プロジェクトのパスに合わせて内容を編集してください。具体的には、`cd`コマンドの後に続くパスを、あなたのプロジェクトのディレクトリに変更します。

    ```
    cd /Users/ユーザー/Desktop/image-conversion
    ```

4. **画像の配置**

    変換したい画像を`srcImg`ディレクトリ配下に入れてください。ディレクトリごと配置しても問題ありません。

    ```
    📂 srcImg/
    ├── 📂 top/
    │   └── top-sample.png
    └── sample.png
    ```

5. **コマンド起動**

    Finder から`conversion.command`ファイルをダブルクリックしてください。

    - 画像の圧縮
    - WebP 変換
    - AVIF 変換

    が行われます。

## 使い方 for Windows

**Windows の方**は以下の手順です。

1. **ダウンロード**

    GitHub の右上にある「Download ZIP」からダウンロードして、お好きな場所で解凍してください。

2. **npm のインストール**

    解答したフォルダをエディタで開いて`node_module`をインストールしてください。

    ```
    npm install
    ```

3. **ファイルのリネーム**

    `conversion.command.sample`ファイルを`conversion.bat`にリネームしてください。このファイルは、プロジェクトの実行に必要なスクリプトを含んでいます。

4. **`.bat`ファイルの内容を編集**

    `conversion.bat`ファイルを開き、パスの部分と`npm install`を削除してください。

    具体的には、`cd`コマンドの後に続く記述と`npm install`を削除して`npx gulp`だけにします。

    ```diff
    - cd /Users/ユーザー/Desktop/image-conversion
    - npm install
    npx gulp
    ```

5. **画像の配置**

    変換したい画像を`srcImg`ディレクトリ配下に入れてください。ディレクトリごと配置しても問題ありません。

    ```
    📂 srcImg/
    ├── 📂 top/
    │   └── top-sample.png
    └── sample.png
    ```

6. **コマンド起動**

    エクスプローラーから`conversion.bat`ファイルをダブルクリックしてください。

    - 画像の圧縮
    - WebP 変換
    - AVIF 変換

    が行われます。

## 補足

### 2 回目以降の起動

`node_module`がインストールされていればエディタで開く必要はありません。

`srcImg`に画像を入れて`.commannd`ファイル（Windows は`.bat`ファイル）をダブルクリックすれば画像変換ができます。

### ディレクトリについて

`distImg`ディレクトリは削除しても問題ございません。

### 圧縮率について

プロジェクトに合わせて圧縮率を変更してください。

```JavaScript:gulpfile.js
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

プロジェクトで**AVIF が不要な場合**は`gulfile.js`にある以下の引数を`true`から`false`に変更してください。

```JavaScript:gulpfile.js
// Convert to WebP and AVIF
await convertToWebPAndAVIF(file, 'build', true, outputDir); // 第3引数がAVIF変換の真偽値です
```
