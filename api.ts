import { LoginCredentials, RegisterData, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

// Get auth token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Set auth token
const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Remove auth token
const removeToken = (): void => {
  localStorage.removeItem('token');
};

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  method: string = 'GET',
  body?: any
): Promise<ApiResponse<T>> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Network error',
    };
  }
};

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse> => {
    const response = await apiRequest('/auth/login', 'POST', credentials);
    if (response.success && response.token) {
      setToken(response.token);
    }
    return response;
  },

  register: async (data: RegisterData): Promise<ApiResponse> => {
    const response = await apiRequest('/auth/register', 'POST', data);
    if (response.success && response.token) {
      setToken(response.token);
    }
    return response;
  },

  logout: (): void => {
    removeToken();
  },

  getCurrentUser: async (): Promise<ApiResponse> => {
    return apiRequest('/auth/me');
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse> => {
    return apiRequest('/auth/change-password', 'POST', { currentPassword, newPassword });
  },

  isAuthenticated: (): boolean => {
    return !!getToken();
  },
};

// Users API
export const usersAPI = {
  getAll: async (): Promise<ApiResponse> => {
    return apiRequest('/users');
  },

  getById: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/users/${id}`);
  },

  update: async (id: string, data: any): Promise<ApiResponse> => {
    return apiRequest(`/users/${id}`, 'PUT', data);
  },

  delete: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/users/${id}`, 'DELETE');
  },
};

// Students API
export const studentsAPI = {
  getAll: async (): Promise<ApiResponse> => {
    return apiRequest('/students');
  },

  getById: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/students/${id}`);
  },

  getAttendance: async (id: string, params?: { subject_id?: string; month?: string }): Promise<ApiResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.subject_id) queryParams.append('subject_id', params.subject_id);
    if (params?.month) queryParams.append('month', params.month);
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return apiRequest(`/students/${id}/attendance${query}`);
  },

  getMarks: async (id: string, semester?: number): Promise<ApiResponse> => {
    const query = semester ? `?semester=${semester}` : '';
    return apiRequest(`/students/${id}/marks${query}`);
  },

  markAttendance: async (data: {
    student_id: string;
    subject_id: string;
    date: string;
    status: 'PRESENT' | 'ABSENT' | 'LEAVE';
  }): Promise<ApiResponse> => {
    return apiRequest('/students/attendance', 'POST', data);
  },
};

// Teachers API
export const teachersAPI = {
  getAll: async (): Promise<ApiResponse> => {
    return apiRequest('/teachers');
  },

  getById: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/teachers/${id}`);
  },

  uploadMarks: async (data: {
    student_id: string;
    subject_id: string;
    exam_type: string;
    marks: number;
    max_marks: number;
    semester?: number;
  }): Promise<ApiResponse> => {
    return apiRequest('/teachers/marks', 'POST', data);
  },

  updateMarks: async (markId: string, marks: number, remarks?: string): Promise<ApiResponse> => {
    return apiRequest(`/teachers/marks/${markId}`, 'PUT', { marks, remarks });
  },

  addTimetable: async (data: {
    subject_id: string;
    day: string;
    start_time: string;
    end_time: string;
    room?: string;
    batch?: string;
  }): Promise<ApiResponse> => {
    return apiRequest('/teachers/timetable', 'POST', data);
  },
};

// Notices API
export const noticesAPI = {
  getAll: async (params?: { category?: string; limit?: number }): Promise<ApiResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return apiRequest(`/notices${query}`);
  },

  getById: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/notices/${id}`);
  },

  create: async (data: {
    title: string;
    content: string;
    category: 'Exam' | 'Event' | 'Holiday' | 'General';
    is_pinned?: boolean;
  }): Promise<ApiResponse> => {
    return apiRequest('/notices', 'POST', data);
  },

  update: async (id: string, data: any): Promise<ApiResponse> => {
    return apiRequest(`/notices/${id}`, 'PUT', data);
  },

  delete: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/notices/${id}`, 'DELETE');
  },
};

// Assignments API
export const assignmentsAPI = {
  getAll: async (params?: { subject_id?: string; status?: string }): Promise<ApiResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.subject_id) queryParams.append('subject_id', params.subject_id);
    if (params?.status) queryParams.append('status', params.status);
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return apiRequest(`/assignments${query}`);
  },

  getById: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/assignments/${id}`);
  },

  create: async (data: {
    title: string;
    subject_id: string;
    description?: string;
    deadline?: string;
  }): Promise<ApiResponse> => {
    return apiRequest('/assignments', 'POST', data);
  },

  submit: async (id: string, submission_url: string): Promise<ApiResponse> => {
    return apiRequest(`/assignments/${id}/submit`, 'POST', { submission_url });
  },

  grade: async (id: string, data: {
    student_id: string;
    marks: number;
    remarks?: string;
  }): Promise<ApiResponse> => {
    return apiRequest(`/assignments/${id}/grade`, 'POST', data);
  },

  delete: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/assignments/${id}`, 'DELETE');
  },
};

// Grievances API
export const grievancesAPI = {
  getAll: async (params?: { status?: string; my_grievances?: boolean }): Promise<ApiResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.my_grievances) queryParams.append('my_grievances', 'true');
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return apiRequest(`/grievances${query}`);
  },

  getById: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/grievances/${id}`);
  },

  create: async (data: {
    category: string;
    description: string;
    is_anonymous?: boolean;
  }): Promise<ApiResponse> => {
    return apiRequest('/grievances', 'POST', data);
  },

  updateStatus: async (id: string, status: 'Open' | 'In Progress' | 'Resolved'): Promise<ApiResponse> => {
    return apiRequest(`/grievances/${id}/status`, 'PUT', { status });
  },

  delete: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/grievances/${id}`, 'DELETE');
  },
};

export default {
  auth: authAPI,
  users: usersAPI,
  students: studentsAPI,
  teachers: teachersAPI,
  notices: noticesAPI,
  assignments: assignmentsAPI,
  grievances: grievancesAPI,
};
