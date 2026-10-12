import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PageContainer } from '../components/layout/PageContainer'
import { HiFilm, HiUsers, HiGlobeAlt, HiStar } from 'react-icons/hi2'

export default function About() {
  useDocumentTitle('About')

  const stats = [
    { icon: <HiFilm />, number: '500K+', label: 'Movies' },
    { icon: <HiUsers />, number: '10K+', label: 'Users' },
    { icon: <HiGlobeAlt />, number: '190+', label: 'Countries' },
    { icon: <HiStar />, number: '1M+', label: 'Reviews' },
  ]

  return (
    <PageContainer>
      <div className="about-page">
        <div className="about-hero">
          <h1>
            About <span style={{ background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Movie Explorer</span>
          </h1>
          <p>
            Movie Explorer is a modern web application that lets you discover,
            explore, and keep track of your favorite movies, sports events,
            and entertainment content — all in one place.
          </p>
        </div>

        <div className="about-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="number">{stat.number}</div>
              <div className="label">{stat.label}</div>
            </div>
          ))}
        </div>

        <section className="section">
          <div className="section-header">
            <h2>Our Mission</h2>
          </div>
          <div className="feature-card">
            <p style={{ lineHeight: 1.8 }}>
              We believe everyone deserves easy access to great entertainment.
              Movie Explorer brings together the world's largest movie database,
              live sports scores, and user-generated content into a single,
              beautiful, and responsive platform.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Tech Stack</h2>
          </div>
          <div className="features-grid">
            {[
              { title: 'React 18', desc: 'Modern UI with hooks and functional components' },
              { title: 'Vite', desc: 'Lightning-fast build tool and dev server' },
              { title: 'React Router', desc: 'Client-side routing with lazy loading' },
              { title: 'TMDB API', desc: 'Access to 500K+ movies and TV shows' },
              { title: 'Express.js', desc: 'Backend proxy for secure API calls' },
              { title: 'Responsive Design', desc: 'Works beautifully on every screen size' },
            ].map((tech, i) => (
              <div key={i} className="feature-card fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
                <h3>{tech.title}</h3>
                <p>{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  )
}
