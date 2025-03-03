/**
 * ErrorBoundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
import { Component, ReactNode, isValidElement } from 'react';
import { ErrorBoundaryProps } from '../../types/context.types';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      error 
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  renderFallback(): ReactNode {
    const { error } = this.state;
    const { fallback } = this.props;
    
    // If fallback is provided
    if (fallback) {
      // If fallback is a function, call it with the error
      if (typeof fallback === 'function' && error) {
        const customFallback = fallback(error);
        // Ensure the result is a valid React element
        if (isValidElement(customFallback)) {
          return customFallback;
        }
      } 
      // If fallback is a ReactNode (not a function)
      else if (isValidElement(fallback)) {
        return fallback;
      }
    }
    
    // Default fallback UI
    return (
      <div className="error-boundary-fallback">
        <h2>Something went wrong.</h2>
        <details>
          <summary>Error Details</summary>
          <p>{error?.message}</p>
        </details>
        <button onClick={() => window.location.reload()}>
          Refresh Page
        </button>
      </div>
    );
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return this.renderFallback();
    }

    return children;
  }
}

export default ErrorBoundary; 