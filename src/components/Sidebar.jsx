import { NavLink, useLocation } from 'react-router-dom';
import { PHASES } from '../data/phases';
import { useProgress } from '../hooks/useProgress';

export default function Sidebar({ open, onClose }) {
  const { state, pct, completed, total } = useProgress();
  const loc = useLocation();

  return (
    <>
      {open && <div className="scrim" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand-block">
          <NavLink to="/" className="brand-mark" onClick={onClose} style={{ color: 'inherit' }}>
            <span className="brand-dot">◆</span>
            <span>Agentic&nbsp;AI<br />Playbook</span>
          </NavLink>
          <div className="brand-sub">build · de-risk · ship</div>
        </div>

        <div className="side-progress">
          <div className="bar"><span style={{ width: `${pct}%` }} /></div>
          <div className="pct">{completed}/{total} phases · {pct}% complete</div>
        </div>

        <div className="nav-label">Start</div>
        <NavLink to="/" end className="nav-item" onClick={onClose}
          style={{ '--accent': 'var(--brand)' }}>
          <span className="nav-num">⌂</span> Overview
        </NavLink>
        <NavLink to="/journey" className="nav-item" onClick={onClose}
          style={{ '--accent': 'var(--brand)' }}>
          <span className="nav-num">↝</span> The Journey
        </NavLink>
        <NavLink to="/cases" className="nav-item" onClick={onClose}
          style={{ '--accent': 'var(--p2)' }}>
          <span className="nav-num">▶</span> Worked Cases
        </NavLink>
        <NavLink to="/lab" className="nav-item" onClick={onClose}
          style={{ '--accent': 'var(--p5)' }}>
          <span className="nav-num">🎯</span> Case Lab
        </NavLink>

        <div className="nav-label">The 8 Phases</div>
        {PHASES.map((p) => (
          <NavLink key={p.slug} to={`/phase/${p.slug}`} className="nav-item" onClick={onClose}
            style={{ '--accent': p.accent }}>
            <span className="nav-num">{p.id}</span>
            <span>{p.title}</span>
            {state[p.slug] && <span className="nav-check">✓</span>}
            {!p.built && <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>soon</span>}
          </NavLink>
        ))}

        <div className="nav-label">Deep Dives & Kit</div>
        <NavLink to="/deep/autonomy-eval" className="nav-item" onClick={onClose}
          style={{ '--accent': 'var(--p7)' }}>
          <span className="nav-num">▲</span> Autonomy & Eval
        </NavLink>
        <NavLink to="/operate" className="nav-item" onClick={onClose}
          style={{ '--accent': 'var(--p8)' }}>
          <span className="nav-num">⚙</span> Operate (Day 2)
        </NavLink>
        <NavLink to="/tools" className="nav-item" onClick={onClose}
          style={{ '--accent': 'var(--teal)' }}>
          <span className="nav-num">⚒</span> Workshop Tools
        </NavLink>
        <NavLink to="/toolkit" className="nav-item" onClick={onClose}
          style={{ '--accent': 'var(--amber)' }}>
          <span className="nav-num">★</span> Pocket Toolkit
        </NavLink>
        <NavLink to="/glossary" className="nav-item" onClick={onClose}
          style={{ '--accent': 'var(--p8)' }}>
          <span className="nav-num">📖</span> Glossary
        </NavLink>

        <div className="side-credit">
          Built by <a href="https://www.linkedin.com/in/aminparth" target="_blank" rel="noopener noreferrer">Parth Amin</a>
        </div>
        <div className="bmc-label">Liked it?</div>
        <a className="bmc" href="https://buymeacoffee.com/_parthamin" target="_blank" rel="noopener noreferrer">
          <span style={{ fontSize: 16 }}>☕</span> Buy me a coffee
        </a>
      </aside>
    </>
  );
}
