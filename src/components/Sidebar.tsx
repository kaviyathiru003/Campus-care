import React from 'react';
import { VelsBuildingLogo } from './VelsBuildingLogo';
import { User } from '../types/campus';
import {
  Home,
  Building,
  PlusCircle,
  FileText,
  Search,
  HelpCircle,
  MapPin,
  Shield,
  Wrench,
  X,
  ChevronRight,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currentUser: User | null;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  isOpenMobile,
  onCloseMobile,
  onOpenLogin,
  onLogout,
}) => {
  const isHomeActive = currentView === 'home';
  const isDeptComplaintsActive = currentView === 'departments' || currentView === 'department-complaints';

  const handleNavClick = (view: string) => {
    onNavigate(view);
    onCloseMobile();
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      hasSubmenu: true,
    },
    {
      id: 'report',
      label: 'Report Issue',
      icon: PlusCircle,
    },
    {
      id: 'my-complaints',
      label: 'My Complaints',
      icon: FileText,
      requiresAuth: true,
    },
    {
      id: 'track',
      label: 'Track Status',
      icon: Search,
    },
    {
      id: 'map',
      label: 'Campus Directory',
      icon: MapPin,
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/70 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-[#0d172a] dark:bg-[#070d18] text-slate-300 z-50 flex flex-col justify-between transition-all duration-300 ease-in-out border-r border-slate-800/80 dark:border-slate-900 shadow-2xl md:shadow-none md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Header & Logo */}
        <div className="p-5 border-b border-slate-800/80 dark:border-slate-900">
          <div className="flex items-center justify-between">
            <VelsBuildingLogo
              variant="white"
              size="md"
              showText={true}
              showTagline={true}
              onClick={() => handleNavClick('home')}
            />
            <button
              onClick={onCloseMobile}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg md:hidden hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5">
          {/* Main Items */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                      : 'text-slate-300 hover:bg-slate-800/70 dark:hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-white/80" />}
                </button>

                {/* Nested Submenu: Recent Complaints by Department directly underneath Home */}
                {item.id === 'home' && (
                  <div className="pl-6 pr-1 py-1 space-y-1">
                    <button
                      onClick={() => handleNavClick('departments')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                        isDeptComplaintsActive
                          ? 'bg-blue-900/60 text-blue-200 border-l-2 border-blue-400 font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                    >
                      <Building className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="leading-snug">Recent Complaints by Department</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Department Role specific link */}
          {currentUser && (currentUser.role === 'department' || currentUser.role === 'admin') && (
            <div className="pt-3 mt-3 border-t border-slate-800/70 dark:border-slate-900">
              <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Management Console
              </span>
              <button
                onClick={() => handleNavClick('department-dashboard')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'department-dashboard'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/70 dark:hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Wrench className="w-4 h-4 text-indigo-400" />
                <span>Department Desk</span>
              </button>

              {currentUser.role === 'admin' && (
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer mt-1 ${
                    currentView === 'admin-dashboard'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/70 dark:hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>Admin Panel</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bottom Sketch & Campus Care Tagline */}
        <div className="p-4 border-t border-slate-800/80 dark:border-slate-900 bg-slate-950/40">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 p-3 border border-slate-800/60 text-center">
            <svg
              className="w-full h-16 opacity-30 text-blue-400 mx-auto"
              viewBox="0 0 200 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M 60 75 V 20 C 60 10, 100 10, 100 20 V 75" />
              <line x1="70" y1="15" x2="70" y2="75" strokeDasharray="3 2" />
              <line x1="80" y1="12" x2="80" y2="75" />
              <line x1="90" y1="15" x2="90" y2="75" strokeDasharray="3 2" />
              <line x1="60" y1="35" x2="100" y2="35" />
              <line x1="60" y1="50" x2="100" y2="50" />
              <line x1="60" y1="65" x2="100" y2="65" />
              <path d="M 100 35 H 135 V 75 H 100" />
              <line x1="115" y1="35" x2="115" y2="75" />
              <line x1="100" y1="55" x2="135" y2="55" />
              <path d="M 40 50 H 60 V 75 H 40" />
              <line x1="10" y1="75" x2="190" y2="75" strokeWidth="2" />
            </svg>
            <p className="text-[11px] font-serif italic text-blue-200/90 tracking-wide mt-1">
              "Better Campus, Brighter Tomorrow"
            </p>
            <p className="text-[9px] text-slate-500 font-sans uppercase tracking-widest mt-0.5">
              VELS UNIVERSITY
            </p>
          </div>

          {/* User status or Sign In */}
          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 truncate">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                    {currentUser.avatar}
                  </div>
                  <span className="truncate text-slate-300 font-medium">{currentUser.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Log out"
                  className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="w-full py-1.5 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
              >
                Sign In to Campus Care
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
