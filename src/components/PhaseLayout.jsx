import { Link } from 'react-router-dom';
import { PHASES } from '../data/phases';
import { RUNBOOK } from '../data/runbook';
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span className="badge" style={{ background: phase.accent }}>
            PHASE {phase.id} · {phase.verb}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-faint)' }}>
            Phase {phase.id + 1} of {PHASES.length}
          </span>
        </div>
        <h1>{phase.title}</h1>
        <p className="tagline">{phase.tagline}</p>
      </div>

      {toc && (
        <div className="toc fade-up-2">
          {toc.map((t) => <a key={t.id} href={`#${t.id}`} onClick={(e) => scrollTo(e, t.id)}>{t.label}</a>)}
        </div>
      )}

      <p className="phase-lead fade-up-2">{phase.summary}</p>

      <PlayCard slug={phase.slug} accent={phase.accent} />

      <div className="fade-up-3">{children}</div>

      <h2 id="worked-example">See it worked — both cases</h2>
      <p style={{ marginTop: 0 }}>
        Here’s exactly what <strong>{RUNBOOK[phase.slug]?.produces.replace(/\.$/, '') || 'this phase'}</strong> looks
        like on each case. Switch tabs to compare, or open a full playthrough.
      </p>
      <WorkedExample phaseId={phase.id} accent={phase.accent} />

      <div className="phase-drill-cta">
        <span style={{ fontSize: 22 }}>🎯</span>
        <div className="pdc-t">
          <strong>Pressure-test this phase</strong>
          <p>A short, mixed-format drill in the Case Lab — with a debrief on every answer.</p>
        </div>
        <Link to={`/lab/drill/${phase.slug}`} className="btn btn-sm btn-ghost">Take the {phase.title} drill →</Link>
      </div>

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
