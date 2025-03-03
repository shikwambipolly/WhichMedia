/**
 * GlobalErrorHandler Component
 * 
 * A wrapper component that provides global error handling for the application.
 * Uses ErrorBoundary internally and provides a nice UI for displaying errors.
 */
import { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface GlobalErrorHandlerProps {
  children: ReactNode;
}

const GlobalErrorHandler = ({ children }: GlobalErrorHandlerProps) => {
  /**
   * Custom fallback UI for the error boundary
   */
  const ErrorFallback = (error: Error) => (
    <div className="global-error-container">
      <div className="global-error-content">
        <h1>Oops! Something went wrong</h1>
        <p className="error-message">
          We're sorry, but we encountered an unexpected error.
        </p>
        
        <div className="error-details">
          <h3>Error details:</h3>
          <p>{error.message}</p>
          {process.env.NODE_ENV === 'development' && (
            <pre className="error-stack">{error.stack}</pre>
          )}
        </div>
        
        <div className="error-actions">
          <button 
            className="primary-button" 
            onClick={() => window.location.reload()}
          >
            Refresh the page
          </button>
          <button 
            className="secondary-button" 
            onClick={() => window.location.href = '/'}
          >
            Go to homepage
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default GlobalErrorHandler; 