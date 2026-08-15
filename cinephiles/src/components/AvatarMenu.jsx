import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AvatarMenu.css'

export default function AvatarMenu({ username, avatar, onLogout }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
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

  const initial = username ? username.charAt(0).toUpperCase() : '?'

  return (
    <div className="avatar-menu" ref={menuRef}>
      <button
        type="button"
        className="avatar-menu__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Account menu"
      >
        {avatar ? (
          <img src={avatar} alt={username || 'Profile'} className="avatar-menu__img" />
        ) : (
          <span className="avatar-menu__initial">{initial}</span>
        )}
      </button>

      <div className={`avatar-menu__dropdown ${open ? 'is-open' : ''}`} role="menu">
        <div className="avatar-menu__greeting">
          Hi, <span>{username}</span>
        </div>
        <div className="avatar-menu__divider" />
        <button
          type="button"
          className="avatar-menu__item"
          role="menuitem"
          onClick={() => {
            setOpen(false)
            navigate('/account')
          }}
        >
          My account
        </button>
        <div className="avatar-menu__divider" />
        <button
          type="button"
          className="avatar-menu__item avatar-menu__item--danger"
          role="menuitem"
          onClick={() => {
            setOpen(false)
            onLogout()
          }}
        >
          Log out
        </button>
      </div>
    </div>
  )
}
