# 🌍 為替レート変換計算機

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **モバイル最適化された通貨変換アプリケーション** - リアルタイム変換とローカル設定保存機能

## 📋 概要

為替レート変換計算機は、3つの通貨間での金額変換を直感的に行えるWebアプリケーションです。モバイルデバイスでの使いやすさを重視し、リアルタイム変換機能とローカル設定保存機能を提供します。

![Application Screenshot](https://github.com/user-attachments/assets/3e25c815-e386-4cd9-bf91-afbd6959b4c9)

### ✨ 主な特徴

- 📱 **モバイルファースト設計** - タッチ操作に最適化されたUI
- ⚡ **リアルタイム変換** - 入力と同時に自動計算・表示
- 💾 **設定の永続化** - ブラウザのlocalStorageに設定を自動保存
- 🎨 **視覚的識別** - 通貨ごとの色分け表示で直感的操作
- 🔄 **双方向変換** - どの通貨からでも他通貨への変換が可能
- 🌐 **オフライン対応** - インターネット接続不要で動作

## 🛠️ 技術スタック

### フロントエンド

| 技術                                     | バージョン | 用途                         |
| ---------------------------------------- | ---------- | ---------------------------- |
| HTML5                                    | Latest     | セマンティックなマークアップ |
| CSS3                                     | Latest     | スタイリング                 |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x (CDN)  | ユーティリティファースト CSS |
| JavaScript                               | ES6+       | インタラクティブな機能       |

### 開発ツール

- **GitHub Copilot** - AI ペアプログラミング
- **GitHub Coding Agent** - 自動コード生成
- **Visual Studio Code** - 推奨 IDE

## 📁 プロジェクト構造

```
📦 exchange-rate-calculator/
├── 📄 README.md                    # プロジェクト概要
├── 📄 LICENSE                      # ライセンス
├── 📁 src/                         # アプリケーションソース
│   ├── 📄 index.html              # メインHTML
│   ├── 📄 README.md               # 使用方法詳細
│   ├── 📁 css/                    # スタイルシート
│   │   ├── 📄 styles.css          # カスタムCSS
│   │   └── 📄 fallback.css        # TailwindCSS代替
│   └── 📁 js/                     # JavaScript
│       └── 📄 script.js           # メインスクリプト
└── 📁 docs/                       # ドキュメント
    ├── 📄 specification.md        # 仕様書
    └── 📄 implementation.md       # 実装詳細
```

## 🚀 クイックスタート

### 前提条件

- 📌 モダンな Web ブラウザ (Chrome 90+, Firefox 88+, Safari 14+)
- 📌 JavaScript有効化
- 📌 localStorage使用可能

### 実行方法

#### 🌐 最も簡単な方法
1. **ブラウザで直接開く**
   ```
   src/index.html をブラウザで開くだけ！
   ```

#### 💻 ローカルサーバー使用（推奨）
1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/tokawa-ms/exchange-rate-calculator.git
   cd exchange-rate-calculator
   ```

2. **ローカルサーバー起動**
   ```bash
   cd src
   python3 -m http.server 8080
   ```

3. **ブラウザでアクセス**
   ```
   http://localhost:8080
   ```

### 📱 使用方法

#### ステップ1: 初期設定
1. 「初期設定」パネルを開く
2. 自国通貨コードを入力（例：JPY）
3. 変換対象通貨とレートを設定（例：NTD 4.5, USD 0.0067）
4. 「設定を保存」をクリック

#### ステップ2: 通貨変換
1. いずれかの通貨フィールドに金額を入力
2. 他の通貨フィールドに自動変換結果が表示
3. 必要に応じて「すべてクリア」でリセット

## 💡 機能詳細

### 🔧 初期設定機能
- **自国通貨設定**: 基準となる通貨コード（デフォルト: JPY）
- **対象通貨1設定**: 第1変換対象通貨とレート（デフォルト: NTD）
- **対象通貨2設定**: 第2変換対象通貨とレート（デフォルト: USD）
- **設定保存**: ブラウザのlocalStorageに自動保存
- **入力検証**: 通貨コード3文字、正数値、重複チェック

### ⚡ リアルタイム変換機能
- **双方向変換**: どの通貨からでも他通貨への変換
- **自動計算**: 入力と同時に即座に変換結果を表示
- **精密計算**: 小数点以下2桁の正確な計算
- **一括クリア**: 全入力フィールドの同時リセット

### 📱 モバイル最適化
- **タッチフレンドリー**: 指での操作に適したボタンサイズ
- **レスポンシブ**: 320px〜の画面幅に対応
- **色分け表示**: 通貨別の視覚的識別
- **スムーズアニメーション**: 60fpsの滑らかなUI

## 📱 レスポンシブデザイン対応

このテンプレートは以下の画面サイズに最適化されています：

- 📱 **モバイル**: 320px〜768px
- 📊 **タブレット**: 768px〜1024px
- 💻 **デスクトップ**: 1024px 以上

## 🔒 セキュリティとベストプラクティス

### API キーの取り扱い

- ✅ 環境変数や UI 入力フィールドを使用
- ❌ ハードコーディングは禁止
- 🔐 開発用のテストキーのみ使用

### コード品質

- 📋 ESLint ルールに準拠
- 📝 適切なコメント記述
- 🧪 エラーハンドリングの実装

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Request を作成

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 🆘 サポートとリソース

- 📖 **ドキュメント**: [仕様書](docs/specification.md) | [実装詳細](docs/implementation.md)
- 💬 **使用方法**: [詳細ガイド](src/README.md)
- 🐛 **Issue 報告**: [Issues](https://github.com/tokawa-ms/exchange-rate-calculator/issues)
- 💡 **機能要望**: [新機能リクエスト](https://github.com/tokawa-ms/exchange-rate-calculator/issues/new)

## 📊 プロジェクト統計

![GitHub stars](https://img.shields.io/github/stars/tokawa-ms/exchange-rate-calculator?style=social)
![GitHub forks](https://img.shields.io/github/forks/tokawa-ms/exchange-rate-calculator?style=social)
![GitHub issues](https://img.shields.io/github/issues/tokawa-ms/exchange-rate-calculator)

## 🔮 今後の拡張予定

- 🌐 **為替レートAPI連携**: リアルタイムレート取得
- 📊 **変換履歴**: 過去の変換記録表示
- 🎨 **ダークモード**: テーマ切り替え機能
- 🌍 **多通貨対応**: 4通貨以上への拡張
- 📤 **データエクスポート**: CSV出力機能

---

<div align="center">
  <strong>🌍 Happy Currency Converting! 💱</strong><br>
  Made with ❤️ and GitHub Copilot AI
</div>
