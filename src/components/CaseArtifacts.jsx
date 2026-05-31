import './caseviz.css';
import { computeEconomics } from '../data/cases';

const LVL_COLOR = { L0: '#19c37d', L1: '#36b37e', L2: '#f5a623', L3: '#ff9f1c', L4: '#ff7a45', L5: '#ff5470', H: '#8b5cf6' };
const LVL_LABEL = { L0: 'L0', L1: 'L1', L2: 'L2', L3: 'L3', L4: 'L4', L5: 'L5', H: 'Human' };
const RUNG_LABEL = { R1: 'R1 Shadow', R2: 'R2 Suggest', R3: 'R3 Assist', R4: 'R4 Act-w/-limits', R5: 'R5 Autopilot', H: 'Human only', na: 'n/a' };

// ---- Reference architecture flow ----
export function FlowDiagram({ steps }) {
  return (
    <div className="flow">
      {steps.map((s, i) => (
        <FlowNodeWrap key={i} last={i === steps.length - 1}>
          <div className={`flow-node fk-${s.kind}`}>
            <span className="fn-label">{s.label}</span>
            {s.sub && <span className="fn-sub">{s.sub}</span>}
          </div>
        </FlowNodeWrap>
      ))}
    </div>
  );
}
function FlowNodeWrap({ children, last }) {
  return (
    <>
      {children}
      {!last && <span className="flow-arrow">→</span>}
    </>
  );
}

// ---- Filled Opportunity Canvas (read-only) ----
const CANVAS_FIELDS = [
  ['job', 'Job to be done', true], ['process', "Today's process", false], ['bottleneck', 'The bottleneck', false],
  ['trigger', 'Trigger & inputs', false], ['dod', 'Definition of done', false], ['action', 'Action surface', false],
  ['reversibility', 'Reversibility', false], ['value', 'Value', true], ['guardrails', 'Guardrails', true],
];
export function FilledCanvas({ c }) {
  return (
    <div className="fc-grid">
      {CANVAS_FIELDS.map(([k, label, wide]) => (
        <div className={`fc-cell ${wide ? 'wide' : ''}`} key={k}>
          <div className="fc-label">{label}</div>
          <div className="fc-val">{c.canvas[k]}</div>
        </div>
      ))}
    </div>
  );
}

// ---- Spectrum verdict (Phase 0) ----
export function SpectrumVerdict({ c }) {
  const rows = c.decomposition;
  const agent = rows.filter((r) => r.level === 'L4' || r.level === 'L5').length;
  const human = rows.filter((r) => r.level === 'H').length;
  const other = rows.length - agent - human;
  return (
    <>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Step</th><th>Verdict</th><th>Why</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.step}</td>
                <td><span className="lvl-pill" style={{ background: LVL_COLOR[r.level] }}>{LVL_LABEL[r.level]}</span></td>
                <td style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{r.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="decomp-summary" style={{ marginTop: 14 }}>
        <div className="box" style={{ background: 'linear-gradient(135deg,#19c37d,#0f9d8a)' }}>
          <div className="big">{other}</div><div className="lbl">stay code / ML / workflow</div>
        </div>
        <div className="box" style={{ background: 'linear-gradient(135deg,#ff7a45,#ff5470)' }}>
          <div className="big">{agent}</div><div className="lbl">genuinely agent-suitable (L4–L5)</div>
        </div>
        <div className="box" style={{ background: 'linear-gradient(135deg,#8b5cf6,#6d4bff)' }}>
          <div className="big">{human}</div><div className="lbl">must stay human</div>
        </div>
      </div>
    </>
  );
}

