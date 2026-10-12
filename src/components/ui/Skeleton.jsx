export function Skeleton({ width, height, borderRadius, className = '', variant = 'rectangular', count = 1 }) {
  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '200px'),
    borderRadius: borderRadius || (variant === 'circular' ? '50%' : variant === 'text' ? '4px' : '10px'),
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton ${className}`} style={style} />
      ))}
    </>
  )
}

export function MovieCardSkeleton() {
  return (
    <div className="movie-card-skeleton">
      <Skeleton height="0" className="movie-card-skeleton-poster" />
      <div className="movie-card-skeleton-info">
        <Skeleton variant="text" width="80%" height="16px" />
        <Skeleton variant="text" width="40%" height="14px" />
      </div>
    </div>
  )
}

export function MovieGridSkeleton({ count = 10 }) {
  return (
    <div className="movie-grid">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  )
}
