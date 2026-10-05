import {
  Complaint,
  ComplaintDraft,
  DepartmentInfo,
  NotificationItem,
  User,
  ComplaintStatus,
} from '../types/campus';

export const STORAGE_KEYS = {
  COMPLAINTS: 'vels_campus_complaints',
  USERS: 'vels_campus_users',
  NOTIFICATIONS: 'vels_campus_notifications',
  DRAFTS: 'vels_campus_drafts',
  SESSION: 'vels_campus_session',
  DEPARTMENTS: 'vels_campus_departments',
  THEME: 'vels_campus_theme',
};

// Initial Seed Users
export const SEED_USERS: User[] = [
  {
    id: 'user_kaviya',
    name: 'Kaviya T',
    email: 'student@vels.edu.in',
    role: 'student',
    department: 'BCA Department',
    avatar: 'K',
    studentId: '22BCA1042',
    phone: '+91 98401 23456',
  },
  {
    id: 'user_raman',
    name: 'M. Ramanathan',
    email: 'department@vels.edu.in',
    role: 'department',
    department: 'Campus Maintenance & Estate',
    avatar: 'R',
    phone: '+91 98402 34567',
  },
  {
    id: 'user_admin',
    name: 'Dr. K. Sundar Rajan',
    email: 'admin@vels.edu.in',
    role: 'admin',
    department: 'Campus Administration',
    avatar: 'S',
    phone: '+91 98400 11223',
  },
];

