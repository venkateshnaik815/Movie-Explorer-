import { useState, useEffect } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PageContainer } from '../components/layout/PageContainer'
import { MovieGrid } from '../components/movie/MovieGrid'
import { Pagination } from '../components/ui/Pagination'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { tmdbApi } from '../services/tmdbApi'

export default function TopRated() {
  useDocumentTitle('Top Rated Movies')
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true); setError(null)
      try {
        const data = await tmdbApi.getTopRated(page)
        setMovies(data.results || [])
        setTotalPages(data.total_pages || 1)
      } catch (err) { setError(err.message) }
      finally { setLoading(false) }
    }
    fetch()
    window.scrollTo(0, 0)
  }, [page])

  if (error) return <PageContainer><ErrorMessage message={error} onRetry={() => setPage(1)} /></PageContainer>

  return (
    <PageContainer>
      <div className="page-header"><h1>Top Rated Movies</h1><p>The highest rated movies of all time</p></div>
      <MovieGrid movies={movies} loading={loading} />
      {!loading && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </PageContainer>
  )
}
