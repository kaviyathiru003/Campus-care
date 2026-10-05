export type ComplaintStatus = 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface ComplaintHistoryItem {
  timestamp: string;
  status: ComplaintStatus;
  updatedBy: string;
  note?: string;
}

export interface Complaint {
  id: string; // e.g. "#CM-0128"
  category: string;
  title: string;
  description: string;
  department: string;
  location: string;
  building: string;
  floor: string;
  priority: PriorityLevel;
  status: ComplaintStatus;
  submittedBy: string;
  submittedByRole?: string;
  submittedDate: string;
  updatedDate: string;
  image?: string;
  departmentResponse?: string;
  maintenanceNotes?: string;
  assignedTo?: string;
  expectedResolution?: string;
  history: ComplaintHistoryItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'department' | 'admin';
  department?: string;
  avatar: string;
  phone?: string;
  studentId?: string;
}

export interface NotificationItem {
  id: string;
  complaintId?: string;
  title: string;
  message: string;
  timestamp: string;
  timeAgo: string;
  read: boolean;
  type: 'status_change' | 'submission' | 'assignment' | 'system';
}

export interface ComplaintDraft {
  category: string;
  department: string;
  building: string;
  floor: string;
  location: string;
  title: string;
  description: string;
  priority: PriorityLevel;
  savedAt: string;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  code: string;
  icon: string;
  floor: string;
  head: string;
  contact: string;
  color: string;
  accentBg: string;
  description: string;
}

export interface CampusFloor {
  floor: string;
  badgeColor: string;
  textColor: string;
  title?: string;
  facilities: string[];
}
