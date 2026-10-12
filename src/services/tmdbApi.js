import { tmdbClient } from './apiClient'
import { MOCK_MOVIES, MOCK_TELUGU_MOVIES, MOCK_NEW_RELEASES_2025_2026, MOCK_ENGLISH_MOVIES } from './mockData'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || ''

// Helper to filter/sort mock movies
function getMockPaginated(movies, page = 1, pageSize = 20) {
  const start = (page - 1) * pageSize
  const paginated = movies.slice(start, start + pageSize)
  return {
    page,
    results: paginated,
    total_pages: Math.max(1, Math.ceil(movies.length / pageSize)),
    total_results: movies.length,
  }
}

export const tmdbApi = {
  // English Movies
  getEnglishMovies: async (page = 1) => {
    if (!TMDB_API_KEY) {
      return getMockPaginated(MOCK_ENGLISH_MOVIES, page)
    }
    try {
      const data = await tmdbClient.get('/discover/movie', {
        with_original_language: 'en',
        sort_by: 'popularity.desc',
        page,
        include_adult: false,
      })
      if (!data.results || data.results.length === 0) {
        return getMockPaginated(MOCK_ENGLISH_MOVIES, page)
      }
      return data
    } catch {
      return getMockPaginated(MOCK_ENGLISH_MOVIES, page)
    }
  },

  // New 2025 & 2026 Releases
  getNewReleases: async (page = 1) => {
    return getMockPaginated(MOCK_NEW_RELEASES_2025_2026, page)
  },

  // Telugu Movies
  getTeluguMovies: async (page = 1) => {
    if (!TMDB_API_KEY) {
      return getMockPaginated(MOCK_TELUGU_MOVIES, page)
    }
    try {
      const data = await tmdbClient.get('/discover/movie', {
        with_original_language: 'te',
        sort_by: 'popularity.desc',
        page,
        include_adult: false,
      })
      if (!data.results || data.results.length === 0) {
        return getMockPaginated(MOCK_TELUGU_MOVIES, page)
      }
      return data
    } catch {
      return getMockPaginated(MOCK_TELUGU_MOVIES, page)
    }
  },

  // Movies
  getTrending: async (timeWindow = 'week', page = 1) => {
    if (!TMDB_API_KEY) return getMockPaginated(MOCK_MOVIES, page)
    try {
      return await tmdbClient.get(`/trending/movie/${timeWindow}`, { page })
    } catch {
      return getMockPaginated(MOCK_MOVIES, page)
    }
  },

  getPopular: async (page = 1) => {
    if (!TMDB_API_KEY) return getMockPaginated(MOCK_MOVIES, page)
    try {
      return await tmdbClient.get('/movie/popular', { page })
    } catch {
      return getMockPaginated(MOCK_MOVIES, page)
    }
  },

  getTopRated: async (page = 1) => {
    if (!TMDB_API_KEY) {
      const sorted = [...MOCK_MOVIES].sort((a, b) => b.vote_average - a.vote_average)
      return getMockPaginated(sorted, page)
    }
    try {
      return await tmdbClient.get('/movie/top_rated', { page })
    } catch {
      const sorted = [...MOCK_MOVIES].sort((a, b) => b.vote_average - a.vote_average)
      return getMockPaginated(sorted, page)
    }
  },

  getUpcoming: async (page = 1) => {
    if (!TMDB_API_KEY) {
      const sorted = [...MOCK_MOVIES].sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
      return getMockPaginated(sorted, page)
    }
    try {
      return await tmdbClient.get('/movie/upcoming', { page })
    } catch {
      return getMockPaginated(MOCK_MOVIES, page)
    }
  },

  getNowPlaying: async (page = 1) => {
    if (!TMDB_API_KEY) return getMockPaginated(MOCK_MOVIES, page)
    try {
      return await tmdbClient.get('/movie/now_playing', { page })
    } catch {
      return getMockPaginated(MOCK_MOVIES, page)
    }
  },

  getMovieDetails: async (movieId) => {
    const id = Number(movieId)
    const mockMatch = MOCK_MOVIES.find((m) => m.id === id)

    if (!TMDB_API_KEY) {
      const movie = mockMatch || MOCK_MOVIES[0]
      return {
        ...movie,
        similar: { results: MOCK_MOVIES.filter((m) => m.id !== movie.id) }
      }
    }
    try {
      return await tmdbClient.get(`/movie/${movieId}`, { append_to_response: 'credits,videos,similar,recommendations' })
    } catch {
      const movie = mockMatch || MOCK_MOVIES[0]
      return {
        ...movie,
        similar: { results: MOCK_MOVIES.filter((m) => m.id !== movie.id) }
      }
    }
  },

  getMovieCredits: async (movieId) => {
    const mockMatch = MOCK_MOVIES.find((m) => m.id === Number(movieId))
    if (!TMDB_API_KEY) {
      const movie = mockMatch || MOCK_MOVIES[0]
      return movie.credits || { cast: [], crew: [] }
    }
    try {
      return await tmdbClient.get(`/movie/${movieId}/credits`)
    } catch {
      const movie = mockMatch || MOCK_MOVIES[0]
      return movie.credits || { cast: [], crew: [] }
    }
  },

  getMovieVideos: async (movieId) => {
    const mockMatch = MOCK_MOVIES.find((m) => m.id === Number(movieId))
    if (!TMDB_API_KEY) {
      const movie = mockMatch || MOCK_MOVIES[0]
      return movie.videos || { results: [] }
    }
    try {
      return await tmdbClient.get(`/movie/${movieId}/videos`)
    } catch {
      const movie = mockMatch || MOCK_MOVIES[0]
      return movie.videos || { results: [] }
    }
  },

  getSimilarMovies: async (movieId, page = 1) => {
    if (!TMDB_API_KEY) {
      const filtered = MOCK_MOVIES.filter((m) => m.id !== Number(movieId))
      return getMockPaginated(filtered, page)
    }
    try {
      return await tmdbClient.get(`/movie/${movieId}/similar`, { page })
    } catch {
      const filtered = MOCK_MOVIES.filter((m) => m.id !== Number(movieId))
      return getMockPaginated(filtered, page)
    }
  },

  // Search
  searchMovies: async (query, page = 1) => {
    if (!TMDB_API_KEY) {
      const q = (query || '').toLowerCase().trim()
      const filtered = MOCK_MOVIES.filter((m) =>
        m.title.toLowerCase().includes(q) || m.overview.toLowerCase().includes(q)
      )
      return getMockPaginated(filtered, page)
    }
    try {
      return await tmdbClient.get('/search/movie', { query, page, include_adult: false })
    } catch {
      const q = (query || '').toLowerCase().trim()
      const filtered = MOCK_MOVIES.filter((m) =>
        m.title.toLowerCase().includes(q) || m.overview.toLowerCase().includes(q)
      )
      return getMockPaginated(filtered, page)
    }
  },

  // Genres
  getGenres: async () => {
    if (!TMDB_API_KEY) {
      return {
        genres: [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
          { id: 16, name: 'Animation' },
          { id: 35, name: 'Comedy' },
          { id: 80, name: 'Crime' },
          { id: 18, name: 'Drama' },
          { id: 878, name: 'Science Fiction' },
          { id: 53, name: 'Thriller' },
        ]
      }
    }
    try {
      return await tmdbClient.get('/genre/movie/list')
    } catch {
      return {
        genres: [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
          { id: 16, name: 'Animation' },
          { id: 35, name: 'Comedy' },
          { id: 80, name: 'Crime' },
          { id: 18, name: 'Drama' },
          { id: 878, name: 'Science Fiction' },
          { id: 53, name: 'Thriller' },
        ]
      }
    }
  },

  getMoviesByGenre: async (genreId, page = 1, sortBy = 'popularity.desc') => {
    if (!TMDB_API_KEY) {
      const gid = Number(genreId)
      let filtered = MOCK_MOVIES.filter((m) => m.genre_ids?.includes(gid))
      if (filtered.length === 0) filtered = MOCK_MOVIES
      return getMockPaginated(filtered, page)
    }
    try {
      return await tmdbClient.get('/discover/movie', {
        with_genres: genreId,
        page,
        sort_by: sortBy,
        include_adult: false,
      })
    } catch {
      const gid = Number(genreId)
      let filtered = MOCK_MOVIES.filter((m) => m.genre_ids?.includes(gid))
      if (filtered.length === 0) filtered = MOCK_MOVIES
      return getMockPaginated(filtered, page)
    }
  },

  // Discover
  discoverMovies: async (params = {}) => {
    if (!TMDB_API_KEY) {
      return getMockPaginated(MOCK_MOVIES, params.page || 1)
    }
    try {
      return await tmdbClient.get('/discover/movie', { include_adult: false, ...params })
    } catch {
      return getMockPaginated(MOCK_MOVIES, params.page || 1)
    }
  },
}
