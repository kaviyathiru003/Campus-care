import React, { useState, useEffect } from 'react';
import { Complaint, ComplaintDraft, DepartmentInfo, PriorityLevel, User } from '../types/campus';
import { localStorageService } from '../services/localStorageService';
import { showToast } from '../components/Toast';
import {
  PlusCircle,
  Save,
  Upload,
  CheckCircle2,
  Home,
  Search,
  FileText,
  Clock,
  Trash2,
  ArrowRight,
} from 'lucide-react';

interface ReportIssueViewProps {
  departments: DepartmentInfo[];
  currentUser: User | null;
  onNavigate: (view: string) => void;
  onSelectComplaint: (id: string) => void;
  initialDepartment?: string;
}

export const ReportIssueView: React.FC<ReportIssueViewProps> = ({
  departments,
  currentUser,
  onNavigate,
  onSelectComplaint,
  initialDepartment,
}) => {
  const categories = [
    'Electrical',
    'Water Leakage',
    'Plumbing',
    'Furniture',
    'Equipment',
    'Cleanliness',
    'Internet/Wi-Fi',
    'Classroom',
    'Washroom',
    'Other',
  ];

  const priorities: PriorityLevel[] = ['Low', 'Medium', 'High', 'Urgent'];

  const [category, setCategory] = useState(categories[0]);
  const [department, setDepartment] = useState(initialDepartment || 'BCA Department');
  const [building, setBuilding] = useState('Academic Block B');
  const [floor, setFloor] = useState('Floor 3');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('Medium');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [hasDraftNotice, setHasDraftNotice] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedDraft = localStorageService.getDraft();
    if (savedDraft) {
      setHasDraftNotice(true);
    }
  }, []);

  const handleApplyDraft = () => {
    const draft = localStorageService.getDraft();
    if (draft) {
      setCategory(draft.category || categories[0]);
      setDepartment(draft.department || departments[0]?.name || 'BCA Department');
      setBuilding(draft.building || '');
      setFloor(draft.floor || '');
      setLocation(draft.location || '');
      setTitle(draft.title || '');
      setDescription(draft.description || '');
      setPriority(draft.priority || 'Medium');
      setHasDraftNotice(false);
      showToast('Draft restored successfully!', 'info');
    }
  };

  const handleDeleteDraft = () => {
    localStorageService.clearDraft();
    setHasDraftNotice(false);
    showToast('Draft deleted', 'info');
  };

  const handleSaveDraft = () => {
    const draft: ComplaintDraft = {
      category,
      department,
      building,
      floor,
      location,
      title,
      description,
      priority,
      savedAt: new Date().toISOString(),
    };
    localStorageService.saveDraft(draft);
    showToast('Complaint saved as draft!', 'success');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size must be less than 5MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      showToast('Photo attached', 'success');
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) {
      errs.title = 'Complaint title is required.';
    } else if (title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters.';
    }

    if (!description.trim()) {
      errs.description = 'Please describe the maintenance issue.';
    } else if (description.trim().length < 10) {
      errs.description = 'Description should be at least 10 characters.';
    }

    if (!location.trim()) {
      errs.location = 'Specific location is required (e.g. Room B204, East Stairway).';
    }

    if (!building.trim()) {
      errs.building = 'Building/Block is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the errors before submitting', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newRecord = localStorageService.addComplaint({
        category,
        title: title.trim(),
        description: description.trim(),
        department,
        location: location.trim(),
        building: building.trim(),
        floor: floor.trim(),
        priority,
        status: 'Pending',
        submittedBy: currentUser?.name || 'Kaviya T',
        submittedByRole: currentUser?.role || 'student',
        image: imagePreview || undefined,
        assignedTo: 'Pending Assignment',
        expectedResolution: priority === 'Urgent' ? 'Within 24 Hours' : 'Within 48-72 Hours',
      });

      setIsSubmitting(false);
      setSubmittedComplaint(newRecord);
      showToast('Complaint submitted successfully!', 'success');
    }, 500);
  };

  const handleResetForm = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setImagePreview(null);
    setSubmittedComplaint(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Draft Notification Banner */}
      {hasDraftNotice && !submittedComplaint && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
                You have an unsaved complaint draft
              </p>
              <p className="text-[11px] text-amber-700 dark:text-amber-400">
                Would you like to restore your previous inputs and continue editing?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyDraft}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Continue Editing
            </button>
            <button
              onClick={handleDeleteDraft}
              className="px-3.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-semibold text-xs rounded-xl cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Draft</span>
            </button>
          </div>
        </div>
      )}

      {/* Success State Screen after submission */}
      {submittedComplaint ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95 duration-200 transition-colors">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Ticket Logged
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Complaint Submitted Successfully!
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Your ticket <span className="font-mono font-bold text-blue-700 dark:text-blue-400">{submittedComplaint.id}</span> has been dispatched to{' '}
              <b>{submittedComplaint.department}</b>. You will receive updates as the repair progresses.
            </p>
          </div>

          {/* Ticket Summary Card */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 text-left max-w-lg mx-auto space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Complaint ID:</span>
              <span className="font-mono font-bold text-blue-700 dark:text-blue-400">{submittedComplaint.id}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Issue Title:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{submittedComplaint.title}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Location:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{submittedComplaint.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Current Status:</span>
              <span className="font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/60">
                {submittedComplaint.status}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onSelectComplaint(submittedComplaint.id)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>View Complaint</span>
            </button>
            <button
              onClick={() => onNavigate('track')}
              className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-xl cursor-pointer flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Track Status</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-2.5 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-semibold text-xs sm:text-sm rounded-xl cursor-pointer flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleResetForm}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              + File another maintenance complaint
            </button>
          </div>
        </div>
      ) : (
        /* The Report Issue Form */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 sm:p-8 space-y-6 transition-colors">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <PlusCircle className="w-4 h-4" />
              <span>Maintenance Helpdesk</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Report Campus Issue or Breakdown
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Fill in the details below. Our campus estates team will dispatch maintenance technicians promptly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Top Grid: Category & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Complaint Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer font-medium"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Assigned Department / Facility <span className="text-rose-500">*</span>
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer font-medium"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.floor})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location Specs: Building, Floor, Specific Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Building / Block <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. C Block, Main Tower"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:bg-white dark:focus:bg-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all ${
                    errors.building ? 'border-rose-300 bg-rose-50/50 dark:bg-rose-950/40' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.building && <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{errors.building}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Floor
                </label>
                <input
                  type="text"
                  placeholder="e.g. Floor 2, Mezzanine"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Specific Location <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Room B203, Stairs landing"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:bg-white dark:focus:bg-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all ${
                    errors.location ? 'border-rose-300 bg-rose-50/50 dark:bg-rose-950/40' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.location && <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{errors.location}</p>}
              </div>
            </div>

            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Complaint Title <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">{title.length}/100</span>
              </div>
              <input
                type="text"
                maxLength={100}
                placeholder="e.g. Fan not working in classroom B203"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:bg-white dark:focus:bg-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all ${
                  errors.title ? 'border-rose-300 bg-rose-50/50 dark:bg-rose-950/40' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.title && <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Detailed Description <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">{description.length}/500</span>
              </div>
              <textarea
                rows={4}
                maxLength={500}
                placeholder="Explain the breakdown, when it occurred, and any potential safety risks..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full p-3.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:bg-white dark:focus:bg-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all ${
                  errors.description ? 'border-rose-300 bg-rose-50/50 dark:bg-rose-950/40' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.description && <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{errors.description}</p>}
            </div>

            {/* Priority Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Urgency / Priority Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {priorities.map((p) => {
                  const isSel = priority === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer font-bold text-xs ${
                        isSel
                          ? p === 'Urgent'
                            ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/20 shadow-xs'
                            : p === 'High'
                            ? 'bg-orange-50 dark:bg-orange-950/60 border-orange-500 text-orange-700 dark:text-orange-300 ring-2 ring-orange-500/20 shadow-xs'
                            : p === 'Medium'
                            ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 border-slate-400 text-slate-800 dark:text-slate-200 ring-2 ring-slate-400/20 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Image Upload Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Upload Proof / Image (Optional)
              </label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl p-5 text-center transition-colors bg-slate-50/50 dark:bg-slate-800/40">
                {imagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-xl border border-slate-200 dark:border-slate-700 object-contain shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold cursor-pointer"
                    >
                      Remove attached photo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                        <span>Click to upload image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">PNG, JPG or WEBP up to 5MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>Save Draft</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Complaint</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
