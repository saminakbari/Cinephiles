import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import './MyAccountPage.css'
import { BackArrowIcon, CategoriesIcon, PencilIcon } from '../components/icons'

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

  function handleBack() {
    navigate(isSubPage ? '/account' : '/movies')
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
            </nav>
          </aside>

          <div className="account-divider" aria-hidden="true" />

          <main className="account-content">
            <Outlet />
          </main>
        </div>
        <Strip flip />
      </div>
    </div>
  )
}