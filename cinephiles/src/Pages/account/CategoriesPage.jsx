import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../AuthPage.css'
import { getCurrentUser } from '../../utils/auth'
import {
  FAVORITES_ID,
  getCategory,
  getSortedMovies,
  onCategoriesChanged,
  removeMovieFromCategory,
  renameCategory,
  deleteCategory,
} from '../../utils/categories'
import { CategoriesIcon, CheckIcon, CloseIcon, FilmClapIcon, PencilIcon, StarIcon, TrashIcon } from '../../components/icons'

export default function CategoriesPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const user = getCurrentUser()

  const [category, setCategory] = useState(() => getCategory(user?.username, categoryId))
  const [renaming, setRenaming] = useState(false)
  const [nameDraft, setNameDraft] = useState('')
  const [nameError, setNameError] = useState('')
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const inputRef = useRef(null)

  function refresh() {
    setCategory(getCategory(user?.username, categoryId))
  }

  useEffect(() => {
    refresh()
    setRenaming(false)
    setConfirmingDelete(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, user?.username])

  useEffect(() => onCategoriesChanged(refresh), [categoryId, user?.username])

  useEffect(() => {
    if (!user) return
    if (!getCategory(user.username, categoryId)) {
      navigate('/account/categories/favorites', { replace: true })
    }
  }, [user, categoryId, navigate])

  useEffect(() => {
    if (renaming) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [renaming])

  if (!user || !category) return null

  const movies = getSortedMovies(category)
  const isLocked = category.id === FAVORITES_ID

  function startRename() {
    setNameDraft(category.name)
    setNameError('')
    setRenaming(true)
  }

  function submitRename(e) {
    e.preventDefault()
    const result = renameCategory(user.username, category.id, nameDraft)
    if (!result.ok) {
      setNameError(result.reason === 'duplicate' ? 'You already have a list with that name' : 'Give it a short name')
      return
    }
    setRenaming(false)
    refresh()
  }

  function handleDelete() {
    deleteCategory(user.username, category.id)
    navigate('/account/categories/favorites', { replace: true })
  }

  function handleRemoveMovie(imdbId) {
    removeMovieFromCategory(user.username, category.id, imdbId)
    refresh()
  }

  return (
    <div className="categories-page">
      <div className="categories-page__header">
        {renaming ? (
          <form className="categories-page__rename-form" onSubmit={submitRename}>
            <input
              ref={inputRef}
              type="text"
              value={nameDraft}
              maxLength={40}
              onChange={(e) => {
                setNameDraft(e.target.value)
                setNameError('')
              }}
            />
            <button type="submit" className="categories-page__icon-btn" aria-label="Save name">
              <CheckIcon />
            </button>
            <button
              type="button"
              className="categories-page__icon-btn"
              aria-label="Cancel"
              onClick={() => setRenaming(false)}
            >
              <CloseIcon />
            </button>
          </form>
        ) : (
          <div className="categories-page__title-row">
            <CategoriesIcon className="categories-page__title-icon" />
            <h2>{category.name}</h2>
            {!isLocked && (
              <div className="categories-page__title-actions">
                <button type="button" className="categories-page__icon-btn" aria-label="Rename list" onClick={startRename}>
                  <PencilIcon />
                </button>
                <button
                  type="button"
                  className="categories-page__icon-btn categories-page__icon-btn--danger"
                  aria-label="Delete list"
                  onClick={() => setConfirmingDelete(true)}
                >
                  <TrashIcon />
                </button>
              </div>
            )}
          </div>
        )}
        {nameError && <span className="auth-field-error">{nameError}</span>}
        <p className="categories-page__count">
          {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
        </p>
      </div>

      {confirmingDelete && (
        <div className="categories-page__confirm-delete">
          <p>Delete “{category.name}”? The movies in it won't be deleted, just unlisted from here.</p>
          <div className="categories-page__confirm-actions">
            <button type="button" className="danger-zone__cancel" onClick={() => setConfirmingDelete(false)}>
              Cancel
            </button>
            <button type="button" className="danger-zone__confirm-btn" onClick={handleDelete}>
              Delete list
            </button>
          </div>
        </div>
      )}

      {movies.length === 0 ? (
        <div className="categories-page__empty">
          <FilmClapIcon className="categories-page__empty-icon" />
          <h3>Nothing here yet</h3>
          <p>
            {isLocked
              ? 'Open a movie and tap “Add to favorites” to start your collection.'
              : 'Open a movie and save it to this list to see it here.'}
          </p>
          <Link to="/movies" className="categories-page__browse-btn">
            Browse movies
          </Link>
        </div>
      ) : (
        <ul className="categories-page__grid">
          {movies.map((movie) => (
            <li key={movie.imdbId} className="categories-page__card">
              <button
                type="button"
                className="categories-page__remove"
                aria-label={`Remove ${movie.title} from ${category.name}`}
                onClick={() => handleRemoveMovie(movie.imdbId)}
              >
                <CloseIcon />
              </button>
              <Link to={`/movies/${movie.imdbId}`}>
                {movie.poster ? (
                  <img src={movie.poster} alt={movie.title} loading="lazy" referrerPolicy="no-referrer" />
                ) : (
                  <div className="categories-page__no-poster">{movie.title}</div>
                )}
                {movie.imdbRating != null && (
                  <span className="categories-page__rating">
                    <StarIcon filled />
                    {movie.imdbRating}
                  </span>
                )}
                <h3>{movie.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}