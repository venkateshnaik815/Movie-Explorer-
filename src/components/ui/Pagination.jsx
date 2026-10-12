import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxVisible = 5
  const safeTotal = Math.min(totalPages, 500)

  const getPageNumbers = () => {
    const pages = []
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(safeTotal, start + maxVisible - 1)
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1)
    }
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  if (safeTotal <= 1) return null

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <HiChevronLeft size={18} />
      </button>

      {getPageNumbers()[0] > 1 && (
        <>
          <button className="pagination-btn" onClick={() => onPageChange(1)}>1</button>
          {getPageNumbers()[0] > 2 && <span className="pagination-dots">...</span>}
        </>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {getPageNumbers()[getPageNumbers().length - 1] < safeTotal && (
        <>
          {getPageNumbers()[getPageNumbers().length - 1] < safeTotal - 1 && (
            <span className="pagination-dots">...</span>
          )}
          <button className="pagination-btn" onClick={() => onPageChange(safeTotal)}>
            {safeTotal}
          </button>
        </>
      )}

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= safeTotal}
        aria-label="Next page"
      >
        <HiChevronRight size={18} />
      </button>
    </div>
  )
}
