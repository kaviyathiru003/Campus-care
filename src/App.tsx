import React, { useState, useEffect } from 'react';
import {
  Complaint,
  DepartmentInfo,
  NotificationItem,
  User,
} from './types/campus';
import {
  localStorageService,
  subscribeToStorageChanges,
} from './services/localStorageService';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ToastContainer } from './components/Toast';
import { ComplaintDetailsModal } from './components/ComplaintDetailsModal';
import { LoginModal } from './components/LoginModal';

import { HomeView } from './views/HomeView';
import { DepartmentComplaintsView } from './views/DepartmentComplaintsView';
import { ReportIssueView } from './views/ReportIssueView';
import { MyComplaintsView } from './views/MyComplaintsView';
import { TrackStatusView } from './views/TrackStatusView';
import { CampusMapView } from './views/CampusMapView';
import { HelpSupportView } from './views/HelpSupportView';
import { DepartmentDashboardView } from './views/DepartmentDashboardView';
import { AdminDashboardView } from './views/AdminDashboardView';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorageService.getTheme();
  });

  // Initialize storage & theme on mount
  useEffect(() => {
    localStorageService.init();
    const current = localStorageService.getTheme();
    setTheme(current);
    if (current === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const [currentView, setCurrentView] = useState<string>('home');
  const [complaints, setComplaints] = useState<Complaint[]>(() =>
    localStorageService.getComplaints()
  );
  const [departments, setDepartments] = useState<DepartmentInfo[]>(() =>
    localStorageService.getDepartments()
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    localStorageService.getNotifications()
  );
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    localStorageService.getCurrentUser()
  );
  const [allUsers, setAllUsers] = useState<User[]>(() =>
    localStorageService.getAllUsers()
  );
  const [stats, setStats] = useState(() => localStorageService.getStatistics());

  // Modals & Drawers
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [initialTrackId, setInitialTrackId] = useState<string | undefined>(undefined);
  const [reportInitialDept, setReportInitialDept] = useState<string | undefined>(undefined);
  const [deptViewInitialFilter, setDeptViewInitialFilter] = useState<string | undefined>(undefined);

  // Subscribe to reactive storage changes
  useEffect(() => {
    const refreshData = () => {
      setComplaints(localStorageService.getComplaints());
      setNotifications(localStorageService.getNotifications());
      setCurrentUser(localStorageService.getCurrentUser());
      setStats(localStorageService.getStatistics());
      setAllUsers(localStorageService.getAllUsers());
      setTheme(localStorageService.getTheme());
    };

    const unsubscribe = subscribeToStorageChanges(refreshData);
    return () => unsubscribe();
  }, []);

  // Theme Toggle Handler
  const handleToggleTheme = () => {
    const nextTheme: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorageService.setTheme(nextTheme);
  };

  // Handlers
  const handleSelectComplaint = (id: string) => {
    setSelectedComplaintId(id);
  };

  const handleTrackComplaint = (id: string) => {
    setInitialTrackId(id);
    setCurrentView('track');
  };

  const handleReportIssueForDept = (deptName: string) => {
    setReportInitialDept(deptName);
    setCurrentView('report');
  };

  const handleSelectDepartmentPreview = (deptName: string) => {
    setDeptViewInitialFilter(deptName);
    setCurrentView('departments');
  };

  const handleReportOnFloor = (floor: string, facility?: string) => {
    setReportInitialDept(facility || undefined);
    setCurrentView('report');
  };

  const handleLogout = () => {
    localStorageService.clearSession();
    setCurrentUser(null);
    setIsLoginModalOpen(true);
  };

  const handleSwitchUser = (user: User) => {
    localStorageService.setSession(user);
    setCurrentUser(user);
  };

  const activeComplaintObj = selectedComplaintId
    ? complaints.find(
        (c) =>
          c.id.toLowerCase().replace(/^#/, '') ===
          selectedComplaintId.toLowerCase().replace(/^#/, '')
      ) || null
    : null;

  return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans flex flex-col md:flex-row antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Fixed Navy Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main App Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          currentUser={currentUser}
          complaints={complaints}
          notifications={notifications}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectComplaint={handleSelectComplaint}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
          onSwitchUser={handleSwitchUser}
          allUsers={allUsers}
        />

        {/* Dynamic Main View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {currentView === 'home' && (
            <HomeView
              complaints={complaints}
              departments={departments}
              notifications={notifications}
              currentUser={currentUser}
              onNavigate={setCurrentView}
              onSelectComplaint={handleSelectComplaint}
              onSelectDepartment={handleSelectDepartmentPreview}
              stats={stats}
            />
          )}

          {currentView === 'departments' && (
            <DepartmentComplaintsView
              departments={departments}
              complaints={complaints}
              currentUser={currentUser}
              onSelectComplaint={handleSelectComplaint}
              onReportIssueForDept={handleReportIssueForDept}
              initialSelectedDept={deptViewInitialFilter}
            />
          )}

          {currentView === 'report' && (
            <ReportIssueView
              departments={departments}
              currentUser={currentUser}
              onNavigate={setCurrentView}
              onSelectComplaint={handleSelectComplaint}
              initialDepartment={reportInitialDept}
            />
          )}

          {currentView === 'my-complaints' && (
            <MyComplaintsView
              complaints={complaints}
              currentUser={currentUser}
              departments={departments}
              onSelectComplaint={handleSelectComplaint}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'track' && (
            <TrackStatusView
              initialComplaintId={initialTrackId}
              onSelectComplaint={handleSelectComplaint}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'map' && (
            <CampusMapView
              complaints={complaints}
              onReportOnFloor={handleReportOnFloor}
              onSelectComplaint={handleSelectComplaint}
            />
          )}

          {currentView === 'help' && (
            <HelpSupportView onNavigate={setCurrentView} />
          )}

          {currentView === 'department-dashboard' && (
            <DepartmentDashboardView
              complaints={complaints}
              currentUser={currentUser}
              departments={departments}
              onSelectComplaint={handleSelectComplaint}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'admin-dashboard' && (
            <AdminDashboardView
              complaints={complaints}
              departments={departments}
              users={allUsers}
              currentUser={currentUser}
              onSelectComplaint={handleSelectComplaint}
              onNavigate={setCurrentView}
            />
          )}
        </main>
      </div>

      {/* Complaint Details Modal */}
      {selectedComplaintId && (
        <ComplaintDetailsModal
          complaint={activeComplaintObj}
          onClose={() => setSelectedComplaintId(null)}
          currentUser={currentUser}
          onTrackStatus={handleTrackComplaint}
          onReportAnother={() => {
            setSelectedComplaintId(null);
            setCurrentView('report');
          }}
        />
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'department') {
            setCurrentView('department-dashboard');
          } else if (user.role === 'admin') {
            setCurrentView('admin-dashboard');
          } else {
            setCurrentView('home');
          }
        }}
      />
    </div>
  );
}
