export type ReviewState = {
  interval: number   // days
  ease: number       // 1.3..2.5
  dueAt: number      // epoch ms
}

export function initReviewState(now = Date.now()): ReviewState {
  return { interval: 0, ease: 2.3, dueAt: now }
}

export type Grade = 0 | 1 | 2  // again, good, easy

export function review(state: ReviewState, grade: Grade, now = Date.now()): ReviewState {
  let { interval, ease } = state
  if (grade === 0) {
    interval = 0
  } else if (interval === 0) {
    interval = grade === 1 ? 1 : 3
  } else {
    ease = Math.max(1.3, ease + (grade === 2 ? 0.15 : -0.05))
    interval = Math.round(interval * ease)
  }
  const dueAt = now + interval * 24 * 60 * 60 * 1000
  return { interval, ease, dueAt }
}

export function isDue(state: ReviewState, now = Date.now()): boolean {
  return state.dueAt <= now
}