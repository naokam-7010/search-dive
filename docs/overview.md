# Search Dive - プロジェクト概要

## 概要

**Search Dive** は SEO 担当者向けの高機能分析ツールです。大量の検索クエリに対して、検索ボリューム・順位・推定流入ドメインを瞬時に確認できます。

- **アプリ名:** Search Dive - 順位・imp 取得ツール
- **対象ユーザー:** SEO 担当者

---

## アーキテクチャ概要

```
search-dive/
├── src/
│   ├── App.tsx                  # ルートコンポーネント・画面ルーティング
│   ├── main.tsx                 # エントリーポイント
│   ├── index.css                # グローバルスタイル
│   ├── types/
│   │   └── seo.ts               # 型定義
│   ├── data/
│   │   └── mockData.ts          # モックデータ
│   ├── components/
│   │   └── layout/
│   │       ├── Header.tsx       # 共通ヘッダー
│   │       └── Sidebar.tsx      # 共通サイドバー（ナビゲーション）
│   └── views/
│       ├── Dashboard.tsx        # ホーム画面
│       ├── QuickAcquisition.tsx # クイック取得画面
│       ├── ProjectList.tsx      # プロジェクト一覧画面
│       ├── ProjectDetail.tsx    # プロジェクト詳細画面
│       ├── KeywordAssets.tsx    # キーワード資産画面
│       └── ExportHistory.tsx    # エクスポート履歴画面
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── metadata.json
```

---

## 画面構成

| 画面 | ルートID | 説明 |
|---|---|---|
| ホーム | `dashboard` | クイック取得の導線・直近ジョブ・プロジェクト概況 |
| クイック取得 | `quick` | プロジェクト不要で即座に順位・ボリュームを取得 |
| プロジェクト一覧 | `projects` | 定点観測プロジェクトの一覧管理 |
| プロジェクト詳細 | `project-detail` | プロジェクトの KPI・グラフ・キーワード一覧 |
| キーワード資産 | `assets` | 過去に取得したキーワードデータの集約・検索 |
| エクスポート履歴 | `history` | CSV/Excel 出力の履歴管理・再ダウンロード |

---

## 画面遷移フロー

```
Dashboard
  ├── [今すぐ取得する] → QuickAcquisition
  └── [プロジェクトカード クリック] → ProjectDetail

ProjectList
  └── [プロジェクトカード クリック] → ProjectDetail

ProjectDetail
  └── [← 戻る] → ProjectList
```

ルーティングはReact の `useState` による状態管理で行われており、React Router などの外部ルーターは使用していません。

---

## レイアウト構造

```
┌──────────────────────────────────────────────────┐
│ Sidebar (w-64, 固定)  │ Header (sticky top-0)     │
│                       ├──────────────────────────│
│  - ロゴ (Search Dive) │                          │
│  - ナビメニュー       │  <各 View コンポーネント> │
│  - 設定               │                          │
└───────────────────────┴──────────────────────────┘
```

- サイドバーは `bg-zinc-900`（ダークカラー）で固定表示
- ヘッダーは `sticky top-0` でスクロール追従
- メインコンテンツは `AnimatePresence` + `motion.div` によるフェードイン/スライドアニメーション付きで切り替わる
