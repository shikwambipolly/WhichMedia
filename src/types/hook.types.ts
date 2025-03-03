/**
 * Hook-related type definitions
 */
import { SearchFilters } from './component.types';

// useDebounce hook types
export interface UseDebounceOptions {
  delay: number;
  minLength?: number;
}

export interface UseDebounceResult<T> {
  debouncedValue: T;
  isDebouncing: boolean;
}

// useSearch hook types
export interface UseSearchProps {
  debounceDelay?: number;
  minSearchLength?: number;
}

export interface UseSearchResult {
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

// useTheme hook types
export interface UseThemeResult {
  theme: string;
  toggleTheme: () => void;
}

// useLikedMovies hook types
export interface UseLikedMoviesResult<T> {
  likedItems: T[];
  toggleLikedItem: (item: T) => void;
  isItemLiked: (id: string) => boolean;
  clearLikedItems: () => void;
}

// API hooks types
export interface UseQueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<T>;
} 