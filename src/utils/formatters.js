export function formatDate(dateString) {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatYear(dateString) {
  if (!dateString) return ''
  return new Date(dateString).getFullYear().toString()
}

export function formatRuntime(minutes) {
  if (!minutes) return 'N/A'
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hrs === 0) return `${mins}m`
  return `${hrs}h ${mins}m`
}

export function formatMoney(amount) {
  if (!amount) return 'N/A'
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`
  return `$${amount.toLocaleString()}`
}

export function formatRating(rating) {
  if (!rating) return '0.0'
  return Number(rating).toFixed(1)
}

export function formatVoteCount(count) {
  if (!count) return '0'
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}

export function truncateText(text, maxLength = 150) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}
