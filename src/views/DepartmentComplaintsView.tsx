import React, { useState } from 'react';
import { Complaint, DepartmentInfo, User } from '../types/campus';
import { StatusBadge } from '../components/StatusBadge';
import { CategoryIcon } from '../components/CategoryIcon';
import {
  Building2,
  ChevronRight,
  PlusCircle,
  Search,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';

interface DepartmentComplaintsViewProps {
  departments: DepartmentInfo[];
  complaints: Complaint[];
  currentUser: User | null;
  onSelectComplaint: (id: string) => void;
  onReportIssueForDept: (deptName: string) => void;
  initialSelectedDept?: string;
}

export const DepartmentComplaintsView: React.FC<DepartmentComplaintsViewProps> = ({
  departments,
  complaints,
  onSelectComplaint,
  onReportIssueForDept,
  initialSelectedDept,
}) => {
  const [selectedDept, setSelectedDept] = useState<string | null>(initialSelectedDept || null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const getDeptStats = (deptName: string) => {
    const deptComplaints = complaints.filter((c) => c.department === deptName);
    const count = deptComplaints.length;
    const pendingCount = deptComplaints.filter((c) => c.status === 'Pending').length;
    const inProgressCount = deptComplaints.filter((c) => c.status === 'In Progress').length;
    const resolvedCount = deptComplaints.filter((c) => c.status === 'Resolved').length;
    const latest = deptComplaints[0] || null;

    return { count, pendingCount, inProgressCount, resolvedCount, latest };
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchesDept = selectedDept ? c.department === selectedDept : true;
    const matchesStatus = statusFilter === 'All' ? true : c.status === statusFilter;
    const matchesSearch = searchQuery
      ? c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesDept && matchesStatus && matchesSearch;
  });

  const activeDeptInfo = departments.find((d) => d.name === selectedDept);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Campus Division Breakdown</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Recent Complaints by Department
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor, track and address maintenance reports categorized by college faculties & facilities.
          </p>
        </div>

        {selectedDept ? (
          <button
            onClick={() => setSelectedDept(null)}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View All Departments</span>
          </button>
        ) : (
          <button
            onClick={() => onReportIssueForDept('General')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>File New Department Issue</span>
          </button>
        )}
      </div>

      {/* Grid of All Department Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {departments.map((dept) => {
          const stats = getDeptStats(dept.name);
          const isSelected = selectedDept === dept.name;

          return (
            <div
              key={dept.id}
              onClick={() => setSelectedDept(isSelected ? null : dept.name)}
              className={`p-5 rounded-3xl border text-left transition-all cursor-pointer relative group flex flex-col justify-between min-h-[170px] ${
                isSelected
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm tracking-wide shadow-2xs"
                    style={{ backgroundColor: dept.accentBg, color: dept.color }}
                  >
                    {dept.code}
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      stats.count > 0
                        ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {stats.count === 0 ? 'No complaints' : `${stats.count} complaint${stats.count > 1 ? 's' : ''}`}
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {dept.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{dept.floor}</p>
              </div>

              {/* Latest complaint snippet or status */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                {stats.latest ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 dark:text-slate-500 font-medium">Latest:</span>
                      <StatusBadge status={stats.latest.status} size="sm" showIcon={false} />
                    </div>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                      {stats.latest.title}
                    </p>
                  </div>
                ) : (
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    All facilities in order
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Department / Filtered Complaints Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        {/* Table Controls */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-850/60">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{selectedDept ? `${selectedDept} Complaints` : 'All Department Complaints'}</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                ({filteredComplaints.length} records)
              </span>
            </h2>
            {activeDeptInfo && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Head: {activeDeptInfo.head} • Contact: {activeDeptInfo.contact} • Located: {activeDeptInfo.floor}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-white dark:bg-slate-800 text-xs rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              {['All', 'Pending', 'In Progress', 'Resolved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    statusFilter === st
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {selectedDept && (
              <button
                onClick={() => onReportIssueForDept(selectedDept)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Ticket</span>
              </button>
            )}
          </div>
        </div>

        {/* Complaints Table */}
        {filteredComplaints.length === 0 ? (
          <div className="p-12 text-center text-slate-400 dark:text-slate-500">
            <Building2 className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">No complaints found</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {selectedDept
                ? `No current complaints filed for ${selectedDept} matching the filter.`
                : 'No complaints match the selected filter criteria.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4"># ID</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Title & Description</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Reported</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredComplaints.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onSelectComplaint(c.id)}
                    className="hover:bg-blue-50/40 dark:hover:bg-slate-800/60 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700 dark:text-blue-400 group-hover:underline whitespace-nowrap">
                      {c.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {c.department}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <CategoryIcon category={c.category} className="w-3.5 h-3.5" />
                        <span>{c.category}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-semibold text-slate-900 dark:text-white truncate">{c.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{c.description}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {c.location}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={c.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {c.submittedDate}
                    </td>
                    <td className="py-3.5 px-4 text-right">
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
      </div>
    </div>
  );
};
