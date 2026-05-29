import { Link } from 'react-router-dom';
import { PHASES } from '../data/phases';
import { useProgress } from '../hooks/useProgress';

export default function Journey() {
  const { state, pct, completed, total } = useProgress();

  return (
    <div className="page">
      <div className="eyebrow fade-up">The journey</div>
      <h1 className="fade-up" style={{ fontSize: 40, margin: '8px 0 10px', letterSpacing: '-0.02em' }}>
        Run the eight phases in order — or jump to what you need
      </h1>
      <p className="fade-up-2" style={{ color: 'var(--ink-soft)', maxWidth: '66ch', fontSize: 17 }}>
        Phases 1–6 are roughly the five asks of any engagement. Phases 0, 7, and 8 are the “10×” — the parts
        that make solutions survive contact with production and make <em>you</em> the person clients trust with
        the next problem.
      </p>

      <div className="card fade-up-3" style={{ margin: '24px 0 36px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div className="side-progress" style={{ padding: 0 }}>
            <div className="bar"><span style={{ width: `${pct}%` }} /></div>
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 8 }}>
            {completed} of {total} built phases complete · progress saved on this device
          </div>
        </div>
        <Link to="/phase/orient" className="btn btn-primary btn-sm">Resume / start →</Link>
      </div>

      <div className="grid grid-2">
        {PHASES.map((p) => (
          <Link key={p.slug} to={`/phase/${p.slug}`} className="card card-hover" style={{ display: 'block', position: 'relative', borderTop: `4px solid ${p.accent}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 40, height: 40, borderRadius: 11, background: p.accent, color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>
                {state[p.slug] ? '✓' : p.id}
              </span>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: p.accent, letterSpacing: '.1em' }}>{p.verb}</div>
                <h3 style={{ fontSize: 18, margin: 0 }}>{p.title}</h3>
              </div>
              {!p.built && <span style={{ marginLeft: 'auto', fontSize: 10.5, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>soon</span>}
            </div>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14, margin: '14px 0 0' }}>{p.summary}</p>
            <p style={{ color: 'var(--ink-faint)', fontSize: 13, margin: '12px 0 0', fontStyle: 'italic' }}>“{p.oneSentence}”</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
