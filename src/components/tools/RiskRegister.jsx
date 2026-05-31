import { useState } from 'react';
import { useLocalState } from '../../hooks/useLocalState';
import { downloadText, copyText } from './exportUtils';
import { CASES } from '../../data/cases';

const LEVELS = ['Low', 'Med', 'High'];
const SCORE = { Low: 1, Med: 2, High: 3 };

function sev(l, i) {
  const s = SCORE[l] * SCORE[i];
  if (s >= 6) return { label: 'Critical', color: '#ff5470' };
  if (s >= 4) return { label: 'High', color: '#ff7a45' };
  if (s >= 2) return { label: 'Medium', color: '#f5a623' };
  return { label: 'Low', color: '#19c37d' };
}

const SEED = [
  { risk: 'Confident wrong answer / fabricated citation', like: 'Med', imp: 'High', mit: 'RAG grounding; require citations; human review on low-confidence', owner: 'Product' },
  { risk: 'Agent takes harmful / irreversible action', like: 'Low', imp: 'High', mit: 'Autonomy caps; allow-lists; approval gates; dry-run', owner: 'Product + Risk' },
  { risk: 'Prompt injection / data exfiltration', like: 'Med', imp: 'High', mit: 'Input sanitization; least-privilege tools; isolate untrusted content', owner: 'Security' },
];

// Build preset rows from the case risk data (adds default likelihood/impact).
function fromCase(c) {
  return c.risks.map((r) => ({ risk: r.risk, like: 'Med', imp: 'High', mit: r.mit, owner: r.owner }));
}

export default function RiskRegister() {
  const [rows, setRows, reset] = useLocalState('risks', SEED);
  const [copied, setCopied] = useState(false);

  const update = (i, k, val) => { const n = [...rows]; n[i] = { ...n[i], [k]: val }; setRows(n); };
  const add = () => setRows([...rows, { risk: '', like: 'Med', imp: 'Med', mit: '', owner: '' }]);
  const del = (i) => setRows(rows.filter((_, j) => j !== i));

  const asText = () =>
    'AI RISK REGISTER (RAID)\n\nRisk | Likelihood | Impact | Severity | Mitigation | Owner\n' +
    rows.map((r) => `${r.risk} | ${r.like} | ${r.imp} | ${sev(r.like, r.imp).label} | ${r.mit} | ${r.owner}`).join('\n');
  const doCopy = async () => { if (await copyText(asText())) { setCopied(true); setTimeout(() => setCopied(false), 1800); } };

  return (
    <div>
      <div className="tool-head">
        <div>
          <h2 style={{ border: 0, margin: 0 }}>AI Risk Register (RAID)</h2>
          <p className="tool-intro">Score each risk on likelihood × impact, attach a mitigation and an owner. Severity is computed for you. This is your AI-native RAID log for the De-risk phase.</p>
          <p className="tool-prov">A standard project <strong>RAID log</strong> / risk register, extended with AI-native risk classes and aligned to the <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener noreferrer">NIST AI RMF</a>.</p>
        </div>
        <div className="tool-actions">
          {copied && <span className="saved-note">✓ copied</span>}
          <button className="btn btn-ghost btn-sm" onClick={() => setRows(fromCase(CASES.priorauth))}>Load Prior Auth</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setRows(fromCase(CASES.retail))}>Load Retail</button>
          <button className="btn btn-ghost btn-sm" onClick={doCopy}>Copy</button>
          <button className="btn btn-ghost btn-sm" onClick={() => downloadText('risk-register.txt', asText())}>Export</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { if (confirm('Reset to the starter example?')) reset(); }}>Reset</button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="decomp-table" style={{ minWidth: 760 }}>
          <thead>
            <tr>
              <th style={{ width: '26%' }}>Risk</th>
              <th>Likelihood</th>
              <th>Impact</th>
              <th>Severity</th>
              <th style={{ width: '30%' }}>Mitigation</th>
              <th>Owner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const s = sev(r.like, r.imp);
              return (
                <tr key={i}>
                  <td><input value={r.risk} placeholder="risk" onChange={(e) => update(i, 'risk', e.target.value)} /></td>
                  <td>
                    <select className="field-select" value={r.like} onChange={(e) => update(i, 'like', e.target.value)}>
                      {LEVELS.map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </td>
                  <td>
                    <select className="field-select" value={r.imp} onChange={(e) => update(i, 'imp', e.target.value)}>
                      {LEVELS.map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </td>
                  <td><span className="lvl-badge" style={{ background: s.color }}>{s.label}</span></td>
                  <td><input value={r.mit} placeholder="mitigation" onChange={(e) => update(i, 'mit', e.target.value)} /></td>
                  <td><input value={r.owner} placeholder="owner" onChange={(e) => update(i, 'owner', e.target.value)} /></td>
                  <td><button className="row-del" title="Delete row" onClick={() => del(i)}>×</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="btn btn-ghost btn-sm" onClick={add} style={{ marginTop: 10 }}>+ Add risk</button>
      <p style={{ fontSize: 12.5, color: 'var(--ink-faint)', marginTop: 10 }}>
        Don’t forget the kill switch: every consequential agent needs a one-click “what happens when it’s wrong” answer. Saved on this device.
      </p>
    </div>
  );
}
