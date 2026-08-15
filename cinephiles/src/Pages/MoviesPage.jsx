import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MoviesPage.css'
import { clearSession, getCurrentUser } from '../utils/auth'
import AvatarMenu from '../components/AvatarMenu'

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

const OMDB_URL = 'https://www.omdbapi.com/?apikey=trilogy&i='

function filterMovies(data) {
  return data.filter((movie) => movie.posterURL && !movie.posterURL.includes('example.com') && movie.posterURL !== 'N/A')
}

async function enrichWithOmdb(movies) {
  const enriched = []
  for (let i = 0; i < movies.length; i += 15) {
    const chunk = movies.slice(i, i + 15)
    const part = await Promise.all(
      chunk.map(async (movie) => {
        try {
          const res = await fetch(`${OMDB_URL}${movie.imdbId}`)
          const data = await res.json()
          if (data.Response !== 'True') return movie
          return {
            ...movie,
            year: Number(String(data.Year).slice(0, 4)) || null,
            imdbRating: Number(data.imdbRating) || null,
          }
        } catch {
          return movie
        }
      }),
    )
    enriched.push(...part)
  }
  return enriched
}

export default function MoviesPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => getCurrentUser())
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')
  const [minScore, setMinScore] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [genreOpen, setGenreOpen] = useState(false)
  const genreRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (genreRef.current && !genreRef.current.contains(e.target)) {
        setGenreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = !genre || movie.genre === genre
    const matchesYear = !year || movie.year === Number(year)
    const matchesScore = !minScore || (movie.imdbRating != null && movie.imdbRating >= Number(minScore))
    return matchesSearch && matchesGenre && matchesYear && matchesScore
  })

  useEffect(() => {
    Promise.all(
      GENRES.map((g) =>
        fetch(`https://api.sampleapis.com/movies/${g}`).then((res) => {
          if (!res.ok) throw new Error('Could not load movies')
          return res.json().then((data) => ({ genre: g, data }))
        }),
      ),
    )
      .then(async (results) => {
        const seen = new Set()
        const combined = []

        for (const { genre: g, data } of results) {
          for (const movie of filterMovies(data)) {
            if (!seen.has(movie.imdbId)) {
              seen.add(movie.imdbId)
              combined.push({ ...movie, genre: g })
            }
          }
        }

        setMovies(combined)
        setLoading(false)
        setMovies(await enrichWithOmdb(combined))
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  function handleLogout() {
    clearSession()
    navigate('/')
  }

  return (
    <div className="movies-page">
      <header className="movies-header">
        <div className="movies-header__top">
          {user && (
            <AvatarMenu username={user.username} avatar={user.avatar} onLogout={handleLogout} />
          )}
        </div>
        <h1>Cinephiles</h1>
        <p>Movies from IMDb across all genres</p>
        {!loading && !error && (
          <>
            <input
              className="movie-search"
              type="search"
              placeholder="Search by title…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="movie-filters">
              <div className="custom-select" ref={genreRef}>
                <button
                  type="button"
                  className="custom-select-trigger"
                  onClick={() => setGenreOpen((open) => !open)}
                >
                  {genre || 'All genres'}
                  <span className={`custom-select-arrow ${genreOpen ? 'open' : ''}`}>▾</span>
                </button>
                {genreOpen && (
                  <ul className="custom-select-list">
                    <li
                      className={`custom-select-option ${genre === '' ? 'selected' : ''}`}
                      onClick={() => {
                        setGenre('')
                        setGenreOpen(false)
                      }}
                    >
                      All genres
                    </li>
                    {GENRES.map((g) => (
                      <li
                        key={g}
                        className={`custom-select-option ${genre === g ? 'selected' : ''}`}
                        onClick={() => {
                          setGenre(g)
                          setGenreOpen(false)
                        }}
                      >
                        {g}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value.replace(/\D/g, ''))}
              />
              <input
                type="number"
                placeholder="Min IMDb score"
                min="0"
                max="10"
                step="0.1"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
              />
            </div>
          </>
        )}
      </header>

      {loading && <p className="movies-status">Loading movies…</p>}
      {error && <p className="movies-status movies-error">{error}</p>}

      {!loading && !error && filteredMovies.length === 0 && (
        <p className="movies-status">No movies found</p>
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