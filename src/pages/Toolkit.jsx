import { Link } from 'react-router-dom';
import { Callout, Table } from '../components/UI';
import { DIAGNOSTICS, PHASES } from '../data/phases';

export default function Toolkit() {
  return (
    <div className="page prose">
      <div className="eyebrow">The expert’s pocket toolkit</div>
      <h1 style={{ fontSize: 40, margin: '8px 0 10px', letterSpacing: '-0.02em' }}>Bring these into the room</h1>
      <p style={{ color: 'var(--ink-soft)', fontSize: 17, maxWidth: '64ch' }}>
        The diagnostics, one-sentence tests, and anti-patterns that let you operate two levels up from day one.
      </p>

      <h2 id="diagnostics">Diagnostic questions for a kickoff</h2>
      <div className="grid grid-2">
        {DIAGNOSTICS.map((q, i) => (
          <div className="card" key={i} style={{ display: 'flex', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--brand)', fontSize: 20 }}>{i + 1}</span>
            <p style={{ margin: 0, fontSize: 14.5, color: 'var(--ink-soft)' }}>{q}</p>
          </div>
        ))}
      </div>

      <h2 id="one-sentence">The one-sentence test for each phase</h2>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Phase</th><th>Say this</th></tr></thead>
          <tbody>
            {PHASES.map((p) => (
              <tr key={p.slug}>
                <td><Link to={`/phase/${p.slug}`} style={{ fontWeight: 600 }}>{p.id}. {p.title}</Link></td>
                <td style={{ fontStyle: 'italic' }}>“{p.oneSentence}”</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="anti-patterns">Anti-patterns that mark a beginner</h2>
      <Callout kind="trap" title="Avoid these">
        Agent where a workflow would do · no eval before build · no baseline · moat = “we used GPT” ·
        multi-agent for a single-agent job · autonomy without reversibility analysis · no kill switch · pilot
        with no run model · ignoring change management · sizing value without a defensible deflection/accuracy
        assumption.
      </Callout>

      <h2 id="artifacts">How the AI phases map to artifacts you already produce</h2>
      <Table
        head={['Phase', 'Your existing deliverable']}
        rows={[
          ['Frame', 'Opportunity assessment / discovery deck; business-case skeleton'],
          ['Map', 'As-is process map; data-readiness assessment'],
          ['Architect', 'PRD solution section / future-state design'],
          ['De-risk', 'RAID log / risk register / compliance workstream'],
          ['Strategize', 'Product strategy; portfolio prioritization; operating-model rec'],
          ['Sequence', 'Roadmap; OKRs; stage-gate plan / phased SOW'],
          ['Prove', 'Benefits-realization plan; QBR metrics'],
          ['Scale', 'Org-and-change workstream; run/BAU transition'],
        ]}
      />

      <h2 id="90-day">Your 90-day path to expert</h2>
      <div className="grid grid-2">
        {[
          { w: 'Weeks 1–2', d: 'Take one real assignment and run it through all 8 phases on paper. Where did the project skip a phase — and what did it cost?' },
          { w: 'Weeks 3–4', d: 'Build the pattern library into muscle memory: for 10 use cases, name the pattern and the autonomy rung in under a minute.' },
          { w: 'Weeks 5–8', d: 'Get hands-on with eval: build a golden set and an LLM-as-judge for one task end to end. The rarest skill — owning it is your edge.' },
          { w: 'Weeks 9–12', d: 'Build your reusable assets: the Opportunity Canvas, the autonomy 2×2, the risk taxonomy, the ladder template, the cost-per-successful-task model.' },
        ].map((x) => (
          <div className="card card-hover" key={x.w} style={{ borderLeft: '4px solid var(--amber)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--amber)', fontWeight: 600 }}>{x.w}</div>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--ink-soft)' }}>{x.d}</p>
          </div>
        ))}
      </div>

      <h2 id="references">Grounded in real frameworks</h2>
      <p>
        Nothing in this playbook is invented jargon. The methodology synthesizes established, verifiable sources —
        check them yourself:
      </p>
      <ul>
        <li><strong>Workflow &amp; agent patterns, the spectrum</strong> — <a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noopener noreferrer">Anthropic, <em>Building Effective Agents</em></a> (prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer; “workflows beat agents when the path is knowable”).</li>
        <li><strong>Risk &amp; governance</strong> — <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener noreferrer">NIST AI Risk Management Framework</a> (Govern–Map–Measure–Manage) and <a href="https://www.iso.org/standard/42001" target="_blank" rel="noopener noreferrer">ISO/IEC 42001:2023</a>, the first AI management-system standard.</li>
        <li><strong>Opportunity Canvas</strong> — <a href="https://www.jpattonassociates.com/opportunity-canvas/" target="_blank" rel="noopener noreferrer">Jeff Patton’s Opportunity Canvas</a>, a standard product-discovery tool, adapted here for agentic problems.</li>
        <li><strong>Decomposition</strong> — classic process decomposition / value-stream mapping from operations and management consulting.</li>
        <li><strong>Evaluation</strong> — the LLM-as-judge literature, incl. <a href="https://arxiv.org/abs/2306.05685" target="_blank" rel="noopener noreferrer">Zheng et al., MT-Bench (2023)</a> on position, verbosity, and self-preference bias.</li>
      </ul>
      <Callout kind="map" title="What’s adapted vs. standard">
        The <strong>Opportunity Canvas</strong> (Patton) and the <strong>decomposition table</strong> (value-stream
        mapping) are established tools. The <strong>autonomy ladder</strong> and the <strong>autonomy matrix</strong>
        are purpose-built for agentic AI — grounded in real practice (staged/shadow deployment, RACI-style decision
        rights, reversible-vs-irreversible analysis) but synthesized here, not pre-existing named standards.
      </Callout>

      <Callout kind="key" title="The throughline of expertise">
        You optimize for the client’s outcome over the coolness of the solution — which means knowing when to
        say “workflow, not agent,” “human stays in the loop here,” or “don’t build this yet.” That judgment,
        backed by the ability to measure and de-risk, is the whole game.
      </Callout>
    </div>
  );
}
