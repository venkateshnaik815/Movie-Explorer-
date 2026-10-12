import { MovieCard } from './MovieCard'
import { MovieGridSkeleton } from '../ui/Skeleton'
import { EmptyState } from '../common/EmptyState'
import { HiFilm } from 'react-icons/hi2'

export function MovieGrid({ movies, loading, emptyMessage }) {
  if (loading) return <MovieGridSkeleton count={12} />

  if (!movies || movies.length === 0) {
    return (
      <EmptyState
        icon={<HiFilm />}
        title="No Movies Found"
        message={emptyMessage || 'Try adjusting your search or filters.'}
      />
    )
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
