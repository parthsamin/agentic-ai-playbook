import { Link } from 'react-router-dom';
import { Callout, Table } from '../../components/UI';
import { ClosedLoop } from '../../components/Visuals';

export default function Phase7() {
  return (
    <>
      <Callout kind="key" title="The 10× core">
        This is what separates demos from production and what makes you irreplaceable.
        <strong> If you can’t measure it, you can’t trust it, ship it, or price it.</strong> You need a
        measurement system <em>before</em> you build, not after.
      </Callout>

      <h2 id="eval">Build the eval stack</h2>
      <ol>
        <li><strong>Golden dataset</strong> — representative cases with known-good outputs (from your Phase-2 ground-truth audit). Your single most valuable asset; grow it continuously, especially with hard/edge cases.</li>
        <li><strong>Metrics that match the job</strong> — task success, accuracy/faithfulness, quality (expert-acceptability, tone/brand), safety (guardrail-violation rate), operational (latency, cost-per-task, escalation rate).</li>
        <li><strong>Methods</strong> — human review (gold standard, doesn’t scale) → LLM-as-judge (scaled, validated against humans) → automated checks (citation present, format valid, within policy).</li>
        <li><strong>Offline → online</strong> — test on the golden set pre-ship; then measure live (deflection, CSAT, override rate, A/B vs. human baseline). The Autonomy Ladder is gated on these numbers.</li>
      </ol>
      <Callout kind="tip" title="Go deep">
        The golden-set craft, the metric tree, LLM-as-judge biases, eval-in-CI, and drift detection are covered
        in full in the <Link to="/deep/autonomy-eval">Autonomy &amp; Eval deep dive</Link>.
      </Callout>

      <h2 id="economics">Speak fluent unit cost</h2>
      <div className="grid grid-2">
        {[
          ['Cost per task', '(tokens in + out × price) × steps + tool/infra cost. Lever: cheaper models for easy steps, strong model only for the hard reasoning; cap loops; cache/retrieve.'],
          ['Cost per successful task', 'Cost per task ÷ success rate. The honest number — a cheap agent that fails half the time is expensive.'],
          ['Net value per case', '(human cost displaced or value created) − agent run cost − human-in-loop cost. Multiply by volume.'],
          ['Human-in-loop ratio', 'Drives the savings; it falls as you climb the autonomy ladder, so ROI improves over time. Show that curve.'],
          ['TCO', 'Model/infra + build + eval + monitoring + governance + change management. Most business cases forget everything after “build.”'],
        ].map(([t, d]) => (
          <div className="card" key={t} style={{ borderLeft: '4px solid var(--p7)' }}>
            <h4 style={{ margin: 0, fontSize: 15 }}>{t}</h4>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, color: 'var(--ink-soft)' }}>{d}</p>
          </div>
        ))}
      </div>

      <h2 id="value">The value-realization plan</h2>
      <p>
        <strong>Baseline the metric before launch</strong> — you can’t prove an improvement you didn’t measure
        pre-deployment. Define how each rung translates to dollars. Instrument it. Report it on a QBR cadence.
        This is what gets the next phase funded.
      </p>
      <ClosedLoop />

      <Callout kind="map" title="For product managers & consultants">
        The benefits-realization plan, the business case made defensible, the QBR metrics. Bring a measurement
        plan to a kickoff and you’re operating two levels up.
      </Callout>
      <Callout kind="trap" title="Traps">
        No baseline (can’t prove value) · vanity metrics (containment % that hides re-contacts) · ignoring
        cost-per-successful-task · treating eval as one-time instead of continuous.
      </Callout>
    </>
  );
}

Phase7.toc = [
  { id: 'eval', label: 'The eval stack' },
  { id: 'economics', label: 'Unit economics' },
  { id: 'value', label: 'Value realization' },
  { id: 'worked-example', label: 'Worked example' },
];
