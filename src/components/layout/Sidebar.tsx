import React from 'react';
import { 
  LayoutDashboard, 
  Zap, 
  FolderKanban, 
  Database, 
  History, 
  Settings, 
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'ホーム', icon: LayoutDashboard },
    { id: 'quick', label: 'クイック取得', icon: Zap },
    { id: 'projects', label: 'プロジェクト', icon: FolderKanban },
    { id: 'assets', label: 'キーワード資産', icon: Database },
    { id: 'history', label: 'エクスポート履歴', icon: History },
  ];

  return (
    <aside className="w-64 bg-zinc-900 text-zinc-400 flex flex-col h-screen sticky top-0 border-r border-zinc-800">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
          SD
        </div>
        <span className="text-white font-bold text-lg tracking-tight">Search Dive</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
              activeTab === item.id 
                ? "bg-emerald-500/10 text-emerald-400 font-medium" 
                : "hover:bg-zinc-800 hover:text-zinc-200"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              activeTab === item.id ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300"
            )} />
            <span>{item.label}</span>
            {activeTab === item.id && (
              <ChevronRight className="w-4 h-4 ml-auto" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={() => setActiveTab('settings')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
            activeTab === 'settings' 
              ? "bg-zinc-800 text-white" 
              : "hover:bg-zinc-800 hover:text-zinc-200"
          )}
        >
          <Settings className="w-5 h-5 text-zinc-500" />
          <span>設定</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
