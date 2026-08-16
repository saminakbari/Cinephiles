import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './MovieDetail.css'

const OMDB_URL = 'https://www.omdbapi.com/?apikey=trilogy&i='

export default function MovieDetail() {
  const { imdbId } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`${OMDB_URL}${imdbId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load movie details')
        return res.json()
      })
      .then((data) => {
        if (data.Response !== 'True') throw new Error(data.Error || 'Movie not found')
        setMovie(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [imdbId])

  return (
    <div className="movie-detail">
      <button type="button" className="back-btn" onClick={() => navigate('/movies')}>
        ← Back to movies
      </button>

      {loading && <p className="detail-status">Loading details…</p>}
      {error && <p className="detail-status detail-error">{error}</p>}

      {!loading && !error && movie && (
        <div className="detail-content">
          {movie.Poster !== 'N/A' && (
            <img
              className="detail-poster"
              src={movie.Poster}
              alt={movie.Title}
              referrerPolicy="no-referrer"
            />
          )}
          <div className="detail-info">
            <h1>{movie.Title}</h1>
            <p className="detail-meta">
              {movie.Year} · {movie.Runtime} · {movie.Rated}
            </p>
            <p className="detail-rating">IMDb {movie.imdbRating}/10</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p className="detail-plot">{movie.Plot}</p>
            <a
              className="imdb-link"
              href={`https://www.imdb.com/title/${imdbId}/`}
              target="_blank"
              rel="noreferrer"
            >
              View on IMDb
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
