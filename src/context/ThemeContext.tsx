/**
 * Theme Context
 * Provides theme functionality to the entire application
 */
import { createContext, useContext, ReactNode } from 'react';
import useTheme from '../hooks/useTheme';
import { ThemeContextType } from '../types/context.types';

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

// Define the props for the provider component
interface ThemeProviderProps {
  children: ReactNode;
}

// Provider component that wraps the application
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Use the existing hook to manage theme state
  const themeState = useTheme();
  
  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to access the theme context
export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  
  return context;
}

// Default export for convenience
export default ThemeContext; 