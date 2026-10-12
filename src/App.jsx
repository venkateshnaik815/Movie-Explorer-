import { MainLayout } from './components/layout/MainLayout'
import { AppRoutes } from './routes/AppRoutes'
import { ScrollToTop } from './components/common/ScrollToTop'
import { FavoritesProvider } from './context/FavoritesContext'

function App() {
  return (
    <FavoritesProvider>
      <MainLayout>
        <ScrollToTop />
        <AppRoutes />
      </MainLayout>
    </FavoritesProvider>
  )
}

export default App
