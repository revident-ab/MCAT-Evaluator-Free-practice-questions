import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <section>
        <h2>Start</h2>
        <p>Use two tools.</p>
        <ul>
          <li><strong>Practice</strong> drills items with spacing.</li>
          <li><strong>Evaluator</strong> shows baseline acceptance and percentile.</li>
        </ul>
      </section>

      <section>
        <h3>Quick actions</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/practice">Go to Practice</Link>
          <Link to="/evaluator">Open Evaluator</Link>
        </div>
      </section>

      <section>
        <h3>How to use</h3>
        <ul>
          <li>Do 10 practice items per session.</li>
          <li>Rate each item. The scheduler sets the next review.</li>
          <li>Open Evaluator. Enter GPA and MCAT.</li>
          <li>Upload AAMC grid and percentile files to use official data.</li>
        </ul>
      </section>
    </div>
  )
}