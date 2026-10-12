import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../constants/navigation'
import {
  HiHome,
  HiFilm,
  HiFire,
  HiHeart,
  HiTrophy,
  HiSparkles,
  HiMagnifyingGlass,
  HiArrowUpTray,
  HiGlobeAlt,
  HiXMark,
} from 'react-icons/hi2'
import { useFavorites } from '../../context/FavoritesContext'
import logo from '../../assets/images/logo.png'

const iconMap = {
  home: HiHome,
  movie: HiFilm,
  telugu: HiSparkles,
  english: HiGlobeAlt,
  trending: HiFire,
  heart: HiHeart,
  sports: HiTrophy,
  search: HiMagnifyingGlass,
  upload: HiArrowUpTray,
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { count } = useFavorites()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="header-logo" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="Movie Explorer" className="header-logo-img" />
          </Link>

          <nav className="header-nav">
            {NAV_LINKS.map(({ path, label, icon }) => {
              const Icon = iconMap[icon]
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  end={path === '/'}
                >
                  {Icon && <Icon size={18} />}
                  <span>{label}</span>
                  {icon === 'heart' && count > 0 && (
                    <span className="nav-badge">{count}</span>
                  )}
                </NavLink>
              )
            })}
          </nav>

          <button
            className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Category Navigation Strip - shows exact website categories on mobile */}
        <nav className="mobile-header-tabs" aria-label="Mobile Navigation">
          {NAV_LINKS.map(({ path, label, icon }) => {
            const Icon = iconMap[icon]
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `mobile-tab-pill ${isActive ? 'active' : ''}`
                }
                end={path === '/'}
              >
                {Icon && <Icon size={14} />}
                <span>{label}</span>
                {icon === 'heart' && count > 0 && (
                  <span className="nav-badge">{count}</span>
                )}
              </NavLink>
            )
          })}
        </nav>
      </header>

      {/* Full-Screen Mobile Drawer - Rendered outside <header> so it is NEVER behind anything */}
      {mobileOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <Link to="/" className="mobile-drawer-brand" onClick={() => setMobileOpen(false)}>
                <img src={logo} alt="Movie Explorer" className="mobile-drawer-logo" />
                <span>Movie Explorer</span>
              </Link>
              <button
                className="mobile-drawer-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close Menu"
              >
                <HiXMark size={28} />
              </button>
            </div>

            <nav className="mobile-drawer-links">
              {NAV_LINKS.map(({ path, label, icon }) => {
                const Icon = iconMap[icon]
                return (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? 'active' : ''}`
                    }
                    end={path === '/'}
                    onClick={() => setMobileOpen(false)}
                  >
                    {Icon && <Icon size={22} className="nav-icon" />}
                    <span>{label}</span>
                    {icon === 'heart' && count > 0 && (
                      <span className="nav-badge">{count}</span>
                    )}
                  </NavLink>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
