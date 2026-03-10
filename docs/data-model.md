# データモデル

**ファイル:** `src/types/seo.ts`

現在のデータはすべてモックデータ（`src/data/mockData.ts`）で管理されています。将来的には better-sqlite3（SQLite）および Express バックエンドとの連携が想定されています。

---

## 型定義

### SearchEngine

```typescript
type SearchEngine = 'google' | 'yahoo' | 'bing';
```

対応検索エンジン。

---

### Device

```typescript
type Device = 'pc' | 'sp';
```

取得対象のデバイス種別。

---

### JobStatus

```typescript
type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';
```

ジョブの実行ステータス。

---

### KeywordData

キーワード単位のデータ。

```typescript
interface KeywordData {
  id: string;           // 一意ID
  query: string;        // 検索クエリ文字列
  category: string;     // AIが自動分類したカテゴリ（例: ツール調査 / 課題解決 / 情報収集）
  avgVolume: number;    // 12ヶ月平均検索ボリューム
  recentVolume: number; // 直近月の検索ボリューム
  volumeHistory: number[];  // 過去12ヶ月の月次ボリューム（12要素の配列）
  yearlyHistory: { year: number; volume: number }[];  // 過去5年の年次ボリューム
  rank: number | '圏外'; // 現在の検索順位（圏外の場合は文字列）
  prevRank?: number | '圏外'; // 前回の検索順位
  serpFeatures: string[]; // SERP に表示される機能（例: ['FAQ', '画像', 'AI Overview']）
  lp: string;           // ランディングページ URL
  title: string;        // ページタイトル
  domain: string;       // 自ドメイン
  topDomains: { domain: string; share: number }[];  // 推定流入ドメインシェア TOP3
  updatedAt: string;    // 最終更新日時（例: '2026-03-07 10:00'）
}
```

---

### Job

取得ジョブ単位のデータ。

```typescript
interface Job {
  id: string;           // 一意ID
  name: string;         // ジョブ名（例: '主要キーワード100件'）
  status: JobStatus;    // 実行ステータス
  count: number;        // 対象キーワード件数
  engine: SearchEngine; // 使用した検索エンジン
  device: Device;       // 使用したデバイス
  createdAt: string;    // 実行日時（例: '2026-03-07 09:00'）
}
```

---

### Project

定点観測プロジェクト単位のデータ。

```typescript
interface Project {
  id: string;           // 一意ID
  name: string;         // プロジェクト名（例: '自社メディアSEO観測'）
  domain: string;       // 観測対象ドメイン（例: 'example.com'）
  keywordCount: number; // 登録キーワード数
  engine: SearchEngine; // 対象検索エンジン
  status: 'active' | 'archived'; // プロジェクトステータス
  updatedAt: string;    // 最終更新日時
  avgRank: number;      // キーワード全体の平均順位
  top10Rate: number;    // TOP10 ランクイン率（%）
  top30Rate: number;    // TOP30 ランクイン率（%）
  totalImp: number;     // 総インプレッション数（当期）
  prevTotalImp: number; // 総インプレッション数（前期）
}
```

---

### ExportRecord

エクスポート履歴単位のデータ。

```typescript
interface ExportRecord {
  id: string;           // 一意ID
  filename: string;     // 出力ファイル名（例: 'keyword_report_20260307.csv'）
  format: 'csv' | 'xlsx'; // 出力形式
  count: number;        // 出力件数
  condition: string;    // 適用条件の説明（例: 'フィルタ適用済み'）
  createdAt: string;    // 実行日時
  status: 'completed' | 'failed'; // エクスポートステータス
}
```

---

## モックデータ

**ファイル:** `src/data/mockData.ts`

| エクスポート名 | 型 | 件数 | 用途 |
|---|---|---|---|
| `MOCK_KEYWORDS` | `KeywordData[]` | 5件 | クイック取得・プロジェクト詳細・キーワード資産の表示 |
| `MOCK_JOBS` | `Job[]` | 3件 | ダッシュボードの直近ジョブ表示 |
| `MOCK_PROJECTS` | `Project[]` | 2件 | ダッシュボード・プロジェクト一覧・プロジェクト詳細の表示 |
| `MOCK_EXPORTS` | `ExportRecord[]` | 2件 | エクスポート履歴の表示 |

### MOCK_KEYWORDS サンプル

| query | avgVolume | rank | category |
|---|---|---|---|
| SEO ツール | 12,000 | 2 | ツール調査 |
| 検索順位 取得 | 5,400 | 5 | 課題解決 |
| キーワード ボリューム | 22,000 | 12 | 情報収集 |
| SEO 順位チェック | 3,600 | 1 | ツール調査 |
| imp 取得 | 880 | 圏外 | ハウツー |

### MOCK_PROJECTS サンプル

| name | domain | keywordCount | avgRank |
|---|---|---|---|
| 自社メディアSEO観測 | example.com | 1,250 | 12.4 |
| 競合比較プロジェクト | competitor-a.jp | 500 | 18.2 |

---

## カテゴリ分類

URL入力時の AI 自動分類で使用されるキーワードカテゴリ。

| カテゴリ | 説明 |
|---|---|
| 指名 | ブランド名・サービス名を含むキーワード |
| 比較 | 競合比較・おすすめ系キーワード |
| 課題解決 | 問題解決を目的としたキーワード |
| 情報収集 | 概念理解・情報調査目的のキーワード |
| ツール調査 | ツール・サービス調査系キーワード |
| ハウツー | 操作方法・やり方系キーワード |
