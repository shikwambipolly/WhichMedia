/**
 * Context-related type definitions
 */
import { ReactNode } from 'react';
import { MovieBasic } from './api.types';
import { SearchFilters } from './component.types';

// Theme context types
export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

// Liked movies context types
export interface LikedMoviesContextType {
  likedMovies: MovieBasic[];
  toggleLikedMovie: (movie: MovieBasic) => void;
  isMovieLiked: (imdbID: string) => boolean;
}

export interface LikedMoviesProviderProps {
  children: ReactNode;
}

// Search context types
export interface SearchContextType {
  inputValue: string;
  searchTerm: string;
  filters: SearchFilters;
  isDebouncing: boolean;
  fetchAllPages: boolean;
  handleInputChange: (value: string) => void;
  handleFilterChange: (name: keyof SearchFilters, value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  setFetchAllPages: (value: boolean) => void;
}

export interface SearchProviderProps {
  children: ReactNode;
  debounceDelay?: number;
  minSearchLength?: number;
}

// Error boundary types
export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error) => ReactNode);
} 