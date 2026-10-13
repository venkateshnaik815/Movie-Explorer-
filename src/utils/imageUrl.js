const IMAGE_BASE = 'https://image.tmdb.org/t/p'

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
}

export function getImageUrl(path, size = 'w500') {
  if (!path) return null
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/') && !path.startsWith('//') && (path.endsWith('.jpg') || path.endsWith('.png') || path.endsWith('.svg') || path.endsWith('.webp')) && !path.includes('w500') && !path.includes('w1280')) {
    // If it's a TMDB hash like /o8XSR1SONnjcsv84NRu6Mwsl5io.jpg
    if (path.length > 25 && !path.includes('backdrop') && !path.includes('prabhas')) {
      return `${IMAGE_BASE}/${size}${path}`
    }
    return path
  }
  return `${IMAGE_BASE}/${size}${path}`
}

export function getPosterUrl(path, variant = 'medium') {
  return getImageUrl(path, IMAGE_SIZES.poster[variant])
}

export function getBackdropUrl(path, variant = 'large') {
  return getImageUrl(path, IMAGE_SIZES.backdrop[variant])
}

export function getProfileUrl(path, variant = 'medium') {
  return getImageUrl(path, IMAGE_SIZES.profile[variant])
}

export const PLACEHOLDER_POSTER = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="342" height="513" viewBox="0 0 342 513"><rect fill="#161b22" width="342" height="513"/><text fill="#30363d" font-family="sans-serif" font-size="18" text-anchor="middle" x="171" y="260">No Image</text></svg>`)

export const PLACEHOLDER_BACKDROP = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><rect fill="#161b22" width="1280" height="720"/><text fill="#30363d" font-family="sans-serif" font-size="24" text-anchor="middle" x="640" y="364">No Backdrop</text></svg>`)
