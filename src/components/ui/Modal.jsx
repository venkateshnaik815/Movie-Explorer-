import { useEffect, useRef } from 'react'
import { HiXMark } from 'react-icons/hi2'

export function Modal({ isOpen, onClose, children, title, size = 'medium' }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
      document.addEventListener('keydown', handleEsc)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleEsc)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className={`modal-content modal-${size}`}>
        <div className="modal-header">
          {title && <h3 className="modal-title">{title}</h3>}
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <HiXMark size={24} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}
