import { Modal } from '../ui/Modal'

export function TrailerModal({ isOpen, onClose, videoKey, title }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || 'Trailer'} size="large">
      <div className="trailer-player">
        {videoKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
            title={title || 'Movie Trailer'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="trailer-iframe"
          />
        ) : (
          <div className="trailer-no-video">
            <p>No trailer available</p>
          </div>
        )}
      </div>
    </Modal>
  )
}
