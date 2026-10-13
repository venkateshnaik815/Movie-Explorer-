import { tmdbClient, flaskClient } from './apiClient'
import {
  MOCK_MOVIES,
  MOCK_TELUGU_MOVIES,
  MOCK_NEW_RELEASES_2025_2026,
  MOCK_ENGLISH_MOVIES,
  MOCK_SPORTS,
  MOCK_CRICKET_VIDEOS,
} from './mockData'

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
  // Flask Backend Health Check
  checkHealth: async () => {
    return await flaskClient.get('/health')
  },

  // English Movies (Linked to Flask /api/movies/english)
  getEnglishMovies: async (page = 1) => {
    try {
      const data = await flaskClient.get('/movies/english', { page })
      if (data?.results?.length > 0) return data
    } catch {
      // Fallback to TMDB or local catalog
    }
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

  // New 2025 & 2026 Releases (Linked to Flask /api/movies/new-releases)
  getNewReleases: async (page = 1) => {
    try {
      const data = await flaskClient.get('/movies/new-releases', { page })
      if (data?.results?.length > 0) return data
    } catch {
      // Fallback to local catalog
    }
    return getMockPaginated(MOCK_NEW_RELEASES_2025_2026, page)
  },

  // Telugu Movies (Linked to Flask /api/movies/telugu)
  getTeluguMovies: async (page = 1) => {
    try {
      const data = await flaskClient.get('/movies/telugu', { page })
      if (data?.results?.length > 0) return data
    } catch {
      // Fallback to TMDB or local catalog
    }
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

  // Trending Movies (Linked to Flask /api/movies/trending)
  getTrending: async (timeWindow = 'week', page = 1) => {
    try {
      const data = await flaskClient.get('/movies/trending', { time_window: timeWindow, page })
      if (data?.results?.length > 0) return data
    } catch {
      // Fallback
    }
    if (!TMDB_API_KEY) return getMockPaginated(MOCK_MOVIES, page)
    try {
      return await tmdbClient.get(`/trending/movie/${timeWindow}`, { page })
    } catch {
      return getMockPaginated(MOCK_MOVIES, page)
    }
  },

  // Popular Movies (Linked to Flask /api/movies/popular)
  getPopular: async (page = 1) => {
    try {
      const data = await flaskClient.get('/movies/popular', { page })
      if (data?.results?.length > 0) return data
    } catch {
      // Fallback
    }
    if (!TMDB_API_KEY) return getMockPaginated(MOCK_MOVIES, page)
    try {
      return await tmdbClient.get('/movie/popular', { page })
    } catch {
      return getMockPaginated(MOCK_MOVIES, page)
    }
  },

  // Top Rated Movies (Linked to Flask /api/movies/top-rated)
  getTopRated: async (page = 1) => {
    try {
      const data = await flaskClient.get('/movies/top-rated', { page })
      if (data?.results?.length > 0) return data
    } catch {
      // Fallback
    }
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

  // Upcoming Movies (Linked to Flask /api/movies/upcoming)
  getUpcoming: async (page = 1) => {
    try {
      const data = await flaskClient.get('/movies/upcoming', { page })
      if (data?.results?.length > 0) return data
    } catch {
      // Fallback
    }
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

  // Now Playing Movies (Linked to Flask /api/movies/now-playing)
  getNowPlaying: async (page = 1) => {
    try {
      const data = await flaskClient.get('/movies/now-playing', { page })
      if (data?.results?.length > 0) return data
    } catch {
      // Fallback
    }
    if (!TMDB_API_KEY) return getMockPaginated(MOCK_MOVIES, page)
    try {
      return await tmdbClient.get('/movie/now_playing', { page })
    } catch {
      return getMockPaginated(MOCK_MOVIES, page)
    }
  },

  // Movie Details (Linked to Flask /api/movies/:id)
  getMovieDetails: async (movieId) => {
    try {
      const data = await flaskClient.get(`/movies/${movieId}`)
      if (data && data.id) return data
    } catch {
      // Fallback
    }
    const id = Number(movieId)
    const mockMatch = MOCK_MOVIES.find((m) => m.id === id)

    if (!TMDB_API_KEY) {
      const movie = mockMatch || MOCK_MOVIES[0]
      return {
        ...movie,
        similar: { results: MOCK_MOVIES.filter((m) => m.id !== movie.id) },
      }
    }
    try {
      return await tmdbClient.get(`/movie/${movieId}`, {
        append_to_response: 'credits,videos,similar,recommendations',
      })
    } catch {
      const movie = mockMatch || MOCK_MOVIES[0]
      return {
        ...movie,
        similar: { results: MOCK_MOVIES.filter((m) => m.id !== movie.id) },
      }
    }
  },

  // Movie Credits (Linked to Flask /api/movies/:id/credits)
  getMovieCredits: async (movieId) => {
    try {
      const data = await flaskClient.get(`/movies/${movieId}/credits`)
      if (data && data.cast) return data
    } catch {
      // Fallback
    }
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

  // Movie Videos (Linked to Flask /api/movies/:id/videos)
  getMovieVideos: async (movieId) => {
    try {
      const data = await flaskClient.get(`/movies/${movieId}/videos`)
      if (data && data.results) return data
    } catch {
      // Fallback
    }
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

  // Similar Movies (Linked to Flask /api/movies/:id/similar)
  getSimilarMovies: async (movieId, page = 1) => {
    try {
      const data = await flaskClient.get(`/movies/${movieId}/similar`, { page })
      if (data?.results) return data
    } catch {
      // Fallback
    }
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

  // Search Movies (Linked to Flask /api/movies/search)
  searchMovies: async (query, page = 1) => {
    try {
      const data = await flaskClient.get('/movies/search', { query, page })
      if (data && Array.isArray(data.results)) return data
    } catch {
      // Fallback
    }
    if (!TMDB_API_KEY) {
      const q = (query || '').toLowerCase().trim()
      const filtered = MOCK_MOVIES.filter(
        (m) => m.title.toLowerCase().includes(q) || m.overview.toLowerCase().includes(q)
      )
      return getMockPaginated(filtered, page)
    }
    try {
      return await tmdbClient.get('/search/movie', { query, page, include_adult: false })
    } catch {
      const q = (query || '').toLowerCase().trim()
      const filtered = MOCK_MOVIES.filter(
        (m) => m.title.toLowerCase().includes(q) || m.overview.toLowerCase().includes(q)
      )
      return getMockPaginated(filtered, page)
    }
  },

  // Genres (Linked to Flask /api/genres)
  getGenres: async () => {
    try {
      const data = await flaskClient.get('/genres')
      if (data?.genres) return data
    } catch {
      // Fallback
    }
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
        ],
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
        ],
      }
    }
  },

  // Movies by Genre (Linked to Flask /api/movies/discover)
  getMoviesByGenre: async (genreId, page = 1, sortBy = 'popularity.desc') => {
    try {
      const data = await flaskClient.get('/movies/discover', {
        with_genres: genreId,
        page,
        sort_by: sortBy,
      })
      if (data?.results?.length > 0) return data
    } catch {
      // Fallback
    }
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

  // Discover Movies (Linked to Flask /api/movies/discover)
  discoverMovies: async (params = {}) => {
    try {
      const data = await flaskClient.get('/movies/discover', params)
      if (data?.results?.length > 0) return data
    } catch {
      // Fallback
    }
    if (!TMDB_API_KEY) {
      return getMockPaginated(MOCK_MOVIES, params.page || 1)
    }
    try {
      return await tmdbClient.get('/discover/movie', { include_adult: false, ...params })
    } catch {
      return getMockPaginated(MOCK_MOVIES, params.page || 1)
    }
  },

  // Sports Matches & Cricket Videos (Linked to Flask /api/sports/*)
  getSportsMatches: async () => {
    try {
      const data = await flaskClient.get('/sports/matches')
      if (data?.results) return data.results
    } catch {
      // Fallback
    }
    return MOCK_SPORTS
  },

  getCricketVideos: async () => {
    try {
      const data = await flaskClient.get('/sports/videos')
      if (data?.results) return data.results
    } catch {
      // Fallback
    }
    return MOCK_CRICKET_VIDEOS
  },

  // Favorites API (Linked to Flask /api/favorites)
  getFavorites: async () => {
    try {
      const data = await flaskClient.get('/favorites')
      if (data?.results) return data.results
    } catch {
      // Fallback handled by localStorage
    }
    return null
  },

  syncFavorite: async (movie, action = 'toggle') => {
    try {
      return await flaskClient.post('/favorites', { ...movie, action })
    } catch {
      return null
    }
  },

  deleteFavoriteFromBackend: async (movieId) => {
    try {
      return await flaskClient.delete(`/favorites/${movieId}`)
    } catch {
      return null
    }
  },

  clearFavoritesFromBackend: async () => {
    try {
      return await flaskClient.delete('/favorites')
    } catch {
      return null
    }
  },

  // Media Uploads API (Linked to Flask /api/uploads)
  getUploads: async () => {
    try {
      const data = await flaskClient.get('/uploads')
      if (data?.results) return data.results
    } catch {
      // Fallback handled by localStorage
    }
    return null
  },

  createUpload: async (uploadData) => {
    try {
      return await flaskClient.post('/uploads', uploadData)
    } catch {
      return null
    }
  },

  deleteUpload: async (uploadId) => {
    try {
      return await flaskClient.delete(`/uploads/${uploadId}`)
    } catch {
      return null
    }
  },
}
