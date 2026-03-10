# コンポーネント構成

## コンポーネント一覧

```
src/
├── App.tsx                        # ルートコンポーネント
├── components/
│   └── layout/
│       ├── Header.tsx             # 共通ヘッダー
│       └── Sidebar.tsx            # 共通サイドバー
└── views/
    ├── Dashboard.tsx              # ホーム画面
    ├── QuickAcquisition.tsx       # クイック取得画面
    ├── ProjectList.tsx            # プロジェクト一覧画面
    ├── ProjectDetail.tsx          # プロジェクト詳細画面
    ├── KeywordAssets.tsx          # キーワード資産画面
    └── ExportHistory.tsx          # エクスポート履歴画面
```

---

## App.tsx

**役割:** ルートコンポーネント。画面全体のレイアウトと View の切り替えを管理する。

### State

| state | 型 | 初期値 | 説明 |
|---|---|---|---|
| `activeTab` | `string` | `'dashboard'` | 現在表示中の画面ID |
| `selectedProjectId` | `string \| null` | `null` | 詳細表示中のプロジェクトID |

### ルーティングロジック

`renderContent()` 関数が `activeTab` の値に応じて表示する View コンポーネントを切り替える。

```
'dashboard'      → <Dashboard>
'quick'          → <QuickAcquisition>
'projects'       → <ProjectList>
'project-detail' → <ProjectDetail> (selectedProjectId がある場合)
'assets'         → <KeywordAssets>
'history'        → <ExportHistory>
```

### アニメーション

`AnimatePresence` + `motion.div` で画面切り替え時にフェードイン・スライドアニメーションを適用。

```typescript
initial={{ opacity: 0, x: 10 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -10 }}
transition={{ duration: 0.2, ease: "easeOut" }}
```

### Props の受け渡し

| コンポーネント | 渡す props | 説明 |
|---|---|---|
| `<Sidebar>` | `activeTab`, `setActiveTab` | ナビゲーション状態の同期 |
| `<Dashboard>` | `onQuickStart`, `onViewProject` | 画面遷移コールバック |
| `<ProjectList>` | `onViewProject` | プロジェクト詳細への遷移 |
| `<ProjectDetail>` | `projectId`, `onBack` | 対象プロジェクトIDと戻るコールバック |

---

## Sidebar.tsx

**役割:** 左側固定のナビゲーションメニュー。

### Props

| prop | 型 | 説明 |
|---|---|---|
| `activeTab` | `string` | 現在のアクティブ画面ID |
| `setActiveTab` | `(tab: string) => void` | 画面切り替え関数 |

### 特記事項

- `project-detail` 表示中は `projects` をアクティブ状態として表示（`App.tsx` 側で変換）
- `cn()` には `clsx` + `tailwind-merge` を使用（他コンポーネントと異なる実装）

---

## Header.tsx

**役割:** 上部固定のグローバルヘッダー。

### UI 要素

- グローバル検索インプット（現時点では UI のみ、検索機能は未実装）
- 通知ベルボタン（未読バッジあり）
- ヘルプボタン
- ユーザー情報（名前・プラン・アバター）

---

## Dashboard.tsx

**役割:** ホーム画面。クイック取得への導線とプロジェクト概況を表示。

### Props

| prop | 型 | 説明 |
|---|---|---|
| `onQuickStart` | `() => void` | クイック取得画面への遷移 |
| `onViewProject` | `(id: string) => void` | プロジェクト詳細への遷移 |

### 依存データ

- `MOCK_JOBS` (直近ジョブ表示)
- `MOCK_PROJECTS` (最近のプロジェクト表示)

---

## QuickAcquisition.tsx

**役割:** プロジェクト作成不要でキーワード/URL/ファイルを入力して即時取得するメイン画面。最も機能が豊富なコンポーネント。

### State

| state | 型 | 初期値 | 説明 |
|---|---|---|---|
| `activeInputTab` | `'keyword' \| 'url' \| 'file'` | `'keyword'` | 入力タブの切り替え |
| `isProcessing` | `boolean` | `false` | 取得処理中フラグ |
| `showResults` | `boolean` | `false` | 結果表示フラグ |
| `selectedKeyword` | `KeywordData \| null` | `null` | 詳細ドロワーで表示中のキーワード |
| `progress` | `number` | `0` | 進捗バーの値（0-100） |
| `progressText` | `string` | `''` | 進捗テキスト |
| `showUrlSuggestions` | `boolean` | `false` | URL候補表示フラグ |
| `isGeneratingSuggestions` | `boolean` | `false` | AI候補生成中フラグ |
| `showExportModal` | `boolean` | `false` | エクスポートモーダル表示フラグ |
| `showSaveModal` | `boolean` | `false` | プロジェクト保存モーダル表示フラグ |

### 依存データ

- `MOCK_KEYWORDS` (結果テーブル・詳細ドロワー)

### 外部ライブラリ

- `recharts`: AreaChart（スパークライン・詳細ドロワーのボリューム推移グラフ）
- `motion/react`: AnimatePresence（詳細ドロワー・モーダルのアニメーション）

---

## ProjectList.tsx

**役割:** プロジェクトの一覧をカードグリッドで表示・管理。

### Props

| prop | 型 | 説明 |
|---|---|---|
| `onViewProject` | `(id: string) => void` | プロジェクト詳細への遷移 |

### 依存データ

- `MOCK_PROJECTS`

---

## ProjectDetail.tsx

**役割:** 選択したプロジェクトの詳細KPI・グラフ・キーワード一覧を表示。

### Props

| prop | 型 | 説明 |
|---|---|---|
| `projectId` | `string` | 表示するプロジェクトのID |
| `onBack` | `() => void` | プロジェクト一覧へ戻るコールバック |

### State

| state | 型 | 初期値 | 説明 |
|---|---|---|---|
| `isRefreshing` | `boolean` | `false` | 更新ボタンのローディングアニメーション用 |

### 依存データ

- `MOCK_PROJECTS` (プロジェクト情報)
- `MOCK_KEYWORDS` (キーワード一覧テーブル)
- `chartData` (ローカル定数: 順位・インプレッション推移の7日分)
- `categoryData` (ローカル定数: カテゴリ別パフォーマンス)

### 外部ライブラリ

- `recharts`: AreaChart（順位・インプレッション推移）、BarChart（カテゴリ別パフォーマンス）

---

## KeywordAssets.tsx

**役割:** 過去に取得したすべてのキーワードデータを集約表示・管理。

### 依存データ

- `MOCK_KEYWORDS`

---

## ExportHistory.tsx

**役割:** 過去のエクスポート履歴を一覧表示・再ダウンロード。

### 依存データ

- `MOCK_EXPORTS`

---

## ユーティリティ関数

### `cn()` 関数

Tailwind クラス名を条件付きで結合するユーティリティ。コンポーネントごとに定義されている。

**Sidebar.tsx のみ `clsx` + `tailwind-merge` を使用:**
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**その他のコンポーネントではシンプルな実装:**
```typescript
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
```

---

## 状態管理方針

- グローバルな状態管理ライブラリ（Redux / Zustand 等）は使用していない
- すべての状態は `App.tsx` または各 View コンポーネントの `useState` で管理
- 親子間の状態共有はコールバック Props（`onViewProject`, `onBack` 等）で実現
- データフェッチのための状態管理ライブラリ（React Query 等）も使用していない（現時点はモックデータ）
