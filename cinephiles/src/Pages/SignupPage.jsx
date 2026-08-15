import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AuthPage.css'
import LOGO from '../assets/logo.svg'
import {
  findUserByEmail,
  findUserByUsername,
  getPasswordChecks,
  isPasswordValid,
  isValidEmail,
  isValidUsername,
  registerUser,
  setSession,
} from '../utils/auth'

const CHECK_LABELS = [
  ['length', 'At least 8 characters'],
  ['lowercase', 'A lowercase letter'],
  ['uppercase', 'An uppercase letter'],
  ['number', 'A number'],
  ['symbol', 'A symbol (e.g. !@#$)'],
]

function EyeIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
      {!open && <line x1="2" y1="2" x2="22" y2="22" />}
    </svg>
  )
}

export default function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const passwordChecks = useMemo(() => getPasswordChecks(password), [password])

  async function handleSubmit(e) {
    e.preventDefault()
    setGeneralError('')

    const nextErrors = {}

    if (!isValidEmail(email)) {
      nextErrors.email = 'Enter a valid email address'
    } else if (findUserByEmail(email)) {
      nextErrors.email = 'This email is already registered'
    }

    if (!isValidUsername(username)) {
      nextErrors.username = '3-20 characters: letters, numbers, underscore'
    } else if (findUserByUsername(username)) {
      nextErrors.username = 'This username is already taken'
    }

    if (!isPasswordValid(password)) {
      nextErrors.password = 'Password does not meet all requirements below'
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setSubmitting(true)
    try {
      await registerUser({ email, username, password })
      setSession(username.trim())
      navigate('/movies')
    } catch {
      setGeneralError('Something went wrong while saving your account. Please try again.')
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
          <Link to="/" className="auth-back" aria-label="Back to home">
            ←
          </Link>
        </div>
        <div className="auth-card__body">
          <img src={LOGO} alt="Cinephiles" className="auth-card__logo" />
          <h1 className="auth-card__title">Create your account</h1>
          <p className="auth-card__subtitle">Join Cinephiles and start building your library</p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {generalError && <div className="auth-general-error">{generalError}</div>}

            <div className={`auth-field ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {errors.email && <span className="auth-field-error">{errors.email}</span>}
            </div>

            <div className={`auth-field ${errors.username ? 'has-error' : ''}`}>
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
              {errors.username && <span className="auth-field-error">{errors.username}</span>}
            </div>

            <div className={`auth-field ${errors.password ? 'has-error' : ''}`}>
              <label htmlFor="signup-password">Password</label>
              <div className="auth-input-wrap">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
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
              <ul className="auth-checklist">
                {CHECK_LABELS.map(([key, label]) => (
                  <li key={key} className={passwordChecks[key] ? 'met' : ''}>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`auth-field ${errors.confirmPassword ? 'has-error' : ''}`}>
              <label htmlFor="signup-confirm">Confirm password</label>
              <input
                id="signup-confirm"
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <span className="auth-field-error">{errors.confirmPassword}</span>
              )}
            </div>

            <button type="submit" className="auth-submit" disabled={submitting}>
              {submitting ? 'Creating account…' : 'Sign up'}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Log in</Link>
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