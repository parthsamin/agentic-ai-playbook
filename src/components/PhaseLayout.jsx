import { Link } from 'react-router-dom';
import { PHASES } from '../data/phases';
import { useProgress } from '../hooks/useProgress';
import { PlayCard, WorkedExample } from './PhaseExtras';

export default function PhaseLayout({ phase, toc, children }) {
  const { state, toggle } = useProgress();
  const done = !!state[phase.slug];
  const prev = PHASES[phase.id - 1];
  const next = PHASES[phase.id + 1];

  // HashRouter uses the URL hash for routing, so plain #anchor links break.
  // Scroll to the section manually instead.
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="page prose">
      <div className="phase-head fade-up">
        <span className="badge" style={{ background: phase.accent }}>
          PHASE {phase.id} · {phase.verb}
        </span>
        <h1>{phase.title}</h1>
        <p className="tagline">{phase.tagline}</p>
      </div>

      {toc && (
        <div className="toc fade-up-2">
          {toc.map((t) => <a key={t.id} href={`#${t.id}`} onClick={(e) => scrollTo(e, t.id)}>{t.label}</a>)}
        </div>
      )}

      <PlayCard slug={phase.slug} accent={phase.accent} />

      <div className="fade-up-3">{children}</div>

      <h2 id="worked-example">See it worked — both cases</h2>
      <p style={{ marginTop: 0 }}>
        The same step, played concretely on each case. Switch tabs to compare, or open a full playthrough.
      </p>
      <WorkedExample phaseId={phase.id} accent={phase.accent} />

      <div className={`complete-bar ${done ? 'done' : ''}`}>
        <span style={{ fontSize: 22 }}>{done ? '✅' : '◻️'}</span>
        <div style={{ flex: 1 }}>
          <strong>{done ? 'Phase complete' : 'Mark this phase complete'}</strong>
          <div style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>
            {done ? 'Nice — your progress is saved on this device.' : 'Track your progress through the playbook.'}
          </div>
        </div>
        <button className="btn btn-sm btn-primary" onClick={() => toggle(phase.slug)}>
          {done ? 'Mark incomplete' : 'Mark complete'}
        </button>
      </div>

      <div className="phase-foot">
        {prev ? (
          <Link to={`/phase/${prev.slug}`}>
            <div className="dir">← Previous</div>
            <div className="ttl">{prev.id}. {prev.title}</div>
          </Link>
        ) : (
          <Link to="/">
            <div className="dir">← Back</div>
            <div className="ttl">Overview</div>
          </Link>
        )}
        {next ? (
          <Link to={`/phase/${next.slug}`} className="next">
            <div className="dir">Next →</div>
            <div className="ttl">{next.id}. {next.title}</div>
          </Link>
        ) : (
          <Link to="/toolkit" className="next">
            <div className="dir">Next →</div>
            <div className="ttl">Pocket Toolkit</div>
          </Link>
        )}
      </div>
    </div>
  );
}
