/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/ToastContainer';
import { AuthView } from './components/AuthView';
import { BranchSelectionModal } from './components/BranchSelectionModal';
import { SupabaseModal } from './components/SupabaseModal';

// Views
import { DashboardView } from './views/DashboardView';
import { ProfileView } from './views/ProfileView';
import { AssessmentView } from './views/AssessmentView';
import { SkillGapView } from './views/SkillGapView';
import { RoadmapView } from './views/RoadmapView';
import { InternshipsView } from './views/InternshipsView';
import { ProjectsView } from './views/ProjectsView';
import { HackathonsView } from './views/HackathonsView';
import { ResourcesView } from './views/ResourcesView';
import { VirtualLabsView } from './views/VirtualLabsView';
import { StudyPlannerView } from './views/StudyPlannerView';
import { AchievementsView } from './views/AchievementsView';
import { HackathonHubView } from './views/HackathonHubView';
import { SettingsView } from './views/SettingsView';

const MainLayout: React.FC = () => {
  const {
    isAuthenticated,
    activeNav,
    sidebarCollapsed,
    branchModalOpen,
    setBranchModalOpen,
    supabaseModalOpen,
    setSupabaseModalOpen,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If not authenticated, show the complete Login/Signup experience
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950">
        <AuthView />
        <SupabaseModal
          isOpen={supabaseModalOpen}
          onClose={() => setSupabaseModalOpen(false)}
        />
        <ToastContainer />
      </div>
    );
  }

  const renderActiveView = () => {
    switch (activeNav) {
      case 'dashboard':
        return <DashboardView />;
      case 'profile':
        return <ProfileView />;
      case 'assessment':
        return <AssessmentView />;
      case 'skill-gap':
        return <SkillGapView />;
      case 'roadmap':
        return <RoadmapView />;
      case 'resources':
        return <ResourcesView />;
      case 'virtual-labs':
        return <VirtualLabsView />;
      case 'study-planner':
        return <StudyPlannerView />;
      case 'internships':
        return <InternshipsView />;
      case 'projects':
        return <ProjectsView />;
      case 'hackathons':
        return <HackathonsView />;
      case 'hackathon-hub':
        return <HackathonHubView />;
      case 'achievements':
        return <AchievementsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Collapsible Left Sidebar */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <Navbar onMobileMenuToggle={() => setMobileMenuOpen(prev => !prev)} />

        <main className="flex-1 p-4 md:p-7 max-w-7xl w-full mx-auto animate-in fade-in">
          {renderActiveView()}
        </main>
      </div>

      <BranchSelectionModal
        isOpen={branchModalOpen}
        onClose={() => setBranchModalOpen(false)}
      />

      <SupabaseModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
      />

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
