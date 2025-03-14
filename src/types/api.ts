import { WordPressPost, WordPressUser, WordPressSite, WordPressCategory, WordPressTag, WordPressMedia } from './wordpress';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

export interface ApiError {
  status: number;
  code: string;
  message: string;
  details?: unknown;
}

// Request Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface ConnectSiteRequest {
  url: string;
  clientId: string;
  clientSecret: string;
}

export interface UpdateSiteRequest {
  id: string;
  name?: string;
  status?: WordPressSite['status'];
  credentials?: WordPressSite['credentials'];
}

// Response Types
export interface LoginResponse {
  user: WordPressUser;
  token: string;
  expiresIn: number;
}

export interface DashboardStats {
  posts: {
    total: number;
    published: number;
    draft: number;
  };
  users: {
    total: number;
    active: number;
  };
  storage: {
    total: number;
    used: number;
    available: number;
  };
  performance: {
    loadTime: number;
    uptime: number;
  };
}

// Search Parameters
export interface PostSearchParams {
  page?: number;
  perPage?: number;
  status?: WordPressPost['status'];
  type?: WordPressPost['type'];
  search?: string;
  category?: number;
  tag?: number;
  author?: number;
  orderBy?: 'date' | 'title' | 'modified';
  order?: 'asc' | 'desc';
}

export interface UserSearchParams {
  page?: number;
  perPage?: number;
  status?: WordPressUser['status'];
  role?: string;
  search?: string;
  orderBy?: 'name' | 'registered' | 'email';
  order?: 'asc' | 'desc';
} 