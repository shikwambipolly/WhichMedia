import { useState, useEffect } from 'react';

/**
 * A custom hook for managing theme functionality
 * 
 * @returns An object with the current theme and a function to toggle the theme
 */
export function useTheme() {
    const [theme, setTheme] = useState('light');
    
    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);
    
    // Function to toggle between light and dark theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };
    
    return { theme, toggleTheme };
}

export default useTheme; 