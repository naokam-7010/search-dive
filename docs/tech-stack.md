# 技術スタック

## フレームワーク・ライブラリ

| カテゴリ | ライブラリ | バージョン | 用途 |
|---|---|---|---|
| UI フレームワーク | React | ^19.0.0 | コンポーネントベースの UI 構築 |
| 言語 | TypeScript | ~5.8.2 | 型安全な開発 |
| ビルドツール | Vite | ^6.2.0 | 開発サーバー・バンドル |
| スタイリング | Tailwind CSS | ^4.1.14 | ユーティリティファーストの CSS |
| アニメーション | Motion (Framer Motion) | ^12.23.24 | 画面遷移・要素アニメーション |
| チャート | Recharts | ^3.8.0 | グラフ描画（折れ線・エリア・棒グラフ） |
| アイコン | Lucide React | ^0.546.0 | SVG アイコンセット |
| AI SDK | @google/genai | ^1.29.0 | Gemini API 連携（URLからのキーワード生成） |
| DB | better-sqlite3 | ^12.4.1 | ローカル SQLite DB |
| サーバー | Express | ^4.21.2 | バックエンド API サーバー |
| ユーティリティ | clsx + tailwind-merge | ^2.1.1 / ^3.5.0 | クラス名の条件付き結合 |
| 環境変数 | dotenv | ^17.2.3 | .env ファイル読み込み |

---

## 開発環境

| 項目 | 内容 |
|---|---|
| Node.js | 必須（バージョン指定なし） |
| パッケージマネージャー | npm |
| Linter | TypeScript コンパイラ (`tsc --noEmit`) |
| 型チェック | `npm run lint` |

---

## npm スクリプト

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー起動（ポート 3000、全インターフェース） |
| `npm run build` | プロダクションビルド |
| `npm run preview` | ビルド結果のプレビュー |
| `npm run clean` | `dist/` ディレクトリの削除 |
| `npm run lint` | TypeScript 型チェック |

---

## Vite 設定

- **プラグイン:** `@vitejs/plugin-react`（React サポート）、`@tailwindcss/vite`（Tailwind CSS 統合）
- **エイリアス:** `@` → プロジェクトルート
- **環境変数:** `GEMINI_API_KEY` を `process.env.GEMINI_API_KEY` として expose
- **HMR:** 環境変数 `DISABLE_HMR=true` で無効化可能（AI Studio 向け設定）

---

## 環境変数

| 変数名 | 用途 |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API キー（URL入力からのキーワード候補生成に使用） |

`.env.local` ファイルに設定する。

---

## スタイリング方針

- **Tailwind CSS v4** を使用（`@tailwindcss/vite` プラグイン経由）
- ユーティリティクラスの条件付き結合には `clsx` + `tailwind-merge` を組み合わせた `cn()` 関数を使用
- カラーパレット: `zinc`（グレー系）を基調に、アクセントカラーとして `emerald`（緑系）を使用
- フォント: `font-sans`（デフォルト）、数値表示は `font-mono` を適用
