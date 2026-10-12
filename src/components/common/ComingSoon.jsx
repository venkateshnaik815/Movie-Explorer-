import { HiRocketLaunch } from 'react-icons/hi2'

export function ComingSoon({ title, message }) {
  return (
    <div className="coming-soon">
      <div className="icon">
        <HiRocketLaunch />
      </div>
      <h2>{title} — Coming Soon</h2>
      <p>{message || 'This feature is under development. Stay tuned for updates!'}</p>
    </div>
  )
}
