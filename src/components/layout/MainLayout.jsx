import { Header } from './Header'
import { Footer } from './Footer'

export function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}
