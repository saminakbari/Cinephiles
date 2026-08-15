import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../AuthPage.css'
import {
  deleteAccount,
  getCurrentUser,
  getPasswordChecks,
  isPasswordValid,
  isValidUsername,
  resizeImageToDataUrl,
  updateAvatar,
  updatePassword,
  updateUsername,
  verifyPassword,
} from '../../utils/auth'
import { CameraIcon, TrashIcon } from '../../components/icons'

const CHECK_LABELS = [
  ['length', 'At least 8 characters'],
  ['lowercase', 'A lowercase letter'],
  ['uppercase', 'An uppercase letter'],
  ['number', 'A number'],
  ['symbol', 'A symbol (e.g. !@#$)'],
]

export default function EditProfilePage() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [user, setUser] = useState(() => getCurrentUser())
  const [username, setUsername] = useState(user?.username ?? '')
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar ?? '')
  const [pendingAvatar, setPendingAvatar] = useState(null)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const passwordChecks = useMemo(() => getPasswordChecks(newPassword), [newPassword])
  const initial = user?.username ? user.username.charAt(0).toUpperCase() : '?'

  async function handleAvatarPick(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const dataUrl = await resizeImageToDataUrl(file)
      setAvatarPreview(dataUrl)
      setPendingAvatar(dataUrl)
      setErrors((prev) => ({ ...prev, avatar: undefined }))
    } catch (err) {
      setErrors((prev) => ({ ...prev, avatar: err.message || 'Could not use that image' }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSuccessMessage('')

    const trimmedUsername = username.trim()
    const wantsPasswordChange = Boolean(currentPassword || newPassword || confirmPassword)
    const nextErrors = {}

    if (!isValidUsername(trimmedUsername)) {
      nextErrors.username = '3-20 characters: letters, numbers, underscore'
    }

    if (wantsPasswordChange) {
      if (!currentPassword) {
        nextErrors.currentPassword = 'Enter your current password'
      } else {
        const isCurrentValid = await verifyPassword(user.username, currentPassword)
        if (!isCurrentValid) nextErrors.currentPassword = 'Current password is incorrect'
      }
      if (!isPasswordValid(newPassword)) {
        nextErrors.newPassword = 'Password does not meet all requirements below'
      }
      if (newPassword !== confirmPassword) {
        nextErrors.confirmPassword = 'Passwords do not match'
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setSaving(true)
    try {
      let activeUsername = user.username

      if (trimmedUsername.toLowerCase() !== user.username.toLowerCase()) {
        const result = await updateUsername(user.username, trimmedUsername)
        if (!result.ok) {
          setErrors({
            username: result.reason === 'taken' ? 'This username is already taken' : 'Invalid username',
          })
          setSaving(false)
          return
        }
        activeUsername = result.username
      }

      if (wantsPasswordChange) {
        await updatePassword(activeUsername, newPassword)
      }

      if (pendingAvatar) {
        updateAvatar(activeUsername, pendingAvatar)
      }

      const refreshed = getCurrentUser()
      setUser(refreshed)
      setUsername(refreshed?.username ?? '')
      setAvatarPreview(refreshed?.avatar ?? '')
      setPendingAvatar(null)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setSuccessMessage('Your profile has been updated.')
    } catch {
      setErrors({ general: 'Something went wrong while saving. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(e) {
    e.preventDefault()
    setDeleteError('')

    if (!deletePassword) {
      setDeleteError('Enter your password to confirm')
      return
    }

    setDeleting(true)
    try {
      const valid = await verifyPassword(user.username, deletePassword)
      if (!valid) {
        setDeleteError('Incorrect password')
        setDeleting(false)
        return
      }
      deleteAccount(user.username)
      navigate('/', { replace: true })
    } catch {
      setDeleteError('Something went wrong. Please try again.')
      setDeleting(false)
    }
  }

  return (
    <div className="edit-profile">
      <h2 className="edit-profile__title">Edit profile</h2>
      <p className="edit-profile__subtitle">Update your photo, username and password.</p>

      <form className="edit-profile__form" onSubmit={handleSubmit} noValidate>
        {errors.general && <div className="auth-general-error">{errors.general}</div>}
        {successMessage && <div className="edit-profile__success">{successMessage}</div>}

        <div className="edit-profile__avatar-row">
          <div className="edit-profile__avatar-wrap">
            {avatarPreview ? (
              <img src={avatarPreview} alt={username} className="edit-profile__avatar" />
            ) : (
              <div className="edit-profile__avatar edit-profile__avatar--placeholder">{initial}</div>
            )}
            <button
              type="button"
              className="edit-profile__avatar-btn"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Change profile photo"
            >
              <CameraIcon className="edit-profile__avatar-btn-icon" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="edit-profile__file-input"
              onChange={handleAvatarPick}
            />
          </div>
          <div>
            <div className="edit-profile__avatar-label">Profile photo</div>
            <div className="edit-profile__avatar-hint">JPG or PNG, click the camera to change it</div>
            {errors.avatar && <span className="auth-field-error">{errors.avatar}</span>}
          </div>
        </div>

        <div className={`auth-field ${errors.username ? 'has-error' : ''}`}>
          <label htmlFor="edit-username">Username</label>
          <input
            id="edit-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          {errors.username && <span className="auth-field-error">{errors.username}</span>}
        </div>

        <div className="edit-profile__divider" />

        <div className="edit-profile__section-label">Change password</div>

        <div className={`auth-field ${errors.currentPassword ? 'has-error' : ''}`}>
          <label htmlFor="current-password">Current password</label>
          <input
            id="current-password"
            type="password"
            placeholder="Leave blank to keep your password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
          />
          {errors.currentPassword && <span className="auth-field-error">{errors.currentPassword}</span>}
        </div>

        <div className={`auth-field ${errors.newPassword ? 'has-error' : ''}`}>
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            type="password"
            placeholder="Create a new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          {errors.newPassword && <span className="auth-field-error">{errors.newPassword}</span>}
          {newPassword && (
            <ul className="auth-checklist">
              {CHECK_LABELS.map(([key, label]) => (
                <li key={key} className={passwordChecks[key] ? 'met' : ''}>
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={`auth-field ${errors.confirmPassword ? 'has-error' : ''}`}>
          <label htmlFor="confirm-new-password">Confirm new password</label>
          <input
            id="confirm-new-password"
            type="password"
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          {errors.confirmPassword && <span className="auth-field-error">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className="auth-submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>

      <div className="danger-zone">
        <div className="danger-zone__header">
          <TrashIcon className="danger-zone__icon" />
          <div>
            <div className="danger-zone__title">Delete account</div>
            <div className="danger-zone__subtitle">
              This permanently deletes your account and all of its data. This can't be undone.
            </div>
          </div>
        </div>

        {!deleteOpen ? (
          <button
            type="button"
            className="danger-zone__trigger"
            onClick={() => setDeleteOpen(true)}
          >
            Delete account
          </button>
        ) : (
          <form className="danger-zone__confirm" onSubmit={handleDelete}>
            <label htmlFor="delete-password">Enter your password to confirm</label>
            <input
              id="delete-password"
              type="password"
              placeholder="Your password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              autoComplete="current-password"
            />
            {deleteError && <span className="auth-field-error">{deleteError}</span>}
            <div className="danger-zone__actions">
              <button
                type="button"
                className="danger-zone__cancel"
                onClick={() => {
                  setDeleteOpen(false)
                  setDeletePassword('')
                  setDeleteError('')
                }}
              >
                Cancel
              </button>
              <button type="submit" className="danger-zone__confirm-btn" disabled={deleting}>
                {deleting ? 'Deleting…' : 'Permanently delete'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
