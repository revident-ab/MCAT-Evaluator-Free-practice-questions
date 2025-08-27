import { useEffect, useMemo, useState } from 'react'
import itemsData from '../data/items.sample.json'
import { initReviewState, review, isDue, type ReviewState, type Grade } from '../store/srs'

type Item = {
  id: string
  section: 'BB' | 'CP' | 'PS' | 'CARS'
  stem: string
  choices?: { id: string; text: string; correct: boolean }[]
  explanation?: string
  tags: string[]
}

type ItemState = ReviewState & { id: string }

function loadState(): Record<string, ItemState> {
  const raw = localStorage.getItem('srs')
  if (!raw) return {}
  try { return JSON.parse(raw) } catch { return {} }
}
function saveState(st: Record<string, ItemState>) {
  localStorage.setItem('srs', JSON.stringify(st))
}

export default function Practice() {
  const [state, setState] = useState<Record<string, ItemState>>(loadState())
  const [reveal, setReveal] = useState(false)
  const [currentId, setCurrentId] = useState<string | null>(null)

  const items = itemsData as Item[]
  const now = Date.now()

  const queue = useMemo(() => {
    const due = items.filter(it => {
      const st = state[it.id] ?? { ...initReviewState(), id: it.id }
      return isDue(st, now)
    })
    return due.slice(0, 10)
  }, [items, state, now])

  useEffect(() => {
    if (!currentId && queue.length) setCurrentId(queue[0].id)
  }, [queue, currentId])

  function grade(g: Grade) {
    if (!currentId) return
    const prev = state[currentId] ?? { ...initReviewState(), id: currentId }
    const next = review(prev, g, Date.now())
    const newState = { ...state, [currentId]: { ...next, id: currentId } }
    setState(newState)
    saveState(newState)
    setReveal(false)
    // next item
    const idx = queue.findIndex(q => q.id === currentId)
    const nxt = queue[idx + 1]
    setCurrentId(nxt ? nxt.id : null)
  }

  const current = items.find(i => i.id === currentId) ?? null

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h2>Practice</h2>
      <p>Do up to 10 due items.</p>
      <p>Due now: {queue.length}</p>

      {!current && <p>All caught up.</p>}

      {current && (
        <article style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
            Section {current.section} • Tags {current.tags.join(', ')}
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>{current.stem}</div>

          {current.choices && (
            <ul>
              {current.choices.map(c => (
                <li key={c.id}>
                  {c.text}
                  {reveal && c.correct ? ' ✓' : ''}
                </li>
              ))}
            </ul>
          )}

          {!reveal ? (
            <button onClick={() => setReveal(true)}>Reveal</button>
          ) : (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button onClick={() => grade(0)}>Again</button>
              <button onClick={() => grade(1)}>Good</button>
              <button onClick={() => grade(2)}>Easy</button>
            </div>
          )}

          {reveal && current.explanation && (
            <div style={{ marginTop: 12, background: '#f8f8f8', padding: 12, borderRadius: 6 }}>
              <strong>Why</strong>
              <div style={{ whiteSpace: 'pre-wrap' }}>{current.explanation}</div>
            </div>
          )}
        </article>
      )}
    </div>
  )
}