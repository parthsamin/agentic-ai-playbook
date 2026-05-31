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
        🎮 How to run this phase — at a glance (4 moves)
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

// Questions paired with this case's answer + reasoning.
export function QAList({ qa, accent }) {
  return (
    <div className="pt-qa-list">
      {qa.map((item, i) => (
        <div className="pt-qa" key={i}>
          <div className="pt-q" style={{ color: accent }}><span className="pt-qmark" style={{ background: accent }}>Q</span>{item.q}</div>
          <div className="pt-a"><strong>Answer:</strong> {item.a}</div>
          <div className="pt-qwhy"><strong>Why:</strong> {item.why}</div>
        </div>
      ))}
    </div>
  );
}

// Handoff + takeaway footer for a worked stage.
export function StageMeta({ handoff, takeaway, nextLabel }) {
  return (
    <div className="stage-meta">
      {handoff && (
        <div className="sm-item">
          <span className="sm-ic">→</span>
          <div><b>Hands off to {nextLabel ? `${nextLabel}` : 'the next phase'}:</b> {handoff}</div>
        </div>
      )}
      {takeaway && (
        <div className="sm-item sm-takeaway">
          <span className="sm-ic">💡</span>
          <div><b>Takeaway:</b> {takeaway}</div>
        </div>
      )}
    </div>
  );
}

// Concrete worked example for THIS phase — both cases, tabbed, with full reasoning.
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
        <div className="pt-situation" style={{ margin: '0 0 14px' }}>
          <span className="pt-sit-label">The situation</span>
          <p>{step.situation}</p>
        </div>

        <div className="we-sub" style={{ color: accent }}>The questions, answered</div>
        <QAList qa={step.qa} accent={accent} />

        <div className="we-sub" style={{ color: accent, marginTop: 16 }}>What you produce → {step.produces}</div>
        {step.artifact ? <Artifact type={step.artifact} c={c} /> : <p style={{ color: 'var(--ink-soft)' }}>{step.produces}.</p>}
        {step.artifactNote && <p className="pt-note"><span>👁</span> {step.artifactNote}</p>}

        <div className="decision-box" style={{ marginTop: 14 }}>
          <span className="ic">✅</span>
          <div>
            <div className="dl">The decision — and why</div>
            <div className="dv">{step.decision}</div>
            <div className="pt-why"><strong>Why:</strong> {step.why}</div>
          </div>
        </div>

        <p style={{ fontSize: 13, margin: '12px 0 0', color: 'var(--ink-soft)' }}>
          💡 <strong>Takeaway:</strong> {step.takeaway}
        </p>
        <p style={{ fontSize: 12.5, margin: '10px 0 0' }}>
          <Link to={`/case/${c.id}`}>See the full {c.short} playthrough →</Link>
        </p>
      </div>
    </div>
  );
}
