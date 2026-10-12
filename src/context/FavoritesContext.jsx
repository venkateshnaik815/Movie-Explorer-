import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('movie-explorer-favorites', [])

  const addFavorite = useCallback((movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev
      return [{ ...movie, addedAt: Date.now() }, ...prev]
    })
  }, [setFavorites])

  const removeFavorite = useCallback((movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId))
  }, [setFavorites])

  const toggleFavorite = useCallback((movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id)
      if (exists) return prev.filter((m) => m.id !== movie.id)
      return [{ ...movie, addedAt: Date.now() }, ...prev]
    })
  }, [setFavorites])

  const isFavorite = useCallback((movieId) => {
    return favorites.some((m) => m.id === movieId)
  }, [favorites])

  const clearFavorites = useCallback(() => {
    setFavorites([])
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
