import React from 'react';
import { 
  Zap, 
  Globe, 
  Smartphone, 
  Monitor, 
  MapPin, 
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ExternalLink,
  FolderKanban
} from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_JOBS, MOCK_PROJECTS } from '../data/mockData';

interface DashboardProps {
  onQuickStart: () => void;
  onViewProject: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onQuickStart, onViewProject }) => {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap className="w-48 h-48 text-emerald-600" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">クイック取得を開始</h1>
              <p className="text-zinc-500 max-w-md">
                プロジェクト作成不要。キーワードやURLを入力するだけで、最新の順位と検索ボリュームを即座に取得します。
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onQuickStart}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
              >
                <Zap className="w-5 h-5 fill-current" />
                今すぐ取得する
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 rounded-xl border border-zinc-200">
                <Globe className="w-4 h-4 text-zinc-400" />
                <select className="bg-transparent text-sm font-medium outline-none">
                  <option>Google (Japan)</option>
                  <option>Yahoo (Japan)</option>
                  <option>Bing (Japan)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 rounded-xl border border-zinc-200">
                <Monitor className="w-4 h-4 text-zinc-400" />
                <select className="bg-transparent text-sm font-medium outline-none">
                  <option>PC</option>
                  <option>SP</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-zinc-400 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ボリューム推移
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                SERPフィーチャー
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                推定流入ドメイン
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-8 text-white border border-zinc-800 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Quick Stats</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-bold tracking-tighter">24,802</p>
              <p className="text-zinc-400 text-sm">今月の総取得キーワード数</p>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">保存済みキーワード</span>
              <span className="font-mono">12,405</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">アクティブプロジェクト</span>
              <span className="font-mono">8</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">今月のエクスポート</span>
              <span className="font-mono">42回</span>
            </div>
          </div>

          <button className="w-full mt-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-bold transition-colors border border-zinc-700">
            詳細レポートを見る
          </button>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Jobs */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-zinc-400" />
              <h2 className="font-bold text-zinc-900">直近の実行ジョブ</h2>
            </div>
            <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700">すべて見る</button>
          </div>
          <div className="divide-y divide-zinc-100">
            {MOCK_JOBS.map((job) => (
              <div key={job.id} className="p-4 hover:bg-zinc-50 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    job.status === 'completed' ? "bg-emerald-50 text-emerald-600" : 
                    job.status === 'processing' ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
                  )}>
                    {job.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                     job.status === 'processing' ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}><Zap className="w-5 h-5" /></motion.div> : 
                     <AlertCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900">{job.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
                      <span>{job.count}件</span>
                      <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                      <span>{job.engine}</span>
                      <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                      <span>{job.createdAt}</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all opacity-0 group-hover:opacity-100">
                  結果を見る
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-zinc-400" />
              <h2 className="font-bold text-zinc-900">最近のプロジェクト</h2>
            </div>
            <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700">プロジェクト一覧</button>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_PROJECTS.map((project) => (
              <div 
                key={project.id} 
                onClick={() => onViewProject(project.id)}
                className="p-5 border border-zinc-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                    <Globe className="w-5 h-5 text-zinc-400 group-hover:text-emerald-500" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-300 group-hover:text-emerald-400" />
                </div>
                <h3 className="font-bold text-zinc-900 text-sm mb-1">{project.name}</h3>
                <p className="text-xs text-zinc-500 mb-4">{project.domain}</p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                  <div className="text-center">
                    <p className="text-[10px] text-zinc-400 uppercase font-bold">Keywords</p>
                    <p className="text-sm font-mono font-bold text-zinc-700">{project.keywordCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-zinc-400 uppercase font-bold">Avg Rank</p>
                    <p className="text-sm font-mono font-bold text-emerald-600">{project.avgRank}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