// ---- Filled decomposition ----
export function FilledDecomposition({ c }) {
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Step</th><th>Who does it today</th><th>Spectrum fit</th><th>Error cost</th></tr></thead>
        <tbody>
          {c.decomposition.map((r, i) => (
            <tr key={i}>
              <td>{r.step}</td>
              <td>{r.today}</td>
              <td><span className="lvl-pill" style={{ background: LVL_COLOR[r.level] }}>{LVL_LABEL[r.level]}</span></td>
              <td>{r.err}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---- Read-only autonomy matrix ----
export function ReadOnlyMatrix({ c }) {
  const m = c.matrix;
  return (
    <>
      <div className="romx">
        <table>
          <thead>
            <tr><th></th>{m.segments.map((s, i) => <th key={i}>{s}</th>)}</tr>
          </thead>
          <tbody>
            {m.actions.map((a, ai) => (
              <tr key={ai}>
                <td className="rowhead">{a}</td>
                {m.segments.map((_, si) => {
                  const v = m.cells[`${ai}-${si}`] || 'na';
                  return <td key={si}><div className={`mx mx-${v}`}>{RUNG_LABEL[v]}</div></td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {m.note && <p style={{ fontSize: 12.5, color: 'var(--ink-faint)', margin: 0 }}>✱ {m.note}</p>}
    </>
  );
}

// ---- Risk register ----
export function RiskRegister({ c }) {
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Risk</th><th>Mitigation</th><th>Owner</th></tr></thead>
        <tbody>
          {c.risks.map((r, i) => (
            <tr key={i}><td><strong>{r.risk}</strong></td><td>{r.mit}</td><td>{r.owner}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---- Strategy one-pager ----
export function StrategyOnePager({ c }) {
  const s = c.strategy;
  const rows = [['North Star', s.northStar], ['Moat', s.moat], ['Lighthouse', s.lighthouse], ['Platform', s.platform]];
  return (
    <div className="grid grid-2">
      {rows.map(([t, d]) => (
        <div className="card" key={t} style={{ borderLeft: `4px solid ${c.accent}` }}>
          <h4 style={{ margin: 0, fontSize: 14 }}>{t}</h4>
          <p style={{ margin: '6px 0 0', fontSize: 13.5, color: 'var(--ink-soft)' }}>{d}</p>
        </div>
      ))}
    </div>
  );
}

// ---- Roadmap strip ----
export function RoadmapStrip({ c }) {
  const r = c.roadmap;
  const cols = [['Now · 0–3 mo', r.now, 'var(--p7)'], ['Next · 3–9 mo', r.next, 'var(--p6)'], ['Later · 9–18 mo', r.later, 'var(--p1)']];
  return (
    <>
      <div className="rmstrip">
        {cols.map(([h, d, col]) => (
          <div className="rm" key={h} style={{ borderTopColor: col }}>
            <div className="h" style={{ color: col }}>{h}</div>
            <p>{d}</p>
          </div>
        ))}
      </div>
      <div className="callout callout-trap" style={{ margin: '8px 0 0' }}>
        <span className="ic">⛔</span>
        <div><strong>Ceiling:</strong> {r.ceiling}</div>
      </div>
    </>
  );
}

// ---- Economics card (computed) ----
export function EconomicsCard({ c }) {
  const e = c.economics;
  const r = computeEconomics(c);
  return (
    <div className="econ-card">
      <div className="econ-assume">
        {e.assumptions.map((a, i) => (
          <div className="row" key={i}><span>{a.k}</span><b>{a.v}</b></div>
        ))}
      </div>
      <div className="econ-calc">
        <div className="econ-pill" style={{ background: 'linear-gradient(135deg,#4b62ff,#6d4bff)' }}>
          <div className="ep-lbl">Cost per successful task</div>
          <div className="ep-val">${r.costPerSuccess.toFixed(2)}</div>
        </div>
        {c.id === 'priorauth' ? (
          <>
            <div className="econ-pill" style={{ background: 'linear-gradient(135deg,#19c37d,#0f9d8a)' }}>
              <div className="ep-lbl">Clinician time saved / case</div>
              <div className="ep-val">${r.savedPerCase}</div>
            </div>
            <div className="econ-pill" style={{ background: 'linear-gradient(135deg,#f5a623,#ff7a45)' }}>
              <div className="ep-lbl">On auto-approvable segment</div>
              <div className="ep-val">${r.fullSave}/case</div>
            </div>
          </>
        ) : (
          <>
            <div className="econ-pill" style={{ background: 'linear-gradient(135deg,#19c37d,#0f9d8a)' }}>
              <div className="ep-lbl">Net value / auto-resolved</div>
              <div className="ep-val">${r.netPerContact.toFixed(2)}</div>
            </div>
            <div className="econ-pill" style={{ background: 'linear-gradient(135deg,#f5a623,#ff7a45)' }}>
              <div className="ep-lbl">Gross annual value</div>
              <div className="ep-val">${(r.annual / 1e6).toFixed(2)}M</div>
            </div>
          </>
        )}
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--ink-faint)', margin: '14px 0 0' }}>💡 {e.note}</p>
    </div>
  );
}

// ---- Scale card ----
export function ScaleCard({ c }) {
  const s = c.scale;
  const rows = [['Role shift', s.roleShift], ['Trust & adoption', s.trust], ['Governance', s.governance]];
  return (
    <div className="grid grid-3">
      {rows.map(([t, d]) => (
        <div className="card" key={t} style={{ borderTop: `4px solid ${c.accent}` }}>
          <h4 style={{ margin: 0, fontSize: 14 }}>{t}</h4>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink-soft)' }}>{d}</p>
        </div>
      ))}
    </div>
  );
}

// ---- Dispatcher: render the artifact for a given phase ----
export function Artifact({ type, c }) {
  switch (type) {
    case 'verdict': return <SpectrumVerdict c={c} />;
    case 'canvas': return <FilledCanvas c={c} />;
    case 'decomp': return <FilledDecomposition c={c} />;
    case 'arch': return <><FlowDiagram steps={c.architecture} /><ReadOnlyMatrix c={c} /></>;
    case 'risks': return <RiskRegister c={c} />;
    case 'strategy': return <StrategyOnePager c={c} />;
    case 'roadmap': return <RoadmapStrip c={c} />;
    case 'econ': return <EconomicsCard c={c} />;
    case 'scale': return <ScaleCard c={c} />;
    default: return null;
  }
}
