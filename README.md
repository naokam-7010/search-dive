# Search Dive - 順位・imp 取得ツール

SEO 担当者向けの高機能分析ツールです。大量の検索クエリに対して、検索ボリューム・順位・推定流入ドメインを瞬時に確認できます。

---

## 主な機能

- **クイック取得** — プロジェクト作成不要。キーワード入力・URL入力・ファイルアップロードの3方式で即座にデータ取得
- **AI キーワード分類** — URL を入力すると Gemini API がコンテンツを解析し、SEO的に価値の高いキーワードを自動抽出・カテゴリ分類
- **プロジェクト管理** — ドメインを定点観測するプロジェクトを作成し、順位・インプレッションの推移をグラフで可視化
- **キーワード資産** — 過去に取得したすべてのキーワードデータを横断検索・管理
- **エクスポート** — CSV / Excel 形式での出力・履歴管理・再ダウンロード

### 取得できるデータ

| データ | 説明 |
|---|---|
| 検索ボリューム | 直近月・12ヶ月平均・月次推移グラフ・5年年次推移 |
| 検索順位 | 現在順位・前回比（上昇/下降/変動なし） |
| LP / タイトル | 順位取得ページの URL とページタイトル |
| SERP 機能 | FAQ・画像・AI Overview・動画 など |
| 推定流入ドメイン | キーワードへの流入を獲得しているドメインシェア TOP3 |

---

## 技術スタック

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS v4**
- **Recharts**（グラフ描画）
- **Motion**（アニメーション）
- **Google Gemini API**（AIキーワード分類）

---

## ローカルで動かす

**前提条件:** Node.js がインストールされていること

```bash
# 1. 依存パッケージをインストール
npm install

# 2. 環境変数を設定
cp .env.local.example .env.local
# .env.local を開き GEMINI_API_KEY に Gemini API キーを設定

# 3. 開発サーバーを起動（ポート 3000）
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

---

## GitHub Pages にデプロイする

`.github/workflows/deploy.yml` が設定済みです。`main` ブランチに push すると GitHub Actions が自動でビルド・デプロイを実行します。

**GitHub リポジトリ側の設定:**

1. リポジトリの **Settings** → **Pages** を開く
2. **Source** を `GitHub Actions` に変更する
3. `main` ブランチに push するとデプロイが自動実行される

デプロイ後のURL: `https://<username>.github.io/search-dive/`

> カスタムドメインを使用する場合は `vite.config.ts` の `base` を `'/'` に変更してください。

---

## ドキュメント

詳細な仕様は [`docs/`](./docs/) ディレクトリを参照してください。

| ファイル | 内容 |
|---|---|
| [overview.md](./docs/overview.md) | プロジェクト概要・アーキテクチャ・画面構成 |
| [features.md](./docs/features.md) | 全画面の機能仕様詳細 |
| [data-model.md](./docs/data-model.md) | 型定義・データ構造 |
| [tech-stack.md](./docs/tech-stack.md) | 技術スタック・開発環境 |
| [components.md](./docs/components.md) | コンポーネント構成・Props・State |
