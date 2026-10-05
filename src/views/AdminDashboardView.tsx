import React, { useState } from 'react';
import { Complaint, DepartmentInfo, User } from '../types/campus';
import { StatusBadge } from '../components/StatusBadge';
import { localStorageService } from '../services/localStorageService';
import { showToast } from '../components/Toast';
import {
  Shield,
  Users,
  Building2,
  FileText,
  Trash2,
  Download,
} from 'lucide-react';

interface AdminDashboardViewProps {
  complaints: Complaint[];
  departments: DepartmentInfo[];
  users: User[];
  currentUser: User | null;
  onSelectComplaint: (id: string) => void;
  onNavigate: (view: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  complaints,
  departments,
  users,
  onSelectComplaint,
}) => {
  const [activeTab, setActiveTab] = useState<'complaints' | 'users' | 'departments'>('complaints');

  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === 'Resolved').length;

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(complaints, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `vels_campus_complaints_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported complaints database as JSON', 'success');
  };

  const handleDeleteComplaint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to permanently remove complaint ${id}?`)) {
      localStorageService.deleteComplaint(id);
      showToast(`Complaint ${id} deleted from system`, 'info');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Campus Care Governance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            System Administration & Audit Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Oversee all college divisions, user access, complaint audit trails and maintenance metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Total Tickets</span>
          <span className="text-3xl font-black text-slate-900 dark:text-white mt-1 block">{total}</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block">Active Departments</span>
          <span className="text-3xl font-black text-purple-700 dark:text-purple-400 mt-1 block">
            {departments.length}
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Registered Users</span>
          <span className="text-3xl font-black text-blue-700 dark:text-blue-400 mt-1 block">{users.length}</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">Resolution Rate</span>
          <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400 mt-1 block">
            {total > 0 ? ((resolved / total) * 100).toFixed(0) : 0}%
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/60 px-6 pt-3 gap-4">
          <button
            onClick={() => setActiveTab('complaints')}
            className={`pb-3 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'complaints'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>All Complaints ({complaints.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('departments')}
            className={`pb-3 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'departments'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Departments ({departments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'users'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Accounts ({users.length})</span>
          </button>
        </div>

        {/* Tab 1: Complaints Audit */}
        {activeTab === 'complaints' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4"># Ticket</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Submitted By</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Resolution ETA</th>
                  <th className="py-3 px-4 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {complaints.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onSelectComplaint(c.id)}
                    className="hover:bg-purple-50/30 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-purple-700 dark:text-purple-400 whitespace-nowrap">
                      {c.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {c.department}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate font-medium text-slate-900 dark:text-white">
                      {c.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {c.submittedBy}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={c.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {c.expectedResolution || 'Standard SLA'}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => handleDeleteComplaint(c.id, e)}
                        title="Delete ticket"
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Departments */}
        {activeTab === 'departments' && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((d) => (
              <div key={d.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{d.name}</span>
                  <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">{d.code}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">{d.description}</p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
                  <span>Head: {d.head}</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{d.floor}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Users */}
        {activeTab === 'users' && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {users.map((u) => (
              <div key={u.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/60 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {u.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 dark:text-white">{u.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{u.email}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Role:</span>
                  <span className="font-bold uppercase text-blue-700 dark:text-blue-400">{u.role}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
