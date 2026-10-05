import React, { useState } from 'react';
import { CAMPUS_FLOORS } from '../data/campusFloors';
import { Complaint } from '../types/campus';
import {
  MapPin,
  Search,
  ChevronRight,
  PlusCircle,
  Layers,
} from 'lucide-react';

interface CampusMapViewProps {
  complaints: Complaint[];
  onReportOnFloor: (floorName: string, facilityName?: string) => void;
  onSelectComplaint: (id: string) => void;
}

export const CampusMapView: React.FC<CampusMapViewProps> = ({
  complaints,
  onReportOnFloor,
  onSelectComplaint,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);

  const filteredFloors = CAMPUS_FLOORS.filter((f) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const floorMatch = f.floor.toLowerCase().includes(q) || (f.title && f.title.toLowerCase().includes(q));
    const facilityMatch = f.facilities.some((fac) => fac.toLowerCase().includes(q));
    return floorMatch || facilityMatch;
  });

  const getComplaintsOnFloor = (floorId: string) => {
    return complaints.filter(
      (c) =>
        c.floor.toLowerCase().includes(floorId.toLowerCase()) ||
        c.location.toLowerCase().includes(`floor ${floorId.toLowerCase()}`) ||
        c.location.toLowerCase().includes(floorId.toLowerCase())
    );
  };

  const activeFloorData = CAMPUS_FLOORS.find((f) => f.floor === selectedFloor);
  const activeFloorComplaints = selectedFloor ? getComplaintsOnFloor(selectedFloor) : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4" />
            <span>Interactive Campus Architecture</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            VELS Campus Directory & Floor Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Browse all 14 multi-tier academic floors, specialized simulation laboratories, deaneries and amenities.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search facility, lab, floor (e.g. AI Lab)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>
      </div>

      {/* Main Grid: Floor Stack on Left + Floor Details & Actions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Vertical Floor Stack */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-5 space-y-3 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <span>Tower Floor Levels (Top to Ground)</span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">Click any level to inspect</span>
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredFloors.map((fl) => {
              const floorComplaints = getComplaintsOnFloor(fl.floor);
              const isSelected = selectedFloor === fl.floor;

              return (
                <div
                  key={fl.floor}
                  onClick={() => setSelectedFloor(isSelected ? null : fl.floor)}
                  className={`flex items-stretch gap-3 p-2 rounded-2xl border transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-slate-50/60 dark:bg-slate-800/50 hover:bg-slate-100/80 dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-700/80'
                  }`}
                >
                  {/* Distinctive Floor Badge */}
                  <div
                    className={`w-14 sm:w-16 rounded-xl flex items-center justify-center font-black text-xl sm:text-2xl shadow-xs shrink-0 ${fl.badgeColor}`}
                  >
                    {fl.floor}
                  </div>

                  {/* Floor Facility Preview */}
                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {fl.title || `Floor Level ${fl.floor}`}
                      </span>
                      {floorComplaints.length > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                          {floorComplaints.length} active issue{floorComplaints.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {fl.facilities.slice(0, 3).map((f, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 truncate max-w-[200px]"
                        >
                          {f}
                        </span>
                      ))}
                      {fl.facilities.length > 3 && (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 self-center">
                          +{fl.facilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center px-1 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Floor Inspector */}
        <div className="lg:col-span-5 space-y-4">
          {activeFloorData ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 space-y-5 animate-in fade-in duration-150 transition-colors">
              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm ${activeFloorData.badgeColor}`}
                >
                  {activeFloorData.floor}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {activeFloorData.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Floor Level {activeFloorData.floor}</p>
                </div>
              </div>

              {/* All Facilities on this floor */}
              <div>
                <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
                  Departments & Facilities Located Here
                </h3>
                <div className="space-y-2">
                  {activeFloorData.facilities.map((fac, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{fac}</span>
                      <button
                        onClick={() => onReportOnFloor(`Floor ${activeFloorData.floor}`, fac)}
                        className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <PlusCircle className="w-3 h-3" />
                        Report Issue
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active complaints on this floor */}
              <div>
                <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Active Complaints on Floor {activeFloorData.floor} ({activeFloorComplaints.length})
                </h3>
                {activeFloorComplaints.length === 0 ? (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 font-medium">
                    ✓ No open maintenance issues reported on this floor right now.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {activeFloorComplaints.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => onSelectComplaint(c.id)}
                        className="p-3 bg-slate-50 dark:bg-slate-800/70 hover:bg-blue-50/50 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="font-mono text-blue-700 dark:text-blue-400">{c.id}</span>
                          <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
                            {c.status}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate">{c.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{c.location}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Fast Action */}
              <button
                onClick={() => onReportOnFloor(`Floor ${activeFloorData.floor}`)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>File Issue on Floor {activeFloorData.floor}</span>
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 text-center text-slate-400 dark:text-slate-500 space-y-3 transition-colors">
              <Layers className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
              <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">Select a Floor Level</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any floor level from the building stack on the left to view resident laboratories, academic wings and file targeted maintenance reports.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
