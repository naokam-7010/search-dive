import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Globe, 
  Calendar, 
  RefreshCw, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  BarChart2,
  PieChart,
  LayoutList,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_PROJECTS, MOCK_KEYWORDS } from '../data/mockData';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
  const project = MOCK_PROJECTS.find(p => p.id === projectId) || MOCK_PROJECTS[0];
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const chartData = [
    { name: '03/01', rank: 14.2, imp: 12000 },
    { name: '03/02', rank: 13.8, imp: 13500 },
    { name: '03/03', rank: 13.5, imp: 14200 },
    { name: '03/04', rank: 13.1, imp: 15800 },
    { name: '03/05', rank: 12.8, imp: 16500 },
    { name: '03/06', rank: 12.5, imp: 18200 },
    { name: '03/07', rank: 12.4, imp: 19500 },
  ];

  const categoryData = [
    { name: '指名', count: 120, rank: 1.5, imp: 85000 },
    { name: '比較検討', count: 450, rank: 8.2, imp: 120000 },
    { name: '情報収集', count: 580, rank: 15.4, imp: 210000 },
    { name: '課題解決', count: 100, rank: 22.1, imp: 35000 },
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="p-8 max-w-[1600px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-zinc-200 rounded-lg transition-colors text-zinc-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">{project.name}</h1>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold uppercase tracking-wider">Active</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {project.domain}</span>
                <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 最終更新: {project.updatedAt}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all flex items-center gap-2"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin")} />
              最新データに更新
            </button>
            <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-lg shadow-zinc-900/10">
              <Download className="w-3.5 h-3.5" />
              レポート出力
            </button>
          </div>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: '平均順位', value: project.avgRank, trend: -1.2, isGood: true, icon: BarChart2 },
            { label: '10位以内率', value: `${project.top10Rate}%`, trend: 4.5, isGood: true, icon: TrendingUp },
            { label: '30位以内率', value: `${project.top30Rate}%`, trend: 2.1, isGood: true, icon: TrendingUp },
            { label: '総インプレッション', value: project.totalImp.toLocaleString(), trend: 12500, isGood: true, icon: LayoutList },
            { label: '対象キーワード', value: project.keywordCount.toLocaleString(), trend: 0, isGood: true, icon: Search },
          ].map((kpi, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <kpi.icon className="w-4 h-4 text-zinc-400" />
                {kpi.trend !== 0 && (
                  <span className={cn(
                    "text-[10px] font-bold flex items-center gap-0.5 px-1.5 py-0.5 rounded",
                    kpi.isGood ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"
                  )}>
                    {kpi.trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(kpi.trend)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-2xl font-bold text-zinc-900 tracking-tight">{kpi.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                順位・インプレッション推移
              </h3>
              <div className="flex bg-zinc-100 p-1 rounded-lg">
                <button className="px-3 py-1 text-[10px] font-bold bg-white text-zinc-900 rounded shadow-sm">7日間</button>
                <button className="px-3 py-1 text-[10px] font-bold text-zinc-500 hover:text-zinc-700">30日間</button>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} reversed />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area yAxisId="right" type="monotone" dataKey="imp" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorImp)" name="インプレッション" />
                  <Line yAxisId="left" type="monotone" dataKey="rank" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} name="平均順位" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-500" />
                カテゴリ別パフォーマンス
              </h3>
              <button className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700">詳細を見る</button>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#4b5563', fontWeight: 600 }} width={60} />
                  <Tooltip 
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' }}
                  />
                  <Bar dataKey="imp" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} name="総インプレッション" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Keyword Table Section */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-zinc-900">キーワード一覧</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 rounded-lg border border-zinc-200">
                <Search className="w-3.5 h-3.5 text-zinc-400" />
                <input type="text" placeholder="キーワード検索..." className="bg-transparent text-xs outline-none w-32" />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-[10px] font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
                <Filter className="w-3 h-3" /> フィルタ
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">キーワード</th>
                  <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">カテゴリ</th>
                  <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">ボリューム</th>
                  <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-center">順位</th>
                  <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-center">前回比</th>
                  <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">LP</th>
                  <th className="p-4 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {MOCK_KEYWORDS.map((kw) => (
                  <tr key={kw.id} className="hover:bg-zinc-50 transition-colors cursor-pointer group">
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
                      <div className={cn(
                        "inline-flex items-center justify-center w-8 h-8 rounded-lg font-mono font-bold text-xs",
                        kw.rank === '圏外' ? "bg-zinc-100 text-zinc-400" :
                        kw.rank <= 3 ? "bg-emerald-500 text-white" :
                        kw.rank <= 10 ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-700"
                      )}>
                        {kw.rank}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      {kw.prevRank && kw.rank !== '圏外' && kw.prevRank !== '圏外' ? (
                        kw.rank < kw.prevRank ? (
                          <span className="text-[10px] font-bold text-emerald-600 flex items-center justify-center">
                            <ArrowUpRight className="w-3 h-3" /> {kw.prevRank - kw.rank}
                          </span>
                        ) : kw.rank > kw.prevRank ? (
                          <span className="text-[10px] font-bold text-red-600 flex items-center justify-center">
                            <ArrowDownRight className="w-3 h-3" /> {kw.rank - kw.prevRank}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-zinc-400 flex items-center justify-center">
                            <Minus className="w-3 h-3" />
                          </span>
                        )
                      ) : <span className="text-[10px] text-zinc-300">-</span>}
                    </td>
                    <td className="p-4 max-w-[200px]">
                      <p className="text-[10px] text-emerald-600 font-medium truncate">{kw.lp || '-'}</p>
                    </td>
                    <td className="p-4">
                      <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
