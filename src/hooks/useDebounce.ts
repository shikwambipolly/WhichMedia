import { useState, useEffect, useCallback } from 'react';

/**
 * A custom hook for debouncing an input value
 * 
 * @param value The value to debounce
 * @param delay The debounce delay in milliseconds
 * @param minLength The minimum length required for the value to be debounced (optional)
 * @returns An object with the debounced value, loading state, and reset function
 */

function useDebounce<T>(value: T, delay: number, minLength = 0) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const [isDebouncing, setIsDebouncing] = useState(false);
    
    const getValueLength = (val: T): number => {
        if (typeof val === 'string') {
            return val.length;
        }
        return 0;
    };
    
    const shouldProcessValue = (val: T): boolean => {
        return getValueLength(val) >= minLength || getValueLength(val) === 0;
    };
    
    const reset = useCallback(() => {
        setDebouncedValue(value);
        setIsDebouncing(false);
    }, [value]);
    
    useEffect(() => {
        if (!shouldProcessValue(value)) {
            return;
        }
        
        setIsDebouncing(true);
        const timer = setTimeout(() => {
            setDebouncedValue(value);
            setIsDebouncing(false);
        }, delay);
        
        return () => clearTimeout(timer);
    }, [value, delay]);
    
    return { debouncedValue, isDebouncing, reset };
}

export default useDebounce; 