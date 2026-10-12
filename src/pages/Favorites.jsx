import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PageContainer } from '../components/layout/PageContainer'
import { MovieGrid } from '../components/movie/MovieGrid'
import { EmptyState } from '../components/common/EmptyState'
import { useFavorites } from '../context/FavoritesContext'
import { HiHeart, HiTrash } from 'react-icons/hi2'

export default function Favorites() {
  useDocumentTitle('Favorites')
  const { favorites, clearFavorites, count } = useFavorites()

  return (
    <PageContainer>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1><HiHeart style={{ verticalAlign: 'middle', color: 'var(--color-danger)' }} /> My Favorites</h1>
            <p>{count > 0 ? `${count} movie${count !== 1 ? 's' : ''} saved` : 'No favorites yet'}</p>
          </div>
          {count > 0 && (
            <button className="btn btn-secondary btn-sm" onClick={clearFavorites}>
              <HiTrash size={16} /> Clear All
            </button>
          )}
        </div>
      </div>
      {count === 0 ? (
        <EmptyState
          icon={<HiHeart />}
          title="No Favorites Yet"
          message="Start browsing movies and click the heart icon to add them to your favorites."
          actionLabel="Browse Movies"
          actionPath="/movies"
        />
      ) : (
        <MovieGrid movies={favorites} loading={false} />
      )}
    </PageContainer>
  )
}
