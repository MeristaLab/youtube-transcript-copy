# YouTube Transcript Copy

YouTube の文字起こし（トランスクリプト）パネルから全文をワンクリックでコピーする Chrome 拡張機能。

YouTube の文字起こし（トランスクリプト）パネルにあるテキストを、そのままコピーするツールです。動画の音声から新しく文字起こしする機能はありません。YouTube 側で文字起こしが用意されていない動画では使えません。

## 機能

- 動画ページに「Copy Text」ボタンを追加
- 文字起こしパネルが閉じていても自動で開いてテキストを取得
- 時刻表記を含む文字起こしテキストを、そのままクリップボードにコピー（日本語・英語の本文や時刻表記を加工しません）

## インストール

1. このリポジトリをクローンまたはダウンロード
2. Chrome で `chrome://extensions` を開く
3. 「デベロッパーモード」を ON にする
4. 「パッケージ化されていない拡張機能を読み込む」からフォルダを選択

## 使い方

YouTube の動画ページを開くと、高評価ボタン付近に「Copy Text」ボタンが表示されます。クリックすると文字起こし全文がクリップボードにコピーされます。

## ライセンス

MIT License で公開しています。個人利用・商用利用・改変・再配布は自由です。再配布する場合は、著作権表示とライセンス文を残してください。

本ソフトウェアは無保証で提供します。適用法令で認められる範囲において、作者は利用によって生じた損害等について責任を負いません。詳しくは [LICENSE](LICENSE) を参照してください。

## English

A Chrome extension that copies the text from YouTube's transcript panel to your clipboard with one click.

### Features

- Adds a “Copy Text” button near the video action buttons.
- Automatically opens the transcript panel if it is closed.
- Copies transcript text as-is, including timestamps, without processing Japanese or English text or time labels.

This tool only copies text available in YouTube's transcript panel as-is. It does not generate a new transcript from the video's audio. It cannot be used if YouTube does not provide a transcript for the video. Changes to YouTube's interface may affect functionality.

### Installation

1. Download this repository using **Code → Download ZIP**, then extract it.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the extracted folder containing `manifest.json`.

### Usage

Open or reload a YouTube video page, then click **Copy Text**. Once the button shows **Copied**, paste the text wherever you need it.

### License

Released under the [MIT License](LICENSE). You may use, modify, and redistribute this software, including for commercial purposes, provided that the copyright and permission notices are retained.

The software is provided without warranty. To the extent permitted by applicable law, the author is not liable for claims or damages arising from its use. See [LICENSE](LICENSE) for the full terms.


