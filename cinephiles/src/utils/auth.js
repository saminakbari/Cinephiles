const USERS_KEY = 'cinephiles_users'
const SESSION_KEY = 'cinephiles_session'

export async function hashPassword(password) {
  const encoded = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

// --- User storage ---
export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function findUserByEmail(email) {
  const target = email.trim().toLowerCase()
  return getUsers().find((u) => u.email.toLowerCase() === target)
}

export function findUserByUsername(username) {
  const target = username.trim().toLowerCase()
  return getUsers().find((u) => u.username.toLowerCase() === target)
}

export async function registerUser({ email, username, password }) {
  const passwordHash = await hashPassword(password)
  const users = getUsers()
  users.push({ email: email.trim(), username: username.trim(), passwordHash })
  saveUsers(users)
}

export async function verifyLogin({ username, password }) {
  const user = findUserByUsername(username)
  if (!user) return { ok: false, reason: 'not-found' }
  const hash = await hashPassword(password)
  if (hash !== user.passwordHash) return { ok: false, reason: 'wrong-password' }
  return { ok: true, user }
}

export async function verifyPassword(username, password) {
  const user = findUserByUsername(username)
  if (!user) return false
  const hash = await hashPassword(password)
  return hash === user.passwordHash
}

// --- Current user / profile management ---
export function getCurrentUser() {
  const username = getSession()
  if (!username) return null
  return findUserByUsername(username) || null
}

const AVATAR_MAX_DIMENSION = 320

export function resizeImageToDataUrl(file, maxDimension = AVATAR_MAX_DIMENSION) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file'))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read that file'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Could not load that image'))
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height))
        const width = Math.max(1, Math.round(img.width * scale))
        const height = Math.max(1, Math.round(img.height * scale))
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export async function updateUsername(currentUsername, newUsername) {
  const trimmed = newUsername.trim()
  if (!isValidUsername(trimmed)) {
    return { ok: false, reason: 'invalid' }
  }
  if (
    trimmed.toLowerCase() !== currentUsername.toLowerCase() &&
    findUserByUsername(trimmed)
  ) {
    return { ok: false, reason: 'taken' }
  }

  const users = getUsers()
  const idx = users.findIndex((u) => u.username.toLowerCase() === currentUsername.toLowerCase())
  if (idx === -1) return { ok: false, reason: 'not-found' }

  users[idx] = { ...users[idx], username: trimmed }
  saveUsers(users)

  if (getSession()?.toLowerCase() === currentUsername.toLowerCase()) {
    setSession(trimmed)
  }

  return { ok: true, username: trimmed }
}

export async function updatePassword(username, newPassword) {
  if (!isPasswordValid(newPassword)) {
    return { ok: false, reason: 'invalid' }
  }
  const users = getUsers()
  const idx = users.findIndex((u) => u.username.toLowerCase() === username.toLowerCase())
  if (idx === -1) return { ok: false, reason: 'not-found' }

  users[idx] = { ...users[idx], passwordHash: await hashPassword(newPassword) }
  saveUsers(users)
  return { ok: true }
}

export function updateAvatar(username, avatarDataUrl) {
  const users = getUsers()
  const idx = users.findIndex((u) => u.username.toLowerCase() === username.toLowerCase())
  if (idx === -1) return { ok: false, reason: 'not-found' }

  users[idx] = { ...users[idx], avatar: avatarDataUrl }
  saveUsers(users)
  return { ok: true }
}

export function deleteAccount(username) {
  const users = getUsers().filter((u) => u.username.toLowerCase() !== username.toLowerCase())
  saveUsers(users)
  clearSession()
  return { ok: true }
}

// --- Session ---
export function setSession(username) {
  localStorage.setItem(SESSION_KEY, username)
}

export function getSession() {
  return localStorage.getItem(SESSION_KEY)
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

// --- Validation ---
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function isValidUsername(username) {
  return /^[A-Za-z0-9_]{3,20}$/.test(username.trim())
}

export function getPasswordChecks(password) {
  return {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  }
}

export function isPasswordValid(password) {
  return Object.values(getPasswordChecks(password)).every(Boolean)
}