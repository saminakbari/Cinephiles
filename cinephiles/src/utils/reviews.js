const REVIEWS_KEY = 'cinephiles_reviews'

function getAllReviews() {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveAllReviews(reviews) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
}

export function getReview(username, imdbId) {
  if (!username || !imdbId) return null
  return getAllReviews()[username]?.[imdbId] || null
}

export function saveReview(username, imdbId, { rating, comment }) {
  if (!username || !imdbId) return { ok: false }
  const reviews = getAllReviews()
  if (!reviews[username]) reviews[username] = {}
  reviews[username][imdbId] = {
    rating: Number(rating),
    comment: String(comment || '').trim(),
  }
  saveAllReviews(reviews)
  return { ok: true }
}