// Initial Seed Departments
export const SEED_DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'cafeteria',
    name: 'Cafeteria',
    code: 'CAF',
    icon: 'Utensils',
    floor: 'Floor 6 & Ground',
    head: 'Chef M. Anand',
    contact: 'cafeteria@vels.edu.in',
    color: '#0284c7',
    accentBg: '#e0f2fe',
    description: 'Food court, canteen, student dining halls and beverage counters.',
  },
  {
    id: 'mba',
    name: 'MBA Department',
    code: 'MBA',
    icon: 'Briefcase',
    floor: 'Floor 10 & 11',
    head: 'Dr. S. Meenakshi',
    contact: 'mba.hod@vels.edu.in',
    color: '#d946ef',
    accentBg: '#fae8ff',
    description: 'School of Management Studies, Executive Classrooms & Seminar Halls.',
  },
  {
    id: 'bcom',
    name: 'B.Com Department',
    code: 'BCOM',
    icon: 'TrendingUp',
    floor: 'Floor 9',
    head: 'Dr. V. Rajesh',
    contact: 'bcom.hod@vels.edu.in',
    color: '#6366f1',
    accentBg: '#e0e7ff',
    description: 'Department of Commerce, Accounting Labs & Lecture Theatres.',
  },
  {
    id: 'bsc',
    name: 'B.Sc Department',
    code: 'BSC',
    icon: 'FlaskConical',
    floor: 'Floor 5 & 6',
    head: 'Dr. P. Sharmila',
    contact: 'bsc.hod@vels.edu.in',
    color: '#06b6d4',
    accentBg: '#cffafe',
    description: 'Science Labs, Microbiology, Physics & Chemistry Departments.',
  },
  {
    id: 'bca',
    name: 'BCA Department',
    code: 'BCA',
    icon: 'Monitor',
    floor: 'Floor 3',
    head: 'Prof. R. Karthikeyan',
    contact: 'bca.hod@vels.edu.in',
    color: '#10b981',
    accentBg: '#d1fae5',
    description: 'Computer Applications, Programming Studios & Software Project Labs.',
  },
  {
    id: 'mca',
    name: 'MCA Department',
    code: 'MCA',
    icon: 'Terminal',
    floor: 'Floor 5',
    head: 'Dr. G. Sivakumar',
    contact: 'mca.hod@vels.edu.in',
    color: '#0ea5e9',
    accentBg: '#e0f2fe',
    description: 'Advanced Computing, Research Center & Cloud Innovation Lab.',
  },
  {
    id: 'library',
    name: 'Central Library',
    code: 'LIB',
    icon: 'BookOpen',
    floor: 'Mezzanine (M)',
    head: 'Mr. N. Baskaran',
    contact: 'library@vels.edu.in',
    color: '#f59e0b',
    accentBg: '#fef3c7',
    description: 'Central Library, Digital Learning Centre, Reprography & Archives.',
  },
  {
    id: 'sports',
    name: 'Sports & Games',
    code: 'SPT',
    icon: 'Trophy',
    floor: 'Ground & Floor 2',
    head: 'Coach D. Venkatesh',
    contact: 'sports@vels.edu.in',
    color: '#84cc16',
    accentBg: '#ecfccb',
    description: 'Gymnasium, Indoor Badminton Court, Football Ground & Sports Pavilion.',
  },
  {
    id: 'auditorium',
    name: 'Auditorium',
    code: 'AUD',
    icon: 'Theater',
    floor: 'Floor 1',
    head: 'Mr. J. Daniel',
    contact: 'events@vels.edu.in',
    color: '#eab308',
    accentBg: '#fef9c3',
    description: 'Main University Auditorium, Acoustic Hall & Preview Theatre.',
  },
  {
    id: 'it_labs',
    name: 'IT & Labs',
    code: 'IT',
    icon: 'Cpu',
    floor: 'Floor 4',
    head: 'Er. K. Balaji',
    contact: 'it.support@vels.edu.in',
    color: '#14b8a6',
    accentBg: '#ccfbf1',
    description: 'AI Lab, Cyber Security Lab, High-Performance Compute Cluster.',
  },
  {
    id: 'hostel',
    name: 'Hostel',
    code: 'HST',
    icon: 'Home',
    floor: 'Ground & Hostel Towers',
    head: 'Chief Warden Mrs. Sarala',
    contact: 'hostel@vels.edu.in',
    color: '#f43f5e',
    accentBg: '#ffe4e6',
    description: 'Boys & Girls Student Residencies, Dining Mess & Recreation Rooms.',
  },
  {
    id: 'others',
    name: 'Others',
    code: 'OTH',
    icon: 'Building2',
    floor: 'Campus Wide',
    head: 'Campus Facilities Manager',
    contact: 'maintenance@vels.edu.in',
    color: '#64748b',
    accentBg: '#f1f5f9',
    description: 'General campus facilities, parking areas, perimeter and utilities.',
  },
];

