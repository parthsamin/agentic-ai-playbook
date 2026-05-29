import { Link } from 'react-router-dom';
import { Callout, Table } from '../../components/UI';

export default function Phase1() {
  return (
    <>
      <Callout kind="key" title="The expert reframe">
        Beginners ask “where can we use AI?” Experts ask: “what <strong>job</strong> is being done badly,
        slowly, or expensively, and is <strong>judgment under language/ambiguity</strong> the bottleneck?”
        Agentic AI is uniquely good at exactly one thing: reasoning over unstructured, ambiguous information and
        taking bounded action. If that’s not the bottleneck, AI isn’t the lever.
      </Callout>

      <h2 id="lenses">The four lenses</h2>
      <p>Extend the classic Desirability / Feasibility / Viability with a fourth. Run every idea through all four:</p>
      <div className="grid grid-2">
        {[
          { t: 'Desirability', d: 'Does a real user/stakeholder feel this pain? (jobs-to-be-done)', c: 'var(--p1)' },
          { t: 'Feasibility', d: 'Can current models + your data + integrations actually do it?', c: 'var(--p2)' },
          { t: 'Viability', d: 'Does the unit economics and ROI close?', c: 'var(--p7)' },
          { t: 'Responsibility', d: 'Can it be governed, explained, and made compliant?', c: 'var(--p4)' },
        ].map((x) => (
          <div className="card" key={x.t} style={{ borderLeft: `4px solid ${x.c}` }}>
            <h4 style={{ margin: 0 }}>{x.t}</h4>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--ink-soft)' }}>{x.d}</p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 16 }}>
        A 2×2 of <strong>value</strong> (impact × frequency) against <strong>agentic-fit</strong> (ambiguity ×
        autonomy-safe) gives you a portfolio heatmap clients love.
      </p>

      <h2 id="canvas">The Agentic Opportunity Canvas</h2>
      <p>A one-pager you fill in during a discovery session. Each line feeds a later phase:</p>
      <pre className="code">{`JOB TO BE DONE:        the outcome the org/user actually wants
TODAY'S PROCESS:       who does it now, how long, how much it costs
THE BOTTLENECK:        why it's slow/costly — is it ambiguity/language? (if no → stop)
TRIGGER & INPUTS:      what kicks it off; what data/docs are needed
DEFINITION OF DONE:    what a "good" output looks like (this becomes your eval)
ACTION SURFACE:        what the agent would do (read-only? draft? act?)
REVERSIBILITY:         can a mistake be undone? cheaply? (drives autonomy)
VALUE:                 $ / time / quality / risk reduced, × volume
GUARDRAILS NEEDED:     compliance, PII, what it must never do`}</pre>
      <Callout kind="tip" title="Make it real">
        A working, fillable version of this canvas is in <Link to="/tools">Workshop Tools</Link> — complete it
        for your own use case, save it locally, and export it straight into a kickoff deck.
      </Callout>

      <h2 id="sizing">Sizing the opportunity (so it survives a CFO)</h2>
      <pre className="code">{`Value = (time or cost per case saved) × (volume) × (automation/deflection rate) − run cost`}</pre>
      <p>
        Always express it in the client’s native metric: clinical hours returned, days-to-decision, deflection %,
        conversion lift, cost-to-serve.
      </p>

      <Callout kind="map" title="For product managers & consultants">
        This <em>is</em> the opportunity-assessment / discovery deck. The Canvas slots into a kickoff workshop;
        the sizing becomes the business-case skeleton.
      </Callout>
      <Callout kind="trap" title="Traps">
        “Solution looking for a problem” (someone fell in love with agents) · sizing on volume without a
        deflection assumption you can defend · ignoring the Responsibility lens until legal kills it in month 3.
      </Callout>
    </>
  );
}

Phase1.toc = [
  { id: 'lenses', label: 'The four lenses' },
  { id: 'canvas', label: 'Opportunity Canvas' },
  { id: 'sizing', label: 'Sizing' },
  { id: 'worked-example', label: 'Worked example' },
];
