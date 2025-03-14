import { ReactNode } from 'react';
import { WordPressPost, WordPressUser, WordPressSite } from './wordpress';

export interface LayoutProps {
  children: ReactNode;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface TopBarProps {
  onMenuClick: () => void;
  user?: WordPressUser;
  currentSite?: WordPressSite;
}

export interface SiteSwitcherProps {
  sites: WordPressSite[];
  currentSite?: WordPressSite;
  onSiteChange: (site: WordPressSite) => void;
}

export interface PostCardProps {
  post: WordPressPost;
  onEdit?: (post: WordPressPost) => void;
  onDelete?: (post: WordPressPost) => void;
  onView?: (post: WordPressPost) => void;
}

export interface UserCardProps {
  user: WordPressUser;
  onEdit?: (user: WordPressUser) => void;
  onDelete?: (user: WordPressUser) => void;
  onStatusChange?: (user: WordPressUser, status: WordPressUser['status']) => void;
}

export interface ConnectSiteWizardProps {
  onConnect: (siteData: WordPressSite) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface FilterProps<T> {
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  label: string;
  placeholder?: string;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
} 