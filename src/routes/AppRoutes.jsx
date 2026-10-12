import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Spinner } from '../components/ui/Spinner'

const Home = lazy(() => import('../pages/Home'))
const TeluguMovies = lazy(() => import('../pages/TeluguMovies'))
const EnglishMovies = lazy(() => import('../pages/EnglishMovies'))
const Movies = lazy(() => import('../pages/Movies'))
const MovieDetails = lazy(() => import('../pages/MovieDetails'))
const Search = lazy(() => import('../pages/Search'))
const Trending = lazy(() => import('../pages/Trending'))
const Popular = lazy(() => import('../pages/Popular'))
const TopRated = lazy(() => import('../pages/TopRated'))
const Upcoming = lazy(() => import('../pages/Upcoming'))
const Genres = lazy(() => import('../pages/Genres'))
const GenreMovies = lazy(() => import('../pages/GenreMovies'))
const Favorites = lazy(() => import('../pages/Favorites'))
const Sports = lazy(() => import('../pages/Sports'))
const Uploads = lazy(() => import('../pages/Uploads'))
const NotFound = lazy(() => import('../pages/NotFound'))

export function AppRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/telugu" element={<TeluguMovies />} />
        <Route path="/english" element={<EnglishMovies />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/trending" element={<EnglishMovies />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genre/:id" element={<GenreMovies />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/uploads" element={<Uploads />} />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
