import { LoadingMessageProps } from '../../types/component.types';

/**
 * LoadingMessage component for displaying loading states
 */
const LoadingMessage = ({ message }: LoadingMessageProps) => {
    return (
        <div className="loading-message">
            {message || 'Loading...'}
        </div>
    );
};

export default LoadingMessage; 