import { ThemeToggleProps } from '../../types/component.types';

/**
 * ThemeToggle component for switching between light and dark themes
 */
const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
    return (
        <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <span>☀️</span>
            <span>🌙</span>
            <div className="toggle-switch"></div>
        </button>
    );
};

export default ThemeToggle; 