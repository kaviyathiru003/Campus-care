import React, { useState } from 'react';
import { Complaint, ComplaintStatus, User } from '../types/campus';
import { StatusBadge, PriorityBadge } from './StatusBadge';
import { CategoryIcon } from './CategoryIcon';
import { localStorageService } from '../services/localStorageService';
import { showToast } from './Toast';
import {
  X,
  Calendar,
  MapPin,
  Building2,
  Layers,
  User as UserIcon,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Send,
  Wrench,
  AlertTriangle,
  PhoneCall,
  Share2,
} from 'lucide-react';

interface ComplaintDetailsModalProps {
  complaint: Complaint | null;
  onClose: () => void;
  currentUser: User | null;
  onTrackStatus?: (id: string) => void;
  onReportAnother?: () => void;
}

export const ComplaintDetailsModal: React.FC<ComplaintDetailsModalProps> = ({
  complaint,
  onClose,
  currentUser,
  onTrackStatus,
  onReportAnother,
}) => {
  const [activeComplaint, setActiveComplaint] = useState<Complaint | null>(complaint);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<ComplaintStatus>(complaint?.status || 'Pending');
  const [responseNote, setResponseNote] = useState('');
  const [assignedStaff, setAssignedStaff] = useState(complaint?.assignedTo || '');
  const [expectedDate, setExpectedDate] = useState(complaint?.expectedResolution || '');

  if (!activeComplaint) return null;

  const canManage = currentUser?.role === 'department' || currentUser?.role === 'admin';

  // Determine Timeline stages
  const stages = [
    { label: 'Submitted', key: 'Pending', desc: 'Complaint registered by student' },
    { label: 'Dept Received', key: 'Received', desc: 'Department acknowledged receipt' },
    { label: 'Under Review', key: 'Review', desc: 'Inspection & assessment' },
    { label: 'In Progress', key: 'In Progress', desc: 'Maintenance crew on site' },
    { label: 'Resolved', key: 'Resolved', desc: 'Repairs completed & verified' },
  ];

  const getStageIndex = (status: ComplaintStatus) => {
    switch (status) {
      case 'Pending':
        return 0;
      case 'In Progress':
        return 3;
      case 'Resolved':
        return 4;
      case 'Rejected':
        return -1;
      default:
        return 1;
    }
  };

  const currentStageIndex = getStageIndex(activeComplaint.status);

  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updated = localStorageService.updateComplaintStatus(
      activeComplaint.id,
      newStatus,
      currentUser.name,
      responseNote || `Status updated to ${newStatus}`,
      {
        departmentResponse: responseNote || activeComplaint.departmentResponse,
        assignedTo: assignedStaff || activeComplaint.assignedTo,
        expectedResolution: expectedDate || activeComplaint.expectedResolution,
      }
    );

    if (updated) {
      setActiveComplaint(updated);
      showToast(`Complaint status updated to ${newStatus}!`, 'success');
      setIsUpdatingStatus(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `VELS Campus Care: Complaint ${activeComplaint.id} - ${activeComplaint.title} (${activeComplaint.status})`
      );
      showToast('Complaint details copied to clipboard!', 'info');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="complaint-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
    >
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/80">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800">
              {activeComplaint.id}
            </span>
            <StatusBadge status={activeComplaint.status} size="md" />
            <PriorityBadge priority={activeComplaint.priority} />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Copy link or details"
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Title & Category */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              <CategoryIcon category={activeComplaint.category} className="w-4 h-4" />
              <span>{activeComplaint.category}</span>
              <span>•</span>
              <span>Department: {activeComplaint.department}</span>
            </div>
            <h2 id="complaint-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {activeComplaint.title}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              {activeComplaint.description}
            </p>
          </div>

          {/* Optional Attached Photo */}
          {activeComplaint.image && (
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900/5 dark:bg-black/40">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                Attached Photo / Proof
              </div>
              <img
                src={activeComplaint.image}
                alt="Complaint evidence"
                className="w-full max-h-64 object-contain bg-slate-950/5 dark:bg-black/60"
              />
            </div>
          )}

          {/* Location & Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-blue-50/50 dark:bg-slate-800/60 p-4 rounded-xl border border-blue-100 dark:border-slate-700/80 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium mb-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Location
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{activeComplaint.location}</p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium mb-1">
                <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Building
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{activeComplaint.building || 'Campus Central'}</p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium mb-1">
                <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Floor
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{activeComplaint.floor || 'Level 1'}</p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium mb-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Submitted
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{activeComplaint.submittedDate}</p>
            </div>
          </div>

          {/* Resolution Lifecycle Timeline */}
          <div className="pt-2">
            <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Progress Timeline
            </h3>
            <div className="relative">
              <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0" />
              <div
                className="hidden sm:block absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.max(0, (currentStageIndex / (stages.length - 1)) * 100))}%`,
                }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative z-10">
                {stages.map((stage, idx) => {
                  const isDone = currentStageIndex >= idx;
                  const isCurrent = currentStageIndex === idx;

                  return (
                    <div
                      key={stage.label}
                      className={`flex sm:flex-col items-center gap-3 sm:gap-2 sm:text-center p-2 rounded-xl transition-all ${
                        isCurrent
                          ? 'bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800'
                          : isDone
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 sm:bg-transparent'
                          : 'opacity-60'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                          isDone
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-400'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <div>
                        <p
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-blue-700 dark:text-blue-400'
                              : isDone
                              ? 'text-slate-800 dark:text-slate-200'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {stage.label}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block mt-0.5">{stage.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Department Response & Maintenance Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Department Response
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed min-h-[40px]">
                {activeComplaint.departmentResponse ||
                  'Your complaint has been logged and assigned to the relevant service team for inspection.'}
              </p>
              {activeComplaint.assignedTo && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Assigned Staff:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{activeComplaint.assignedTo}</span>
                </div>
              )}
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Maintenance Notes
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed min-h-[40px]">
                {activeComplaint.maintenanceNotes ||
                  'No technical maintenance notes added yet. Preliminary inspection scheduled.'}
              </p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span>Expected Resolution:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {activeComplaint.expectedResolution || 'Within 48 hours'}
                </span>
              </div>
            </div>
          </div>

          {/* Audit History Log */}
          {activeComplaint.history && activeComplaint.history.length > 0 && (
            <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">Activity History</h4>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1 divide-y divide-slate-100 dark:divide-slate-800">
                {activeComplaint.history.map((h, i) => (
                  <div key={i} className="flex items-start justify-between text-xs py-1.5 first:pt-0">
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{h.updatedBy}</span>
                      <span className="mx-1.5 text-slate-400">→</span>
                      <span className="text-slate-600 dark:text-slate-400">{h.note}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0 ml-2">{h.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Staff / Admin Fast Action Panel */}
          {canManage && (
            <div className="bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Staff / Admin Management Control
                </span>
                <button
                  onClick={() => setIsUpdatingStatus(!isUpdatingStatus)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {isUpdatingStatus ? 'Cancel Edit' : 'Update Status & Notes'}
                </button>
              </div>

              {isUpdatingStatus ? (
                <form onSubmit={handleUpdateStatusSubmit} className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Set New Status</label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                        className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 p-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Assign Staff</label>
                      <input
                        type="text"
                        placeholder="e.g. Electrical Unit A"
                        value={assignedStaff}
                        onChange={(e) => setAssignedStaff(e.target.value)}
                        className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 p-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Expected Date</label>
                      <input
                        type="text"
                        placeholder="e.g. Tomorrow 5 PM"
                        value={expectedDate}
                        onChange={(e) => setExpectedDate(e.target.value)}
                        className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 p-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Department Response Note</label>
                    <textarea
                      rows={2}
                      placeholder="Add an update for the student..."
                      value={responseNote}
                      onChange={(e) => setResponseNote(e.target.value)}
                      className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 p-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsUpdatingStatus(false)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Save Status Update
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs text-slate-600 dark:text-slate-400">Quick Change:</span>
                  {activeComplaint.status !== 'In Progress' && (
                    <button
                      onClick={() => {
                        const updated = localStorageService.updateComplaintStatus(
                          activeComplaint.id,
                          'In Progress',
                          currentUser.name,
                          'Work started by technician'
                        );
                        if (updated) {
                          setActiveComplaint(updated);
                          showToast('Moved to In Progress!', 'success');
                        }
                      }}
                      className="px-2.5 py-1 text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 rounded-lg hover:bg-amber-200 cursor-pointer"
                    >
                      Start In Progress
                    </button>
                  )}
                  {activeComplaint.status !== 'Resolved' && (
                    <button
                      onClick={() => {
                        const updated = localStorageService.updateComplaintStatus(
                          activeComplaint.id,
                          'Resolved',
                          currentUser.name,
                          'Repair verified and completed.'
                        );
                        if (updated) {
                          setActiveComplaint(updated);
                          showToast('Marked as Resolved!', 'success');
                        }
                      }}
                      className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 rounded-lg hover:bg-emerald-200 cursor-pointer"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Back
            </button>
            <a
              href="tel:+919840123456"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Contact Department
            </a>
          </div>

          <div className="flex items-center gap-2">
            {onTrackStatus && (
              <button
                onClick={() => {
                  onClose();
                  onTrackStatus(activeComplaint.id);
                }}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                Track Status <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {onReportAnother && (
              <button
                onClick={() => {
                  onClose();
                  onReportAnother();
                }}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
              >
                Report Another Issue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
