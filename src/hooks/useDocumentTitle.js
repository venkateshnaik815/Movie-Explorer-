import { useEffect } from 'react'

export function useDocumentTitle(title) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title ? `${title} | Movie Explorer` : 'Movie Explorer'
    return () => {
      document.title = prevTitle
    }
  }, [title])
}
