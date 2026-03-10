/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './views/Dashboard';
import QuickAcquisition from './views/QuickAcquisition';
import ProjectList from './views/ProjectList';
import ProjectDetail from './views/ProjectDetail';
import KeywordAssets from './views/KeywordAssets';
import ExportHistory from './views/ExportHistory';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleViewProject = (id: string) => {
    setSelectedProjectId(id);
    setActiveTab('project-detail');
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    setActiveTab('projects');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onQuickStart={() => setActiveTab('quick')} onViewProject={handleViewProject} />;
      case 'quick':
        return <QuickAcquisition />;
      case 'projects':
        return <ProjectList onViewProject={handleViewProject} />;
      case 'project-detail':
        return selectedProjectId ? (
          <ProjectDetail projectId={selectedProjectId} onBack={handleBackToProjects} />
        ) : (
          <ProjectList onViewProject={handleViewProject} />
        );
      case 'assets':
        return <KeywordAssets />;
      case 'history':
        return <ExportHistory />;
      default:
        return <Dashboard onQuickStart={() => setActiveTab('quick')} onViewProject={handleViewProject} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans text-zinc-900 antialiased">
      <Sidebar activeTab={activeTab === 'project-detail' ? 'projects' : activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (selectedProjectId || '')}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
