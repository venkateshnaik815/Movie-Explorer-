import { useState, useEffect } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PageContainer } from '../components/layout/PageContainer'
import { MovieGrid } from '../components/movie/MovieGrid'
import { Pagination } from '../components/ui/Pagination'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { tmdbApi } from '../services/tmdbApi'
import { HiFire } from 'react-icons/hi2'

export default function Trending() {
  useDocumentTitle('Trending')
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeWindow, setTimeWindow] = useState('week')

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await tmdbApi.getTrending(timeWindow, page)
        setMovies(data.results || [])
        setTotalPages(data.total_pages || 1)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTrending()
    window.scrollTo(0, 0)
  }, [page, timeWindow])

  if (error) return <PageContainer><ErrorMessage message={error} onRetry={() => setPage(1)} /></PageContainer>

  return (
    <PageContainer>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1><HiFire style={{ verticalAlign: 'middle' }} /> Trending</h1>
            <p>What the world is watching right now</p>
          </div>
          <div className="toggle-group">
            <button className={`toggle-btn ${timeWindow === 'day' ? 'active' : ''}`} onClick={() => { setTimeWindow('day'); setPage(1) }}>Today</button>
            <button className={`toggle-btn ${timeWindow === 'week' ? 'active' : ''}`} onClick={() => { setTimeWindow('week'); setPage(1) }}>This Week</button>
          </div>
        </div>
      </div>
      <MovieGrid movies={movies} loading={loading} />
      {!loading && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </PageContainer>
  )
}
