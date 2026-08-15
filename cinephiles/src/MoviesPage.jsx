import { useEffect, useState } from 'react'
import './MoviesPage.css'

const GENRES = [
  'action-adventure',
  'animation',
  'classic',
  'comedy',
  'drama',
  'horror',
  'family',
  'mystery',
  'scifi-fantasy',
  'western',
]

function filterMovies(data) {
  return data.filter((movie) => movie.posterURL && !movie.posterURL.includes('example.com'))
}

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase()),
  )

  useEffect(() => {
    Promise.all(
      GENRES.map((genre) =>
        fetch(`https://api.sampleapis.com/movies/${genre}`).then((res) => {
          if (!res.ok) throw new Error('Could not load movies')
          return res.json()
        }),
      ),
    )
      .then((results) => {
        const seen = new Set()
        const combined = []

        for (const list of results) {
          for (const movie of filterMovies(list)) {
            if (!seen.has(movie.imdbId)) {
              seen.add(movie.imdbId)
              combined.push(movie)
            }
          }
        }

        setMovies(combined)
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
        <p>Movies from IMDb across all genres</p>
        {!loading && !error && (
          <input
            className="movie-search"
            type="search"
            placeholder="Search by title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </header>

      {loading && <p className="movies-status">Loading movies…</p>}
      {error && <p className="movies-status movies-error">{error}</p>}

      {!loading && !error && filteredMovies.length === 0 && (
        <p className="movies-status">No movies found for &quot;{search}&quot;</p>
      )}

      {!loading && !error && filteredMovies.length > 0 && (
        <ul className="movie-list">
          {filteredMovies.map((movie) => (
            <li key={movie.imdbId} className="movie-card">
              <a
                href={`https://www.imdb.com/title/${movie.imdbId}/`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={movie.posterURL}
                  alt={movie.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <h2>{movie.title}</h2>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