// Initial 12 Seed Complaints matching screenshot and statistical breakdown:
// Total: 12, In Progress: 5, Resolved: 6, Pending: 1
export const SEED_COMPLAINTS: Complaint[] = [
  {
    id: '#CM-0128',
    category: 'Water Leakage',
    title: 'Water leakage in C Block near stairway',
    description: 'Water leakage in C Block near stairway. The pipe connection above the landing is dripping onto the steps causing slip hazards.',
    department: 'Others',
    location: 'C Block - Stairs',
    building: 'C Block',
    floor: 'Stairway landing between 1st & 2nd Floor',
    priority: 'High',
    status: 'In Progress',
    submittedBy: 'Kaviya T',
    submittedByRole: 'student',
    submittedDate: '28 Sep 2025',
    updatedDate: '28 Sep 2025',
    assignedTo: 'Plumbing Unit - Team B (Murugan)',
    expectedResolution: '29 Sep 2025',
    departmentResponse: 'Plumber dispatched with sealant and replacement coupling. Work in progress.',
    maintenanceNotes: 'Primary shutoff valve temporarily isolated between 2 PM and 4 PM.',
    history: [
      {
        timestamp: '28 Sep 2025, 09:15 AM',
        status: 'Pending',
        updatedBy: 'Kaviya T',
        note: 'Issue reported with photo.',
      },
      {
        timestamp: '28 Sep 2025, 11:30 AM',
        status: 'In Progress',
        updatedBy: 'Maintenance Team',
        note: 'Assigned to plumber Murugan. Gaskets under inspection.',
      },
    ],
  },
  {
    id: '#CM-0127',
    category: 'Electrical',
    title: 'Fan not working in classroom B203',
    description: 'Ceiling fan #3 in classroom B203 is not spinning and making a buzzing noise when switched on.',
    department: 'BCA Department',
    location: 'B Block - B203',
    building: 'B Block',
    floor: 'Floor 2, Room 203',
    priority: 'Medium',
    status: 'Pending',
    submittedBy: 'Kaviya T',
    submittedByRole: 'student',
    submittedDate: '27 Sep 2025',
    updatedDate: '27 Sep 2025',
    assignedTo: 'Unassigned',
    expectedResolution: '30 Sep 2025',
    departmentResponse: 'Acknowledged by BCA Department administration. Forwarded to electrical wing.',
    maintenanceNotes: 'Pending electrician site visit.',
    history: [
      {
        timestamp: '27 Sep 2025, 02:45 PM',
        status: 'Pending',
        updatedBy: 'Kaviya T',
        note: 'Complaint submitted.',
      },
    ],
  },
  {
    id: '#CM-0126',
    category: 'Furniture',
    title: 'Broken chair in library (2nd floor)',
    description: 'Broken chair in library (2nd floor). The backrest support is cracked and poses safety risk for students.',
    department: 'Central Library',
    location: 'Library - 2nd Floor',
    building: 'Central Library Building',
    floor: 'Mezzanine Reading Area',
    priority: 'Low',
    status: 'Resolved',
    submittedBy: 'Kaviya T',
    submittedByRole: 'student',
    submittedDate: '26 Sep 2025',
    updatedDate: '27 Sep 2025',
    assignedTo: 'Carpentry Unit (Senthil)',
    expectedResolution: '27 Sep 2025',
    departmentResponse: 'Damaged ergonomic chair removed and replaced with a newly refurbished unit.',
    maintenanceNotes: 'Replaced with standard library study chair #L-84.',
    history: [
      {
        timestamp: '26 Sep 2025, 10:20 AM',
        status: 'Pending',
        updatedBy: 'Kaviya T',
        note: 'Reported broken chair.',
      },
      {
        timestamp: '26 Sep 2025, 03:00 PM',
        status: 'In Progress',
        updatedBy: 'Central Library Staff',
        note: 'Work order sent to carpentry shop.',
      },
      {
        timestamp: '27 Sep 2025, 11:15 AM',
        status: 'Resolved',
        updatedBy: 'Maintenance Team',
        note: 'Chair replaced. Cleaned study bay.',
      },
    ],
  },
  {
    id: '#CM-0125',
    category: 'Water Leakage',
    title: 'Tap not working in girls hostel washroom',
    description: 'Tap not working in girls hostel washroom on the 3rd floor wing A. Constant dripping and low pressure.',
    department: 'Hostel',
    location: 'Girls Hostel',
    building: 'Shree Sarada Girls Hostel',
    floor: '3rd Floor - Wing A Washroom',
    priority: 'High',
    status: 'In Progress',
    submittedBy: 'Kaviya T',
    submittedByRole: 'student',
    submittedDate: '25 Sep 2025',
    updatedDate: '26 Sep 2025',
    assignedTo: 'Hostel Maintenance (Kumar)',
    expectedResolution: '26 Sep 2025',
    departmentResponse: 'Technician has replaced internal brass valve spindle. Pressure regulator adjustment pending.',
    maintenanceNotes: 'Parts received from stores.',
    history: [
      {
        timestamp: '25 Sep 2025, 08:30 AM',
        status: 'Pending',
        updatedBy: 'Kaviya T',
        note: 'Reported hostel washroom tap leak.',
      },
      {
        timestamp: '25 Sep 2025, 12:00 PM',
        status: 'In Progress',
        updatedBy: 'Hostel Warden',
        note: 'Assigned to plumbing supervisor Kumar.',
      },
    ],
  },
  {
    id: '#CM-0124',
    category: 'Equipment',
    title: 'Projector not working in Conference Hall',
    description: 'Projector not working in Conference Hall. HDMI display shows purple screen distortion and lamp warning.',
    department: 'Auditorium',
    location: 'Conference Hall',
    building: 'Main Administration Block',
    floor: 'Floor 12 - Preview / Conference Hall',
    priority: 'Urgent',
    status: 'Resolved',
    submittedBy: 'Faculty Coordinator',
    submittedByRole: 'department',
    submittedDate: '24 Sep 2025',
    updatedDate: '25 Sep 2025',
    assignedTo: 'AV Engineering (Ramesh K)',
    expectedResolution: '24 Sep 2025',
    departmentResponse: 'Replaced projector lamp bulb and cleaned thermal exhaust filters. HDMI handshake tested successfully.',
    maintenanceNotes: 'Projection test patterns run with 1080p source.',
    history: [
      {
        timestamp: '24 Sep 2025, 09:00 AM',
        status: 'Pending',
        updatedBy: 'Faculty Coordinator',
        note: 'Reported faulty AV projector prior to symposium.',
      },
      {
        timestamp: '24 Sep 2025, 10:15 AM',
        status: 'In Progress',
        updatedBy: 'AV Support',
        note: 'Replaced projection lamp module.',
      },
      {
        timestamp: '24 Sep 2025, 01:30 PM',
        status: 'Resolved',
        updatedBy: 'AV Support',
        note: 'Calibration passed.',
      },
    ],
  },
  {
    id: '#CM-0123',
    category: 'Cleanliness',
    title: 'Spill and dustbin overflow near Cafeteria counters',
    description: 'Juice dispenser spill and overflowing recycling bin near the western dining patio.',
    department: 'Cafeteria',
    location: 'Cafeteria - West Patio',
    building: 'Food Court Plaza',
    floor: 'Floor 6 Patio',
    priority: 'Medium',
    status: 'In Progress',
    submittedBy: 'Kaviya T',
    submittedByRole: 'student',
    submittedDate: '24 Sep 2025',
    updatedDate: '25 Sep 2025',
    assignedTo: 'Sanitation Crew Alpha',
    expectedResolution: '25 Sep 2025',
    departmentResponse: 'Housekeeping crew deployed to sanitize area and empty bins.',
    maintenanceNotes: 'Additional heavy-duty bin placed at corner.',
    history: [
      {
        timestamp: '24 Sep 2025, 01:10 PM',
        status: 'Pending',
        updatedBy: 'Kaviya T',
        note: 'Reported cafeteria bin overflow.',
      },
      {
        timestamp: '24 Sep 2025, 02:00 PM',
        status: 'In Progress',
        updatedBy: 'Housekeeping Supervisor',
        note: 'Sanitization in progress.',
      },
    ],
  },
  {
    id: '#CM-0122',
    category: 'Internet/Wi-Fi',
    title: 'Wi-Fi Access Point offline in MBA Seminar Room 1102',
    description: 'VELS-Campus-Secure SSID is dropping connections intermittently during presentations.',
    department: 'MBA Department',
    location: 'MBA Dept - Room 1102',
    building: 'Management Tower',
    floor: 'Floor 11',
    priority: 'High',
    status: 'Resolved',
    submittedBy: 'Rahul Verma',
    submittedByRole: 'student',
    submittedDate: '23 Sep 2025',
    updatedDate: '24 Sep 2025',
    assignedTo: 'Network Admin (Deepak)',
    expectedResolution: '24 Sep 2025',
    departmentResponse: 'Re-patched PoE switch port and updated AP firmware. Coverage verified.',
    maintenanceNotes: 'Bandwidth throughput confirmed at 150 Mbps.',
    history: [
      {
        timestamp: '23 Sep 2025, 11:00 AM',
        status: 'Pending',
        updatedBy: 'Rahul Verma',
        note: 'Network drop reported.',
      },
      {
        timestamp: '24 Sep 2025, 04:00 PM',
        status: 'Resolved',
        updatedBy: 'IT Network Team',
        note: 'PoE cable replaced.',
      },
    ],
  },
  {
    id: '#CM-0121',
    category: 'Equipment',
    title: 'AC unit thermal trip in AI Machine Learning Lab',
    description: 'Split AC #2 is shutting off automatically after 10 minutes, causing server rack temperature to spike.',
    department: 'IT & Labs',
    location: 'AI & Data Science Lab',
    building: 'Technology Block',
    floor: 'Floor 4',
    priority: 'Urgent',
    status: 'In Progress',
    submittedBy: 'Lab Assistant Dinesh',
    submittedByRole: 'department',
    submittedDate: '23 Sep 2025',
    updatedDate: '24 Sep 2025',
    assignedTo: 'HVAC Services (CoolTech)',
    expectedResolution: '25 Sep 2025',
    departmentResponse: 'Compressor refrigerant topped up; outdoor coil cleaning scheduled for tonight.',
    maintenanceNotes: 'Backup portable cooler deployed.',
    history: [
      {
        timestamp: '23 Sep 2025, 03:20 PM',
        status: 'In Progress',
        updatedBy: 'Lab Staff',
        note: 'High temperature alert logged.',
      },
    ],
  },
  {
    id: '#CM-0120',
    category: 'Plumbing',
    title: 'Washbasin drain clogged in B.Com staff room',
    description: 'Slow drainage and odor from the handwash basin in Commerce faculty block.',
    department: 'B.Com Department',
    location: 'B.Com Wing - Floor 9',
    building: 'Academic Block B',
    floor: 'Floor 9',
    priority: 'Medium',
    status: 'Resolved',
    submittedBy: 'Faculty Sec',
    submittedByRole: 'department',
    submittedDate: '22 Sep 2025',
    updatedDate: '23 Sep 2025',
    assignedTo: 'Plumbing Unit',
    expectedResolution: '23 Sep 2025',
    departmentResponse: 'Trap cleared with drain auger and flushed with bio-enzymatic cleaner.',
    maintenanceNotes: 'Routine quarterly check scheduled.',
    history: [
      {
        timestamp: '22 Sep 2025, 10:00 AM',
        status: 'Resolved',
        updatedBy: 'Plumbing Unit',
        note: 'Cleared obstruction.',
      },
    ],
  },
  {
    id: '#CM-0119',
    category: 'Electrical',
    title: 'Staircase emergency light flickering in Aviation Block',
    description: 'Fluorescent fixture near flight simulator entry buzzes and flickers.',
    department: 'Others',
    location: 'Aviation Wing - Floor 7 Stairs',
    building: 'Aviation Tech Tower',
    floor: 'Floor 7',
    priority: 'Low',
    status: 'In Progress',
    submittedBy: 'Kaviya T',
    submittedByRole: 'student',
    submittedDate: '21 Sep 2025',
    updatedDate: '22 Sep 2025',
    assignedTo: 'Electrician Mani',
    expectedResolution: '25 Sep 2025',
    departmentResponse: 'LED retrofit kit ordered from vendor.',
    maintenanceNotes: 'Temporary battery lantern hung for safety.',
    history: [
      {
        timestamp: '21 Sep 2025, 05:40 PM',
        status: 'In Progress',
        updatedBy: 'Maintenance',
        note: 'Inspected ballast.',
      },
    ],
  },
  {
    id: '#CM-0118',
    category: 'Furniture',
    title: 'Loose whiteboard mount in MCA Lecture Hall 504',
    description: 'The right bracket of the magnetic whiteboard has slipped from the anchor plug.',
    department: 'MCA Department',
    location: 'MCA Dept - Hall 504',
    building: 'Block C',
    floor: 'Floor 5',
    priority: 'Medium',
    status: 'Resolved',
    submittedBy: 'Prof. Sivakumar',
    submittedByRole: 'department',
    submittedDate: '20 Sep 2025',
    updatedDate: '21 Sep 2025',
    assignedTo: 'Masonry & Fitting Crew',
    expectedResolution: '21 Sep 2025',
    departmentResponse: 'Heavy-duty wall anchors installed with load rating 40kg.',
    maintenanceNotes: 'Board leveled with spirit level.',
    history: [
      {
        timestamp: '20 Sep 2025, 09:30 AM',
        status: 'Resolved',
        updatedBy: 'Fitting Crew',
        note: 'Reinforced mounting.',
      },
    ],
  },
  {
    id: '#CM-0117',
    category: 'Equipment',
    title: 'Gym indoor treadmill belt misalignment',
    description: 'Treadmill #3 belt is shifting towards the left rail causing friction squeals.',
    department: 'Sports & Games',
    location: 'Fitness Center - Floor 2',
    building: 'Student Amenities Center',
    floor: 'Floor 2',
    priority: 'Low',
    status: 'Resolved',
    submittedBy: 'Coach Venkatesh',
    submittedByRole: 'department',
    submittedDate: '19 Sep 2025',
    updatedDate: '20 Sep 2025',
    assignedTo: 'Fitness Tech Services',
    expectedResolution: '20 Sep 2025',
    departmentResponse: 'Belt tension adjusted and silicone lubricant applied along roller bed.',
    maintenanceNotes: 'Test run for 30 minutes at 12 km/h completed.',
    history: [
      {
        timestamp: '19 Sep 2025, 08:00 AM',
        status: 'Resolved',
        updatedBy: 'Fitness Tech',
        note: 'Calibrated and tensioned.',
      },
    ],
  },
];

