const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3'
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || ''

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async request(endpoint, options = {}) {
    const { params = {}, ...fetchOptions } = options
    const url = new URL(`${this.baseURL}${endpoint}`)
    
    if (TMDB_API_KEY) {
      url.searchParams.set('api_key', TMDB_API_KEY)
    }
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, value)
      }
    })

    try {
      const response = await fetch(url.toString(), {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.status_message || `HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      if (error.name === 'AbortError') throw error
      throw new Error(error.message || 'Network error. Please check your connection.')
    }
  }

  get(endpoint, params) {
    return this.request(endpoint, { params })
  }
}

export const tmdbClient = new ApiClient(TMDB_BASE_URL)
