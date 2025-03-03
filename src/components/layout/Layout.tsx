import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

/**
 * Layout component for wrapping the application content
 */
const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="app-container">
            {children}
        </div>
    );
};

export default Layout; 