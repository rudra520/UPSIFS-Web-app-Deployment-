import { UserRole, User, Subject, Assignment, Notice, Grievance, Student, Lab, DashboardConfig } from '../types';
import { 
  BarChart2, Calendar, BookOpen, FileText, Bell, CreditCard, MessageSquare,
  Users, UploadCloud, Pencil, CheckCircle, Clock, AlertTriangle, TrendingUp,
  Home, GraduationCap, Settings, Shield, LogOut, Camera, ChevronRight,
  Search, Menu, X, ChevronDown, ChevronLeft, Download, PlayCircle, Paperclip,
  Send, Info, FlaskConical, MapPin, Building2, Coffee, Lock, Smartphone,
  Moon, Globe, Trash2, Check, User, Filter, Pin, Award, Calculator, Star,
  Save, Edit, Plus, Minus, Eye, EyeOff, ArrowRight
} from 'lucide-react';

// API Base URL - Change this to your backend URL
export const API_BASE_URL = 'http://localhost:5000/api';

// UPSIFS Logo URL
export const UPSIFS_LOGO_URL = 'https://www.upsifs.ac.in/images/logo.png';

// Mock User Data
export const MOCK_USER_STUDENT: User = {
  id: '1',
  name: 'Aryan Sharma',
  email: 'aryan.sharma@upsifs.ac.in',
  role: UserRole.STUDENT,
  department: 'Computer Science & Engineering',
  semester: 4,
  enrollmentNo: 'CS2021001',
};

export const MOCK_USER_TEACHER: User = {
  id: '2',
  name: 'Dr. Sarah Smith',
  email: 'sarah.smith@upsifs.ac.in',
  role: UserRole.TEACHER,
  department: 'Computer Science & Engineering',
};

