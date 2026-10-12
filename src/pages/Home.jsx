import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PageContainer } from '../components/layout/PageContainer'
import { MovieGrid } from '../components/movie/MovieGrid'
import { tmdbApi } from '../services/tmdbApi'
import {
  HiFilm,
  HiFire,
  HiHeart,
  HiTrophy,
  HiMagnifyingGlass,
  HiArrowUpTray,
  HiChevronRight,
  HiSparkles,
  HiStar,
  HiArrowTrendingUp,
  HiGlobeAlt,
} from 'react-icons/hi2'
import logo from '../assets/images/logo.png'
import heroBg from '../assets/images/hero-netflix-bg.jpg'

export default function Home() {
  useDocumentTitle(null)
  const [newReleases, setNewReleases] = useState([])
  const [teluguMovies, setTeluguMovies] = useState([])
  const [englishMovies, setEnglishMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [newRel, telugu, english, popular, topRated] = await Promise.allSettled([
          tmdbApi.getNewReleases(1),
          tmdbApi.getTeluguMovies(1),
          tmdbApi.getEnglishMovies(1),
          tmdbApi.getPopular(1),
          tmdbApi.getTopRated(1),
        ])
        if (newRel.status === 'fulfilled') setNewReleases(newRel.value.results || [])
        if (telugu.status === 'fulfilled') setTeluguMovies(telugu.value.results?.slice(0, 6) || [])
        if (english.status === 'fulfilled') setEnglishMovies(english.value.results || [])
        if (popular.status === 'fulfilled') setPopularMovies(popular.value.results?.slice(0, 6) || [])
        if (topRated.status === 'fulfilled') setTopRatedMovies(topRated.value.results?.slice(0, 6) || [])
      } catch (err) {
        console.error('Failed to fetch movies:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  const features = [
    {
      icon: <HiSparkles />,
      title: 'Telugu Cinema',
      description: 'Explore the biggest Tollywood blockbusters from Kalki 2898 AD, Devara, to RRR.',
      link: '/telugu',
    },
    {
      icon: <HiFilm />,
      title: 'Explore Movies',
      description: 'Browse thousands of movies with high-res posters, cast info, and official trailers.',
      link: '/movies',
    },
    {
      icon: <HiGlobeAlt />,
      title: 'English Cinema',
      description: 'Stream top Hollywood blockbusters, Marvel epics, and award-winning global cinema.',
      link: '/english',
    },
    {
      icon: <HiTrophy />,
      title: 'Live Sports & Cricket',
      description: 'Follow live cricket matches, real-time scoreboards, and watch match highlight videos.',
      link: '/sports',
    },
    {
      icon: <HiHeart />,
      title: 'My Favorites',
      description: 'Save your favorite movies to a personal list for instant access anytime.',
      link: '/favorites',
    },
    {
      icon: <HiArrowUpTray />,
      title: 'Media Uploads',
      description: 'Upload and share movie trailers, clips, and short edits with the community.',
      link: '/uploads',
    },
  ]

  return (
    <>
      {/* Hero Section with Netflix Style Background */}
      <section className="hero">
        <div className="hero-netflix-backdrop-wrap">
          <div
            className="hero-netflix-backdrop-img"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
          <div className="hero-netflix-backdrop-overlay" />
          <div className="hero-netflix-backdrop-glow" />
        </div>
        <div className="hero-content slide-up">
          <img src={logo} alt="Movie Explorer" className="hero-logo" />
          <h1>
            Explore. Watch. Discover.
          </h1>
          <p>
            Your ultimate destination for Telugu blockbusters, global movies, live cricket matches, and entertainment.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <HiSparkles /> <span>500K+ Movies</span>
            </div>
            <div className="hero-stat">
              <HiTrophy /> <span>Live Cricket Highlights</span>
            </div>
            <div className="hero-stat">
              <HiArrowTrendingUp /> <span>Tollywood & Hollywood</span>
            </div>
          </div>
        </div>
      </section>

      <PageContainer>
        {/* Latest Telugu Movies Spotlight */}
        <section className="section">
          <div className="section-header">
            <h2>
              <HiSparkles style={{ color: '#fbbf24', verticalAlign: 'middle' }} /> Latest Telugu Movies (Tollywood)
            </h2>
            <Link to="/telugu" className="see-all">
              See All Telugu <HiChevronRight />
            </Link>
          </div>
          <MovieGrid movies={teluguMovies} loading={loading} />
        </section>

        {/* New 2025 & 2026 Releases Section */}
        <section className="section">
          <div className="section-header">
            <h2>
              <HiFire style={{ color: 'var(--color-accent)', verticalAlign: 'middle' }} /> New 2025 & 2026 Releases (Full Movies HD)
            </h2>
            <Link to="/telugu" className="see-all">
              Watch All Full Movies <HiChevronRight />
            </Link>
          </div>
          <MovieGrid movies={newReleases} loading={loading} />
        </section>

        {/* English Movies Section */}
        <section className="section">
          <div className="section-header">
            <h2>
              <HiGlobeAlt style={{ color: 'var(--color-accent)', verticalAlign: 'middle' }} /> English Movies (Hollywood)
            </h2>
            <Link to="/english" className="see-all">
              See All English <HiChevronRight />
            </Link>
          </div>
          <MovieGrid movies={englishMovies} loading={loading} />
        </section>

        {/* Popular Section */}
        <section className="section">
          <div className="section-header">
            <h2>
              <HiStar style={{ color: '#fbbf24', verticalAlign: 'middle' }} /> Popular Worldwide
            </h2>
            <Link to="/popular" className="see-all">
              See All <HiChevronRight />
            </Link>
          </div>
          <MovieGrid movies={popularMovies} loading={loading} />
        </section>

        {/* Top Rated Section */}
        <section className="section">
          <div className="section-header">
            <h2>
              <HiStar style={{ color: '#f59e0b', verticalAlign: 'middle' }} /> Top Rated Movies
            </h2>
            <Link to="/top-rated" className="see-all">
              See All <HiChevronRight />
            </Link>
          </div>
          <MovieGrid movies={topRatedMovies} loading={loading} />
        </section>

        {/* Features Section */}
        <section className="section">
          <div className="section-header">
            <h2>Explore Features</h2>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link
                to={feature.link}
                key={index}
                className="feature-card fade-in"
                style={{
                  animationDelay: `${index * 0.08}s`,
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </PageContainer>
    </>
  )
}
