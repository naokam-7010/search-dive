import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Type, 
  Link as LinkIcon, 
  Upload, 
  Settings2, 
  Search, 
  Filter, 
  Download, 
  ChevronRight, 
  X,
  CheckCircle2,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  MoreHorizontal,
  Columns,
  LayoutList,
  FileText,
  Globe,
  Monitor,
  Smartphone,
  Info,
  RefreshCw,
  TrendingUp,
  ExternalLink,
  FolderKanban
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_KEYWORDS } from '../data/mockData';
import { KeywordData, SearchEngine, Device } from '../types/seo';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Helper for class merging
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

const QuickAcquisition: React.FC = () => {
  const [activeInputTab, setActiveInputTab] = useState<'keyword' | 'url' | 'file'>('keyword');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordData | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [showUrlSuggestions, setShowUrlSuggestions] = useState(false);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const generateSuggestions = () => {
    setIsGeneratingSuggestions(true);
    setTimeout(() => {
      setIsGeneratingSuggestions(false);
      setShowUrlSuggestions(true);
    }, 1500);
  };

  const runAcquisition = () => {
    setIsProcessing(true);
    setProgress(0);
    const steps = [
      { p: 10, t: 'キーワードを整理中...' },
      { p: 30, t: 'カテゴリを自動分類中...' },
      { p: 60, t: '検索ボリュームを集計中...' },
      { p: 85, t: '順位・LP情報を取得中...' },
      { p: 100, t: '結果を整形しています...' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setProgressText(steps[currentStep].t);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          setShowResults(true);
        }, 500);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="p-8 max-w-[1600px] mx-auto space-y-8">
        
        {/* Input Section */}
        {!showResults && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden"
          >
            <div className="flex border-b border-zinc-100">
              <button 
                onClick={() => setActiveInputTab('keyword')}
                className={cn(
                  "flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2",
                  activeInputTab === 'keyword' ? "border-emerald-500 text-emerald-600 bg-emerald-50/30" : "border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"
                )}
              >
                <Type className="w-4 h-4" />
                キーワード入力
              </button>
              <button 
                onClick={() => setActiveInputTab('url')}
                className={cn(
                  "flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2",
                  activeInputTab === 'url' ? "border-emerald-500 text-emerald-600 bg-emerald-50/30" : "border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"
                )}
              >
                <LinkIcon className="w-4 h-4" />
                URL入力
              </button>
              <button 
                onClick={() => setActiveInputTab('file')}
                className={cn(
                  "flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2",
                  activeInputTab === 'file' ? "border-emerald-500 text-emerald-600 bg-emerald-50/30" : "border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"
                )}
              >
                <Upload className="w-4 h-4" />
                ファイルアップロード
              </button>
            </div>

            <div className="p-8 space-y-8">
              {activeInputTab === 'keyword' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">キーワードを貼り付け (1行1キーワード)</label>
                  <textarea 
                    className="w-full h-48 p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-mono text-sm leading-relaxed"
                    placeholder="例）&#10;SEO ツール&#10;検索順位 取得&#10;キーワード ボリューム"
                  />
                </div>
              )}

              {activeInputTab === 'url' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">対象URL</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="https://example.com/blog/seo-tips"
                        className="flex-1 p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                      />
                      <button 
                        onClick={generateSuggestions}
                        disabled={isGeneratingSuggestions}
                        className="px-6 py-3 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {isGeneratingSuggestions ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            生成中...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4" />
                            候補を生成
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {showUrlSuggestions ? (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-zinc-900">キーワード候補 (32件見つかりました)</span>
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold uppercase">AI自動分類済み</span>
                        </div>
                        <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700">すべて選択</button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { cat: '指名', keywords: ['SEO Insight', 'SEO Insight 使い方', 'SEO Insight 料金'] },
                          { cat: '比較', keywords: ['SEOツール 比較', '順位チェックツール おすすめ', 'Ahrefs Semrush 違い'] },
                          { cat: '課題解決', keywords: ['検索順位 上がらない', 'SEO 改善方法', 'インデックスされない 原因'] },
                          { cat: '情報収集', keywords: ['SEOとは', 'Google アルゴリズム アップデート', 'コアウェブバイタル 対策'] },
                        ].map((group, idx) => (
                          <div key={idx} className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{group.cat}</span>
                              <button className="text-[10px] font-bold text-zinc-500 hover:text-zinc-700">編集</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {group.keywords.map((kw, kIdx) => (
                                <label key={kIdx} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-lg cursor-pointer hover:border-emerald-500 transition-all group">
                                  <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
                                  <span className="text-xs text-zinc-600 group-hover:text-zinc-900">{kw}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="p-12 bg-zinc-50 rounded-2xl border border-dashed border-zinc-300 text-center space-y-3">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Search className="w-6 h-6 text-zinc-300" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-zinc-900">URLを入力してキーワード候補を生成</p>
                        <p className="text-xs text-zinc-500 max-w-xs mx-auto">入力されたURLのコンテンツを解析し、SEO的に価値の高いキーワードをAIが自動で抽出・分類します。</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeInputTab === 'file' && (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-12 text-center space-y-4 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-emerald-100 transition-colors">
                      <Upload className="w-8 h-8 text-zinc-400 group-hover:text-emerald-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-zinc-900">CSVまたはTXTファイルをドラッグ&ドロップ</p>
                      <p className="text-xs text-zinc-500">またはファイルを選択（最大 10,000行）</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">文字コード</p>
                      <select className="w-full bg-transparent text-sm font-medium outline-none">
                        <option>UTF-8</option>
                        <option>Shift-JIS</option>
                      </select>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">区切り文字</p>
                      <select className="w-full bg-transparent text-sm font-medium outline-none">
                        <option>カンマ (CSV)</option>
                        <option>タブ (TSV)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-zinc-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                    <Settings2 className="w-4 h-4 text-emerald-500" />
                    基本設定
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                      <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                        <Globe className="w-3.5 h-3.5" /> 検索エンジン
                      </div>
                      <select className="bg-transparent text-xs font-bold outline-none">
                        <option>Google</option>
                        <option>Yahoo</option>
                        <option>Bing</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                      <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                        <Monitor className="w-3.5 h-3.5" /> デバイス
                      </div>
                      <select className="bg-transparent text-xs font-bold outline-none">
                        <option>PC</option>
                        <option>SP</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                    <LayoutList className="w-4 h-4 text-emerald-500" />
                    取得項目
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {['検索ボリューム', '順位', 'LP / Title', 'SERP機能', '流入ドメイン', '5年推移'].map((item) => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
                        <span className="text-xs text-zinc-600 group-hover:text-zinc-900 transition-colors">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-end gap-4">
                  <button 
                    onClick={runAcquisition}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    取得を実行する
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="flex flex-col items-center justify-center py-24 space-y-8">
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="w-32 h-32 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-10 h-10 text-emerald-500 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-zinc-900">{progressText}</h2>
              <p className="text-sm text-zinc-500">大量のデータを解析しています。少々お待ちください...</p>
            </div>
            <div className="w-full max-w-md h-2 bg-zinc-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-emerald-500"
              />
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: '対象キーワード', value: '125', unit: '件', icon: Type },
                { label: '平均検索ボリューム', value: '4,250', unit: '', icon: BarChart2 },
                { label: 'ボリューム有り率', value: '82.4', unit: '%', icon: CheckCircle2 },
                { label: '30位以内率', value: '45.8', unit: '%', icon: TrendingUp },
                { label: '検出LP数', value: '38', unit: 'URL', icon: LinkIcon },
                { label: '自動分類カテゴリ', value: '6', unit: '種', icon: LayoutList },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <stat.icon className="w-4 h-4 text-zinc-400" />
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">Live</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-xl font-bold text-zinc-900 tracking-tight">
                      {stat.value}<span className="text-xs ml-0.5 font-medium text-zinc-500">{stat.unit}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 rounded-lg border border-zinc-200 flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-zinc-400" />
                <input type="text" placeholder="キーワード、URL、タイトルで絞り込み..." className="bg-transparent text-sm outline-none w-full" />
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
                  <Filter className="w-3.5 h-3.5" />
                  カテゴリ
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
                  <TrendingUp className="w-3.5 h-3.5" />
                  順位範囲
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
                  <BarChart2 className="w-3.5 h-3.5" />
                  ボリューム
                </button>
                <div className="h-6 w-px bg-zinc-200 mx-1" />
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
                  <Columns className="w-3.5 h-3.5" />
                  列表示
                </button>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button 
                  onClick={() => setShowExportModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 transition-all shadow-md shadow-zinc-900/10"
                >
                  <Download className="w-3.5 h-3.5" />
                  CSV出力
                </button>
                <button 
                  onClick={() => setShowResults(false)}
                  className="p-2 bg-zinc-100 text-zinc-500 hover:bg-zinc-200 rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Data Table Area */}
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1200px]">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200">
                      <th className="p-4 w-10 sticky left-0 bg-zinc-50 z-20">
                        <input type="checkbox" className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
                      </th>
                      <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider sticky left-10 bg-zinc-50 z-20 border-r border-zinc-100">カテゴリ</th>
                      <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider sticky left-[120px] bg-zinc-50 z-20 border-r border-zinc-100">検索クエリ</th>
                      <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">12ヶ月平均</th>
                      <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">直近月</th>
                      <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider w-32">推移</th>
                      <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-center">順位</th>
                      <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">SERP機能</th>
                      <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">LP / タイトル</th>
                      <th className="p-4 w-12"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {MOCK_KEYWORDS.map((kw) => (
                      <tr 
                        key={kw.id} 
                        onClick={() => setSelectedKeyword(kw)}
                        className="hover:bg-zinc-50 transition-colors cursor-pointer group"
                      >
                        <td className="p-4 sticky left-0 bg-white group-hover:bg-zinc-50 z-10" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
                        </td>
                        <td className="p-4 sticky left-10 bg-white group-hover:bg-zinc-50 z-10 border-r border-zinc-100">
                          <span className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded text-[10px] font-bold whitespace-nowrap">
                            {kw.category}
                          </span>
                        </td>
                        <td className="p-4 sticky left-[120px] bg-white group-hover:bg-zinc-50 z-10 border-r border-zinc-100">
                          <p className="text-sm font-bold text-zinc-900">{kw.query}</p>
                        </td>
                        <td className="p-4 text-right text-sm font-mono font-medium text-zinc-600">
                          {kw.avgVolume.toLocaleString()}
                        </td>
                        <td className="p-4 text-right text-sm font-mono font-bold text-zinc-900">
                          {kw.recentVolume.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <div className="h-8 w-24">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={kw.volumeHistory.map((v, i) => ({ v, i }))}>
                                <Area type="monotone" dataKey="v" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={1.5} />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className={cn(
                            "inline-flex items-center justify-center w-10 h-10 rounded-xl font-mono font-bold text-sm",
                            kw.rank === '圏外' ? "bg-zinc-100 text-zinc-400" :
                            kw.rank <= 3 ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" :
                            kw.rank <= 10 ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-700"
                          )}>
                            {kw.rank}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {kw.serpFeatures.map((f) => (
                              <span key={f} className="px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded text-[9px] font-bold uppercase tracking-tighter">
                                {f}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 max-w-xs">
                          <div className="space-y-0.5">
                            <p className="text-[10px] font-bold text-zinc-900 truncate">{kw.title || '-'}</p>
                            <p className="text-[9px] text-zinc-400 truncate">{kw.lp || '-'}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <button className="p-1.5 hover:bg-zinc-200 rounded-lg transition-colors text-zinc-400">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                <p className="text-xs text-zinc-500 font-medium">全 125 件中 1 - 5 件を表示</p>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-400 cursor-not-allowed">前へ</button>
                  <button className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-900 hover:bg-zinc-50 transition-all">次へ</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedKeyword && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedKeyword(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold uppercase tracking-wider">
                      {selectedKeyword.category}
                    </span>
                    <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">{selectedKeyword.query}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedKeyword(null)}
                    className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-zinc-400" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">現在の順位</p>
                    <p className="text-3xl font-mono font-bold text-zinc-900">{selectedKeyword.rank}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {selectedKeyword.prevRank && selectedKeyword.rank !== '圏外' && selectedKeyword.prevRank !== '圏外' ? (
                        selectedKeyword.rank < selectedKeyword.prevRank ? (
                          <span className="text-[10px] font-bold text-emerald-600 flex items-center">
                            <ArrowUpRight className="w-3 h-3" /> {selectedKeyword.prevRank - selectedKeyword.rank}
                          </span>
                        ) : selectedKeyword.rank > selectedKeyword.prevRank ? (
                          <span className="text-[10px] font-bold text-red-600 flex items-center">
                            <ArrowDownRight className="w-3 h-3" /> {selectedKeyword.rank - selectedKeyword.prevRank}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-zinc-400 flex items-center">
                            <Minus className="w-3 h-3" /> 0
                          </span>
                        )
                      ) : null}
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">検索ボリューム</p>
                    <p className="text-3xl font-mono font-bold text-zinc-900">{selectedKeyword.recentVolume.toLocaleString()}</p>
                    <p className="text-[10px] text-zinc-400 mt-1">12ヶ月平均: {selectedKeyword.avgVolume.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">SERP機能</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedKeyword.serpFeatures.length > 0 ? selectedKeyword.serpFeatures.map(f => (
                        <span key={f} className="px-1.5 py-0.5 bg-white border border-zinc-200 text-zinc-600 rounded text-[9px] font-bold">
                          {f}
                        </span>
                      )) : <span className="text-xs text-zinc-400">-</span>}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-emerald-500" />
                    月次検索ボリューム推移 (過去12ヶ月)
                  </h3>
                  <div className="h-64 w-full bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedKeyword.volumeHistory.map((v, i) => ({ name: `${i+1}月`, volume: v }))}>
                        <defs>
                          <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '8px', color: '#fff' }}
                          itemStyle={{ color: '#10b981' }}
                        />
                        <Area type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorVol)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    LP・タイトル情報
                  </h3>
                  <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase">ページタイトル</p>
                      <p className="text-sm font-bold text-zinc-900 leading-relaxed">{selectedKeyword.title || '未検出'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase">ランディングページ (URL)</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-emerald-600 font-medium truncate flex-1">{selectedKeyword.lp || '-'}</p>
                        {selectedKeyword.lp && <ExternalLink className="w-3 h-3 text-emerald-600" />}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-500" />
                    想定流入ドメインシェア (TOP 3)
                  </h3>
                  <div className="space-y-3">
                    {selectedKeyword.topDomains.map((d, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-zinc-700">{d.domain}</span>
                          <span className="text-zinc-900 font-bold">{d.share}%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full" 
                            style={{ width: `${d.share}%`, opacity: 1 - (i * 0.2) }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 flex gap-4">
                  <button 
                    onClick={() => setShowExportModal(true)}
                    className="flex-1 py-3 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    詳細をCSV出力
                  </button>
                  <button 
                    onClick={() => setShowSaveModal(true)}
                    className="flex-1 py-3 bg-white border border-zinc-200 text-zinc-600 rounded-xl text-sm font-bold hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
                  >
                    <FolderKanban className="w-4 h-4" />
                    プロジェクトに保存
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExportModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="font-bold text-zinc-900">エクスポート設定</h3>
                <button onClick={() => setShowExportModal(false)} className="p-1 hover:bg-zinc-100 rounded-full">
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">出力形式</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 border-2 border-emerald-500 bg-emerald-50 rounded-xl text-center space-y-1">
                      <p className="text-sm font-bold text-emerald-700">CSV</p>
                      <p className="text-[10px] text-emerald-600">汎用的な形式</p>
                    </button>
                    <button className="p-4 border-2 border-zinc-100 bg-zinc-50 rounded-xl text-center space-y-1 hover:border-zinc-200 transition-all">
                      <p className="text-sm font-bold text-zinc-700">Excel</p>
                      <p className="text-[10px] text-zinc-500">グラフ・装飾付き</p>
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">出力範囲</p>
                  <div className="space-y-2">
                    {['全件 (125件)', 'フィルタ結果のみ (42件)', '選択した行のみ (5件)'].map((opt, i) => (
                      <label key={i} className="flex items-center justify-between p-3 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-50 transition-all">
                        <span className="text-sm font-medium text-zinc-700">{opt}</span>
                        <input type="radio" name="export-range" defaultChecked={i === 0} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex gap-3">
                <button onClick={() => setShowExportModal(false)} className="flex-1 py-3 bg-white border border-zinc-200 text-zinc-600 rounded-xl text-sm font-bold hover:bg-zinc-100 transition-all">
                  キャンセル
                </button>
                <button 
                  onClick={() => {
                    setShowExportModal(false);
                    alert('エクスポートを開始しました。履歴画面からダウンロードできます。');
                  }}
                  className="flex-1 py-3 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-all"
                >
                  ダウンロード
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Save to Project Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSaveModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="font-bold text-zinc-900">プロジェクトに保存</h3>
                <button onClick={() => setShowSaveModal(false)} className="p-1 hover:bg-zinc-100 rounded-full">
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">保存先を選択</p>
                  <div className="space-y-2">
                    {['既存のプロジェクトに追加', '新しいプロジェクトを作成'].map((opt, i) => (
                      <label key={i} className="flex items-center justify-between p-3 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-50 transition-all">
                        <span className="text-sm font-medium text-zinc-700">{opt}</span>
                        <input type="radio" name="save-type" defaultChecked={i === 0} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">プロジェクト名</p>
                  <select className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-emerald-500 transition-all">
                    <option>自社メディアSEO観測</option>
                    <option>競合比較プロジェクト</option>
                    <option>新規カテゴリ調査</option>
                  </select>
                </div>
              </div>
              <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex gap-3">
                <button onClick={() => setShowSaveModal(false)} className="flex-1 py-3 bg-white border border-zinc-200 text-zinc-600 rounded-xl text-sm font-bold hover:bg-zinc-100 transition-all">
                  キャンセル
                </button>
                <button 
                  onClick={() => {
                    setShowSaveModal(false);
                    alert('プロジェクトに保存しました。');
                  }}
                  className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all"
                >
                  保存する
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickAcquisition;
