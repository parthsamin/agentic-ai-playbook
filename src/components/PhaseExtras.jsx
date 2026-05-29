import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RUNBOOK } from '../data/runbook';
import { CASES } from '../data/cases';
import { Artifact } from './CaseArtifacts';
import './caseviz.css';

// "How to run this phase" — the consistent 4-move recipe.
export function PlayCard({ slug, accent }) {
  const r = RUNBOOK[slug];
  if (!r) return null;
  return (
    <div className="playcard">
      <div className="pc-head" style={{ background: accent }}>
        🎮 How to run this phase — in 4 moves
      </div>
      <div className="pc-grid">
        <div className="pc-col">
          <h5>① Ask</h5>
          <ul>{r.ask.map((q, i) => <li key={i}>{q}</li>)}</ul>
        </div>
        <div className="pc-col">
          <h5>② Fill</h5>
          <ul><li>{r.fill}</li></ul>
        </div>
      </div>
      <div className="pc-produce">
        <div className="pp"><b>③ Produces</b>{r.produces}</div>
        <div className="pp"><b>④ Decision</b>{r.decision}</div>
      </div>
    </div>
  );
}

// Concrete worked example for THIS phase — both cases, tabbed.
export function WorkedExample({ phaseId, accent }) {
  const [tab, setTab] = useState('priorauth');
  const c = CASES[tab];
  const step = c.journey[phaseId];
  return (
    <div className="we-embed">
      <div className="we-tabs">
        {Object.values(CASES).map((cc) => (
          <button key={cc.id} className={tab === cc.id ? 'active' : ''} onClick={() => setTab(cc.id)}
            style={tab === cc.id ? { boxShadow: `inset 0 -3px 0 ${cc.accent}` } : {}}>
            <span>{cc.emoji}</span> {cc.short}
          </button>
        ))}
      </div>
      <div className="we-body">
        {step.artifact ? (
          <>
            <p className="we-cap">What you’d fill in for this case → {step.produces}</p>
            <Artifact type={step.artifact} c={c} />
          </>
        ) : (
          <p className="we-cap">Produces: {step.produces}</p>
        )}
        <div className="decision-box" style={{ marginTop: 14 }}>
          <span className="ic">✅</span>
          <div>
            <div className="dl">The decision</div>
            <div className="dv">{step.decision}</div>
          </div>
        </div>
        <p style={{ fontSize: 12.5, margin: '12px 0 0' }}>
          <Link to={`/case/${c.id}`}>See the full {c.short} playthrough →</Link>
        </p>
      </div>
    </div>
  );
}
