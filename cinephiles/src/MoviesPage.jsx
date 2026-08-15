import { useEffect, useState } from 'react'
import './MoviesPage.css'

const MOVIES_URL = 'https://api.sampleapis.com/movies/animation'

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(MOVIES_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load movies')
        return res.json()
      })
      .then((data) => {
        const valid = data.filter((movie) => !movie.posterURL.includes('example.com'))
        setMovies(valid)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="movies-page">
      <header className="movies-header">
        <h1>Cinephiles</h1>
        <p>Animated movies from IMDb</p>
      </header>

      {loading && <p className="movies-status">Loading movies…</p>}
      {error && <p className="movies-status movies-error">{error}</p>}

      {!loading && !error && (
        <ul className="movie-list">
          {movies.map((movie, index) => (
            <li key={`${movie.imdbId}-${index}`} className="movie-card">
              <a
                href={`https://www.imdb.com/title/${movie.imdbId}/`}
                target="_blank"
                rel="noreferrer"
              >
                <img src={movie.posterURL} alt={movie.title} loading="lazy" />
                <h2>{movie.title}</h2>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
