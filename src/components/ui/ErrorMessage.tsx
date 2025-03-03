import { ErrorMessageProps } from '../../types/component.types';

/**
 * ErrorMessage component for displaying error states
 */
const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className="error-message">
            {message || 'An error occurred. Please try again.'}
        </div>
    );
};

export default ErrorMessage; 