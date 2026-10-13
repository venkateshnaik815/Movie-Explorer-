import { useState, useEffect } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PageContainer } from '../components/layout/PageContainer'
import { TrailerModal } from '../components/movie/TrailerModal'
import { MOCK_SPORTS, MOCK_CRICKET_VIDEOS } from '../services/mockData'
import { tmdbApi } from '../services/tmdbApi'
import {
  HiTrophy,
  HiFire,
  HiClock,
  HiMapPin,
  HiPlay,
  HiVideoCamera,
  HiSparkles,
} from 'react-icons/hi2'

export default function Sports() {
  useDocumentTitle('Live Sports & Cricket Highlights')
  const [matches, setMatches] = useState(MOCK_SPORTS)
  const [cricketVideos, setCricketVideos] = useState(MOCK_CRICKET_VIDEOS)
  const [selectedCategory, setSelectedCategory] = useState('All Cricket')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    tmdbApi.getSportsMatches().then((data) => {
      if (Array.isArray(data) && data.length > 0) setMatches(data)
    })
    tmdbApi.getCricketVideos().then((data) => {
      if (Array.isArray(data) && data.length > 0) setCricketVideos(data)
    })
  }, [])

  const categories = ['All Cricket', 'IPL 2026', 'International']
  const statusList = ['All', 'LIVE', 'UPCOMING', 'FINISHED']

  const filteredMatches = matches.filter((match) => {
    const matchCat =
      selectedCategory === 'All Cricket' ||
      (selectedCategory === 'IPL 2026' && match.tournament.includes('IPL')) ||
      (selectedCategory === 'International' && !match.tournament.includes('IPL'))
    const matchStatus =
      selectedStatus === 'All' ||
      match.status.toUpperCase() === selectedStatus.toUpperCase()
    return matchCat && matchStatus
  })

  const openVideo = (videoId, title) => {
    setActiveVideo({ videoId, title })
  }

  const closeVideo = () => {
    setActiveVideo(null)
  }

  return (
    <PageContainer>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1>
              <HiTrophy style={{ verticalAlign: 'middle', color: 'var(--color-accent)' }} /> Live Sports & Cricket
            </h1>
            <p>Real-time scores, cricket matches, highlights, and viral video moments</p>
          </div>
          <div className="sports-live-indicator">
            <span className="live-pulse" />
            <span>Live Coverage</span>
          </div>
        </div>
      </div>

      {/* Cricket Video Highlights Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2>
            <HiVideoCamera style={{ color: 'var(--color-accent)', verticalAlign: 'middle' }} /> Cricket Match Highlights & Videos
          </h2>
          <span className="sports-highlight-tag">
            <HiSparkles /> HD Highlights
          </span>
        </div>

        <div className="cricket-videos-grid">
          {cricketVideos.map((video) => (
            <div
              key={video.id}
              className="cricket-video-card"
              onClick={() => openVideo(video.videoId, video.title)}
            >
              <div className="video-thumb-container">
                <img
                  src={video.thumbnail || `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={video.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
                  }}
                />
                <div className="video-play-overlay">
                  <div className="video-play-btn">
                    <HiPlay size={26} />
                  </div>
                </div>
                <span className="video-duration">{video.duration}</span>
                <span className="video-views">{video.views}</span>
              </div>
              <div className="video-card-content">
                <span className="video-tournament">{video.tournament}</span>
                <h3 className="video-title">{video.title}</h3>
                <p className="video-desc">{video.description}</p>
                <button className="btn-watch-highlight">
                  <HiPlay size={16} /> Watch Highlights
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sports Filters Bar */}
      <div className="section-header" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
        <h2>
          <HiTrophy style={{ color: '#fbbf24', verticalAlign: 'middle' }} /> Match Scoreboards & Fixtures
        </h2>
      </div>

      <div className="sports-filters-bar">
        <div className="sports-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`sports-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'IPL 2026' && '🏆 '}
              {cat === 'International' && '🌍 '}
              {cat === 'All Cricket' && '🏏 '}
              {cat}
            </button>
          ))}
        </div>

        <div className="toggle-group">
          {statusList.map((status) => (
            <button
              key={status}
              className={`toggle-btn ${selectedStatus === status ? 'active' : ''}`}
              onClick={() => setSelectedStatus(status)}
            >
              {status === 'LIVE' && <span className="live-dot" />}
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Match Cards Grid */}
      <div className="sports-grid">
        {filteredMatches.length === 0 ? (
          <div className="empty-state">
            <HiClock size={40} style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <h3>No matches found</h3>
            <p>Try switching filters or check back later for live broadcasts.</p>
          </div>
        ) : (
          filteredMatches.map((match) => (
            <div key={match.id} className="match-card">
              <div className="match-card-header">
                <span className="match-tournament">{match.tournament}</span>
                <span className={`match-badge badge-${match.status.toLowerCase()}`}>
                  {match.status === 'LIVE' && <span className="live-dot" />}
                  {match.status}
                </span>
              </div>

              <div className="match-detail-status">
                <HiClock size={14} /> {match.statusDetail}
              </div>

              {/* Teams & Scores */}
              <div className="match-teams">
                <div className="match-team">
                  <div className="team-info">
                    <span className="team-flag">{match.team1.flag}</span>
                    <span className="team-name">{match.team1.name}</span>
                  </div>
                  <span className="team-score">{match.team1.score}</span>
                </div>

                <div className="match-team">
                  <div className="team-info">
                    <span className="team-flag">{match.team2.flag}</span>
                    <span className="team-name">{match.team2.name}</span>
                  </div>
                  <span className="team-score">{match.team2.score}</span>
                </div>
              </div>

              {/* Match Summary / Commentary */}
              <div className="match-footer">
                <p className="match-summary">{match.summary}</p>
                <div className="match-meta">
                  <span className="match-venue">
                    <HiMapPin size={14} /> {match.venue}
                  </span>
                  {match.topPerformer && (
                    <span className="match-performer">
                      <HiFire size={14} style={{ color: 'var(--color-accent)' }} /> {match.topPerformer}
                    </span>
                  )}
                </div>

                {/* Watch Video Button for Cricket */}
                {match.videoId && (
                  <button
                    className="match-video-btn"
                    onClick={() => openVideo(match.videoId, match.videoTitle || match.tournament)}
                  >
                    <HiPlay size={16} /> Watch Match Video / Highlights
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Video Modal Player */}
      <TrailerModal
        isOpen={Boolean(activeVideo)}
        onClose={closeVideo}
        videoKey={activeVideo?.videoId}
        title={activeVideo?.title}
      />
    </PageContainer>
  )
}
