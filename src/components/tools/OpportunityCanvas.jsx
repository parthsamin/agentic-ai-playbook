import { useState } from 'react';
import { useLocalState } from '../../hooks/useLocalState';
import { downloadText, copyText } from './exportUtils';
import { CASES } from '../../data/cases';

const FIELDS = [
  { k: 'job', label: 'Job to be done', hint: 'the outcome the org/user actually wants', wide: true },
  { k: 'process', label: "Today's process", hint: 'who does it now, how long, how much it costs' },
  { k: 'bottleneck', label: 'The bottleneck', hint: 'is it ambiguity/language? if no → stop' },
  { k: 'trigger', label: 'Trigger & inputs', hint: 'what kicks it off; what data/docs are needed' },
  { k: 'dod', label: 'Definition of done', hint: 'what a “good” output looks like — becomes your eval' },
  { k: 'action', label: 'Action surface', hint: 'read-only? draft? act?' },
  { k: 'reversibility', label: 'Reversibility', hint: 'can a mistake be undone? cheaply? → drives autonomy' },
  { k: 'value', label: 'Value', hint: '$ / time / quality / risk reduced, × volume', wide: true },
  { k: 'guardrails', label: 'Guardrails needed', hint: 'compliance, PII, what it must never do', wide: true },
];

export default function OpportunityCanvas() {
  const [data, setData, reset] = useLocalState('canvas', {});
  const [copied, setCopied] = useState(false);

  const set = (k, v) => setData({ ...data, [k]: v });

  const asText = () =>
    'AGENTIC OPPORTUNITY CANVAS\n\n' +
    FIELDS.map((f) => `${f.label.toUpperCase()}:\n${data[f.k] || '—'}\n`).join('\n');

  const doCopy = async () => { if (await copyText(asText())) { setCopied(true); setTimeout(() => setCopied(false), 1800); } };

  return (
    <div>
      <div className="tool-head">
        <div>
          <h2 style={{ border: 0, margin: 0 }}>Agentic Opportunity Canvas</h2>
          <p className="tool-intro">Fill this in during a discovery session. Each line feeds a later phase — the Definition of Done becomes your eval; Reversibility drives the autonomy choice.</p>
          <p className="tool-prov">Adapted from <a href="https://www.jpattonassociates.com/opportunity-canvas/" target="_blank" rel="noopener noreferrer">Jeff Patton’s Opportunity Canvas</a> — a real, widely-used product-discovery tool — tuned here for agentic-AI opportunities.</p>
        </div>
        <div className="tool-actions">
          {copied && <span className="saved-note">✓ copied</span>}
          <button className="btn btn-ghost btn-sm" onClick={() => setData({ ...CASES.priorauth.canvas })}>Load Prior Auth</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setData({ ...CASES.retail.canvas })}>Load Retail</button>
          <button className="btn btn-ghost btn-sm" onClick={doCopy}>Copy</button>
          <button className="btn btn-ghost btn-sm" onClick={() => downloadText('opportunity-canvas.txt', asText())}>Export</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { if (confirm('Clear the canvas?')) reset(); }}>Clear</button>
        </div>
      </div>

      <div className="canvas-grid">
        {FIELDS.map((f) => (
          <div className={`canvas-field ${f.wide ? 'wide' : ''}`} key={f.k}>
            <label>{f.label} <span className="hint">— {f.hint}</span></label>
            <textarea
              className="field-area"
              value={data[f.k] || ''}
              onChange={(e) => set(f.k, e.target.value)}
              placeholder="…"
            />
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--ink-faint)' }}>Saved automatically on this device as you type.</p>
    </div>
  );
}
