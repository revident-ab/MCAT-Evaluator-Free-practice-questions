import { Outlet, Link, useLocation } from 'react-router-dom'

export default function App() {
  const { pathname } = useLocation()
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 960, margin: '0 auto', padding: 16 }}>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 22 }}>MCAT Toolkit + Chance Evaluator</h1>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/">Home</Link>
          <Link to="/practice">Practice</Link>
          <Link to="/evaluator">Evaluator</Link>
        </nav>
        <div style={{ marginLeft: 'auto', fontSize: 12, opacity: 0.7 }}>
          {pathname}
        </div>
      </header>
      <Outlet />
      <footer style={{ marginTop: 32, fontSize: 12, opacity: 0.7 }}>
        <p>
          Data sources: AAMC Table A-23 (MCAT-GPA Acceptance Grid) and AAMC MCAT Percentile Ranks. 
          Replace sample data with official data in <code>src/data</code>.
        </p>
      </footer>
    </div>
  )
}