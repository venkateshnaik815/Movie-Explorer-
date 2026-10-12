import { Link } from 'react-router-dom'
import { GENRE_MAP } from '../../constants/genres'

export function GenreBadge({ genreId, name, clickable = true }) {
  const genre = GENRE_MAP[genreId]
  const label = name || genre?.name || 'Unknown'
  const emoji = genre?.emoji || '🎬'

  if (clickable) {
    return (
      <Link to={`/genre/${genreId}`} className="genre-badge">
        <span className="genre-badge-emoji">{emoji}</span>
        {label}
      </Link>
    )
  }

  return (
    <span className="genre-badge">
      <span className="genre-badge-emoji">{emoji}</span>
      {label}
    </span>
  )
}
