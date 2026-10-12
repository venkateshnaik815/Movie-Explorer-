import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiStar, HiHeart, HiPlay } from 'react-icons/hi2'
import { getPosterUrl, PLACEHOLDER_POSTER } from '../../utils/imageUrl'
import { formatYear, formatRating } from '../../utils/formatters'
import { useFavorites } from '../../context/FavoritesContext'
import FullMoviePlayerModal from './FullMoviePlayerModal'

export function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const favorited = isFavorite(movie.id)
  const initialPoster = getPosterUrl(movie.poster_path) || PLACEHOLDER_POSTER
  const [imgSrc, setImgSrc] = useState(initialPoster)
  const [showPlayer, setShowPlayer] = useState(false)
  const year = formatYear(movie.release_date)
  const rating = formatRating(movie.vote_average)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      genre_ids: movie.genre_ids,
    })
  }

  const handleQuickWatch = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPlayer(true)
  }

  return (
    <>
      <Link to={`/movie/${movie.id}`} className="movie-card">
        <div className="movie-card-poster">
          <img
            src={imgSrc}
            alt={movie.title}
            loading="lazy"
            onError={() => setImgSrc(PLACEHOLDER_POSTER)}
          />
          <div className="movie-card-rating">
            <HiStar className="star" />
            {rating}
          </div>
          <button
            className={`movie-card-fav ${favorited ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <HiHeart size={18} />
          </button>
          <div className="movie-card-overlay">
            <button className="movie-card-play-quick" onClick={handleQuickWatch} title="Watch Full Movie HD">
              <HiPlay size={18} /> Watch HD
            </button>
            <span className="movie-card-view">Details</span>
          </div>
        </div>
        <div className="movie-card-info">
          <h3 className="movie-card-title">{movie.title}</h3>
          <span className="movie-card-year">{year}</span>
        </div>
      </Link>

      <FullMoviePlayerModal
        isOpen={showPlayer}
        onClose={() => setShowPlayer(false)}
        movie={movie}
      />
    </>
  )
}
