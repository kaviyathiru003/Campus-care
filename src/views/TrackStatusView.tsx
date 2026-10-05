import React, { useState, useEffect } from 'react';
import { Complaint, ComplaintStatus } from '../types/campus';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';
import { localStorageService } from '../services/localStorageService';
import { showToast } from '../components/Toast';
import {
  Search,
  CheckCircle2,
  ArrowRight,
  Building2,
  Wrench,
  ShieldCheck,
  UserCheck,
  FileCheck2,
  HelpCircle,
} from 'lucide-react';

interface TrackStatusViewProps {
  initialComplaintId?: string;
  onSelectComplaint: (id: string) => void;
  onNavigate: (view: string) => void;
}

export const TrackStatusView: React.FC<TrackStatusViewProps> = ({
  initialComplaintId,
  onSelectComplaint,
  onNavigate,
}) => {
  const [searchId, setSearchId] = useState(initialComplaintId || 'CM-0128');
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (idToSearch?: string) => {
    const target = (idToSearch || searchId).trim();
    if (!target) {
      showToast('Please enter a Complaint ID', 'error');
      return;
    }

    const found = localStorageService.getComplaintById(target);
    setHasSearched(true);
    if (found) {
      setComplaint(found);
      showToast(`Found Ticket ${found.id}`, 'success');
    } else {
      setComplaint(null);
      showToast(`Complaint ID "${target}" not found`, 'error');
    }
  };

  useEffect(() => {
    if (initialComplaintId) {
      handleSearch(initialComplaintId);
    } else {
      handleSearch('CM-0128');
    }
  }, [initialComplaintId]);

  const steps = [
    { label: 'Submitted', key: 'Submitted', icon: FileCheck2 },
    { label: 'Received', key: 'Received', icon: Building2 },
    { label: 'Assigned', key: 'Assigned', icon: UserCheck },
    { label: 'In Progress', key: 'In Progress', icon: Wrench },
    { label: 'Resolved', key: 'Resolved', icon: CheckCircle2 },
  ];

  const getStepStatus = (status: ComplaintStatus, stepIndex: number) => {
    if (status === 'Resolved') return 'completed';
    if (status === 'In Progress') {
      if (stepIndex < 3) return 'completed';
      if (stepIndex === 3) return 'current';
      return 'upcoming';
    }
    if (status === 'Pending') {
      if (stepIndex === 0) return 'completed';
      if (stepIndex === 1) return 'current';
      return 'upcoming';
    }
    return 'upcoming';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
          <Search className="w-4 h-4" />
          <span>Real-Time Ticket Tracker</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Track Maintenance Complaint Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Enter your unique complaint reference number (e.g. <b>CM-0128</b> or <b>#CM-0127</b>) to inspect stage-by-stage repairs.
        </p>

        {/* Search Bar Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="mt-5 flex gap-2 max-w-xl"
        >
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-mono font-bold text-xs">
              #
            </span>
            <input
              type="text"
              placeholder="e.g. CM-0128"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs sm:text-sm font-semibold uppercase focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Track Status
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <span>Sample tickets:</span>
          {['CM-0128', 'CM-0127', 'CM-0126', 'CM-0125'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setSearchId(id);
                handleSearch(id);
              }}
              className="font-mono text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              #{id}
            </button>
          ))}
        </div>
      </div>

      {/* Result Card */}
      {complaint ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden space-y-6 p-6 sm:p-8 animate-in fade-in duration-200 transition-colors">
          {/* Top Info Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-base font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800">
                  {complaint.id}
                </span>
                <StatusBadge status={complaint.status} size="md" />
                <PriorityBadge priority={complaint.priority} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">{complaint.title}</h2>
            </div>

            <button
              onClick={() => onSelectComplaint(complaint.id)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Full Details Modal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-6">
              Resolution Progress Flow
            </h3>
            <div className="relative">
              <div className="hidden sm:block absolute top-5 left-8 right-8 h-1 bg-slate-200 dark:bg-slate-700 z-0" />
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                {steps.map((step, idx) => {
                  const state = getStepStatus(complaint.status, idx);
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.label}
                      className={`flex sm:flex-col items-center gap-3 sm:gap-2 sm:text-center p-3 rounded-2xl transition-all ${
                        state === 'current'
                          ? 'bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800'
                          : state === 'completed'
                          ? 'bg-blue-50/40 dark:bg-blue-950/30 sm:bg-transparent'
                          : 'opacity-50'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 transition-transform ${
                          state === 'completed'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : state === 'current'
                            ? 'bg-amber-500 text-white animate-bounce shadow-sm'
                            : 'bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p
                          className={`text-xs font-bold ${
                            state === 'current'
                              ? 'text-amber-800 dark:text-amber-300'
                              : state === 'completed'
                              ? 'text-blue-900 dark:text-blue-300'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {step.label} {state === 'completed' ? '✓' : state === 'current' ? '●' : '○'}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                          {state === 'completed'
                            ? 'Done'
                            : state === 'current'
                            ? 'Active Step'
                            : 'Pending'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Department:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{complaint.department}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Location:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{complaint.location}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Last Updated:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{complaint.updatedDate}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Expected Resolution:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                {complaint.expectedResolution || 'Within 48 hours'}
              </span>
            </div>
          </div>

          {/* Department Feedback & Crew Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/40 text-xs space-y-1.5">
              <span className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Department Response
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {complaint.departmentResponse ||
                  'Ticket received by department. Maintenance crew dispatched for verification.'}
              </p>
            </div>

            <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/40 text-xs space-y-1.5">
              <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Assigned Team & Notes
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {complaint.assignedTo ? `Assigned to: ${complaint.assignedTo}. ` : 'Team: Assigned to duty crew. '}
                {complaint.maintenanceNotes || 'Repairs scheduled during non-class hours.'}
              </p>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 dark:text-slate-500 space-y-3 transition-colors">
          <HelpCircle className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
          <h2 className="text-base font-bold text-slate-700 dark:text-slate-300">Ticket Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            We couldn't find any ticket with reference <span className="font-mono font-bold">"{searchId}"</span>.
            Please verify the number or check "My Complaints".
          </p>
          <button
            onClick={() => onNavigate('my-complaints')}
            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Go to My Complaints
          </button>
        </div>
      ) : null}
    </div>
  );
};
