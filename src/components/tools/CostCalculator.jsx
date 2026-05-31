import { useLocalState } from '../../hooks/useLocalState';

const PRESETS = {
  priorauth: { label: 'Prior Auth', agentCost: 0.5, successRate: 90, humanCost: 40, volume: 200000, autoRate: 30 },
  retail: { label: 'Retail', agentCost: 0.08, successRate: 80, humanCost: 5, volume: 600000, autoRate: 80 },
};
const BLANK = { agentCost: 0.1, successRate: 80, humanCost: 5, volume: 100000, autoRate: 50 };

const FIELDS = [
  { k: 'agentCost', label: 'Agent cost / task ($)', step: 0.01, hint: 'tokens + tools + infra for one run' },
  { k: 'successRate', label: 'Success rate (%)', step: 1, hint: 'share of runs that achieve the goal' },
  { k: 'humanCost', label: 'Human cost / task displaced ($)', step: 0.5, hint: 'loaded cost of a human doing it' },
  { k: 'volume', label: 'Addressable volume / yr', step: 1000, hint: 'total cases per year' },
  { k: 'autoRate', label: 'Automation rate (%)', step: 1, hint: 'share the agent auto-handles' },
];

function money(n) {
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

export default function CostCalculator() {
  const [v, setV, reset] = useLocalState('cost', BLANK);
  const set = (k, val) => setV({ ...v, [k]: parseFloat(val) || 0 });

  const sr = Math.max(0.0001, v.successRate / 100);
  const costPerSuccess = v.agentCost / sr;
  const netPerCase = v.humanCost - costPerSuccess;
  const annual = v.volume * (v.autoRate / 100) * netPerCase;
  const tokenShare = v.humanCost > 0 ? (v.agentCost / v.humanCost) * 100 : 0;

  return (
    <div>
      <div className="tool-head">
        <div>
          <h2 style={{ border: 0, margin: 0 }}>Cost-per-Successful-Task Calculator</h2>
          <p className="tool-intro">The honest unit economics. A cheap agent that often fails is expensive — divide cost by success rate, then net against the human cost it displaces.</p>
          <p className="tool-prov">Standard unit-economics modelling; the “cost per successful task = cost/task ÷ success rate” framing follows the eval-economics discipline in Phase 7 &amp; the deep dive.</p>
        </div>
        <div className="tool-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => setV({ ...PRESETS.priorauth })}>Load Prior Auth</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setV({ ...PRESETS.retail })}>Load Retail</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { if (confirm('Reset inputs?')) reset(); }}>Reset</button>
        </div>
      </div>

      <div className="canvas-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        {FIELDS.map((f) => (
          <div className="canvas-field" key={f.k}>
            <label>{f.label} <span className="hint">— {f.hint}</span></label>
            <input className="field-input" type="number" step={f.step} value={v[f.k]} onChange={(e) => set(f.k, e.target.value)} />
          </div>
        ))}
      </div>

      <div className="econ-calc" style={{ marginTop: 8 }}>
        <div className="econ-pill" style={{ background: 'linear-gradient(135deg,#4b62ff,#6d4bff)' }}>
          <div className="ep-lbl">Cost per successful task</div>
          <div className="ep-val">${costPerSuccess.toFixed(2)}</div>
        </div>
        <div className="econ-pill" style={{ background: netPerCase >= 0 ? 'linear-gradient(135deg,#19c37d,#0f9d8a)' : 'linear-gradient(135deg,#ff5470,#c1239e)' }}>
          <div className="ep-lbl">Net value / auto-handled case</div>
          <div className="ep-val">${netPerCase.toFixed(2)}</div>
        </div>
        <div className="econ-pill" style={{ background: annual >= 0 ? 'linear-gradient(135deg,#f5a623,#ff7a45)' : 'linear-gradient(135deg,#ff5470,#c1239e)' }}>
          <div className="ep-lbl">Gross annual value</div>
          <div className="ep-val">{money(annual)}</div>
        </div>
      </div>

      <div className="callout callout-tip" style={{ marginTop: 18 }}>
        <span className="ic">💡</span>
        <div>
          <p style={{ margin: 0 }}>
            Agent cost is <strong>{tokenShare.toFixed(1)}%</strong> of the human cost it displaces.
            {tokenShare < 5
              ? ' Token cost is a rounding error here — your levers are success rate and automation rate, so spend on the better model and the eval.'
              : ' Token cost is a visible slice — cost-engineering (routing, caching, smaller models) will move the needle.'}
            {netPerCase < 0 && ' ⚠️ Net value is negative: at this success rate the agent costs more than the human it replaces — raise success or lower run cost before shipping.'}
          </p>
        </div>
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--ink-faint)' }}>Recomputes live; inputs saved on this device. Present the business case as a range (vary success &amp; automation rate), not a single number.</p>
    </div>
  );
}
