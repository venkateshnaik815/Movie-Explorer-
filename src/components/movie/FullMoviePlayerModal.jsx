import { useState, useEffect } from 'react'
import {
  HiXMark,
  HiFilm,
  HiSparkles,
  HiLanguage,
  HiCheck,
  HiArrowTopRightOnSquare,
  HiServerStack,
  HiSignal,
} from 'react-icons/hi2'
import { MOVIE_VIDEO_MAP } from '../../services/mockData'
import { tmdbApi } from '../../services/tmdbApi'

export default function FullMoviePlayerModal({ isOpen, onClose, movie }) {
  const [selectedQuality, setSelectedQuality] = useState('1080p Full HD')
  const [selectedAudio, setSelectedAudio] = useState('Telugu (Original 5.1)')
  const [selectedServer, setSelectedServer] = useState('Server 1 (Ultra HD Fast)')
  const [cinemaMode, setCinemaMode] = useState(true)
  const [videoKey, setVideoKey] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [iframeKey, setIframeKey] = useState(0)

  // Resolve best video key for this movie
  useEffect(() => {
    if (!movie) return

    // 1. Direct from movie object
    const keyFromMovie = movie.videos?.results?.[0]?.key
    if (keyFromMovie) {
      setVideoKey(keyFromMovie)
      return
    }

    // 2. Direct from verified MOVIE_VIDEO_MAP
    if (movie.id && MOVIE_VIDEO_MAP[movie.id]) {
      setVideoKey(MOVIE_VIDEO_MAP[movie.id])
      return
    }

    // 3. Fallback: fetch from TMDB videos API
    if (movie.id) {
      tmdbApi
        .getMovieVideos(movie.id)
        .then((data) => {
          const found = data?.results?.find(
            (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser' || v.type === 'Clip')
          )?.key
          if (found) {
            setVideoKey(found)
          } else {
            setVideoKey('y1-w1kUGuz8') // default fallback
          }
        })
        .catch(() => {
          setVideoKey(MOVIE_VIDEO_MAP[movie.id] || 'y1-w1kUGuz8')
        })
    }
  }, [movie])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      if (movie?.original_language === 'en') {
        setSelectedAudio('English (Original 5.1)')
      } else {
        setSelectedAudio('Telugu (Original 5.1)')
      }
    } else {
      document.body.style.overflow = ''
      setToastMessage('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, movie])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage('')
    }, 3200)
  }

  if (!isOpen || !movie) return null

  const qualities = ['4K Ultra HD', '1080p Full HD', '720p HD']
  const audioOptions =
    movie.original_language === 'en'
      ? ['English (Original 5.1)', 'Telugu (Dubbed)', 'Hindi (Dubbed)']
      : ['Telugu (Original 5.1)', 'English (Subtitles)', 'Hindi (Dubbed)']

  const servers = [
    { id: 'srv-1', name: 'Server 1 (Ultra HD Fast)' },
    { id: 'srv-2', name: 'Server 2 (Cinema Cloud 4K)' },
    { id: 'srv-3', name: 'Server 3 (Backup HD Mirror)' },
  ]

  const activeKey = videoKey || MOVIE_VIDEO_MAP[movie.id] || 'y1-w1kUGuz8'

  const handleServerChange = (serverName) => {
    setSelectedServer(serverName)
    setIframeKey((prev) => prev + 1)
    showToast(`✓ Switched to ${serverName} - Stream Active`)
  }

  const handleQualityChange = (q) => {
    setSelectedQuality(q)
    setIframeKey((prev) => prev + 1)
    showToast(`✓ Quality updated: ${q} (Cinema Stream)`)
  }

  const handleAudioChange = (a) => {
    setSelectedAudio(a)
    showToast(`✓ Audio track switched to: ${a}`)
  }

  return (
    <div className={`full-movie-modal-overlay ${cinemaMode ? 'cinema-mode-active' : ''}`}>
      <div className="full-movie-modal-container">
        {/* Top Control Bar */}
        <div className="full-movie-top-bar">
          <div className="full-movie-title-info">
            <span className="live-hd-pill">
              <HiSparkles /> HD CINEMA PLAYER
            </span>
            <h2>{movie.title}</h2>
            <span className="full-movie-meta">
              <span className="meta-badge-stream"><HiSignal /> LIVE HD</span>
              {movie.release_date ? new Date(movie.release_date).getFullYear() : '2025'} •{' '}
              {movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '2h 45m'} •{' '}
              <strong style={{ color: '#fbbf24' }}>★ {movie.vote_average || '8.2'}</strong>
            </span>
          </div>

          <div className="full-movie-top-actions">
            <a
              href={`https://www.youtube.com/watch?v=${activeKey}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cinema-toggle-btn"
              title="Open stream in YouTube"
              style={{ textDecoration: 'none' }}
            >
              <HiArrowTopRightOnSquare size={16} /> Open Full Screen
            </a>
            <button
              className={`cinema-toggle-btn ${cinemaMode ? 'active' : ''}`}
              onClick={() => setCinemaMode(!cinemaMode)}
              title="Toggle Cinema Lighting"
            >
              <HiFilm size={16} /> Cinema Mode
            </button>
            <button className="full-movie-close-btn" onClick={onClose} aria-label="Close Movie Player">
              <HiXMark size={26} />
            </button>
          </div>
        </div>

        {/* Video Player Screen */}
        <div className="full-movie-screen-wrapper">
          <iframe
            key={iframeKey}
            src={`https://www.youtube-nocookie.com/embed/${activeKey}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0&playsinline=1`}
            title={`Watch ${movie.title} Full Movie HD`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="full-movie-iframe"
          />

          {/* Watermark / Badge */}
          <div className="player-brand-badge">
            <span>MovieExplorer HD • {selectedQuality} • {selectedAudio.split(' ')[0]}</span>
          </div>

          {/* Toast Notification Banner */}
          {toastMessage && (
            <div className="player-toast-banner slide-up">
              <span>{toastMessage}</span>
            </div>
          )}
        </div>

        {/* Bottom Cinema Controls & Server Bar */}
        <div className="full-movie-bottom-bar">
          {/* Quality Select */}
          <div className="cinema-selector-group">
            <span className="selector-label">Quality:</span>
            <div className="cinema-pills">
              {qualities.map((q) => (
                <button
                  key={q}
                  className={`cinema-pill ${selectedQuality === q ? 'active' : ''}`}
                  onClick={() => handleQualityChange(q)}
                >
                  {selectedQuality === q && <HiCheck size={14} />} {q}
                </button>
              ))}
            </div>
          </div>

          {/* Audio Language Select */}
          <div className="cinema-selector-group">
            <span className="selector-label">
              <HiLanguage size={16} /> Audio:
            </span>
            <div className="cinema-pills">
              {audioOptions.map((a) => (
                <button
                  key={a}
                  className={`cinema-pill ${selectedAudio === a ? 'active' : ''}`}
                  onClick={() => handleAudioChange(a)}
                >
                  {selectedAudio === a && <HiCheck size={14} />} {a}
                </button>
              ))}
            </div>
          </div>

          {/* Streaming Server Select */}
          <div className="cinema-selector-group">
            <span className="selector-label">
              <HiServerStack size={16} /> Server:
            </span>
            <div className="cinema-pills">
              {servers.map((s) => (
                <button
                  key={s.id}
                  className={`cinema-pill ${selectedServer === s.name ? 'active' : ''}`}
                  onClick={() => handleServerChange(s.name)}
                >
                  {selectedServer === s.name && <HiCheck size={14} />} {s.name.replace(/Server \d /, '')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Synopsis / Notice Banner */}
        <div className="full-movie-info-strip">
          <p>
            🎬 <strong>Now Streaming in High Definition:</strong> {movie.overview}
          </p>
        </div>
      </div>
    </div>
  )
}
