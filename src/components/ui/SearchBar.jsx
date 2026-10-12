import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2'

export function SearchBar({ className = '', autoFocus = false, onSearch }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus()
  }, [autoFocus])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    if (onSearch) onSearch(trimmed)
    else navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const handleClear = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  return (
    <form className={`search-bar ${focused ? 'focused' : ''} ${className}`} onSubmit={handleSubmit}>
      <HiMagnifyingGlass className="search-bar-icon" size={20} />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search movies, shows, people..."
        className="search-bar-input"
        aria-label="Search"
      />
      {query && (
        <button type="button" className="search-bar-clear" onClick={handleClear} aria-label="Clear search">
          <HiXMark size={18} />
        </button>
      )}
      <button type="submit" className="search-bar-submit" aria-label="Submit search">
        Search
      </button>
    </form>
  )
}
