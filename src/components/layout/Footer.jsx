import { Link } from 'react-router-dom'
import { FOOTER_LINKS } from '../../constants/navigation'
import { HiHeart } from 'react-icons/hi2'
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'
import logo from '../../assets/images/logo.png'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="Movie Explorer" />
            <p>
              Your ultimate destination to explore, watch, and discover
              amazing movies, sports events, and more.
            </p>
          </div>
          {FOOTER_LINKS.map((section) => (
            <div key={section.title} className="footer-links">
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Movie Explorer. Made with{' '}
            <HiHeart style={{ color: '#ff6b00', verticalAlign: 'middle' }} />
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="GitHub"><FaGithub /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