// Initial Seed Notifications matching screenshot
export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    complaintId: '#CM-0125',
    title: 'Complaint Update',
    message: 'Your complaint #CM-0125 is now In Progress',
    timeAgo: '2 hours ago',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    read: false,
    type: 'status_change',
  },
  {
    id: 'notif_2',
    complaintId: '#CM-0128',
    title: 'Complaint Resolved',
    message: 'Complaint #CM-0128 has been Resolved',
    timeAgo: '5 hours ago',
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    read: false,
    type: 'status_change',
  },
  {
    id: 'notif_3',
    complaintId: '#CM-0128',
    title: 'Complaint Submitted',
    message: 'New complaint #CM-0128 has been submitted',
    timeAgo: '8 hours ago',
    timestamp: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    read: true,
    type: 'submission',
  },
  {
    id: 'notif_4',
    complaintId: '#CM-0124',
    title: 'Complaint Resolved',
    message: 'Complaint #CM-0124 has been Resolved',
    timeAgo: '1 day ago',
    timestamp: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    read: true,
    type: 'status_change',
  },
];

// Custom event dispatcher for cross-component reactive updates in the app
type Listener = () => void;
const listeners: Set<Listener> = new Set();

export const subscribeToStorageChanges = (callback: Listener): (() => void) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};

