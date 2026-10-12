import { useState, useEffect } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PageContainer } from '../components/layout/PageContainer'
import { MovieGrid } from '../components/movie/MovieGrid'
import { Pagination } from '../components/ui/Pagination'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { tmdbApi } from '../services/tmdbApi'
import { SORT_OPTIONS } from '../constants/genres'
import { HiSparkles, HiFire } from 'react-icons/hi2'

export default function TeluguMovies() {
  useDocumentTitle('Latest Telugu Movies')
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('popularity.desc')

  useEffect(() => {
    const fetchTelugu = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await tmdbApi.getTeluguMovies(page)
        let results = data.results || []
        
        // Handle sorting if client-side mock
        if (sortBy === 'vote_average.desc') {
          results = [...results].sort((a, b) => b.vote_average - a.vote_average)
        } else if (sortBy === 'release_date.desc') {
          results = [...results].sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        }

        setMovies(results)
        setTotalPages(data.total_pages || 1)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTelugu()
    window.scrollTo(0, 0)
  }, [page, sortBy])

  if (error) {
    return (
      <PageContainer>
        <ErrorMessage message={error} onRetry={() => setPage(1)} />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1>
              <HiSparkles style={{ verticalAlign: 'middle', color: '#fbbf24' }} /> Telugu Movies
            </h1>
            <p>Latest Tollywood blockbusters, Pan-India spectacles and trending Telugu cinema</p>
          </div>
          <div className="page-filters">
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value)
                setPage(1)
              }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <MovieGrid movies={movies} loading={loading} />

      {!loading && movies.length > 0 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </PageContainer>
  )
}
