import { useState } from 'react';
import './visuals.css';
import { SPECTRUM, RUNGS } from '../data/phases';

const SEG_COLORS = ['#19c37d', '#36b37e', '#f5a623', '#ff9f1c', '#ff7a45', '#ff5470'];

// ---- Interactive agent spectrum ----
export function AgentSpectrum() {
  const [active, setActive] = useState(4);
  const seg = SPECTRUM[active];
  return (
    <div className="spectrum">
      <div className="spectrum-meter" />
      <div className="spectrum-track">
        {SPECTRUM.map((s, i) => (
          <button
            key={s.level}
            className={`spectrum-seg ${active === i ? 'active' : ''}`}
            style={active === i ? { background: SEG_COLORS[i] } : {}}
            onClick={() => setActive(i)}
          >
            <div className="lv">L{s.level}</div>
            <div className="nm">{s.name.split(' ')[0]}</div>
          </button>
        ))}
      </div>
      <div className="spectrum-detail" style={{ background: `linear-gradient(135deg, ${SEG_COLORS[active]}, ${SEG_COLORS[Math.min(active + 1, 5)]})` }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, opacity: .85 }}>LEVEL {seg.level}</div>
        <h4>{seg.name}</h4>
        <p style={{ color: 'rgba(255,255,255,.92)', margin: '6px 0 0' }}>{seg.what}</p>
        <div className="meta">
          <span>Decides? {seg.decides}</span>
          <span>Acts? {seg.acts}</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,.92)', marginTop: 12 }}><b>Good for:</b> {seg.good}</p>
      </div>
    </div>
  );
}

// ---- Autonomy 2x2 ----
export function Autonomy2x2() {
  return (
    <div className="quad-wrap">
      <div className="quad">
        <div className="axis-y"><span style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>← Reversible · Irreversible →</span></div>
        <div className="head"><span>Low impact</span></div>
        <div className="head"><span>High impact</span></div>

        <div className="cell cell-green"><span className="lab">Reversible · Low</span><span className="val">Full autonomy</span></div>
        <div className="cell cell-amber"><span className="lab">Reversible · High</span><span className="val">Autonomy + log/monitor</span></div>

        <div className="cell cell-orange"><span className="lab">Irreversible · Low</span><span className="val">Autonomy with cap/confirm</span></div>
        <div className="cell cell-red"><span className="lab">Irreversible · High</span><span className="val">Human approval required</span></div>
      </div>
      <div className="quad-x"><div /><div className="axis-x"><span>Blast radius →</span></div></div>
    </div>
  );
}

// ---- Autonomy ladder ----
const RUNG_COLORS = ['#8b5cf6', '#4b62ff', '#0fc9b5', '#f5a623', '#19c37d'];
export function AutonomyLadder() {
  return (
    <div className="ladder">
      {RUNGS.map((r, i) => (
        <div className="ladder-rung" key={r.n}>
          <div className="rn" style={{ background: RUNG_COLORS[i] }}>{r.n}</div>
          <div>
            <div className="ladder-name">{r.name}</div>
            <div className="ladder-desc">{r.desc}</div>
          </div>
          <div className="hitl"><b>{r.hitl}</b>HITL</div>
        </div>
      ))}
    </div>
  );
}

// ---- Closed loop ----
export function ClosedLoop() {
  const steps = [
    { n: '01', t: 'Eval produces evidence', d: 'Golden set + metrics generate an objective read.', c: 'linear-gradient(135deg,#19c37d,#0f9d8a)' },
    { n: '02', t: 'Evidence is the gate', d: 'A measured metric clearing a threshold unlocks promotion.', c: 'linear-gradient(135deg,#4b62ff,#6d4bff)' },
    { n: '03', t: 'Climb drops HITL%', d: 'Less human time per case as autonomy rises.', c: 'linear-gradient(135deg,#f5a623,#ff7a45)' },
    { n: '04', t: 'Economics fund N+1', d: 'Better unit cost funds the next use case; corrections feed eval.', c: 'linear-gradient(135deg,#c14bff,#ff4bb0)' },
  ];
  return (
    <div className="loop-grid">
      {steps.map((s) => (
        <div className="loop-step" key={s.n} style={{ background: s.c }}>
          <div className="n">{s.n}</div>
          <h4>{s.t}</h4>
          <p>{s.d}</p>
        </div>
      ))}
    </div>
  );
}
