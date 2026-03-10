import React from 'react';
import { 
  History, 
  Download, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react';
import { MOCK_EXPORTS } from '../data/mockData';

const ExportHistory: React.FC = () => {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">エクスポート履歴</h1>
        <p className="text-sm text-zinc-500">過去に実行したCSV/Excel出力の履歴です。30日間保存されます。</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 rounded-lg border border-zinc-200 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-400" />
          <input type="text" placeholder="ファイル名で検索..." className="bg-transparent text-sm outline-none w-full" />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
            <Filter className="w-3.5 h-3.5" />
            出力形式
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
            <CheckCircle2 className="w-3.5 h-3.5" />
            ステータス
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-zinc-100">
          {MOCK_EXPORTS.map((record) => (
            <div key={record.id} className="p-6 hover:bg-zinc-50 transition-colors flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-zinc-900">{record.filename}</p>
                    <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded text-[9px] font-bold uppercase">{record.format}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
                    <span>{record.count}件</span>
                    <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                    <span>{record.condition}</span>
                    <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                    <span>{record.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
                  <Download className="w-3.5 h-3.5" />
                  再ダウンロード
                </button>
                <button className="p-2 text-zinc-400 hover:bg-zinc-100 rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State Illustration (Placeholder) */}
      {MOCK_EXPORTS.length === 0 && (
        <div className="py-24 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center">
            <History className="w-10 h-10 text-zinc-300" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-zinc-900">履歴がありません</p>
            <p className="text-xs text-zinc-500">エクスポートを実行するとここに表示されます</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportHistory;
