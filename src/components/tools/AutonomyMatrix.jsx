import { useState } from 'react';
import { useLocalState } from '../../hooks/useLocalState';
import { downloadText, copyText } from './exportUtils';
import { CASES } from '../../data/cases';

const RUNG_OPTS = [
  { v: 'R1', label: 'R1 Shadow', cls: 'rung-r1' },
  { v: 'R2', label: 'R2 Suggest', cls: 'rung-r2' },
  { v: 'R3', label: 'R3 Assist', cls: 'rung-r3' },
  { v: 'R4', label: 'R4 Act-with-limits', cls: 'rung-r4' },
  { v: 'R5', label: 'R5 Autopilot', cls: 'rung-r5' },
  { v: 'H', label: 'Human only', cls: 'rung-human' },
  { v: 'na', label: 'n/a', cls: 'rung-na' },
];

const cloneMatrix = (m) => ({ segments: [...m.segments], actions: [...m.actions], cells: { ...m.cells } });
const clsFor = (v) => (RUNG_OPTS.find((r) => r.v === v) || {}).cls || '';

const DEFAULT = {
  segments: ['Clear / simple', 'Borderline / complex', 'High-risk / VIP'],
  actions: ['Read & explain', 'Recommend / draft', 'Take action (refund / sign)', 'Notify'],
  cells: {
    '0-0': 'R5', '0-1': 'R5', '0-2': 'R4',
    '1-0': 'R4', '1-1': 'R3', '1-2': 'R2',
    '2-0': 'R4', '2-1': 'R2', '2-2': 'H',
    '3-0': 'R5', '3-1': 'R5', '3-2': 'R5',
  },
};

export default function AutonomyMatrix() {
  const [m, setM, reset] = useLocalState('matrix', DEFAULT);
  const [copied, setCopied] = useState(false);

  const setCell = (key, v) => setM({ ...m, cells: { ...m.cells, [key]: v } });
  const setSeg = (i, v) => { const s = [...m.segments]; s[i] = v; setM({ ...m, segments: s }); };
  const setAct = (i, v) => { const a = [...m.actions]; a[i] = v; setM({ ...m, actions: a }); };

  const asText = () => {
    let out = 'AUTONOMY MATRIX (actions × segments)\n\n';
    out += 'Action \\ Segment\t' + m.segments.join('\t') + '\n';
    m.actions.forEach((a, ai) => {
      out += a + '\t' + m.segments.map((_, si) => m.cells[`${ai}-${si}`] || '—').join('\t') + '\n';
    });
    return out;
  };
  const doCopy = async () => { if (await copyText(asText())) { setCopied(true); setTimeout(() => setCopied(false), 1800); } };

  return (
    <div>
      <div className="tool-head">
        <div>
          <h2 style={{ border: 0, margin: 0 }}>Autonomy Matrix Builder</h2>
          <p className="tool-intro">Autonomy is a property of each <strong>action × segment</strong>, not the whole system. Set a rung per cell — promote the easy segment first; keep the hard one a rung lower. This grid is your exec safety slide.</p>
          <p className="tool-prov">A <strong>purpose-built</strong> framework for agentic AI (not a pre-existing named standard) — grounded in real practice: decision-rights matrices (RACI-style), reversible-vs-irreversible decision analysis, and staged “shadow → autopilot” rollout.</p>
        </div>
        <div className="tool-actions">
          {copied && <span className="saved-note">✓ copied</span>}
          <button className="btn btn-ghost btn-sm" onClick={() => setM(cloneMatrix(CASES.priorauth.matrix))}>Load Prior Auth</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setM(cloneMatrix(CASES.retail.matrix))}>Load Retail</button>
          <button className="btn btn-ghost btn-sm" onClick={doCopy}>Copy</button>
          <button className="btn btn-ghost btn-sm" onClick={() => downloadText('autonomy-matrix.tsv', asText(), 'text/tab-separated-values')}>Export</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { if (confirm('Reset to the starter example?')) reset(); }}>Reset</button>
        </div>
      </div>

      <div className="matrix-builder">
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Action ↓ / Segment →</th>
              {m.segments.map((s, i) => (
                <th key={i}>
                  <input className="field-select" value={s} onChange={(e) => setSeg(i, e.target.value)}
                    style={{ textAlign: 'center', fontWeight: 600 }} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {m.actions.map((a, ai) => (
              <tr key={ai}>
                <td className="matrix-rowhead">
                  <input className="field-select" value={a} onChange={(e) => setAct(ai, e.target.value)} style={{ minWidth: 170, fontWeight: 600 }} />
                </td>
                {m.segments.map((_, si) => {
                  const key = `${ai}-${si}`;
                  const val = m.cells[key] || 'R2';
                  return (
                    <td key={si}>
                      <div className={`matrix-cell ${clsFor(val)}`}>
                        <select value={val} onChange={(e) => setCell(key, e.target.value)}>
                          {RUNG_OPTS.map((r) => <option key={r.v} value={r.v}>{r.label}</option>)}
                        </select>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--ink-faint)' }}>
        Tip: pair every promotion with a pre-agreed eval gate and a rollback trigger. Saved automatically on this device.
      </p>
    </div>
  );
}
