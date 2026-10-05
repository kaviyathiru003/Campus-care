import React, { useState } from 'react';
import { Complaint, DepartmentInfo, User } from '../types/campus';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';
import { CategoryIcon } from '../components/CategoryIcon';
import {
  FileText,
  Search,
  PlusCircle,
  ChevronRight,
} from 'lucide-react';

interface MyComplaintsViewProps {
  complaints: Complaint[];
  currentUser: User | null;
  departments: DepartmentInfo[];
  onSelectComplaint: (id: string) => void;
  onNavigate: (view: string) => void;
}

export const MyComplaintsView: React.FC<MyComplaintsViewProps> = ({
  complaints,
  currentUser,
  departments,
  onSelectComplaint,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'In Progress' | 'Resolved'>('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const isStudent = !currentUser || currentUser.role === 'student';
  const userComplaints = isStudent
    ? complaints.filter((c) => {
        return (
          c.submittedBy === (currentUser?.name || 'Kaviya T') ||
          c.submittedBy.toLowerCase().includes('kaviya')
        );
      })
    : complaints;

  const filtered = userComplaints.filter((c) => {
    const matchesTab = activeTab === 'All' ? true : c.status === activeTab;
    const matchesCategory = categoryFilter === 'All' ? true : c.category === categoryFilter;
    const matchesDept = deptFilter === 'All' ? true : c.department === deptFilter;
    const matchesSearch = searchQuery
      ? c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesTab && matchesCategory && matchesDept && matchesSearch;
  });

  const categories = [
    'All',
    'Water Leakage',
    'Electrical',
    'Furniture',
    'Equipment',
    'Cleanliness',
    'Plumbing',
    'Internet/Wi-Fi',
    'Classroom',
  ];

  const tabs: Array<'All' | 'Pending' | 'In Progress' | 'Resolved'> = [
    'All',
    'Pending',
    'In Progress',
    'Resolved',
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Student Service Portal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            My Maintenance Complaints
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Track real-time progress and history of all complaints submitted under your student profile ({currentUser?.name || 'Kaviya T'}).
          </p>
        </div>

        <button
          onClick={() => onNavigate('report')}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report Another Issue</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200/80 dark:border-slate-800 px-6 pt-2 bg-slate-50/50 dark:bg-slate-850/60 overflow-x-auto">
          {tabs.map((tab) => {
            const count =
              tab === 'All'
                ? userComplaints.length
                : userComplaints.filter((c) => c.status === tab).length;
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 rounded-t-xl'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters & Search Row */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ticket #, description, room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Select Category */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Select Department */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">Department:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
            >
              <option value="All">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Complaints Table */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 dark:text-slate-500 space-y-3">
            <FileText className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No complaints found</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
              There are no reports matching your selected tab or filter criteria.
            </p>
            <button
              onClick={() => {
                setActiveTab('All');
                setCategoryFilter('All');
                setDeptFilter('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-5">Ticket #</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Subject & Description</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Reported</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onSelectComplaint(c.id)}
                    className="hover:bg-blue-50/40 dark:hover:bg-slate-800/60 cursor-pointer transition-colors group"
                  >
                    <td className="py-4 px-5 font-mono font-bold text-blue-700 dark:text-blue-400 group-hover:underline whitespace-nowrap">
                      {c.id}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <CategoryIcon category={c.category} className="w-4 h-4" />
                        <span>{c.category}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <p className="font-semibold text-slate-900 dark:text-white truncate">{c.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{c.description}</p>
                    </td>
                    <td className="py-4 px-4 text-slate-700 dark:text-slate-300 whitespace-nowrap">{c.location}</td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">{c.department}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <PriorityBadge priority={c.priority} />
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <StatusBadge status={c.status} size="sm" />
                    </td>
                    <td className="py-4 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">{c.submittedDate}</td>
                    <td className="py-4 px-5 text-right">
                      <span className="p-1.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-slate-800 inline-block">
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer info */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-6">
          <span>
            Displaying {filtered.length} of {userComplaints.length} tickets
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            Click any row to view assigned crew, expected resolution & history
          </span>
        </div>
      </div>
    </div>
  );
};
