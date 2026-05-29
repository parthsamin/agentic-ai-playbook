import { Link } from 'react-router-dom';
import { Callout, Table } from '../../components/UI';

export default function Phase5() {
  return (
    <>
      <Callout kind="key" title="From use case to strategy">
        One agent is a feature. A <strong>strategy</strong> answers: which jobs, in what order, building toward
        what durable advantage, defended by what moat, monetized how.
      </Callout>

      <h2 id="frame">The strategic frame to fill in</h2>
      <div className="grid grid-2">
        {[
          ['North Star', 'The one outcome metric the whole effort moves (PA turnaround days; cost-to-serve per contact).'],
          ['Where to play', 'The prioritized opportunity portfolio from Phase 1’s heatmap.'],
          ['How to win / moat', 'Not the model — everyone rents the same models. Durable advantage = proprietary data, deep workflow integration, the eval/feedback loop, trust/compliance posture, distribution.'],
          ['Capability stack', 'Data, integrations, eval infra, MLOps/LLMOps, talent, governance. Strategy includes building the platform, not just the apps.'],
          ['Build / buy / partner', 'A posture per layer of the stack.'],
          ['Operating model', 'A central AI platform team enabling federated product teams is the pattern that scales (Phase 8).'],
        ].map(([t, d]) => (
          <div className="card" key={t} style={{ borderLeft: '4px solid var(--p5)' }}>
            <h4 style={{ margin: 0, fontSize: 15 }}>{t}</h4>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, color: 'var(--ink-soft)' }}>{d}</p>
          </div>
        ))}
      </div>

      <h2 id="two-speed">The “two-speed” portfolio</h2>
      <p>The key senior move — run two tracks in parallel:</p>
      <div className="case-grid">
        <div className="card" style={{ borderTop: '4px solid var(--p6)', background: 'linear-gradient(160deg, rgba(245,166,35,.08), transparent)' }}>
          <h4 style={{ fontSize: 16 }}>🔦 Lighthouse use case</h4>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
            One high-value, well-bounded problem you take to production fast to prove value and earn
            credibility/budget.
          </p>
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--p5)', background: 'linear-gradient(160deg, rgba(193,75,255,.08), transparent)' }}>
          <h4 style={{ fontSize: 16 }}>🏗️ Platform / foundation</h4>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
            The reusable capabilities — retrieval, eval harness, guardrails, observability, integration patterns —
            so the <em>next</em> five use cases are 10× cheaper.
          </p>
        </div>
      </div>
      <Callout kind="tip" title="The compounding logic">
        The lighthouse funds the platform; the platform compounds. This is how you turn one engagement into a
        program — the commercial heart of consulting <em>and</em> the product-portfolio logic.
      </Callout>

      <h2 id="productize">Productizing</h2>
      <ul>
        <li><strong>Wedge → expansion:</strong> land on one painful job, expand across the workflow.</li>
        <li><strong>Pricing:</strong> outcome-based (per resolved case, per deflection) aligns with value but needs airtight measurement; seat-based is simpler but caps upside; usage/consumption passes through token cost. Agentic value is often outcome-shaped — price toward it as your eval matures.</li>
        <li><strong>Moat = the feedback loop.</strong> Every human correction (the clinician edit, the CS override) is training/eval signal competitors don’t have. Design to capture it from day one.</li>
      </ul>

      <Callout kind="map" title="For product managers & consultants">
        Product strategy doc, portfolio prioritization, the program business case, and the operating-model
        recommendation. See how the platform compounds in the <Link to="/deep/autonomy-eval">Autonomy &amp; Eval deep dive</Link>.
      </Callout>
      <Callout kind="trap" title="Traps">
        “AI strategy” that’s a list of use cases with no sequencing or moat · betting the moat on a model you
        don’t own · building the platform before proving value (no one funds it) · ignoring the feedback loop.
      </Callout>
    </>
  );
}

Phase5.toc = [
  { id: 'frame', label: 'Strategic frame' },
  { id: 'two-speed', label: 'Two-speed portfolio' },
  { id: 'productize', label: 'Productizing' },
  { id: 'worked-example', label: 'Worked example' },
];