const notifySubscribers = () => {
  listeners.forEach((callback) => {
    try {
      callback();
    } catch (e) {
      console.error('Error notifying subscriber:', e);
    }
  });
};

// Storage Service API
export const localStorageService = {
  // Initialize storage if empty
  init: () => {
    if (typeof window === 'undefined') return;

    // Complaints
    const existingComplaints = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
    if (!existingComplaints) {
      localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(SEED_COMPLAINTS));
    }

    // Users
    const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!existingUsers) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
    }

    // Departments
    const existingDepartments = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
    if (!existingDepartments) {
      localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(SEED_DEPARTMENTS));
    }

    // Notifications
    const existingNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!existingNotifs) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
    }

    // Session (default to Student Kaviya T)
    const existingSession = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!existingSession) {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(SEED_USERS[0]));
    }

    // Theme initialization
    const currentTheme = localStorageService.getTheme();
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  // Complaints CRUD
  getComplaints: (): Complaint[] => {
    if (typeof window === 'undefined') return SEED_COMPLAINTS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(SEED_COMPLAINTS));
        return SEED_COMPLAINTS;
      }
      return JSON.parse(data);
    } catch {
      return SEED_COMPLAINTS;
    }
  },

  getComplaintById: (id: string): Complaint | undefined => {
    const list = localStorageService.getComplaints();
    const cleanId = id.trim().toLowerCase().replace(/^#/, '');
    return list.find((c) => c.id.toLowerCase().replace(/^#/, '') === cleanId);
  },

  addComplaint: (newComplaint: Omit<Complaint, 'id' | 'submittedDate' | 'updatedDate' | 'history'>): Complaint => {
    const list = localStorageService.getComplaints();
    // Generate next ID
    const maxNum = list.reduce((acc, curr) => {
      const match = curr.id.match(/\d+/);
      const num = match ? parseInt(match[0], 10) : 0;
      return Math.max(acc, num);
    }, 128);

    const nextId = `#CM-0${maxNum + 1}`;
    const today = new Date();
    const dateFormatted = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const fullComplaint: Complaint = {
      ...newComplaint,
      id: nextId,
      submittedDate: dateFormatted,
      updatedDate: dateFormatted,
      history: [
        {
          timestamp: `${dateFormatted}, ${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          status: newComplaint.status || 'Pending',
          updatedBy: newComplaint.submittedBy,
          note: 'Initial complaint filed via portal.',
        },
      ],
    };

    const updated = [fullComplaint, ...list];
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(updated));

    // Automatically create notification for student
    localStorageService.addNotification({
      complaintId: fullComplaint.id,
      title: 'Complaint Submitted',
      message: `Your complaint ${fullComplaint.id} has been submitted successfully.`,
      type: 'submission',
    });

    // Clear saved draft if present
    localStorageService.clearDraft();

    notifySubscribers();
    return fullComplaint;
  },

  updateComplaintStatus: (
    id: string,
    newStatus: ComplaintStatus,
    updaterName: string,
    note?: string,
    extraFields?: {
      departmentResponse?: string;
      maintenanceNotes?: string;
      assignedTo?: string;
      expectedResolution?: string;
    }
  ): Complaint | null => {
    const list = localStorageService.getComplaints();
    const cleanId = id.trim().toLowerCase().replace(/^#/, '');
    const index = list.findIndex((c) => c.id.toLowerCase().replace(/^#/, '') === cleanId);

    if (index === -1) return null;

    const existing = list[index];
    const today = new Date();
    const dateFormatted = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const updatedHistory = [
      ...(existing.history || []),
      {
        timestamp: `${dateFormatted}, ${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        status: newStatus,
        updatedBy: updaterName,
        note: note || (newStatus === 'Resolved' ? 'Issue marked as resolved.' : `Status moved to ${newStatus}`),
      },
    ];

    const updatedComplaint: Complaint = {
      ...existing,
      ...extraFields,
      status: newStatus,
      updatedDate: dateFormatted,
      history: updatedHistory,
    };

    list[index] = updatedComplaint;
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(list));

    // Trigger notification
    const statusMsg =
      newStatus === 'Resolved'
        ? `Complaint ${existing.id} has been Resolved.`
        : `Your complaint ${existing.id} is now ${newStatus}.`;

    localStorageService.addNotification({
      complaintId: existing.id,
      title: `Status: ${newStatus}`,
      message: statusMsg,
      type: 'status_change',
    });

    notifySubscribers();
    return updatedComplaint;
  },

  updateComplaintDetails: (id: string, updates: Partial<Complaint>): Complaint | null => {
    const list = localStorageService.getComplaints();
    const cleanId = id.trim().toLowerCase().replace(/^#/, '');
    const index = list.findIndex((c) => c.id.toLowerCase().replace(/^#/, '') === cleanId);

    if (index === -1) return null;

    const updated: Complaint = {
      ...list[index],
      ...updates,
      updatedDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    list[index] = updated;
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(list));
    notifySubscribers();
    return updated;
  },

  deleteComplaint: (id: string): boolean => {
    const list = localStorageService.getComplaints();
    const cleanId = id.trim().toLowerCase().replace(/^#/, '');
    const filtered = list.filter((c) => c.id.toLowerCase().replace(/^#/, '') !== cleanId);
    if (filtered.length === list.length) return false;

    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(filtered));
    notifySubscribers();
    return true;
  },

  // Statistics calculation
  getStatistics: () => {
    const list = localStorageService.getComplaints();
    const total = list.length;
    const inProgress = list.filter((c) => c.status === 'In Progress').length;
    const resolved = list.filter((c) => c.status === 'Resolved').length;
    const pending = list.filter((c) => c.status === 'Pending').length;
    const rejected = list.filter((c) => c.status === 'Rejected').length;

    // Percentages
    const inProgressPct = total > 0 ? ((inProgress / total) * 100).toFixed(1) : '0';
    const resolvedPct = total > 0 ? ((resolved / total) * 100).toFixed(1) : '0';
    const pendingPct = total > 0 ? ((pending / total) * 100).toFixed(1) : '0';

    return {
      total,
      inProgress,
      resolved,
      pending,
      rejected,
      inProgressPct,
      resolvedPct,
      pendingPct,
      newCount: 2, // New complaints in last 48h
    };
  },

  // Notifications
  getNotifications: (): NotificationItem[] => {
    if (typeof window === 'undefined') return SEED_NOTIFICATIONS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : SEED_NOTIFICATIONS;
    } catch {
      return SEED_NOTIFICATIONS;
    }
  },

  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'timeAgo' | 'read'>) => {
    const list = localStorageService.getNotifications();
    const newNotif: NotificationItem = {
      ...item,
      id: `notif_${Date.now()}`,
      timestamp: new Date().toISOString(),
      timeAgo: 'Just now',
      read: false,
    };
    const updated = [newNotif, ...list];
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    notifySubscribers();
    return newNotif;
  },

  markNotificationAsRead: (id: string) => {
    const list = localStorageService.getNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    notifySubscribers();
  },

  markAllNotificationsAsRead: () => {
    const list = localStorageService.getNotifications();
    const updated = list.map((n) => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    notifySubscribers();
  },

  clearNotifications: () => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([]));
    notifySubscribers();
  },

  // Drafts
  saveDraft: (draft: ComplaintDraft) => {
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(draft));
    notifySubscribers();
  },

  getDraft: (): ComplaintDraft | null => {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DRAFTS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  clearDraft: () => {
    localStorage.removeItem(STORAGE_KEYS.DRAFTS);
    notifySubscribers();
  },

  // Users & Session
  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return SEED_USERS[0];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSION);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setSession: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
    notifySubscribers();
  },

  clearSession: () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    notifySubscribers();
  },

  getAllUsers: (): User[] => {
    if (typeof window === 'undefined') return SEED_USERS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : SEED_USERS;
    } catch {
      return SEED_USERS;
    }
  },

  // Departments
  getDepartments: (): DepartmentInfo[] => {
    if (typeof window === 'undefined') return SEED_DEPARTMENTS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
      return data ? JSON.parse(data) : SEED_DEPARTMENTS;
    } catch {
      return SEED_DEPARTMENTS;
    }
  },

  // Theme Management
  getTheme: (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    } catch {
      return 'light';
    }
  },

  setTheme: (theme: 'light' | 'dark') => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      notifySubscribers();
    } catch (e) {
      console.error('Failed to set theme in localStorage', e);
    }
  },
};
