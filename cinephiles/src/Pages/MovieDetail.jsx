import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './MovieDetail.css'
import { getCurrentUser } from '../utils/auth'
import { getReview, saveReview } from '../utils/reviews'

const OMDB_URL = 'https://www.omdbapi.com/?apikey=trilogy&i='

export default function MovieDetail() {
  const { imdbId } = useParams()
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [editing, setEditing] = useState(true)
  const [hasReview, setHasReview] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')

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

  useEffect(() => {
    if (!user) return
    const existing = getReview(user.username, imdbId)
    if (existing) {
      setRating(existing.rating)
      setComment(existing.comment)
      setHasReview(true)
      setEditing(false)
    } else {
      setRating(0)
      setComment('')
      setHasReview(false)
      setEditing(true)
    }
    setSavedMsg('')
  }, [imdbId, user?.username])

  function handleSaveReview(e) {
    e.preventDefault()
    if (!user || rating < 1 || rating > 5) return
    saveReview(user.username, imdbId, { rating, comment })
    setHasReview(true)
    setEditing(false)
    setSavedMsg('Review saved')
  }

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

            {user && (
              <section className="review-section">
                <h2>Your rating & review</h2>

                {!editing && hasReview ? (
                  <div className="review-display">
                    <div className="star-row" aria-label={`${rating} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span key={n} className={`star ${n <= rating ? 'filled' : ''}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="review-comment">
                      {comment || <em>No comment</em>}
                    </p>
                    <button type="button" className="review-btn" onClick={() => setEditing(true)}>
                      Edit
                    </button>
                  </div>
                ) : (
                  <form className="review-form" onSubmit={handleSaveReview}>
                    <div className="star-row" role="group" aria-label="Rate from 1 to 5 stars">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          className={`star-btn ${n <= rating ? 'filled' : ''}`}
                          onClick={() => setRating(n)}
                          aria-label={`${n} star${n > 1 ? 's' : ''}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <textarea
                      className="review-textarea"
                      placeholder="Write your review…"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                    />
                    <div className="review-actions">
                      <button type="submit" className="review-btn" disabled={rating < 1}>
                        Save
                      </button>
                      {hasReview && (
                        <button
                          type="button"
                          className="review-btn review-btn--ghost"
                          onClick={() => {
                            const existing = getReview(user.username, imdbId)
                            if (existing) {
                              setRating(existing.rating)
                              setComment(existing.comment)
                            }
                            setEditing(false)
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                )}

                {savedMsg && <p className="review-saved">{savedMsg}</p>}
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
