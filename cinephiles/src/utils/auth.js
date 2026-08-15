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