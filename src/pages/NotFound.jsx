import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { HiHome } from 'react-icons/hi2'

export default function NotFound() {
  useDocumentTitle('Page Not Found')

  return (
    <div className="not-found">
      <div className="error-code">404</div>
      <h2>Page Not Found</h2>
      <p>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        <HiHome size={20} />
        Back to Home
      </Link>
    </div>
  )
}
