import { ReactNode } from 'react';
import ThemeToggle from '../ui/ThemeToggle';

interface HeaderProps {
    title: string;
    theme: string;
    toggleTheme: () => void;
    children?: ReactNode;
}

/**
 * Header component for the application
 */
const Header = ({ title, theme, toggleTheme, children }: HeaderProps) => {
    return (
        <header className="app-header">
            <div className="header-top">
                <h1>{title}</h1>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
            {children}
        </header>
    );
};

export default Header; 