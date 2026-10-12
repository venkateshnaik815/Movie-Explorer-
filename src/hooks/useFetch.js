import { useState, useEffect, useCallback, useRef } from 'react'

export function useFetch(fetchFn, deps = [], options = {}) {
  const { immediate = true, initialData = null } = options
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)
  const mountedRef = useRef(true)

  const execute = useCallback(async (...args) => {
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()
    
    setLoading(true)
    setError(null)

    try {
      const result = await fetchFn(...args)
      if (mountedRef.current) {
        setData(result)
        setLoading(false)
      }
      return result
    } catch (err) {
      if (err.name === 'AbortError') return
      if (mountedRef.current) {
        setError(err.message || 'Something went wrong')
        setLoading(false)
      }
    }
  }, deps)

  useEffect(() => {
    mountedRef.current = true
    if (immediate) execute()
    return () => {
      mountedRef.current = false
      if (abortRef.current) abortRef.current.abort()
    }
  }, [execute, immediate])

  return { data, loading, error, execute, setData }
}
