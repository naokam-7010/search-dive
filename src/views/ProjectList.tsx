import React from 'react';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Filter, 
  Globe, 
  Calendar, 
  ArrowRight,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { MOCK_PROJECTS } from '../data/mockData';
import { Project } from '../types/seo';

interface ProjectListProps {
  onViewProject: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onViewProject }) => {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">プロジェクト管理</h1>
          <p className="text-sm text-zinc-500">継続的に順位と検索ボリュームを観測しているプロジェクトの一覧です。</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
          <Plus className="w-5 h-5" />
          新規プロジェクト作成
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 rounded-lg border border-zinc-200 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-400" />
          <input type="text" placeholder="プロジェクト名、ドメインで検索..." className="bg-transparent text-sm outline-none w-full" />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
            <Globe className="w-3.5 h-3.5" />
            検索エンジン
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
            <Calendar className="w-3.5 h-3.5" />
            更新日
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
            <CheckCircle2 className="w-3.5 h-3.5" />
            ステータス
          </button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map((project) => (
          <div 
            key={project.id}
            onClick={() => onViewProject(project.id)}
            className="bg-white rounded-2xl border border-zinc-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group flex flex-col"
          >
            <div className="p-6 space-y-4 flex-1">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                  <Globe className="w-6 h-6 text-zinc-400 group-hover:text-emerald-500" />
                </div>
                <button className="p-2 text-zinc-400 hover:bg-zinc-100 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-zinc-900 text-lg group-hover:text-emerald-600 transition-colors">{project.name}</h3>
                <p className="text-xs text-zinc-500 font-medium flex items-center gap-1.5">
                  {project.domain}
                  <ArrowRight className="w-3 h-3" />
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">キーワード数</p>
                  <p className="text-xl font-mono font-bold text-zinc-900">{project.keywordCount.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">平均順位</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-mono font-bold text-emerald-600">{project.avgRank}</p>
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center">
                      <TrendingUp className="w-3 h-3" /> 1.2
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  <span>TOP 10 ランクイン率</span>
                  <span className="text-zinc-900">{project.top10Rate}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${project.top10Rate}%` }} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-zinc-50 border-t border-zinc-100 rounded-b-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-medium">
                <Calendar className="w-3 h-3" />
                最終更新: {project.updatedAt}
              </div>
            </div>
          </div>
        ))}

        {/* Empty State / Add Card */}
        <div className="bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center p-8 space-y-4 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-white rounded-xl border border-zinc-200 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-zinc-400 group-hover:text-emerald-500" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-zinc-900">新しいプロジェクトを追加</p>
            <p className="text-xs text-zinc-500">特定のドメインを定点観測します</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
