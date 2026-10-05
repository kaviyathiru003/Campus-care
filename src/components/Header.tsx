import React, { useState, useRef, useEffect } from 'react';
import { Complaint, NotificationItem, User } from '../types/campus';
import { StatusBadge } from './StatusBadge';
import { CategoryIcon } from './CategoryIcon';
import { NotificationPanel } from './NotificationPanel';
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  FileText,
  Settings,
  LogOut,
  X,
  PlusCircle,
  Layers,
  Sun,
  Moon,
} from 'lucide-react';

interface HeaderProps {
  currentUser: User | null;
  complaints: Complaint[];
  notifications: NotificationItem[];
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
  onNavigate: (view: string) => void;
  onSelectComplaint: (id: string) => void;
  onOpenLogin: () => void;
  onLogout: () => void;
  onSwitchUser?: (user: User) => void;
  allUsers?: User[];
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  complaints,
  notifications,
  theme,
  onToggleTheme,
  onOpenMobileMenu,
  onNavigate,
  onSelectComplaint,
  onOpenLogin,
  onLogout,
  onSwitchUser,
  allUsers = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  // Filter complaints based on search query
  const searchResults = searchQuery.trim()
    ? complaints.filter((c) => {
        const q = searchQuery.toLowerCase();
        return (
          c.id.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.department.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.status.toLowerCase().includes(q)
        );
      })
    : [];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 py-3 transition-colors duration-200">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 -ml-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open sidebar navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-slate-800 dark:text-slate-100 tracking-tight">VELS Campus Care</span>
        </div>

        {/* Global Live Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-xl hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search complaints, locations, or keywords..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-10 pr-9 py-2 bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100/70 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="absolute right-3 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Matching Complaints ({searchResults.length})</span>
                <span className="text-[11px]">Press ESC to close</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {searchResults.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400 font-medium">
                    No complaints found matching "{searchQuery}".
                  </div>
                ) : (
                  searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectComplaint(item.id);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="p-3 hover:bg-blue-50/50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors flex items-center justify-between gap-3 text-left"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 mt-0.5">
                          <CategoryIcon category={item.category} className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-400">{item.id}</span>
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">{item.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {item.location} • {item.department}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={item.status} size="sm" />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right actions: Quick Report, Notification bell, User profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Report CTA */}
          <button
            onClick={() => onNavigate('report')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Report Issue</span>
          </button>

          {/* Notification Bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>
            <NotificationPanel
              isOpen={isNotifOpen}
              onClose={() => setIsNotifOpen(false)}
              notifications={notifications}
              onSelectComplaint={(id) => {
                onSelectComplaint(id);
                setIsNotifOpen(false);
              }}
            />
          </div>

          {/* User Profile or Login */}
          {currentUser ? (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 p-1 sm:px-2 sm:py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
                aria-label="User account options"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs ring-2 ring-white dark:ring-slate-800">
                  {currentUser.avatar || currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">{currentUser.name}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize leading-tight">
                    {currentUser.role === 'department'
                      ? 'Staff'
                      : currentUser.role === 'admin'
                      ? 'Administrator'
                      : 'Student'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 hidden sm:block" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100">
                  {/* User Profile Header */}
                  <div className="px-4 py-3 bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                    <div className="mt-1.5 inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">
                      {currentUser.role} Account
                    </div>
                  </div>

                  {/* Main Menu Links */}
                  <div className="py-1 text-xs text-slate-700 dark:text-slate-300">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onNavigate('my-complaints');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span>My Complaints</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onNavigate('map');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span>Campus Directory</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onNavigate('help');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span>Help & Guidelines</span>
                    </button>

                    {/* THEME TOGGLE: Switch between Light and Dark mode */}
                    <div className="border-t border-b border-slate-100 dark:border-slate-800 my-1 py-2 px-4 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {theme === 'dark' ? (
                            <Moon className="w-4 h-4 text-blue-400 shrink-0" />
                          ) : (
                            <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                          )}
                          <div>
                            <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs">
                              Dark Mode
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">
                              {theme === 'dark' ? 'Night theme enabled' : 'Light theme enabled'}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Toggle Switch */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleTheme();
                          }}
                          aria-label="Toggle light and dark mode"
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                            theme === 'dark' ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center text-[10px] ${
                              theme === 'dark' ? 'translate-x-5 text-blue-600' : 'translate-x-0 text-amber-500'
                            }`}
                          >
                            {theme === 'dark' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Role quick switchers for testing full workflow */}
                    {allUsers.length > 1 && (
                      <div className="border-b border-slate-100 dark:border-slate-800 pb-1 mb-1">
                        <div className="px-4 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          Switch Role (Demo)
                        </div>
                        {allUsers.map((u) => (
                          <button
                            key={u.id}
                            onClick={() => {
                              onSwitchUser && onSwitchUser(u);
                              setIsProfileOpen(false);
                            }}
                            className={`w-full px-4 py-1.5 text-left text-xs flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${
                              u.id === currentUser.id ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            <span>{u.name}</span>
                            <span className="text-[10px] uppercase text-slate-400 dark:text-slate-500">({u.role})</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <div>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          onLogout();
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-2.5 cursor-pointer font-medium transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
