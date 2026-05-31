import { Link } from 'react-router-dom';
import { Callout } from '../../components/UI';
import { Autonomy2x2 } from '../../components/Visuals';
import { FlowDiagram } from '../../components/CaseArtifacts';
import { PATTERNS } from '../../data/phases';
import { PRIOR_AUTH, RETAIL_CS } from '../../data/cases';

function PatternCard({ p, accent }) {
  return (
    <div className="card card-hover" style={{ borderTop: `4px solid ${accent}` }}>
      <h4 style={{ margin: 0 }}>{p.name}</h4>
      <p style={{ margin: '8px 0 0', fontSize: 13.5, color: 'var(--ink-soft)' }}>{p.desc}</p>
      {p.use && <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--ink-faint)' }}><strong style={{ color: 'var(--ink-soft)' }}>Use when:</strong> {p.use}</p>}
    </div>
  );
}

export default function Phase3() {
  return (
    <>
      <Callout kind="key" title="The technical-PM core">
        You don’t need to write the code, but you must be able to <strong>specify the pattern</strong> and
        <strong> defend the autonomy choice.</strong> This is the biggest “10×” addition.
      </Callout>

      <h2 id="patterns">The pattern library</h2>
      <p>
        Memorize these — they cover ~90% of real systems. They’re the established patterns from{' '}
        <a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noopener noreferrer">Anthropic’s <em>Building Effective Agents</em></a>.
      </p>

      <h3>Workflow patterns <span style={{ fontSize: 13, color: 'var(--ink-faint)', fontWeight: 400 }}>— path defined by you</span></h3>
      <div className="grid grid-2">
        {PATTERNS.workflow.map((p) => <PatternCard key={p.name} p={p} accent="var(--p1)" />)}
      </div>

      <h3>Agent patterns <span style={{ fontSize: 13, color: 'var(--ink-faint)', fontWeight: 400 }}>— path chosen by the model</span></h3>
      <div className="grid grid-3">
        {PATTERNS.agent.map((p) => <PatternCard key={p.name} p={p} accent="var(--p3)" />)}
      </div>

      <h3>Cross-cutting components every real system needs</h3>
      <div className="grid grid-3">
        {PATTERNS.components.map((p) => <PatternCard key={p.name} p={p} accent="var(--p2)" />)}
      </div>

      <h2 id="buildbuy">Build vs. buy vs. orchestrate</h2>
      <p>
        For each capability decide: foundation-model API + your orchestration (most flexible), a vertical SaaS
        agent (fastest, less control), or RPA/code (cheapest where deterministic). Model selection is a
        <strong> portfolio</strong> decision — cheaper/faster models for routing and extraction, stronger models
        only for the hard reasoning step. A major cost lever in Phase 7.
      </p>
      <Callout kind="tip" title="Decouple the architecture from the vendor">
        Models, frameworks, and vendors change every few months. Design the <em>pattern</em> and the
        <em> interfaces</em> so you can swap the model underneath. When clients ask “which model?”, the senior
        answer is: “here’s the architecture; the model is a configurable, replaceable component, and here’s how
        we’ll re-evaluate it quarterly.”
      </Callout>

      <h2 id="autonomy">The autonomy decision — the master design variable</h2>
      <p>
        For every action the system can take, set autonomy by <strong>reversibility × blast radius</strong>.
        This single 2×2 governs more of the design than any model choice.
      </p>
      <Autonomy2x2 />
      <Callout kind="tip" title="Take it further">
        Autonomy is a property of <em>each action × each case-segment</em>, not the whole system — so the real
        deliverable is a matrix. See the <Link to="/deep/autonomy-eval">Autonomy &amp; Eval deep dive</Link>,
        and build your own in <Link to="/tools">Workshop Tools</Link>.
      </Callout>

      <h2 id="ref-arch">Reference architectures</h2>
      <p style={{ fontSize: 14, color: 'var(--ink-faint)' }}>
        Two concrete designs — the same patterns above, composed for each case. Read left to right.
      </p>

      <h4>🏥 Prior auth</h4>
      <FlowDiagram steps={PRIOR_AUTH.architecture} />
      <p style={{ fontSize: 14 }}><strong>Autonomy:</strong> read/draft = autonomous; <em>determine/sign = always human.</em> Irreversible + high blast radius.</p>

      <h4>🛍️ Retail CS</h4>
      <FlowDiagram steps={RETAIL_CS.architecture} />
      <p style={{ fontSize: 14 }}><strong>Autonomy:</strong> refunds under a threshold = autonomous (reversible-ish, low blast radius); above threshold or out-of-policy = human.</p>

      <Callout kind="map" title="For product managers & consultants">
        This is the solution-architecture section of your PRD / SOW and the future-state design. The autonomy
        2×2 is a brilliant exec slide — it makes the safety story visual.
      </Callout>
      <Callout kind="trap" title="Traps">
        Reaching for multi-agent when one agent + tools would do (complexity tax, debugging nightmare) ·
        skipping retrieval and getting confident hallucinations · building memory before it’s needed · choosing
        one expensive model for everything.
      </Callout>
    </>
  );
}

Phase3.toc = [
  { id: 'patterns', label: 'Pattern library' },
  { id: 'buildbuy', label: 'Build vs buy' },
  { id: 'autonomy', label: 'Autonomy 2×2' },
  { id: 'ref-arch', label: 'Reference architectures' },
  { id: 'worked-example', label: 'Worked example' },
];
