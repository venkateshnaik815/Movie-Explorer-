import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PageContainer } from '../components/layout/PageContainer'
import { GENRE_MAP } from '../constants/genres'

export default function Genres() {
  useDocumentTitle('Genres')
  const genres = Object.entries(GENRE_MAP)

  return (
    <PageContainer>
      <div className="page-header">
        <h1>Movie Genres</h1>
        <p>Browse movies by genre</p>
      </div>
      <div className="genres-grid">
        {genres.map(([id, genre]) => (
          <Link key={id} to={`/genre/${id}`} className="genre-card" style={{ '--genre-color': genre.color }}>
            <span className="genre-card-emoji">{genre.emoji}</span>
            <span className="genre-card-name">{genre.name}</span>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}
