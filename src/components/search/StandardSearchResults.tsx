import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMedia, isErrorResponse } from '../../services/api';
import { MovieBasic, SearchResponse, ApiResponse} from '../../types/api.types';
import { SearchResultsProps, SearchFilters } from '../../types/component.types';
import LoadingMessage from '../ui/LoadingMessage';
import ErrorMessage from '../ui/ErrorMessage';
import MovieGrid from './MovieGrid';
//import Pagination from './Pagination';

/**
 * SearchResults component for displaying search results
 */
const SearchResults = ({ title, fetchAllPages, filters, setFetchAllPages }: SearchResultsProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [allMovies, setAllMovies] = useState<MovieBasic[]>([]);
    const [isLoadingAll, setIsLoadingAll] = useState(false);
    const [loadingError, setLoadingError] = useState<string | null>(null);
    const [prevSearchTerm, setPrevSearchTerm] = useState<string>('');
    const [prevFilters, setPrevFilters] = useState<SearchFilters>({ type: 'all', year: '' });
    const [showAllPagesInfo, setShowAllPagesInfo] = useState(false);
    const RESULTS_PER_PAGE = 10; // OMDB API returns 10 results per page
    
    // Check if filters have changed
    const filtersChanged = 
        prevFilters.type !== filters.type || 
        prevFilters.year !== filters.year;
    
    // Initial query to get first page and total results
    const { data, error, isLoading, isFetching } = useQuery<ApiResponse<SearchResponse>>({
        queryKey: ["title", title, filters.type, filters.year], 
        queryFn: () => searchMedia(title, 1, filters),
        enabled: title.length >= 3, // Only run query if search term has at least 3 characters
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
    
    // Check if data is an error response
    const hasError = error || (data && isErrorResponse(data));
    const errorMessage = error ? (error as Error).message : 
                        (data && isErrorResponse(data)) ? data.Error : null;
    
    // Get search results if available
    const searchResults = data && !isErrorResponse(data) ? data : null;
    const totalResults = searchResults ? parseInt(searchResults.totalResults) : 0;
    const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
    
    // Clear previous results when search term or filters change
    useEffect(() => {
        if (title && (title !== prevSearchTerm || filtersChanged)) {
            setAllMovies([]); // Clear previous results immediately
            setPrevSearchTerm(title);
            setPrevFilters(filters);
            setCurrentPage(1); // Reset to first page for new searches
            setLoadingError(null); // Clear any previous errors
            setShowAllPagesInfo(false); // Reset all pages info flag
        }
    }, [title, prevSearchTerm, filters, filtersChanged]);
    
    // Set first page results immediately
    useEffect(() => {
        if (data && !isErrorResponse(data) && data.Search) {
            if (allMovies.length === 0 || currentPage === 1) {
                setAllMovies(data.Search);
            }
        }
    }, [data]);
    
    // Fetch all pages when the fetchAllPages prop changes
    useEffect(() => {
        const fetchAllPagesData = async () => {
            if (!searchResults || !searchResults.Search) return;
            
            const totalResults = parseInt(searchResults.totalResults);
            const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
            
            if (totalPages <= 1) return; // No need to fetch if only one page
            
            try {
                setIsLoadingAll(true);
                setLoadingError(null);
                
                const allResults: MovieBasic[] = [...searchResults.Search]; // Start with first page
                
                // Create array of promises for all remaining pages
                const pagePromises = [];
                for (let page = 2; page <= totalPages; page++) {
                    pagePromises.push(searchMedia(title, page, filters));
                }
                
                // Execute all page queries in parallel
                const results = await Promise.all(pagePromises);
                
                // Process results, handling potential errors
                results.forEach(result => {
                    if (!isErrorResponse(result) && result.Search) {
                        allResults.push(...result.Search);
                    }
                });
                
                setAllMovies(allResults);
                setShowAllPagesInfo(true);
            } catch (error) {
                console.error('Error fetching all pages:', error);
                setLoadingError('Failed to load all pages. Please try again.');
            } finally {
                setIsLoadingAll(false);
            }
        };
        
        if (fetchAllPages && searchResults && !isLoadingAll && !loadingError) {
            fetchAllPagesData();
        }
    }, [fetchAllPages, searchResults, title, filters]);
    
    // If no search term or too short, don't show anything
    if (!title || title.length < 3) return null;
    
    // Render loading state
    if (isLoading || isFetching) {
        return <LoadingMessage message="Searching for media..." />;
    }

    // Render error state
    if (hasError || loadingError) {
        return <ErrorMessage message={errorMessage || loadingError || "An error occurred while searching"} />;
    }

    // Render empty state (no results)
    if (!searchResults || !searchResults.Search || searchResults.Search.length === 0) {
        return <div className="no-results">No results found for "{title}"</div>;
    }
    
    // Function for pagination
    //const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
    // Get a description of current filters
    const getFilterDescription = () => {
        let description = `${totalResults} results for "${title}"`;
        
        if (filters.type && filters.type !== 'all') {
            description += ` (Type: ${filters.type})`;
        }
        
        if (filters.year && filters.year !== '') {
            description += ` (Year: ${filters.year})`;
        }
        
        return description;
    };
    
    // Load all pages when button is clicked
    const handleLoadAllResults = () => {
        if (setFetchAllPages) {
            setFetchAllPages(true);
        }
    };
    
    return (
        <div className="search-results">
            <div className="search-results-container">
                <h2 className="results-title">
                    {getFilterDescription()}
                </h2>
                
                {fetchAllPages ? (
                    showAllPagesInfo && (
                        <div className="all-results-note">
                            Showing all {allMovies.length} results
                        </div>
                    )
                ) : (
                    totalPages > 1 && (
                        <>
                        <div className="limited-results-note">
                            Showing page {currentPage} of {totalPages}
                        </div>
                        <div className="limited-results-note">
                            <button 
                                className="load-all-prompt"
                                onClick={handleLoadAllResults}
                                disabled={isLoadingAll}
                            >
                                {isLoadingAll ? 'Loading all results...' : 'Load all results'}
                            </button>
                        </div>
                        </>
                    )
                )}
                
                {isLoadingAll && (
                    <div className="loading-overlay">
                        <LoadingMessage message="Loading all results..." />
                    </div>
                )}
                
                <MovieGrid movies={allMovies} />
                
                {/* {fetchAllPages && totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalResults}
                        paginate={paginate}
                    />
                )} */}
            </div>
        </div>
    );
};

export default SearchResults; 