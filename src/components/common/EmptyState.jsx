import { Link } from 'react-router-dom'

export function EmptyState({ icon, title, message, actionLabel, actionPath }) {
  return (
    <div className="empty-state">
      {icon && <div className="icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && actionPath && (
        <Link to={actionPath} className="btn btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
