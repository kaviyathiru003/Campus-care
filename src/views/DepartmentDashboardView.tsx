import React, { useState } from 'react';
import { Complaint, ComplaintStatus, DepartmentInfo, User } from '../types/campus';
import { StatusBadge } from '../components/StatusBadge';
import { localStorageService } from '../services/localStorageService';
import { showToast } from '../components/Toast';
import {
  Wrench,
  Search,
  PlusCircle,
  Send,
} from 'lucide-react';

interface DepartmentDashboardViewProps {
  complaints: Complaint[];
  currentUser: User | null;
  departments: DepartmentInfo[];
  onSelectComplaint: (id: string) => void;
  onNavigate: (view: string) => void;
}

export const DepartmentDashboardView: React.FC<DepartmentDashboardViewProps> = ({
  complaints,
  currentUser,
  departments,
  onSelectComplaint,
  onNavigate,
}) => {
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [activeTicket, setActiveTicket] = useState<Complaint | null>(null);
  const [modalStatus, setModalStatus] = useState<ComplaintStatus>('In Progress');
  const [modalAssignedTo, setModalAssignedTo] = useState('');
  const [modalResponse, setModalResponse] = useState('');
  const [modalNotes, setModalNotes] = useState('');
  const [modalExpectedDate, setModalExpectedDate] = useState('');

  const filtered = complaints.filter((c) => {
    const matchesDept = selectedDeptFilter === 'All' ? true : c.department === selectedDeptFilter;
    const matchesStatus = selectedStatusFilter === 'All' ? true : c.status === selectedStatusFilter;
    const matchesSearch = searchQuery
      ? c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesDept && matchesStatus && matchesSearch;
  });

  const totalCount = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === 'Pending').length;
  const inProgressCount = complaints.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;

  const handleOpenActionModal = (ticket: Complaint) => {
    setActiveTicket(ticket);
    setModalStatus(ticket.status);
    setModalAssignedTo(ticket.assignedTo || '');
    setModalResponse(ticket.departmentResponse || '');
    setModalNotes(ticket.maintenanceNotes || '');
    setModalExpectedDate(ticket.expectedResolution || '');
  };

  const handleSaveTicketUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket) return;

    const updater = currentUser?.name || 'Department Staff';
    const updated = localStorageService.updateComplaintStatus(
      activeTicket.id,
      modalStatus,
      updater,
      modalNotes || `Department marked ticket as ${modalStatus}`,
      {
        assignedTo: modalAssignedTo,
        departmentResponse: modalResponse,
        maintenanceNotes: modalNotes,
        expectedResolution: modalExpectedDate,
      }
    );

    if (updated) {
      showToast(`Ticket ${activeTicket.id} updated to ${modalStatus}!`, 'success');
      setActiveTicket(null);
    }
  };

  const handleQuickResolve = (c: Complaint, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = localStorageService.updateComplaintStatus(
      c.id,
      'Resolved',
      currentUser?.name || 'Department Staff',
      'Quick resolve action executed by department manager.'
    );
    if (updated) {
      showToast(`Ticket ${c.id} marked as Resolved!`, 'success');
    }
  };

  const handleQuickAccept = (c: Complaint, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = localStorageService.updateComplaintStatus(
      c.id,
      'In Progress',
      currentUser?.name || 'Department Staff',
      'Complaint accepted and maintenance technician dispatched.'
    );
    if (updated) {
      showToast(`Ticket ${c.id} moved to In Progress!`, 'success');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Wrench className="w-4 h-4" />
            <span>Staff Maintenance Operations</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Department Maintenance Operations Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Accept incoming work tickets, assign technician crews, log spare part notes, and mark repairs resolved.
          </p>
        </div>

        <button
          onClick={() => onNavigate('report')}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Department Work Order</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Total Work Orders</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 block">
            {totalCount}
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block">Pending Acceptance</span>
          <span className="text-2xl sm:text-3xl font-black text-rose-700 dark:text-rose-400 mt-1 block">
            {pendingCount}
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">Active In Progress</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-700 dark:text-amber-400 mt-1 block">
            {inProgressCount}
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">Successfully Resolved</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 mt-1 block">
            {resolvedCount}
          </span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        {/* Table Filters */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-850/60">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ticket #, description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedDeptFilter}
              onChange={(e) => setSelectedDeptFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl cursor-pointer"
            >
              <option value="All">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4"># Ticket</th>
                <th className="py-3.5 px-4">Department & Room</th>
                <th className="py-3.5 px-4">Complaint Subject</th>
                <th className="py-3.5 px-4">Assigned Crew</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Reported By</th>
                <th className="py-3.5 px-4 text-right">Staff Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => onSelectComplaint(c.id)}
                  className="hover:bg-blue-50/40 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700 dark:text-blue-400 whitespace-nowrap">
                    {c.id}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{c.department}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{c.location}</div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">{c.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{c.description}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 whitespace-nowrap font-medium">
                    {c.assignedTo || <span className="text-slate-400 dark:text-slate-500 italic">Unassigned</span>}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {c.submittedBy}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {c.status === 'Pending' && (
                        <button
                          onClick={(e) => handleQuickAccept(c, e)}
                          className="px-2.5 py-1 text-xs bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-300 rounded-lg font-semibold cursor-pointer"
                        >
                          Accept
                        </button>
                      )}
                      {c.status === 'In Progress' && (
                        <button
                          onClick={(e) => handleQuickResolve(c, e)}
                          className="px-2.5 py-1 text-xs bg-emerald-100 dark:bg-emerald-950/60 hover:bg-emerald-200 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 rounded-lg font-semibold cursor-pointer"
                        >
                          Resolve
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenActionModal(c)}
                        className="px-2.5 py-1 text-xs bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg font-semibold cursor-pointer border border-blue-200 dark:border-blue-800"
                      >
                        Manage
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Staff Manage Dialog Modal */}
      {activeTicket && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                  Staff Update Console
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Update Ticket {activeTicket.id}: {activeTicket.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveTicket(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTicketUpdate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as ComplaintStatus)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl text-xs font-semibold"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Assigned Technician</label>
                  <input
                    type="text"
                    placeholder="e.g. Electrical Crew A"
                    value={modalAssignedTo}
                    onChange={(e) => setModalAssignedTo(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Expected Resolution</label>
                <input
                  type="text"
                  placeholder="e.g. Today 5:00 PM / Tomorrow morning"
                  value={modalExpectedDate}
                  onChange={(e) => setModalExpectedDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Official Department Response</label>
                <textarea
                  rows={3}
                  placeholder="This message will be visible to student in their complaint details..."
                  value={modalResponse}
                  onChange={(e) => setModalResponse(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Internal Maintenance Notes</label>
                <textarea
                  rows={2}
                  placeholder="Parts used, circuit breakers isolated, technician remarks..."
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTicket(null)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
