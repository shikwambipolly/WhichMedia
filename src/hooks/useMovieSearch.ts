/**
 * useMovieSearch hook
 * A custom hook for searching movies with paging, filtering, and status management
 */
import { useState, useCallback, useEffect } from 'react';
import { SearchFilters } from '../types/component.types';
import { MovieBasic } from '../types/api.types';
import apiService, { isErrorResponse } from '../services/api.service';

interface UseMovieSearchResult {
  movies: MovieBasic[];
  totalResults: number;
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  currentPage: number;
  searchTerm: string;
  filters: SearchFilters;
  setSearchTerm: (term: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  handleSearch: (term?: string, page?: number) => Promise<void>;
  loadNextPage: () => Promise<void>;
  resetSearch: () => void;
}

/**
 * Custom hook for searching movies via the OMDB API
 * 
 * @param initialFilters Initial search filters
 * @returns Search state and functions to control the search
 */
export const useMovieSearch = (
  initialFilters: SearchFilters = { type: 'all', year: '' }
): UseMovieSearchResult => {
  // Search state
  const [movies, setMovies] = useState<MovieBasic[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  /**
   * Update filters
   */
  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  }, []);

  /**
   * Reset the search state
   */
  const resetSearch = useCallback(() => {
    setMovies([]);
    setTotalResults(0);
    setError(null);
    setHasSearched(false);
    setCurrentPage(1);
  }, []);

  /**
   * Perform the search with the current filters
   */
  const handleSearch = useCallback(async (term?: string, page: number = 1) => {
    // Use provided term or current searchTerm
    const searchQuery = term !== undefined ? term : searchTerm;
    
    // Validate search term
    if (!searchQuery || searchQuery.trim().length < 2) {
      setError('Please enter at least 2 characters to search');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Reset results if this is a new search (page 1)
      if (page === 1) {
        setMovies([]);
        setTotalResults(0);
      }
      
      // Perform the API call
      const response = await apiService.searchMedia(searchQuery, page, filters);
      
      // Check for errors
      if (isErrorResponse(response)) {
        setError(response.Error);
        setMovies([]);
        setTotalResults(0);
      } else {
        // Update state with results
        setMovies(prevMovies => 
          page === 1 ? response.Search : [...prevMovies, ...response.Search]
        );
        setTotalResults(parseInt(response.totalResults, 10));
        setCurrentPage(page);
      }
      
      // Mark as searched regardless of result
      setHasSearched(true);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filters]);

  /**
   * Load the next page of results
   */
  const loadNextPage = useCallback(async () => {
    if (isLoading || movies.length >= totalResults) return;
    
    const nextPage = currentPage + 1;
    await handleSearch(searchTerm, nextPage);
  }, [isLoading, movies.length, totalResults, currentPage, handleSearch, searchTerm]);

  // When filters change, reset and search with new filters if we have a search term
  useEffect(() => {
    if (hasSearched && searchTerm) {
      handleSearch(searchTerm, 1);
    }
  }, [filters, hasSearched, searchTerm, handleSearch]);

  return {
    movies,
    totalResults,
    isLoading,
    error,
    hasSearched,
    currentPage,
    searchTerm,
    filters,
    setSearchTerm,
    setFilters: updateFilters,
    handleSearch,
    loadNextPage,
    resetSearch
  };
};

export default useMovieSearch; 