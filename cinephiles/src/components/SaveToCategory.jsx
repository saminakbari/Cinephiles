import { useEffect, useRef, useState } from 'react'
import './SaveToCategory.css'
import { BookmarkIcon, CheckIcon, PlusIcon } from './icons'
import {
  createCategory,
  getCategories,
  toggleMovieInCategory,
} from '../utils/categories'

export default function SaveToCategory({ username, movie, memberOf, onChange }) {
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState(() => getCategories(username))
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const wrapRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    setCategories(getCategories(username))
  }, [username, open])

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    function handleEscape(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    if (adding) inputRef.current?.focus()
  }, [adding])

  function handleToggle(categoryId) {
    toggleMovieInCategory(username, categoryId, movie)
    setCategories(getCategories(username))
    onChange?.()
  }

  function handleCreate(e) {
    e.preventDefault()
    const result = createCategory(username, newName)
    if (!result.ok) {
      setError(result.reason === 'duplicate' ? 'You already have a list with that name' : 'Give it a short name')
      return
    }
    toggleMovieInCategory(username, result.category.id, movie)
    setCategories(getCategories(username))
    onChange?.()
    setNewName('')
    setError('')
    setAdding(false)
  }

  const savedCount = memberOf.length

  return (
    <div className="save-to-category" ref={wrapRef}>
      <button
        type="button"
        className={`save-to-category__trigger ${savedCount > 0 ? 'has-saves' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <BookmarkIcon className="save-to-category__trigger-icon" />
        {savedCount > 0 ? `Saved to ${savedCount} list${savedCount > 1 ? 's' : ''}` : 'Save to list'}
      </button>

      <div className={`save-to-category__panel ${open ? 'is-open' : ''}`} role="menu">
        <div className="save-to-category__title">Save to…</div>
        <ul className="save-to-category__list">
          {categories.map((category) => {
            const checked = memberOf.includes(category.id)
            return (
              <li key={category.id}>
                <button
                  type="button"
                  className={`save-to-category__option ${checked ? 'is-checked' : ''}`}
                  onClick={() => handleToggle(category.id)}
                  role="menuitemcheckbox"
                  aria-checked={checked}
                >
                  <span className="save-to-category__checkbox">
                    {checked && <CheckIcon className="save-to-category__check-icon" />}
                  </span>
                  <span className="save-to-category__name">{category.name}</span>
                  <span className="save-to-category__count">{category.movies.length}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="save-to-category__divider" />

        {adding ? (
          <form className="save-to-category__new-form" onSubmit={handleCreate}>
            <input
              ref={inputRef}
              type="text"
              placeholder="New list name…"
              value={newName}
              maxLength={40}
              onChange={(e) => {
                setNewName(e.target.value)
                setError('')
              }}
              onBlur={() => {
                if (!newName.trim()) setAdding(false)
              }}
            />
            <button type="submit" aria-label="Create list">
              <PlusIcon className="save-to-category__new-icon" />
            </button>
          </form>
        ) : (
          <button type="button" className="save-to-category__add-btn" onClick={() => setAdding(true)}>
            <PlusIcon className="save-to-category__add-icon" />
            New list
          </button>
        )}
        {error && <p className="save-to-category__error">{error}</p>}
      </div>
    </div>
  )
}
