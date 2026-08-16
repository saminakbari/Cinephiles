import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import './MyAccountPage.css'
import { BackArrowIcon, CategoriesIcon, PencilIcon, PlusIcon } from '../components/icons'
import { getCurrentUser } from '../utils/auth'
import { createCategory, getCategories, onCategoriesChanged } from '../utils/categories'

function Strip({ flip }) {
  const holes = Array.from({ length: 28 })
  return (
    <div className={`account-strip ${flip ? 'account-strip--bottom' : ''}`} aria-hidden="true">
      {holes.map((_, i) => (
        <span key={i} className="account-strip__hole" />
      ))}
    </div>
  )
}

export default function MyAccountPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const isSubPage = location.pathname !== '/account'
  const isCategoriesPage = location.pathname.startsWith('/account/categories')
  const user = getCurrentUser()

  const [categories, setCategories] = useState(() => getCategories(user?.username))
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => onCategoriesChanged(() => setCategories(getCategories(user?.username))), [user?.username])

  useEffect(() => {
    if (adding) inputRef.current?.focus()
  }, [adding])

  function handleBack() {
    navigate(isSubPage ? '/account' : '/movies')
  }

  function handleCreate(e) {
    e.preventDefault()
    const result = createCategory(user?.username, newName)
    if (!result.ok) {
      setError(result.reason === 'duplicate' ? 'That list already exists' : 'Give it a short name')
      return
    }
    setCategories(getCategories(user?.username))
    setNewName('')
    setError('')
    setAdding(false)
    navigate(`/account/categories/${result.category.id}`)
  }

  return (
    <div className="account-page">
      <div className="account-shell">
        <Strip />
        <div className="account-shell__body">
          <aside className="account-sidebar">
            <button type="button" className="account-back" onClick={handleBack}>
              <BackArrowIcon className="account-back__icon" />
              {isSubPage ? 'Back to account' : 'Back'}
            </button>

            <div className="account-sidebar__title">My Account</div>

            <nav className="account-nav">
              <NavLink
                to="/account/edit"
                className={({ isActive }) => `account-nav__link ${isActive ? 'is-active' : ''}`}
              >
                <PencilIcon className="account-nav__icon" />
                <span>Edit profile</span>
              </NavLink>
              <NavLink
                to="/account/categories"
                className={({ isActive }) => `account-nav__link ${isActive ? 'is-active' : ''}`}
              >
                <CategoriesIcon className="account-nav__icon" />
                <span>Categories</span>
              </NavLink>

              <ul className="account-subnav">
                {categories.map((category) => (
                  <li key={category.id}>
                    <NavLink
                      to={`/account/categories/${category.id}`}
                      className={({ isActive }) => `account-subnav__link ${isActive ? 'is-active' : ''}`}
                    >
                      <span className="account-subnav__name">{category.name}</span>
                      <span className="account-subnav__count">{category.movies.length}</span>
                    </NavLink>
                  </li>
                ))}
                <li>
                  {adding ? (
                    <form className="account-subnav__form" onSubmit={handleCreate}>
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="List name…"
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
                    </form>
                  ) : (
                    <button type="button" className="account-subnav__add" onClick={() => setAdding(true)}>
                      <PlusIcon className="account-subnav__add-icon" />
                      New list
                    </button>
                  )}
                  {error && <span className="account-subnav__error">{error}</span>}
                </li>
              </ul>
            </nav>
          </aside>

          <div className="account-divider" aria-hidden="true" />

          <main className={`account-content ${isCategoriesPage ? 'account-content--top' : ''}`}>
            <Outlet />
          </main>
        </div>
        <Strip flip />
      </div>
    </div>
  )
}