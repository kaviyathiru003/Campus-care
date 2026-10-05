import React, { useState } from 'react';
import { Complaint, DepartmentInfo, NotificationItem, User } from '../types/campus';
import { StatusBadge } from '../components/StatusBadge';
import { CategoryIcon } from '../components/CategoryIcon';
import { VelsBuildingLogo } from '../components/VelsBuildingLogo';
import { CAMPUS_IMAGES } from '../assets/images';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  PhoneCall,
  PlusCircle,
  FileText,
  MapPin,
  Sparkles,
  Shield,
  Zap,
  ChevronRight,
} from 'lucide-react';

interface HomeViewProps {
  complaints: Complaint[];
  departments: DepartmentInfo[];
  notifications: NotificationItem[];
  currentUser: User | null;
  onNavigate: (view: string) => void;
  onSelectComplaint: (id: string) => void;
  onSelectDepartment: (deptName: string) => void;
  stats: {
    total: number;
    inProgress: number;
    resolved: number;
    pending: number;
    inProgressPct: string;
    resolvedPct: string;
    pendingPct: string;
    newCount: number;
  };
}

export const HomeView: React.FC<HomeViewProps> = ({
  complaints,
  departments,
  notifications,
  currentUser,
  onNavigate,
  onSelectComplaint,
  onSelectDepartment,
  stats,
}) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  const filteredRecent = complaints
    .filter((c) => (selectedCategoryFilter === 'All' ? true : c.category === selectedCategoryFilter))
    .slice(0, 5);

  const categories = ['All', 'Water Leakage', 'Electrical', 'Furniture', 'Equipment', 'Cleanliness'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Main Grid: Hero Banner + Right Action Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Hero Section */}
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c2340] via-[#102a4d] to-[#1e3a8a] text-white shadow-xl border border-blue-900/40 dark:border-blue-950 min-h-[300px] flex flex-col justify-between p-6 sm:p-8">
          {/* Subtle Background Pattern & Campus Photo Blend */}
          <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen bg-cover bg-center">
            <img
              src={CAMPUS_IMAGES.hero}
              alt="Campus Building"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0 right-0 w-80 h-full hidden sm:block opacity-35 pointer-events-none">
            <img
              src={CAMPUS_IMAGES.hero}
              alt="VELS Building"
              className="w-full h-full object-cover rounded-l-3xl shadow-inner mask-radial"
            />
          </div>

          <div className="relative z-10 max-w-lg space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-blue-200 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>VELS Official Maintenance Portal</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Campus Maintenance Reporting System
              </h1>
              <p className="text-sm sm:text-base text-blue-100/90 font-medium">
                Report issues. Track progress. Build a better campus.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-blue-100">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                Faster Action
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Shield className="w-3.5 h-3.5 text-emerald-300" />
                Transparent Process
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                Better Campus
              </span>
            </div>
          </div>

          {/* Action Row inside Hero */}
          <div className="relative z-10 pt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('report')}
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-500/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report a New Issue</span>
            </button>
            <button
              onClick={() => onNavigate('track')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Track Existing Ticket</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Report Issue CTA + Quick Links matching screenshot */}
        <div className="space-y-4">
          {/* Found a Problem Callout Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 rounded-3xl shadow-md border border-blue-500/30 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 block">
                Found a problem?
              </span>
              <h2 className="text-base font-bold">Report a New Issue</h2>
              <p className="text-xs text-blue-100">Let maintenance fix it promptly</p>
            </div>
            <button
              onClick={() => onNavigate('report')}
              className="p-3 bg-white text-blue-600 hover:bg-blue-50 rounded-2xl shadow-sm transition-transform active:scale-95 cursor-pointer shrink-0"
              aria-label="Report issue now"
            >
              <PlusCircle className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Links Grid matching screenshot */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-xs border border-slate-200/80 dark:border-slate-800 space-y-3 transition-colors">
            <h2 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Quick Links</h2>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => onNavigate('map')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/70 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-200 dark:hover:border-blue-700 text-left transition-all cursor-pointer group"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-xl w-fit mb-2 group-hover:scale-105 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-800 dark:text-slate-100">Campus Map</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Find locations & labs</div>
              </button>

              <button
                onClick={() => onNavigate('my-complaints')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/70 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-200 dark:hover:border-blue-700 text-left transition-all cursor-pointer group"
              >
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded-xl w-fit mb-2 group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-800 dark:text-slate-100">My Complaints</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">View your reports</div>
              </button>

              <button
                onClick={() => onNavigate('help')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/70 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-200 dark:hover:border-blue-700 text-left transition-all cursor-pointer group"
              >
                <div className="p-2 bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 rounded-xl w-fit mb-2 group-hover:scale-105 transition-transform">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-800 dark:text-slate-100">FAQ & Guides</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Get quick help</div>
              </button>

              <button
                onClick={() => onNavigate('help')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/70 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-200 dark:hover:border-blue-700 text-left transition-all cursor-pointer group"
              >
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 rounded-xl w-fit mb-2 group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-800 dark:text-slate-100">Contact Admin</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Need immediate help?</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Complaints</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{stats.total}</span>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-0.5">
              ↑ {stats.newCount} new
            </span>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">In Progress</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{stats.inProgress}</span>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">→ {stats.inProgressPct}%</span>
          </div>
        </div>

        {/* Resolved */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Resolved</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{stats.resolved}</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">→ {stats.resolvedPct}%</span>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Pending</span>
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{stats.pending}</span>
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">→ {stats.pendingPct}%</span>
          </div>
        </div>
      </div>

      {/* Main Content Area: Recent Complaints Table + Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Complaints Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col transition-colors">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Recent Complaints</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Click any row to view full progress timeline and notes</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Category Filter Pills */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                {categories.slice(0, 3).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                      selectedCategoryFilter === cat
                        ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                onClick={() => onNavigate('my-complaints')}
                className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredRecent.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onSelectComplaint(c.id)}
                    className="hover:bg-blue-50/40 dark:hover:bg-slate-800/60 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700 dark:text-blue-400 group-hover:underline">
                      {c.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <CategoryIcon category={c.category} className="w-4 h-4" />
                        <span>{c.category}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 max-w-[200px] truncate">
                      {c.description}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {c.location}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={c.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {c.submittedDate}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="p-1.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-slate-800 inline-block transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {filteredRecent.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectComplaint(c.id)}
                className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-400">{c.id}</span>
                  <StatusBadge status={c.status} size="sm" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <CategoryIcon category={c.category} className="w-3.5 h-3.5" />
                  <span>{c.category}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{c.description}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                  <span>{c.location}</span>
                  <span>{c.submittedDate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-5">
            <span>
              Showing {filteredRecent.length} of {complaints.length} reports
            </span>
            <button
              onClick={() => onNavigate('my-complaints')}
              className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer"
            >
              Explore all complaints →
            </button>
          </div>
        </div>

        {/* Right Column: Recent Activity Feed matching screenshot */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Recent Activity
              </h2>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Live Campus Updates</span>
            </div>

            <div className="space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800">
              {notifications.slice(0, 5).map((n) => (
                <div
                  key={n.id}
                  onClick={() => n.complaintId && onSelectComplaint(n.complaintId)}
                  className="pt-3 first:pt-0 flex items-start gap-3 cursor-pointer group"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1 shrink-0 ring-4 ring-blue-50 dark:ring-blue-950 group-hover:scale-125 transition-transform" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {n.message}
                    </p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 block">{n.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Care Motivation Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 dark:from-slate-900 dark:to-blue-950/40 rounded-3xl p-4 border border-blue-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-2xl shrink-0 shadow-xs">
              <VelsBuildingLogo
                variant="white"
                size="sm"
                showText={false}
                showTagline={false}
              />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Small reports make a big difference
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                Together we keep our campus clean, safe and well-maintained.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Complaints by Department Preview Strip */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent Complaints by Department</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Monitor issue load across university divisions</p>
          </div>
          <button
            onClick={() => onNavigate('departments')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Departments</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {departments.slice(0, 6).map((dept) => {
            const count = complaints.filter((c) => c.department === dept.name).length;
            return (
              <button
                key={dept.id}
                onClick={() => onSelectDepartment(dept.name)}
                className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-slate-800/60 text-left transition-all cursor-pointer group shadow-2xs"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs mb-2 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: dept.accentBg, color: dept.color }}
                >
                  {dept.code}
                </div>
                <h3 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {dept.name}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                  {count === 0 ? 'No complaints' : `${count} complaint${count > 1 ? 's' : ''}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
