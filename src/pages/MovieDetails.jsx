import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PageContainer } from '../components/layout/PageContainer'
import { MovieGrid } from '../components/movie/MovieGrid'
import { GenreBadge } from '../components/movie/GenreBadge'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { Spinner } from '../components/ui/Spinner'
import { tmdbApi } from '../services/tmdbApi'
import { getBackdropUrl, getPosterUrl, getProfileUrl, PLACEHOLDER_POSTER } from '../utils/imageUrl'
import { formatDate, formatRuntime, formatMoney, formatRating, formatVoteCount } from '../utils/formatters'
import { useFavorites } from '../context/FavoritesContext'
import { HiStar, HiHeart, HiPlay, HiCalendar, HiClock, HiBanknotes, HiLanguage, HiChevronLeft, HiSparkles } from 'react-icons/hi2'

import FullMoviePlayerModal from '../components/movie/FullMoviePlayerModal'

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showFullMovie, setShowFullMovie] = useState(false)
  const { toggleFavorite, isFavorite } = useFavorites()

  useDocumentTitle(movie?.title || 'Movie Details')

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await tmdbApi.getMovieDetails(id)
        setMovie(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) return <Spinner />
  if (error) return <PageContainer><ErrorMessage message={error} /></PageContainer>
  if (!movie) return null

  const favorited = isFavorite(movie.id)
  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  const director = movie.credits?.crew?.find(c => c.job === 'Director')
  const cast = movie.credits?.cast?.slice(0, 12) || []
  const similar = movie.similar?.results?.slice(0, 6) || []
  const backdropSrc = getBackdropUrl(movie.backdrop_path)
  const posterSrc = getPosterUrl(movie.poster_path, 'large') || PLACEHOLDER_POSTER

  return (
    <>
      {/* Backdrop Hero */}
      <div className="movie-detail-backdrop" style={{ backgroundImage: backdropSrc ? `url(${backdropSrc})` : 'none' }}>
        <div className="movie-detail-backdrop-overlay" />
      </div>

      <PageContainer className="movie-detail-page">
        <Link to={-1} className="back-link"><HiChevronLeft size={20} /> Back</Link>

        <div className="movie-detail-hero">
          <div className="movie-detail-poster">
            <img
              src={posterSrc}
              alt={movie.title}
              onError={(e) => { e.target.src = PLACEHOLDER_POSTER }}
            />
          </div>
          <div className="movie-detail-info">
            <h1 className="movie-detail-title">{movie.title}
              {movie.release_date && <span className="movie-detail-year"> ({new Date(movie.release_date).getFullYear()})</span>}
            </h1>

            {movie.tagline && <p className="movie-detail-tagline">"{movie.tagline}"</p>}

            <div className="movie-detail-meta">
              <div className="movie-detail-rating-big">
                <HiStar className="star" /> {formatRating(movie.vote_average)}
                <span className="vote-count">({formatVoteCount(movie.vote_count)} votes)</span>
              </div>
            </div>

            <div className="movie-detail-genres">
              {movie.genres?.map(g => <GenreBadge key={g.id} genreId={g.id} name={g.name} />)}
            </div>

            <div className="movie-detail-quick-info">
              {movie.release_date && <span><HiCalendar /> {formatDate(movie.release_date)}</span>}
              {movie.runtime > 0 && <span><HiClock /> {formatRuntime(movie.runtime)}</span>}
              {movie.original_language && <span><HiLanguage /> {movie.original_language.toUpperCase()}</span>}
            </div>

            <p className="movie-detail-overview">{movie.overview || 'No overview available.'}</p>

            <div className="movie-detail-actions">
              <button className="btn btn-primary btn-lg" onClick={() => setShowFullMovie(true)} style={{ padding: '0.85rem 1.85rem', fontSize: '1rem', boxShadow: '0 4px 20px rgba(255, 107, 0, 0.45)' }}>
                <HiPlay size={22} /> Watch Full Movie (HD)
              </button>
              <button className={`btn ${favorited ? 'btn-danger' : 'btn-secondary'}`} onClick={() => toggleFavorite(movie)}>
                <HiHeart size={20} /> {favorited ? 'Remove Favorite' : 'Add to Favorites'}
              </button>
            </div>

            {/* Financial Info */}
            {(movie.budget > 0 || movie.revenue > 0) && (
              <div className="movie-detail-financials">
                {movie.budget > 0 && <div className="financial-item"><HiBanknotes /> Budget: <strong>{formatMoney(movie.budget)}</strong></div>}
                {movie.revenue > 0 && <div className="financial-item"><HiBanknotes /> Revenue: <strong>{formatMoney(movie.revenue)}</strong></div>}
              </div>
            )}

            {director && <p className="movie-detail-director">Directed by <strong>{director.name}</strong></p>}
          </div>
        </div>

        {/* Cast Section */}
        {cast.length > 0 && (
          <section className="section">
            <div className="section-header"><h2>Top Cast</h2></div>
            <div className="cast-grid">
              {cast.map(person => (
                <div key={person.id} className="cast-card">
                  <div className="cast-avatar">
                    {person.profile_path ? (
                      <img
                        src={getProfileUrl(person.profile_path, 'medium')}
                        alt={person.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const next = e.currentTarget.nextElementSibling
                          if (next) {
                            next.style.display = 'flex'
                          }
                        }}
                      />
                    ) : null}
                    <div
                      className="cast-avatar-placeholder"
                      style={{ display: person.profile_path ? 'none' : 'flex' }}
                    >
                      {person.name?.charAt(0)}
                    </div>
                  </div>
                  <h4 className="cast-name">{person.name}</h4>
                  <p className="cast-character">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Movies */}
        {similar.length > 0 && (
          <section className="section">
            <div className="section-header"><h2>Similar Movies</h2></div>
            <MovieGrid movies={similar} loading={false} />
          </section>
        )}
      </PageContainer>

      <FullMoviePlayerModal isOpen={showFullMovie} onClose={() => setShowFullMovie(false)} movie={movie} />
    </>
  )
}
