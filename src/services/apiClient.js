const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3'
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || ''
const FLASK_API_BASE = import.meta.env.VITE_FLASK_API_URL || '/api'

class ApiClient {
  constructor(baseURL, includeTmdbKey = false) {
    this.baseURL = baseURL
    this.includeTmdbKey = includeTmdbKey
  }

  buildUrl(endpoint, params = {}) {
    const base = this.baseURL.startsWith('http')
      ? `${this.baseURL}${endpoint}`
      : `${window.location.origin}${this.baseURL}${endpoint}`
    const url = new URL(base)

    if (this.includeTmdbKey && TMDB_API_KEY) {
      url.searchParams.set('api_key', TMDB_API_KEY)
    }
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, value)
      }
    })
    return url.toString()
  }

  async request(endpoint, options = {}) {
    const { params = {}, body, ...fetchOptions } = options
    const urlString = this.buildUrl(endpoint, params)

    try {
      const response = await fetch(urlString, {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...fetchOptions.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      const contentType = response.headers.get('content-type') || ''
      if (!response.ok || !contentType.includes('application/json')) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.status_message || error.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      if (error.name === 'AbortError') throw error
      throw new Error(error.message || 'Network error. Please check your connection.')
    }
  }

  get(endpoint, params) {
    return this.request(endpoint, { method: 'GET', params })
  }

  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body })
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }
}

export const tmdbClient = new ApiClient(TMDB_BASE_URL, true)
export const flaskClient = new ApiClient(FLASK_API_BASE, false)
