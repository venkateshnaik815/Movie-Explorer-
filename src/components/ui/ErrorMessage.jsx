import { HiExclamationTriangle } from 'react-icons/hi2'

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <HiExclamationTriangle size={48} />
      <h3>Something went wrong</h3>
      <p>{message || 'An unexpected error occurred. Please try again.'}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}
