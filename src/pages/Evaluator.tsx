import { useMemo, useState } from 'react'
import sampleA23 from '../data/a23.sample.json'
import samplePct from '../data/percentiles.sample.json'
import { mcatBins, gpaBins, binValue } from '../utils/binning'

type A23Cell = { mcatRange: string; gpaRange: string; acceptRate: number | null }
type PctRow = { score: number; percentile: number }

export default function Evaluator() {
  const [gpa, setGpa] = useState<number>(3.6)
  const [mcat, setMcat] = useState<number>(510)

  const [a23, setA23] = useState<A23Cell[]>(sampleA23 as A23Cell[])
  const [pct, setPct] = useState<PctRow[]>(samplePct as PctRow[])

  const mLabel = binValue(mcatBins, mcat)
  const gLabel = binValue(gpaBins, gpa)

  const cell = useMemo(() => a23.find(c => c.mcatRange === mLabel && c.gpaRange === gLabel) ?? null, [a23, mLabel, gLabel])

  function onFile(ev: React.ChangeEvent<HTMLInputElement>, kind: 'a23' | 'pct') {
    const file = ev.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        if (kind === 'a23') setA23(parsed)
        else setPct(parsed)
      } catch {
        alert('Invalid JSON')
      }
    }
    reader.readAsText(file)
  }

  function percentile(score: number) {
    // nearest lookup
    let best = pct[0]
    for (const row of pct) if (Math.abs(row.score - score) < Math.abs(best.score - score)) best = row
    return best?.percentile ?? null
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h2>Chance Evaluator</h2>

      <div style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
        <label>
          GPA
          <input
            type="number"
            step="0.01"
            min="0"
            max="4"
            value={gpa}
            onChange={e => setGpa(parseFloat(e.target.value))}
            style={{ marginLeft: 8 }}
          />
        </label>
        <label>
          MCAT
          <input
            type="number"
            step="1"
            min="472"
            max="528"
            value={mcat}
            onChange={e => setMcat(parseInt(e.target.value))}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>

      <div>
        <p>MCAT bin {mLabel ?? 'n/a'} • GPA bin {gLabel ?? 'n/a'}</p>
        <p>MCAT percentile {percentile(mcat) ?? 'n/a'}</p>
        <p>
          Baseline acceptance {cell?.acceptRate != null ? (cell.acceptRate * 100).toFixed(1) + '%' : 'n/a'}
        </p>
      </div>

      <section>
        <h3>Upload official data</h3>
        <p>Drop JSON converted from AAMC sources.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <label>
            A-23 grid JSON
            <input type="file" accept="application/json" onChange={(e) => onFile(e, 'a23')} />
          </label>
          <label>
            Percentiles JSON
            <input type="file" accept="application/json" onChange={(e) => onFile(e, 'pct')} />
          </label>
        </div>
        <details>
          <summary>JSON shapes</summary>
          <pre>{`[{"mcatRange":">517","gpaRange":"3.60-3.79","acceptRate":0.724}]`}</pre>
          <pre>{`[{"score":518,"percentile":95}]`}</pre>
        </details>
      </section>
    </div>
  )
}