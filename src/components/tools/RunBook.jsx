import { useState } from 'react';
import { useLocalState } from '../../hooks/useLocalState';
import { downloadText, copyText } from './exportUtils';

const BLANK = {
  name: '', owner: '', steward: '', oncall: '',
  metrics: [{ metric: '', healthy: '', act: '' }],
  rung: '', ceiling: '', demote: [''],
  killswitch: '', killwho: '',
  sev1: '', sev2: '', sev3: '',
  wrongPlan: '',
};

const EXAMPLE = {
  name: 'Post-purchase CS agent',
  owner: 'PM — Customer Experience',
  steward: 'CS Ops lead',
  oncall: 'AgentOps rotation (PagerDuty)',
  metrics: [
    { metric: 'Resolution rate (auto-handled)', healthy: '≥ 85%', act: '< 82% over rolling 1k cases → demote, investigate' },
    { metric: 'Cost per successful task', healthy: '≤ $0.15', act: '> $0.20 → check loops / enable caching' },
    { metric: 'CSAT', healthy: '≥ baseline', act: 'drop > 3 pts → pause, review' },
    { metric: 'Guardrail-violation rate', healthy: '0 critical', act: 'any critical → Sev 1, kill switch' },
    { metric: 'Refund cap-hit rate', healthy: '< 2%', act: 'rising → tighten threshold' },
    { metric: 'p95 latency', healthy: '< 6s', act: '> 10s → fallback path' },
  ],
  rung: 'R4 (act-with-limits) on WISMO + capped refunds; R2 (suggest) on out-of-policy / VIP',
  ceiling: 'Refunds above $X and any out-of-policy case are never autonomous.',
  demote: [
    'Resolution rate < 82% over a rolling 1k cases',
    'Any critical guardrail / safety violation',
    'Refund reversal or complaint rate > 1%',
    'A new, unevaluated contact-type spikes in volume',
  ],
  killswitch: 'Toggle `cs_agent_enabled = false` in the admin console — halts all agent actions and routes every contact to the human queue.',
  killwho: 'PM, CS Ops lead, or the on-call engineer.',
  sev1: 'On-call eng + PM + Legal/Safety — respond in minutes; kill switch first.',
  sev2: 'PM + AgentOps — same day; demote a rung and contain.',
  sev3: 'PM + Eng — this week; tune and monitor.',
  wrongPlan: 'Wrong refund → auto-reverse if within window, notify the customer, log to the eval set. Harmful/incorrect reply → retract if unsent, apologise, escalate to a human. Every incident → postmortem + a permanent regression test so it can’t recur silently.',
};

