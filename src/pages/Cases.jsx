import { Link } from 'react-router-dom';
import { CASE_LIST } from '../data/cases';
import '../components/caseviz.css';

export default function Cases() {
  return (
    <div className="page">
      <div className="eyebrow fade-up">Worked examples</div>
      <h1 className="fade-up" style={{ fontSize: 40, margin: '8px 0 10px', letterSpacing: '-0.02em' }}>
        Meet the two cases
      </h1>
      <p className="fade-up-2" style={{ color: 'var(--ink-soft)', fontSize: 17, maxWidth: '70ch' }}>
        The same eight phases are played end-to-end on two deliberately different problems. Follow either one from
        a blank page to a finished <strong>Decision Dossier</strong> — at every step you’ll see the exact questions
        to ask, what to fill in, and the decision it produces. The contrast is the point: one teaches{' '}
        <strong>governance and human-in-the-loop</strong>, the other teaches <strong>autonomy and unit economics</strong>.
      </p>

      <div className="grid grid-2" style={{ marginTop: 28 }}>
        {CASE_LIST.map((c) => (
          <div className="card card-hover" key={c.id} style={{ borderTop: `5px solid ${c.accent}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 30 }}>{c.emoji}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: c.accent }}>{c.sector}</div>
                <h3 style={{ fontSize: 19, margin: 0 }}>{c.name}</h3>
              </div>
            </div>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14, margin: '14px 0' }}>{c.setup.scenario}</p>

            <div style={{ background: 'var(--surface-2)', borderRadius: 12, padding: 14, margin: '4px 0 14px' }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Baseline today</div>
              {c.setup.baseline.map((b, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0', borderBottom: i < c.setup.baseline.length - 1 ? '1px dashed var(--line)' : 'none' }}>
                  <span style={{ color: 'var(--ink-soft)' }}>{b.label}</span>
                  <b className="mono">{b.value}</b>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 13, margin: '0 0 6px' }}><strong>Who’s involved:</strong> <span style={{ color: 'var(--ink-soft)' }}>{c.setup.people}</span></p>
            <p style={{ fontSize: 13, margin: '0 0 6px' }}><strong>What’s at stake:</strong> <span style={{ color: 'var(--ink-soft)' }}>{c.setup.stakes}</span></p>
            <p style={{ fontSize: 13, margin: '0 0 16px' }}><strong>What winning looks like:</strong> <span style={{ color: 'var(--ink-soft)' }}>{c.setup.win}</span></p>

            <Link to={`/case/${c.id}`} className="btn btn-primary btn-sm" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
              Play it through →
            </Link>
          </div>
        ))}
      </div>

      <div className="callout callout-tip" style={{ marginTop: 28 }}>
        <span className="ic">🧰</span>
        <div>
          <h4>Use it on your own problem</h4>
          <p>
            Every artifact you see in a playthrough can be loaded into the <Link to="/tools">Workshop Tools</Link> as
            a starting template — open a tool, click “Load Prior Auth” or “Load Retail,” then edit it for your case.
          </p>
        </div>
      </div>
    </div>
  );
}
