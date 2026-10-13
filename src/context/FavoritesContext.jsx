import { createContext, useContext, useCallback, useMemo, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { tmdbApi } from '../services/tmdbApi'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('movie-explorer-favorites', [])

  // Sync with Flask Backend SQLite database on mount
  useEffect(() => {
    tmdbApi.getFavorites().then((backendFavs) => {
      if (Array.isArray(backendFavs) && backendFavs.length > 0 && favorites.length === 0) {
        setFavorites(backendFavs)
      } else if (Array.isArray(backendFavs) && backendFavs.length === 0 && favorites.length > 0) {
        favorites.forEach((fav) => tmdbApi.syncFavorite(fav, 'add'))
      }
    })
  }, [])

  const addFavorite = useCallback((movie) => {
    const item = { ...movie, addedAt: Date.now() }
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev
      return [item, ...prev]
    })
    tmdbApi.syncFavorite(item, 'add')
  }, [setFavorites])

  const removeFavorite = useCallback((movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId))
    tmdbApi.deleteFavoriteFromBackend(movieId)
  }, [setFavorites])

  const toggleFavorite = useCallback((movie) => {
    const item = { ...movie, addedAt: Date.now() }
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id)
      if (exists) return prev.filter((m) => m.id !== movie.id)
      return [item, ...prev]
    })
    tmdbApi.syncFavorite(item, 'toggle')
  }, [setFavorites])

  const isFavorite = useCallback((movieId) => {
    return favorites.some((m) => m.id === movieId)
  }, [favorites])

  const clearFavorites = useCallback(() => {
    setFavorites([])
    tmdbApi.clearFavoritesFromBackend()
  }, [setFavorites])

  const value = useMemo(() => ({
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    count: favorites.length,
  }), [favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, clearFavorites])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
