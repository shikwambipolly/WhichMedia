import { useState, useCallback, useEffect } from 'react';
import useDebounce from './useDebounce';
import { SearchFilters } from '../types/component.types';

interface UseSearchProps {
    debounceDelay?: number;
    minSearchLength?: number;
}

/**
 * A custom hook for managing search state and functionality
 * 
 * @param options Configuration options for the search
 * @returns An object with search state and functions
 */
export function useSearch({ debounceDelay = 500, minSearchLength = 3 }: UseSearchProps = {}) {
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [fetchAllPages, setFetchAllPages] = useState(false);
    const [filters, setFilters] = useState<SearchFilters>({
        type: 'all',
        year: ''
    });
    
    // Use debounce hook for the input value
    const { debouncedValue, isDebouncing } = useDebounce(inputValue, debounceDelay, minSearchLength);
    
    // Update search term when debounced value changes
    useEffect(() => {
        if (debouncedValue.length >= minSearchLength) {
            setSearchTerm(debouncedValue);
            setFetchAllPages(false);
        } else if (debouncedValue.length === 0) {
            setSearchTerm('');
            setFetchAllPages(false);
        }
    }, [debouncedValue, minSearchLength]);
    
    // Function to handle search button click
    const handleSearch = useCallback((e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        if (inputValue.length >= minSearchLength) {
            setSearchTerm(inputValue);
            setFetchAllPages(true);
        }
    }, [inputValue, minSearchLength]);
    
    // Function to handle input change
    const handleInputChange = useCallback((value: string) => {
        setInputValue(value);
    }, []);
    
    // Function to handle filter changes
    const handleFilterChange = useCallback((name: keyof SearchFilters, value: string) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
        
        // If we have an active search, reapply with new filters
        if (inputValue.length >= minSearchLength) {
            setSearchTerm(inputValue);
            setFetchAllPages(false);
        }
    }, [inputValue, minSearchLength]);
    
    return {
        inputValue,
        searchTerm,
        filters,
        isDebouncing,
        fetchAllPages,
        handleInputChange,
        handleFilterChange,
        handleSearch,
        setFetchAllPages
    };
}

export default useSearch; 