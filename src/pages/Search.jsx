import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PageContainer } from '../components/layout/PageContainer'
import { MovieGrid } from '../components/movie/MovieGrid'
import { Pagination } from '../components/ui/Pagination'
import { SearchBar } from '../components/ui/SearchBar'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { useDebounce } from '../hooks/useDebounce'
import { tmdbApi } from '../services/tmdbApi'
import { HiMagnifyingGlass } from 'react-icons/hi2'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)
  const debouncedQuery = useDebounce(query, 400)

  useDocumentTitle(query ? `Search: ${query}` : 'Search')

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setMovies([])
      setSearched(false)
      return
    }
    const fetchResults = async () => {
      setLoading(true)
      setError(null)
      setSearched(true)
      try {
        const data = await tmdbApi.searchMovies(debouncedQuery.trim(), page)
        setMovies(data.results || [])
        setTotalPages(data.total_pages || 1)
        setTotalResults(data.total_results || 0)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [debouncedQuery, page])

  const handleSearch = (q) => {
    setQuery(q)
    setPage(1)
    setSearchParams({ q })
  }

  return (
    <PageContainer>
      <div className="search-page">
        <div className="page-header" style={{ textAlign: 'center' }}>
          <h1><HiMagnifyingGlass style={{ verticalAlign: 'middle' }} /> Search Movies</h1>
          <p>Find your next favorite movie</p>
        </div>

        <SearchBar
          className="search-page-bar"
          autoFocus
          onSearch={handleSearch}
        />

        {searched && !loading && !error && (
          <p className="search-results-count">
            {totalResults > 0 ? `Found ${totalResults.toLocaleString()} results for "${debouncedQuery}"` : `No results for "${debouncedQuery}"`}
          </p>
        )}

        {error && <ErrorMessage message={error} onRetry={() => setPage(1)} />}

        <MovieGrid movies={movies} loading={loading} emptyMessage={searched ? 'No movies found. Try different keywords.' : 'Start typing to search for movies.'} />

        {!loading && movies.length > 0 && (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </PageContainer>
  )
}
