import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../utils/auth'
import { PencilIcon } from '../../components/icons'

export default function ProfileView() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const initial = user?.username ? user.username.charAt(0).toUpperCase() : '?'

  return (
    <div className="profile-view">
      <div className="profile-view__avatar-wrap">
        {user?.avatar ? (
          <img src={user.avatar} alt={user.username} className="profile-view__avatar" />
        ) : (
          <div className="profile-view__avatar profile-view__avatar--placeholder">{initial}</div>
        )}
      </div>

      <span className="profile-view__eyebrow">Welcome back,</span>
      <h2 className="profile-view__username">{user?.username}</h2>
      <p className="profile-view__hint">
        This is your seat in the house — your name, your face, your Cinephiles identity.
      </p>

      <button
        type="button"
        className="profile-view__edit-btn"
        onClick={() => navigate('/account/edit')}
      >
        <PencilIcon className="profile-view__edit-icon" />
        Edit profile
      </button>
    </div>
  )
}