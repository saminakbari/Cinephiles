import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AuthPage.css'
import LOGO from '../assets/logo.svg'
import { setSession, verifyLogin } from '../utils/auth'
import { BackArrowIcon } from '../components/icons'

function EyeIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
      {!open && <line x1="2" y1="2" x2="22" y2="22" />}
    </svg>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setGeneralError('')

    const nextErrors = {}
    if (!username.trim()) nextErrors.username = 'Enter your username'
    if (!password) nextErrors.password = 'Enter your password'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setSubmitting(true)
    try {
      const result = await verifyLogin({ username, password })
      if (!result.ok) {
        if (result.reason === 'not-found') {
          setErrors({ username: 'No account found with this username' })
        } else {
          setErrors({ password: 'Incorrect password' })
        }
        return
      }
      setSession(result.user.username)
      navigate('/movies')
    } catch {
      setGeneralError('Something went wrong while logging in. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__strip" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="auth-card__hole" />
          ))}
        </div>
        <div className="auth-card__header">
          <button type="button" className="back-btn back-btn--floating" onClick={() => navigate('/')}>
            <BackArrowIcon className="back-btn__icon" /> Back to Home
          </button>
        </div>
        <div className="auth-card__body">
          <img src={LOGO} alt="Cinephiles" className="auth-card__logo" />
          <h1 className="auth-card__title">Welcome back</h1>
          <p className="auth-card__subtitle">Log in to keep track of what you love</p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {generalError && <div className="auth-general-error">{generalError}</div>}

            <div className={`auth-field ${errors.username ? 'has-error' : ''}`}>
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
              {errors.username && <span className="auth-field-error">{errors.username}</span>}
            </div>

            <div className={`auth-field ${errors.password ? 'has-error' : ''}`}>
              <label htmlFor="login-password">Password</label>
              <div className="auth-input-wrap">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-toggle-visibility"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeIcon open={false} /> : <EyeIcon open={true} />}
                </button>
              </div>
              {errors.password && <span className="auth-field-error">{errors.password}</span>}
            </div>

            <button type="submit" className="auth-submit" disabled={submitting}>
              {submitting ? 'Logging in…' : 'Log in'}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
        <div className="auth-card__strip" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={`b-${i}`} className="auth-card__hole" />
          ))}
        </div>
      </div>
    </div>
  )
}