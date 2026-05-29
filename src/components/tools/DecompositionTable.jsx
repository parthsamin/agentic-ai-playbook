import { useState } from 'react';
import { useLocalState } from '../../hooks/useLocalState';
import { downloadText, copyText } from './exportUtils';
import { CASES } from '../../data/cases';

const LEVELS = [
  { v: 'L0', label: 'L0 · Rules / code', color: '#19c37d' },
  { v: 'L1', label: 'L1 · Classical ML', color: '#36b37e' },
  { v: 'L2', label: 'L2 · LLM single-shot', color: '#f5a623' },
  { v: 'L3', label: 'L3 · LLM workflow', color: '#ff9f1c' },
  { v: 'L4', label: 'L4 · Agent', color: '#ff7a45' },
  { v: 'L5', label: 'L5 · Multi-agent', color: '#ff5470' },
  { v: 'H', label: 'Human — never automated', color: '#8b5cf6' },
];
const colorFor = (v) => (LEVELS.find((l) => l.v === v) || {}).color || 'var(--ink-faint)';

const SEED = [
  { step: 'Receive request', today: 'Intake clerk', level: 'L0', err: 'Low' },
  { step: 'Extract key data', today: 'Staff reads docs', level: 'L2', err: 'Med' },
  { step: 'Check if review needed', today: 'Staff', level: 'L3', err: 'Med' },
  { step: 'Apply judgment vs. policy', today: 'Expert', level: 'L4', err: 'High' },
  { step: 'Approve / sign', today: 'Authorized human', level: 'H', err: 'Critical' },
];

export default function DecompositionTable() {
  const [rows, setRows, reset] = useLocalState('decomp', SEED);
  const [copied, setCopied] = useState(false);

  const update = (i, k, v) => { const next = [...rows]; next[i] = { ...next[i], [k]: v }; setRows(next); };
  const add = () => setRows([...rows, { step: '', today: '', level: 'L0', err: '' }]);
  const del = (i) => setRows(rows.filter((_, j) => j !== i));

  const counts = LEVELS.reduce((a, l) => ({ ...a, [l.v]: rows.filter((r) => r.level === l.v).length }), {});
  const agentSteps = (counts.L4 || 0) + (counts.L5 || 0);
  const codeSteps = (counts.L0 || 0) + (counts.L1 || 0);
  const humanSteps = counts.H || 0;

  const asText = () =>
    'WORKFLOW DECOMPOSITION\n\nStep | Today | Spectrum fit | Error cost\n' +
    rows.map((r) => `${r.step} | ${r.today} | ${r.level} | ${r.err}`).join('\n');
  const doCopy = async () => { if (await copyText(asText())) { setCopied(true); setTimeout(() => setCopied(false), 1800); } };

  return (
    <div>
      <div className="tool-head">
        <div>
          <h2 style={{ border: 0, margin: 0 }}>Workflow Decomposition Table</h2>
          <p className="tool-intro">Break the job into steps and classify each against the agent spectrum. The win is putting deterministic steps in code, predictions in ML, and only the genuinely-ambiguous steps in an agent.</p>
          <p className="tool-prov">Based on classic <strong>process decomposition / value-stream mapping</strong> (standard consulting practice), with each step tagged to the workflows-vs-agents spectrum from <a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noopener noreferrer">Anthropic’s Building Effective Agents</a>.</p>
        </div>
        <div className="tool-actions">
          {copied && <span className="saved-note">✓ copied</span>}
          <button className="btn btn-ghost btn-sm" onClick={() => setRows(CASES.priorauth.decomposition.map((r) => ({ ...r })))}>Load Prior Auth</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setRows(CASES.retail.decomposition.map((r) => ({ ...r })))}>Load Retail</button>
          <button className="btn btn-ghost btn-sm" onClick={doCopy}>Copy</button>
          <button className="btn btn-ghost btn-sm" onClick={() => downloadText('decomposition.txt', asText())}>Export</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { if (confirm('Reset to the starter example?')) reset(); }}>Reset</button>
        </div>
      </div>

      <div className="decomp-summary">
        <div className="box" style={{ background: 'linear-gradient(135deg,#19c37d,#0f9d8a)' }}>
          <div className="big">{codeSteps}</div><div className="lbl">steps that should stay code / ML</div>
        </div>
        <div className="box" style={{ background: 'linear-gradient(135deg,#ff7a45,#ff5470)' }}>
          <div className="big">{agentSteps}</div><div className="lbl">genuinely agent-suitable steps (L4–L5)</div>
        </div>
        <div className="box" style={{ background: 'linear-gradient(135deg,#8b5cf6,#6d4bff)' }}>
          <div className="big">{humanSteps}</div><div className="lbl">steps that must stay human</div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="decomp-table" style={{ minWidth: 640 }}>
          <thead>
            <tr>
              <th style={{ width: '32%' }}>Step</th>
              <th style={{ width: '24%' }}>Who does it today</th>
              <th style={{ width: '26%' }}>Spectrum fit</th>
              <th style={{ width: '14%' }}>Error cost</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td><input value={r.step} placeholder="e.g. Draft response" onChange={(e) => update(i, 'step', e.target.value)} /></td>
                <td><input value={r.today} placeholder="role" onChange={(e) => update(i, 'today', e.target.value)} /></td>
                <td>
                  <select className="field-select" value={r.level} onChange={(e) => update(i, 'level', e.target.value)}
                    style={{ borderLeft: `4px solid ${colorFor(r.level)}` }}>
                    {LEVELS.map((l) => <option key={l.v} value={l.v}>{l.label}</option>)}
                  </select>
                </td>
                <td><input value={r.err} placeholder="Low/Med/High" onChange={(e) => update(i, 'err', e.target.value)} /></td>
                <td><button className="row-del" title="Delete row" onClick={() => del(i)}>×</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-ghost btn-sm" onClick={add} style={{ marginTop: 10 }}>+ Add step</button>
    </div>
  );
}
