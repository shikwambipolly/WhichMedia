/**
 * Component props type definitions
 * Organized by feature/component category
 */
import { ReactNode } from 'react';
import { MovieBasic } from './api.types';

// Common/shared types
export interface BaseProps {
  className?: string;
}

// Filter types
export interface SearchFilters {
  type: string;
  year: string;
}

// Layout component props
export interface LayoutProps {
  children: ReactNode;
}

export interface HeaderProps extends BaseProps {
  title: string;
  theme: string;
  toggleTheme: () => void;
  children?: ReactNode;
}

// UI component props
export interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

export interface ErrorMessageProps extends BaseProps {
  message: string;
  retryAction?: () => void;
}

export interface LoadingMessageProps extends BaseProps {
  message: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// Search component props
export interface SearchFormProps {
  onSearch: (e: React.FormEvent) => void;
  onInputChange: (value: string) => void;
  filters: SearchFilters;
  onFilterChange: (name: keyof SearchFilters, value: string) => void;
  inputValue: string;
  isDebouncing: boolean;
}

export interface SearchResultsProps {
  title: string;
  fetchAllPages: boolean;
  filters: SearchFilters;
  setFetchAllPages?: (value: boolean) => void;
}

// Movie display component props
export interface MovieCardProps extends BaseProps {
  movie: MovieBasic;
  isLiked?: boolean;
  onToggleLike?: (movie: MovieBasic) => void;
}

export interface MovieGridProps extends BaseProps {
  movies: MovieBasic[];
}

export interface MovieDetailsModalProps {
  imdbID: string;
  isOpen: boolean;
  onClose: () => void;
}

// Pagination component props
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

// AI component props
export interface AISearchFormProps {
  onSubmit: (description: string) => Promise<void>;
  isLoading: boolean;
}

export interface RecommendationItemProps {
  title: string;
  index: number;
} 