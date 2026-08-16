import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import './MovieDetail.css'
import { getCurrentUser } from '../utils/auth'
import { getReview, saveReview } from '../utils/reviews'
import { FAVORITES_ID, getCategoriesForMovie, toggleMovieInCategory } from '../utils/categories'
import SaveToCategory from '../components/SaveToCategory'
import { BackArrowIcon, HeartIcon, StarIcon } from '../components/icons'

const OMDB_URL = 'https://www.omdbapi.com/?apikey=trilogy&i='

const TAGLINES = [
  'Some stories stay with you long after the credits roll.',
  'One more reason to turn the lights off and press play.',
  'Worth the popcorn. Worth the two hours. Worth remembering.',
  'A little magic, framed one shot at a time.',
]

export default function MovieDetail() {
  const { imdbId } = useParams()
  const user = getCurrentUser()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [editing, setEditing] = useState(true)
  const [hasReview, setHasReview] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')
  const [memberOf, setMemberOf] = useState([])

  const tagline = useMemo(
    () => TAGLINES[Math.abs(hashCode(imdbId)) % TAGLINES.length],
    [imdbId],
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [imdbId])

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

  useEffect(() => {
    if (!user) return
    setMemberOf(getCategoriesForMovie(user.username, imdbId))
  }, [user, imdbId])

  function handleSaveReview(e) {
    e.preventDefault()
    if (!user || rating < 1 || rating > 5) return
    saveReview(user.username, imdbId, { rating, comment })
    setHasReview(true)
    setEditing(false)
    setSavedMsg('Review saved')
  }

  function movieForCategory() {
    return {
      imdbId,
      title: movie?.Title,
      poster: movie?.Poster !== 'N/A' ? movie?.Poster : '',
      year: movie?.Year,
      imdbRating: Number(movie?.imdbRating) || null,
    }
  }

  function handleToggleFavorite() {
    if (!user || !movie) return
    toggleMovieInCategory(user.username, FAVORITES_ID, movieForCategory())
    setMemberOf(getCategoriesForMovie(user.username, imdbId))
  }

  const isFavorite = memberOf.includes(FAVORITES_ID)
  const genres = movie?.Genre && movie.Genre !== 'N/A' ? movie.Genre.split(',').map((g) => g.trim()) : []

  return (
    <div className="movie-detail">
      {loading && <p className="detail-status">Loading details…</p>}
      {error && (
        <div className="detail-status-wrap">
          <p className="detail-status detail-error">{error}</p>
          <a href="/movies" className="back-btn">
            <BackArrowIcon className="back-btn__icon" /> Back to movies
          </a>
        </div>
      )}

      {!loading && !error && movie && (
        <>
          <div className="detail-hero">
            <div className="detail-hero__bg">
              {movie.Poster !== 'N/A' && (
                <div
                  className="detail-hero__backdrop"
                  style={{ backgroundImage: `url(${movie.Poster})` }}
                  aria-hidden="true"
                />
              )}
              <div className="detail-hero__scrim" aria-hidden="true" />
            </div>

            <a href="/movies" className="back-btn back-btn--floating">
              <BackArrowIcon className="back-btn__icon" /> Back to movies
            </a>

            <div className="detail-hero__content">
              <div className="detail-poster-frame">
                {movie.Poster !== 'N/A' ? (
                  <img
                    className="detail-poster"
                    src={movie.Poster}
                    alt={movie.Title}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="detail-poster detail-poster--placeholder">No poster</div>
                )}
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <div className="detail-rating-disc">
                    <StarIcon filled className="detail-rating-disc__icon" />
                    <span>{movie.imdbRating}</span>
                  </div>
                )}
              </div>

              <div className="detail-hero__info">
                {genres.length > 0 && (
                  <div className="detail-genre-row">
                    {genres.map((g) => (
                      <span key={g} className="detail-genre-pill">{g}</span>
                    ))}
                  </div>
                )}

                <h1>{movie.Title}</h1>
                <p className="detail-tagline">“{tagline}”</p>

                <p className="detail-meta-row">
                  <span>{movie.Year}</span>
                  <span className="detail-meta-dot">·</span>
                  <span>{movie.Runtime}</span>
                  <span className="detail-meta-dot">·</span>
                  <span className="detail-meta-badge">{movie.Rated}</span>
                </p>

                {user && (
                  <div className="detail-hero__actions">
                    <button
                      type="button"
                      className={`favorite-btn ${isFavorite ? 'is-active' : ''}`}
                      onClick={handleToggleFavorite}
                      aria-pressed={isFavorite}
                    >
                      <HeartIcon filled={isFavorite} className="favorite-btn__icon" />
                      {isFavorite ? 'In favorites' : 'Add to favorites'}
                    </button>
                    <SaveToCategory
                      username={user.username}
                      movie={movieForCategory()}
                      memberOf={memberOf}
                      onChange={() => setMemberOf(getCategoriesForMovie(user.username, imdbId))}
                    />
                  </div>
                )}

                <a
                  className="imdb-link"
                  href={`https://www.imdb.com/title/${imdbId}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on IMDb ↗
                </a>
              </div>
            </div>
          </div>

          <div className="detail-body">
            <section className="detail-card">
              <h2 className="detail-card__eyebrow">Synopsis</h2>
              <p className="detail-plot">{movie.Plot}</p>
            </section>

            <section className="detail-card">
              <h2 className="detail-card__eyebrow">Cast &amp; crew</h2>
              <p><strong>Director</strong><span>{movie.Director}</span></p>
              <p><strong>Actors</strong><span>{movie.Actors}</span></p>
            </section>

            {user && (
              <section className="detail-card review-card">
                <h2 className="detail-card__eyebrow">Your rating &amp; review</h2>

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
        </>
      )}
    </div>
  )
}

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < String(str).length; i += 1) {
    hash = (hash << 5) - hash + String(str).charCodeAt(i)
    hash |= 0
  }
  return hash
}