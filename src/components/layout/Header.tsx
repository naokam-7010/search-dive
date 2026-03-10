import React from 'react';
import { Search, Bell, User, HelpCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-bottom border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text" 
            placeholder="プロジェクト、キーワード、ジョブを検索..." 
            className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-lg text-sm transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        <div className="h-8 w-px bg-zinc-200 mx-2" />
        <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-zinc-50 p-1 rounded-lg transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-zinc-900 leading-none">SEO太郎</p>
            <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Unlimited Plan</p>
          </div>
          <div className="w-9 h-9 bg-zinc-200 rounded-full flex items-center justify-center overflow-hidden border border-zinc-300">
            <User className="w-5 h-5 text-zinc-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
