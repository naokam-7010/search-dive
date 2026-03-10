import React from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  ChevronRight, 
  BarChart2, 
  TrendingUp,
  Calendar,
  MoreHorizontal,
  FolderKanban
} from 'lucide-react';
import { MOCK_KEYWORDS } from '../data/mockData';

const KeywordAssets: React.FC = () => {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">キーワード資産</h1>
          <p className="text-sm text-zinc-500">過去に取得したすべてのキーワードデータが集約されています。</p>
        </div>
        <button className="bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-zinc-900/10">
          <Download className="w-4 h-4" />
          全件エクスポート
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 rounded-lg border border-zinc-200 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-400" />
          <input type="text" placeholder="キーワードを検索..." className="bg-transparent text-sm outline-none w-full" />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
            <Filter className="w-3.5 h-3.5" />
            カテゴリ
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
            <Calendar className="w-3.5 h-3.5" />
            最終取得日
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
            <FolderKanban className="w-3.5 h-3.5" />
            プロジェクト
          </button>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="p-4 w-10">
                  <input type="checkbox" className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
                </th>
                <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">キーワード</th>
                <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">カテゴリ</th>
                <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">最新ボリューム</th>
                <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-center">最新順位</th>
                <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">紐づくプロジェクト</th>
                <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">最終取得日</th>
                <th className="p-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {MOCK_KEYWORDS.map((kw) => (
                <tr key={kw.id} className="hover:bg-zinc-50 transition-colors cursor-pointer group">
                  <td className="p-4">
                    <input type="checkbox" className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-zinc-900">{kw.query}</p>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded text-[10px] font-bold">
                      {kw.category}
                    </span>
                  </td>
                  <td className="p-4 text-right text-sm font-mono font-medium text-zinc-600">
                    {kw.recentVolume.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 text-zinc-700 font-mono font-bold text-xs">
                      {kw.rank}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">自社メディアSEO</span>
                      <span className="text-[10px] text-zinc-400">+1</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-zinc-500 font-medium">
                    {kw.updatedAt}
                  </td>
                  <td className="p-4">
                    <button className="p-1.5 hover:bg-zinc-200 rounded-lg transition-colors text-zinc-400">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
          <p className="text-xs text-zinc-500 font-medium">全 1,240 件中 1 - 5 件を表示</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-400 cursor-not-allowed">前へ</button>
            <button className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-900 hover:bg-zinc-50 transition-all">次へ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordAssets;