export default function RunBook() {
  const [d, setD, reset] = useLocalState('runbook', BLANK);
  const [copied, setCopied] = useState(false);
  const set = (k, v) => setD({ ...d, [k]: v });

  const setMetric = (i, k, v) => { const m = [...d.metrics]; m[i] = { ...m[i], [k]: v }; setD({ ...d, metrics: m }); };
  const addMetric = () => setD({ ...d, metrics: [...d.metrics, { metric: '', healthy: '', act: '' }] });
  const delMetric = (i) => setD({ ...d, metrics: d.metrics.filter((_, j) => j !== i) });

  const setDemote = (i, v) => { const a = [...d.demote]; a[i] = v; setD({ ...d, demote: a }); };
  const addDemote = () => setD({ ...d, demote: [...d.demote, ''] });
  const delDemote = (i) => setD({ ...d, demote: d.demote.filter((_, j) => j !== i) });

  const asText = () =>
    `AGENT RUN BOOK — ${d.name || '(unnamed agent)'}\n\n` +
    `Product owner: ${d.owner}\nAgent steward: ${d.steward}\nOn-call: ${d.oncall}\n\n` +
    `HEALTH METRICS & THRESHOLDS\n` +
    d.metrics.map((m) => `  • ${m.metric} | healthy: ${m.healthy} | act when: ${m.act}`).join('\n') +
    `\n\nAUTONOMY\n  Current rung: ${d.rung}\n  Hard ceiling: ${d.ceiling}\n  Auto-demote triggers:\n` +
    d.demote.map((x) => `    - ${x}`).join('\n') +
    `\n\nKILL SWITCH\n  How: ${d.killswitch}\n  Who can trigger: ${d.killwho}\n\n` +
    `ESCALATION\n  Sev 1: ${d.sev1}\n  Sev 2: ${d.sev2}\n  Sev 3: ${d.sev3}\n\n` +
    `WHEN IT'S WRONG\n  ${d.wrongPlan}\n`;

  const doCopy = async () => { if (await copyText(asText())) { setCopied(true); setTimeout(() => setCopied(false), 1800); } };

  return (
    <div>
      <div className="tool-head">
        <div>
          <h2 style={{ border: 0, margin: 0 }}>Agent Run Book</h2>
          <p className="tool-intro">The one-page operating doc you hand to on-call: what to watch and when to act, the autonomy ceiling and demotion triggers, the kill switch, the escalation path, and the “what happens when it’s wrong” plan.</p>
          <p className="tool-prov">The run-layer companion to the Operate pillar — a standard SRE-style run book, adapted for an agent’s quality/safety/autonomy realities.</p>
        </div>
        <div className="tool-actions">
          {copied && <span className="saved-note">✓ copied</span>}
          <button className="btn btn-ghost btn-sm" onClick={() => setD({ ...EXAMPLE, metrics: EXAMPLE.metrics.map((m) => ({ ...m })), demote: [...EXAMPLE.demote] })}>Load example</button>
          <button className="btn btn-ghost btn-sm" onClick={doCopy}>Copy</button>
          <button className="btn btn-ghost btn-sm" onClick={() => downloadText('agent-run-book.txt', asText())}>Export</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { if (confirm('Clear the run book?')) reset(); }}>Clear</button>
        </div>
      </div>

      <div className="rb-section">
        <h4>Identity & ownership</h4>
        <div className="canvas-grid">
          <div className="canvas-field"><label>Agent name</label><input className="field-input" value={d.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Post-purchase CS agent" /></div>
          <div className="canvas-field"><label>Product owner</label><input className="field-input" value={d.owner} onChange={(e) => set('owner', e.target.value)} placeholder="accountable PM" /></div>
          <div className="canvas-field"><label>Agent steward</label><input className="field-input" value={d.steward} onChange={(e) => set('steward', e.target.value)} placeholder="watches quality & incidents" /></div>
          <div className="canvas-field"><label>On-call</label><input className="field-input" value={d.oncall} onChange={(e) => set('oncall', e.target.value)} placeholder="rotation / pager" /></div>
        </div>
      </div>

      <div className="rb-section">
        <h4>Health metrics & thresholds</h4>
        <div style={{ overflowX: 'auto' }}>
          <table className="decomp-table" style={{ minWidth: 620 }}>
            <thead><tr><th style={{ width: '34%' }}>Metric</th><th style={{ width: '22%' }}>Healthy</th><th>Act when…</th><th></th></tr></thead>
            <tbody>
              {d.metrics.map((m, i) => (
                <tr key={i}>
                  <td><input value={m.metric} placeholder="metric" onChange={(e) => setMetric(i, 'metric', e.target.value)} /></td>
                  <td><input value={m.healthy} placeholder="green" onChange={(e) => setMetric(i, 'healthy', e.target.value)} /></td>
                  <td><input value={m.act} placeholder="threshold → action" onChange={(e) => setMetric(i, 'act', e.target.value)} /></td>
                  <td><button className="row-del" title="Delete" onClick={() => delMetric(i)}>×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={addMetric} style={{ marginTop: 8 }}>+ Add metric</button>
      </div>

      <div className="rb-section">
        <h4>Autonomy</h4>
        <div className="canvas-grid">
          <div className="canvas-field wide"><label>Current rung(s)</label><input className="field-input" value={d.rung} onChange={(e) => set('rung', e.target.value)} placeholder="e.g. R4 on easy segment; R2 on hard" /></div>
          <div className="canvas-field wide"><label>Hard ceiling — what is never autonomous</label><input className="field-input" value={d.ceiling} onChange={(e) => set('ceiling', e.target.value)} /></div>
        </div>
        <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--brand)', fontWeight: 600, margin: '12px 0 6px' }}>Auto-demote triggers</label>
        {d.demote.map((x, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
            <input className="field-input" value={x} placeholder="e.g. accuracy < bar over rolling N → demote" onChange={(e) => setDemote(i, e.target.value)} />
            <button className="row-del" title="Delete" onClick={() => delDemote(i)}>×</button>
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" onClick={addDemote}>+ Add trigger</button>
      </div>

      <div className="rb-section">
        <h4>Kill switch</h4>
        <div className="canvas-grid">
          <div className="canvas-field wide"><label>How to trigger it (one click)</label><textarea className="field-area" value={d.killswitch} onChange={(e) => set('killswitch', e.target.value)} /></div>
          <div className="canvas-field wide"><label>Who can trigger it</label><input className="field-input" value={d.killwho} onChange={(e) => set('killwho', e.target.value)} /></div>
        </div>
      </div>

      <div className="rb-section">
        <h4>Escalation path</h4>
        <div className="canvas-grid">
          <div className="canvas-field wide"><label>Sev 1 — active harm</label><input className="field-input" value={d.sev1} onChange={(e) => set('sev1', e.target.value)} placeholder="who · how fast" /></div>
          <div className="canvas-field"><label>Sev 2 — degraded</label><input className="field-input" value={d.sev2} onChange={(e) => set('sev2', e.target.value)} /></div>
          <div className="canvas-field"><label>Sev 3 — bounded</label><input className="field-input" value={d.sev3} onChange={(e) => set('sev3', e.target.value)} /></div>
        </div>
      </div>

      <div className="rb-section">
        <h4>What happens when it’s wrong</h4>
        <textarea className="field-area" style={{ minHeight: 80 }} value={d.wrongPlan} onChange={(e) => set('wrongPlan', e.target.value)} placeholder="The documented plan — recovery, who’s told, and the regression test you add." />
      </div>

      <p style={{ fontSize: 12.5, color: 'var(--ink-faint)' }}>Saved on this device. A consequential agent isn’t production-ready until this page is filled.</p>
    </div>
  );
}
