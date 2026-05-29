import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCase, computeEconomics } from '../data/cases';
import { PHASES } from '../data/phases';
import { Artifact } from '../components/CaseArtifacts';
import '../components/caseviz.css';

export default function Playthrough() {
  const { caseId } = useParams();
  const c = getCase(caseId);
  const [stage, setStage] = useState(0); // 0..8 phases, 9 = dossier
  if (!c) return <div className="page"><h2>Case not found</h2><Link to="/cases">← Back to cases</Link></div>;

  const isDossier = stage === 9;
  const phase = PHASES[stage];
  const step = !isDossier ? c.journey[stage] : null;

  return (
    <div className="page">
      <div className="pt-hero fade-up" style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${c.accent} 92%, #000) 0%, color-mix(in srgb, ${c.accent} 60%, #2a1a4d) 100%)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="emoji">{c.emoji}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,.85)' }}>{c.sector}</span>
        </div>
        <h1>{c.name}</h1>
        <p className="sub">{c.tagline} This walkthrough teaches {c.teaches}.</p>
      </div>

      {/* Stepper */}
      <div className="stepper">
        {PHASES.map((p) => (
          <button key={p.id} className={stage === p.id ? 'active' : ''}
            style={stage === p.id ? { background: p.accent } : {}}
            onClick={() => setStage(p.id)}>
            <span className="sn">{p.id}</span> {p.title}
          </button>
        ))}
        <button className={isDossier ? 'active' : ''} style={isDossier ? { background: 'var(--ink)' } : {}} onClick={() => setStage(9)}>
          <span className="sn">★</span> Dossier
        </button>
      </div>

      {isDossier ? (
        <Dossier c={c} onJump={setStage} />
      ) : (
        <div className="stage fade-up">
          <div className="stage-head">
            <div className="stage-num" style={{ background: phase.accent }}>{phase.id}</div>
            <div>
              <div className="verb" style={{ color: phase.accent }}>{phase.verb}</div>
              <h3>{phase.title}</h3>
            </div>
          </div>

          <div className="stage-block">
            <div className="bh" style={{ color: phase.accent }}>① Questions you ask</div>
            <ul className="qa-list">
              {step.questions.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
          </div>

          {step.artifact && (
            <div className="stage-block">
              <div className="bh" style={{ color: phase.accent }}>② What you fill in → {step.produces}</div>
              <Artifact type={step.artifact} c={c} />
            </div>
          )}
          {!step.artifact && (
            <div className="stage-block">
              <div className="bh" style={{ color: phase.accent }}>② What you produce</div>
              <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 14 }}>{step.produces}.</p>
            </div>
          )}

          <div className="decision-box">
            <span className="ic">✅</span>
            <div>
              <div className="dl">③ The decision this yields</div>
              <div className="dv">{step.decision}</div>
            </div>
          </div>

          {stage < 8 && (
            <p className="unlock-note">→ Feeds the next step: <strong style={{ color: 'var(--ink-soft)' }}>{PHASES[stage + 1].title}</strong></p>
          )}

          <div className="phase-foot">
            <button className="btn btn-ghost" onClick={() => setStage(Math.max(0, stage - 1))} disabled={stage === 0} style={stage === 0 ? { opacity: .4, cursor: 'default' } : {}}>← Previous step</button>
            <button className="btn btn-primary next" onClick={() => setStage(stage + 1)}>
              {stage === 8 ? 'See the Decision Dossier →' : `Next: ${PHASES[stage + 1].title} →`}
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 30 }}>
        <Link to="/cases" style={{ fontSize: 14 }}>← Back to both cases</Link>
      </div>
    </div>
  );
}

function Dossier({ c, onJump }) {
  const econ = computeEconomics(c);
  return (
    <div className="dossier fade-up">
      <div className="eyebrow">The closure</div>
      <h2>{c.short} — Decision Dossier</h2>
      <p style={{ color: 'var(--ink-soft)', maxWidth: '66ch' }}>
        Nine steps, nine artifacts, one recommendation a PM can take into execution. Headline economics:{' '}
        <strong>{econ.headline}</strong>.
      </p>

      {PHASES.map((p) => {
        const j = c.journey[p.id];
        return (
          <div className="dossier-row" key={p.id}>
            <div className="dp">
              <span className="pa">PHASE {p.id} · {p.verb}</span>
              <button onClick={() => onJump(p.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: p.accent, textAlign: 'left' }}>{p.title} ↗</button>
            </div>
            <div className="da">
              <div>{j.decision}</div>
              <div className="art">Artifact: {j.produces}</div>
            </div>
          </div>
        );
      })}

      <div className="callout callout-key" style={{ marginTop: 22 }}>
        <span className="ic">🎯</span>
        <div>
          <h4>Final recommendation</h4>
          <p>
            {c.id === 'priorauth'
              ? 'Build a triage-router + RAG-drafting agent with a permanent human signature. Ship to Shadow, climb the autonomy ladder only as the clinician edit-rate and citation faithfulness clear pre-agreed gates, and never let determinations reach full autopilot. The clinician time returned dwarfs run cost; the correction loop becomes the moat.'
              : 'Build an intent-router that splits WISMO (workflow) from judgment (bounded agent), with a capped action layer for refunds. Ship to Shadow, climb to assist/act-with-caps as deflection and CSAT clear gates, and keep large/out-of-policy refunds human. Watch cost-per-successful-resolution so deflection is real, not re-contact churn.'}
          </p>
        </div>
      </div>

      <Link to="/tools" className="btn btn-primary btn-sm" style={{ marginTop: 18 }}>Open the tools with this example loaded →</Link>
    </div>
  );
}
