# 為替レート変換計算機

モバイル向けの直感的な通貨変換アプリケーション

![Application Screenshot](https://github.com/user-attachments/assets/3e25c815-e386-4cd9-bf91-afbd6959b4c9)

## 概要

為替レート変換計算機は、3つの通貨間での金額変換を簡単に行えるWebアプリケーションです。特にモバイルデバイスでの使いやすさを重視し、直感的なインターフェースとリアルタイム変換機能を提供します。

## 主な機能

### ✨ 特徴
- 📱 **モバイルファースト**: タッチ操作に最適化されたUI設計
- ⚡ **リアルタイム変換**: 入力と同時に自動計算・表示
- 💾 **設定の永続化**: ブラウザに設定を自動保存
- 🎨 **視覚的識別**: 通貨ごとの色分け表示
- 🔄 **双方向変換**: どの通貨からでも変換可能

### 🛠 機能詳細

#### 初期設定
- 自国通貨の設定（デフォルト: JPY）
- 変換対象通貨1の設定（デフォルト: NTD）
- 変換対象通貨2の設定（デフォルト: USD）
- 各通貨の為替レート設定
- 設定の自動保存とパネル折りたたみ

#### 通貨変換
- 3通貨間での相互変換
- 小数点以下2桁の精密計算
- リアルタイム更新
- 一括クリア機能

## 使用方法

### 1. 初期設定
1. 「初期設定」パネルを開く
2. 自国通貨コードを入力（例：JPY）
3. 変換対象通貨1のコードとレートを入力（例：NTD, 4.5）
4. 変換対象通貨2のコードとレートを入力（例：USD, 0.0067）
5. 「設定を保存」ボタンをクリック

### 2. 通貨変換
1. いずれかの通貨フィールドに金額を入力
2. 他の通貨フィールドに自動変換結果が表示される
3. 必要に応じて「すべてクリア」で入力をリセット

## 技術仕様

### フロントエンド
- **HTML5**: セマンティックマークアップ
- **CSS3**: TailwindCSS + カスタムスタイル
- **JavaScript**: ES6+ クラスベース実装

### 対応環境
- **ブラウザ**: Chrome 90+, Firefox 88+, Safari 14+
- **デバイス**: モバイル・タブレット・デスクトップ
- **画面サイズ**: 320px〜 (モバイルファースト)

### 動作要件
- モダンWebブラウザ
- JavaScript有効
- localStorage使用可能

## インストール・実行

### 簡単スタート
1. リポジトリをクローンまたはダウンロード
```bash
git clone https://github.com/tokawa-ms/exchange-rate-calculator.git
cd exchange-rate-calculator
```

2. ブラウザで直接開く
```bash
# ブラウザで以下のファイルを開く
src/index.html
```

### ローカルサーバー使用（推奨）
```bash
cd src
python3 -m http.server 8080
# ブラウザで http://localhost:8080 を開く
```

## プロジェクト構造

```
exchange-rate-calculator/
├── src/
│   ├── index.html          # メインHTML
│   ├── css/
│   │   ├── styles.css      # カスタムスタイル
│   │   └── fallback.css    # TailwindCSS代替スタイル
│   └── js/
│       └── script.js       # メインJavaScript
├── docs/
│   ├── specification.md    # 仕様書
│   └── implementation.md   # 実装ドキュメント
└── README.md
```

## デバッグ・開発

### コンソールログ
アプリケーションは詳細なコンソールログを出力します：
```javascript
// ブラウザの開発者ツール > コンソールで確認
console.log('ExchangeRateCalculator: 設定保存完了', settings);
```

### 設定データ確認
```javascript
// ブラウザコンソールで実行
localStorage.getItem('exchangeRateSettings');
```

## 実装例

### 設定例
- **自国通貨**: JPY
- **変換対象通貨1**: NTD (レート: 4.5)
- **変換対象通貨2**: USD (レート: 0.0067)

### 変換例
- JPY 1,000 → NTD 4,500.00, USD 6.70
- NTD 900 → JPY 200.00, USD 1.34
- USD 10 → JPY 1,492.54, NTD 6,716.42

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

## 貢献・サポート

### 貢献方法
1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

### 問題報告
- [Issues](https://github.com/tokawa-ms/exchange-rate-calculator/issues)で問題や機能要望を報告してください

## 作成者

**GitHub Copilot** による AI 支援開発
- 企画・設計・実装・テスト・ドキュメント作成

---

<div align="center">
  <strong>🌍 Happy Currency Converting! 💱</strong><br>
  Made with ❤️ and AI
</div>