// Mock Subjects Data
export const MOCK_SUBJECTS: Subject[] = [
  {
    id: '1',
    name: 'Database Management',
    code: 'CS301',
    attendance: 82,
    units: [
      {
        id: 'u1',
        title: 'Unit 1: Introduction to DBMS',
        resources: [
          { id: 'r1', name: 'DBMS Fundamentals.pdf', type: 'PDF' },
          { id: 'r2', name: 'Introduction Video', type: 'VIDEO' },
        ]
      },
      {
        id: 'u2',
        title: 'Unit 2: SQL Basics',
        resources: [
          { id: 'r3', name: 'SQL Commands.pdf', type: 'PDF' },
          { id: 'r4', name: 'Practice Queries', type: 'PDF' },
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Machine Learning',
    code: 'CS302',
    attendance: 88,
    units: [
      {
        id: 'u3',
        title: 'Unit 1: ML Overview',
        resources: [
          { id: 'r5', name: 'ML Introduction.pdf', type: 'PDF' },
          { id: 'r6', name: 'Types of ML', type: 'VIDEO' },
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Web Development',
    code: 'CS303',
    attendance: 91,
    units: [
      {
        id: 'u4',
        title: 'Unit 1: HTML & CSS',
        resources: [
          { id: 'r7', name: 'HTML Basics.pdf', type: 'PDF' },
          { id: 'r8', name: 'CSS Styling Guide', type: 'PDF' },
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Data Structures',
    code: 'CS304',
    attendance: 76,
    units: [
      {
        id: 'u5',
        title: 'Unit 1: Arrays & Linked Lists',
        resources: [
          { id: 'r9', name: 'Arrays.pdf', type: 'PDF' },
          { id: 'r10', name: 'Linked Lists', type: 'VIDEO' },
        ]
      }
    ]
  }
];

// Mock Assignments Data
export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    title: 'SQL Query Optimization',
    subject: 'Database Management',
    deadline: '2 days left',
    status: 'Pending',
  },
  {
    id: '2',
    title: 'Linear Regression Model',
    subject: 'Machine Learning',
    deadline: 'Submitted',
    status: 'Graded',
    marks: '18/20',
    remarks: 'Excellent work! Good understanding of concepts.',
  },
  {
    id: '3',
    title: 'Responsive Portfolio',
    subject: 'Web Development',
    deadline: '5 days left',
    status: 'Pending',
  },
  {
    id: '4',
    title: 'Binary Tree Implementation',
    subject: 'Data Structures',
    deadline: 'Submitted',
    status: 'Submitted',
  }
];

// Mock Notices Data
export const MOCK_NOTICES: Notice[] = [
  {
    id: '1',
    title: 'Mid-Semester Examination Schedule Released',
    content: 'The mid-semester examinations will commence from March 15, 2026. All students are required to check their individual schedules on the portal.',
    category: 'Exam',
    date: 'Feb 5, 2026',
    isPinned: true,
  },
  {
    id: '2',
    title: 'Annual Tech Fest - Registrations Open',
    content: 'Join us for the annual technical festival "TechNova 2026". Exciting competitions, workshops, and prizes await!',
    category: 'Event',
    date: 'Feb 3, 2026',
    isPinned: false,
  },
  {
    id: '3',
    title: 'Holiday Notice - Republic Day',
    content: 'The university will remain closed on January 26, 2026, on account of Republic Day.',
    category: 'Holiday',
    date: 'Jan 20, 2026',
    isPinned: false,
  },
  {
    id: '4',
    title: 'Library Timing Changes',
    content: 'The central library will now operate from 8:00 AM to 10:00 PM on all working days.',
    category: 'General',
    date: 'Jan 15, 2026',
    isPinned: false,
  }
];

// Mock Grievances Data
export const MOCK_GRIEVANCES: Grievance[] = [
  {
    id: 'G001',
    category: 'Infrastructure',
    description: 'Projector not working in Lab 4 for the past week.',
    status: 'In Progress',
    date: 'Feb 1, 2026',
    isAnonymous: false,
  },
  {
    id: 'G002',
    category: 'Academic',
    description: 'Request for re-evaluation of mid-semester answer sheet.',
    status: 'Resolved',
    date: 'Jan 25, 2026',
    isAnonymous: false,
  },
  {
    id: 'G003',
    category: 'Canteen',
    description: 'Quality of food has deteriorated in the main canteen.',
    status: 'Open',
    date: 'Feb 4, 2026',
    isAnonymous: true,
  }
];

// Mock Students Data (for teacher view)
export const MOCK_STUDENTS: Student[] = [
  { id: 's1', name: 'Aman Verma', roll: 'CS2021001', batch: 'A', attendance: 85, marks: 8.2 },
  { id: 's2', name: 'Priya Das', roll: 'CS2021002', batch: 'A', attendance: 92, marks: 8.8 },
  { id: 's3', name: 'Rahul Kumar', roll: 'CS2021003', batch: 'B', attendance: 78, marks: 7.5 },
  { id: 's4', name: 'Sneha Patel', roll: 'CS2021004', batch: 'B', attendance: 88, marks: 8.5 },
  { id: 's5', name: 'Vikram Singh', roll: 'CS2021005', batch: 'A', attendance: 81, marks: 7.9 },
  { id: 's6', name: 'Neha Gupta', roll: 'CS2021006', batch: 'A', attendance: 94, marks: 9.1 },
];

// Mock Labs Data
export const MOCK_LABS: Lab[] = [
  {
    id: 'l1',
    name: 'ML Lab',
    subject: 'Machine Learning',
    batch: 'A',
    time: '10:00 AM - 12:00 PM',
    faculty: 'Dr. Sarah Smith',
    instructions: [
      'Bring your own laptop with Python installed',
      'Install required libraries: numpy, pandas, scikit-learn',
      'Submit lab report before leaving',
      'Maintain silence in the lab'
    ]
  },
  {
    id: 'l2',
    name: 'DB Lab',
    subject: 'Database Management',
    batch: 'B',
    time: '02:00 PM - 04:00 PM',
    faculty: 'Prof. Rajesh Kumar',
    instructions: [
      'Login credentials will be provided',
      'Save your work regularly',
      'No personal USB drives allowed',
      'Follow lab safety guidelines'
    ]
  }
];

// Dashboard Configurations
export const DASHBOARD_CONFIGS: Record<UserRole, DashboardConfig> = {
  [UserRole.STUDENT]: {
    primary1: {
      id: 'attendance',
      label: 'Attendance',
      value: '84%',
      accent: 'bg-indigo-600',
    },
    primary2: {
      id: 'timetable',
      label: 'Today\'s Classes',
      sub: '4 Classes Scheduled',
      emoji: '📅',
    },
    grid: [
      { id: 'lms', label: 'Study Material', sub: 'Access LMS', emoji: '📚', bg: 'bg-blue-50', color: 'text-blue-600' },
      { id: 'assignments', label: 'Assignments', sub: '2 Pending', emoji: '📝', bg: 'bg-amber-50', color: 'text-amber-600' },
      { id: 'results', label: 'Results', sub: 'View Grades', emoji: '📊', bg: 'bg-teal-50', color: 'text-teal-600' },
      { id: 'notices', label: 'Notices', sub: '3 New', emoji: '📢', bg: 'bg-rose-50', color: 'text-rose-600' },
    ],
    support: {
      id: 'grievance',
      label: 'Student Support',
      sub: 'Raise a ticket',
      emoji: '💬',
    }
  },
  [UserRole.TEACHER]: {
    primary1: {
      id: 'mark_attendance',
      label: 'Mark Attendance',
      emoji: '✅',
      accent: 'bg-teal-600',
    },
    primary2: {
      id: 'students_list',
      label: 'My Students',
      sub: 'View 45 Students',
      icon: Users,
    },
    grid: [
      { id: 'upload_ppt', label: 'Upload PPT', sub: 'Share Material', emoji: '📤', bg: 'bg-blue-50', color: 'text-blue-600' },
      { id: 'upload_marks', label: 'Upload Marks', sub: 'Enter Grades', emoji: '📝', bg: 'bg-amber-50', color: 'text-amber-600' },
      { id: 'timetable', label: 'Timetable', sub: 'View Schedule', emoji: '📅', bg: 'bg-teal-50', color: 'text-teal-600' },
      { id: 'queries', label: 'Queries', sub: '5 New', emoji: '💬', bg: 'bg-rose-50', color: 'text-rose-600' },
    ],
    support: {
      id: 'edit_timetable',
      label: 'Edit Timetable',
      sub: 'Request Changes',
      emoji: '✏️',
    }
  },
  [UserRole.PARENT]: {
    primary1: {
      label: 'Ward Attendance',
      value: '84%',
      accent: 'bg-indigo-600',
    },
    primary2: {
      label: 'Academic Performance',
      sub: 'CGPA: 8.43',
      emoji: '📊',
    },
    grid: [
      { id: 'attendance', label: 'Attendance', sub: 'View Details', emoji: '📈', bg: 'bg-blue-50', color: 'text-blue-600' },
      { id: 'results', label: 'Results', sub: 'View Grades', emoji: '📋', bg: 'bg-amber-50', color: 'text-amber-600' },
      { id: 'notices', label: 'Notices', sub: 'Updates', emoji: '📢', bg: 'bg-teal-50', color: 'text-teal-600' },
      { id: 'grievance', label: 'Contact', sub: 'Reach Us', emoji: '📞', bg: 'bg-rose-50', color: 'text-rose-600' },
    ],
    support: {
      id: 'grievance',
      label: 'Parent Support',
      sub: 'Get in touch',
      emoji: '💬',
    }
  },
  [UserRole.MANAGEMENT]: {
    primary1: {
      label: 'Total Students',
      value: '2,450',
      accent: 'bg-rose-600',
    },
    primary2: {
      label: 'Faculty Members',
      sub: '120 Teachers',
      emoji: '👨‍🏫',
    },
    grid: [
      { id: 'students', label: 'Students', sub: 'Manage All', emoji: '👥', bg: 'bg-blue-50', color: 'text-blue-600' },
      { id: 'teachers', label: 'Teachers', sub: 'Manage Faculty', emoji: '👨‍🏫', bg: 'bg-amber-50', color: 'text-amber-600' },
      { id: 'notices', label: 'Notices', sub: 'Publish', emoji: '📢', bg: 'bg-teal-50', color: 'text-teal-600' },
      { id: 'reports', label: 'Reports', sub: 'Analytics', emoji: '📊', bg: 'bg-rose-50', color: 'text-rose-600' },
    ],
    support: {
      id: 'settings',
      label: 'System Settings',
      sub: 'Configure',
      emoji: '⚙️',
    }
  }
};

// Export all icons for convenience
export const Icons = {
  BarChart2, Calendar, BookOpen, FileText, Bell, CreditCard, MessageSquare,
  Users, UploadCloud, Pencil, CheckCircle, Clock, AlertTriangle, TrendingUp,
  Home, GraduationCap, Settings, Shield, LogOut, Camera, ChevronRight,
  Search, Menu, X, ChevronDown, ChevronLeft, Download, PlayCircle, Paperclip,
  Send, Info, FlaskConical, MapPin, Building2, Coffee, Lock, Smartphone,
  Moon, Globe, Trash2, Check, User, Filter, Pin, Award, Calculator, Star,
  Save, Edit, Plus, Minus, Eye, EyeOff, ArrowRight
};
