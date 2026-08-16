const CATEGORIES_KEY = 'cinephiles_categories'
const CHANGE_EVENT = 'cinephiles-categories-changed'

export const FAVORITES_ID = 'favorites'

function readAll() {
  try {
    const raw = localStorage.getItem(CATEGORIES_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeAll(all, { silent } = {}) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(all))
  if (!silent) window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function onCategoriesChanged(callback) {
  window.addEventListener(CHANGE_EVENT, callback)
  return () => window.removeEventListener(CHANGE_EVENT, callback)
}

function genId() {
  return `cat_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`
}

function withFavorites(username, all) {
  const list = all[username] ? [...all[username]] : []
  if (!list.some((c) => c.id === FAVORITES_ID)) {
    list.unshift({ id: FAVORITES_ID, name: 'Favorites', createdAt: Date.now(), movies: [] })
    all[username] = list
    writeAll(all, { silent: true })
  }
  return list
}

/** Returns this user's categories, Favorites always first. Creates Favorites on first use. */
export function getCategories(username) {
  if (!username) return []
  const all = readAll()
  return withFavorites(username, all)
}

export function getCategory(username, categoryId) {
  return getCategories(username).find((c) => c.id === categoryId) || null
}

export function createCategory(username, name) {
  const trimmed = String(name || '').trim()
  if (!trimmed) return { ok: false, reason: 'invalid' }
  if (trimmed.length > 40) return { ok: false, reason: 'invalid' }

  const all = readAll()
  const list = withFavorites(username, all)
  if (list.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
    return { ok: false, reason: 'duplicate' }
  }

  const category = { id: genId(), name: trimmed, createdAt: Date.now(), movies: [] }
  all[username] = [...list, category]
  writeAll(all)
  return { ok: true, category }
}

export function renameCategory(username, categoryId, newName) {
  const trimmed = String(newName || '').trim()
  if (!trimmed) return { ok: false, reason: 'invalid' }
  if (categoryId === FAVORITES_ID) return { ok: false, reason: 'locked' }

  const all = readAll()
  const list = withFavorites(username, all)
  if (list.some((c) => c.id !== categoryId && c.name.toLowerCase() === trimmed.toLowerCase())) {
    return { ok: false, reason: 'duplicate' }
  }

  const idx = list.findIndex((c) => c.id === categoryId)
  if (idx === -1) return { ok: false, reason: 'not-found' }

  const next = [...list]
  next[idx] = { ...next[idx], name: trimmed }
  all[username] = next
  writeAll(all)
  return { ok: true }
}

export function deleteCategory(username, categoryId) {
  if (categoryId === FAVORITES_ID) return { ok: false, reason: 'locked' }
  const all = readAll()
  const list = withFavorites(username, all)
  all[username] = list.filter((c) => c.id !== categoryId)
  writeAll(all)
  return { ok: true }
}

export function isMovieInCategory(username, categoryId, imdbId) {
  const category = getCategory(username, categoryId)
  return Boolean(category?.movies.some((m) => m.imdbId === imdbId))
}

/** Returns the set of category ids that already contain this movie. */
export function getCategoriesForMovie(username, imdbId) {
  return getCategories(username)
    .filter((c) => c.movies.some((m) => m.imdbId === imdbId))
    .map((c) => c.id)
}

export function addMovieToCategory(username, categoryId, movie) {
  if (!username || !categoryId || !movie?.imdbId) return { ok: false }
  const all = readAll()
  const list = withFavorites(username, all)
  const idx = list.findIndex((c) => c.id === categoryId)
  if (idx === -1) return { ok: false, reason: 'not-found' }

  const category = list[idx]
  if (category.movies.some((m) => m.imdbId === movie.imdbId)) return { ok: true, added: false }

  const entry = {
    imdbId: movie.imdbId,
    title: movie.title || 'Untitled',
    poster: movie.poster || '',
    year: movie.year || '',
    imdbRating: typeof movie.imdbRating === 'number' && !Number.isNaN(movie.imdbRating) ? movie.imdbRating : null,
    addedAt: Date.now(),
  }

  const next = [...list]
  next[idx] = { ...category, movies: [...category.movies, entry] }
  all[username] = next
  writeAll(all)
  return { ok: true, added: true }
}

export function removeMovieFromCategory(username, categoryId, imdbId) {
  const all = readAll()
  const list = withFavorites(username, all)
  const idx = list.findIndex((c) => c.id === categoryId)
  if (idx === -1) return { ok: false, reason: 'not-found' }

  const next = [...list]
  next[idx] = { ...next[idx], movies: next[idx].movies.filter((m) => m.imdbId !== imdbId) }
  all[username] = next
  writeAll(all)
  return { ok: true }
}

export function toggleMovieInCategory(username, categoryId, movie) {
  const inCategory = isMovieInCategory(username, categoryId, movie.imdbId)
  return inCategory
    ? { ...removeMovieFromCategory(username, categoryId, movie.imdbId), added: false }
    : addMovieToCategory(username, categoryId, movie)
}

/** Movies in a category, sorted by rating (highest first, unrated last). */
export function getSortedMovies(category) {
  if (!category) return []
  return [...category.movies].sort((a, b) => {
    if (a.imdbRating == null && b.imdbRating == null) return b.addedAt - a.addedAt
    if (a.imdbRating == null) return 1
    if (b.imdbRating == null) return -1
    return b.imdbRating - a.imdbRating
  })
}
