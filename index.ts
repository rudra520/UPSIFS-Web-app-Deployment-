// User Roles
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  MANAGEMENT = 'MANAGEMENT'
}

// User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  semester?: number;
  enrollmentNo?: string;
  avatar?: string;
  createdAt?: string;
}

// Subject Interface
export interface Subject {
  id: string;
  name: string;
  code: string;
  attendance: number;
  units: Unit[];
}

// Unit Interface
export interface Unit {
  id: string;
  title: string;
  resources: Resource[];
}

// Resource Interface
export interface Resource {
  id: string;
  name: string;
  type: 'PDF' | 'VIDEO' | 'LINK';
  url?: string;
}

// Assignment Interface
export interface Assignment {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  marks?: string;
  remarks?: string;
}

// Notice Interface
export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'Exam' | 'Event' | 'Holiday' | 'General';
  date: string;
  isPinned: boolean;
}

// Grievance Interface
export interface Grievance {
  id: string;
  category: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
  isAnonymous: boolean;
}

// Student Interface (for teacher view)
export interface Student {
  id: string;
  name: string;
  roll: string;
  batch: string;
  attendance: number;
  marks: number;
}

// Lab Interface
export interface Lab {
  id: string;
  name: string;
  subject: string;
  batch: string;
  time: string;
  faculty: string;
  instructions: string[];
}

// Timetable Slot Interface
export interface TimetableSlot {
  time: string;
  subject: string;
  room: string;
}

// Timetable Day Interface
export interface TimetableDay {
  day: string;
  slots: TimetableSlot[];
}

// Dashboard Card Interface
export interface DashboardCard {
  id: string;
  label: string;
  sub: string;
  emoji?: string;
  icon?: any;
  bg?: string;
  color?: string;
}

// Dashboard Config Interface
export interface DashboardConfig {
  primary1: {
    id?: string;
    label: string;
    value?: string;
    emoji?: string;
    accent?: string;
  };
  primary2: {
    id?: string;
    label: string;
    sub: string;
    emoji?: string;
    icon?: any;
  };
  grid: DashboardCard[];
  support: {
    id: string;
    label: string;
    sub: string;
    emoji?: string;
  };
}

// API Response Interface
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
}

// Login Credentials Interface
export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

// Register Data Interface
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department: string;
  semester?: number;
  enrollmentNo?: string;
}
