import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PageContainer } from '../components/layout/PageContainer'
import { MovieGrid } from '../components/movie/MovieGrid'
import { Pagination } from '../components/ui/Pagination'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { tmdbApi } from '../services/tmdbApi'
import { GENRE_MAP, SORT_OPTIONS } from '../constants/genres'

export default function GenreMovies() {
  const { id } = useParams()
  const genre = GENRE_MAP[id]
  useDocumentTitle(genre?.name || 'Genre')
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('popularity.desc')

  useEffect(() => {
    const fetchGenre = async () => {
      setLoading(true); setError(null)
      try {
        const data = await tmdbApi.getMoviesByGenre(id, page, sortBy)
        setMovies(data.results || [])
        setTotalPages(data.total_pages || 1)
      } catch (err) { setError(err.message) }
      finally { setLoading(false) }
    }
    fetchGenre()
    window.scrollTo(0, 0)
  }, [id, page, sortBy])

  if (error) return <PageContainer><ErrorMessage message={error} onRetry={() => setPage(1)} /></PageContainer>

  return (
    <PageContainer>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1>{genre?.emoji} {genre?.name || 'Genre'} Movies</h1>
            <p>Explore {genre?.name?.toLowerCase() || ''} movies</p>
          </div>
          <div className="page-filters">
            <select className="filter-select" value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1) }}>
              {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      </div>
      <MovieGrid movies={movies} loading={loading} />
      {!loading && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </PageContainer>
  )
}
