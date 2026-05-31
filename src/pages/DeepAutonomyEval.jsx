import { Callout, Table } from '../components/UI';
import { AutonomyLadder, ClosedLoop } from '../components/Visuals';
import Term from '../components/Term';

export default function DeepAutonomyEval() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div className="page prose">
      <div className="phase-head fade-up">
        <span className="badge" style={{ background: 'var(--p7)' }}>DEEP DIVE · THE EVIDENCE ENGINE</span>
        <h1>Autonomy &amp; Eval</h1>
        <p className="tagline">The evidence engine and the trust ladder it powers — for the practitioner who has to defend every autonomy decision with a number.</p>
      </div>

      <div className="toc fade-up-2">
        <a href="#why" onClick={(e) => scrollTo(e, 'why')}>Why they’re one system</a>
        <a href="#ladder" onClick={(e) => scrollTo(e, 'ladder')}>The autonomy ladder</a>
        <a href="#promotion" onClick={(e) => scrollTo(e, 'promotion')}>Promotion &amp; demotion</a>
        <a href="#matrix" onClick={(e) => scrollTo(e, 'matrix')}>The autonomy matrix</a>
        <a href="#eval" onClick={(e) => scrollTo(e, 'eval')}>Evaluation</a>
        <a href="#economics" onClick={(e) => scrollTo(e, 'economics')}>Economics</a>
        <a href="#loop" onClick={(e) => scrollTo(e, 'loop')}>The closed loop</a>
      </div>

      <Callout kind="key" title="If you remember one thing">
        An autonomy roadmap with no eval system is just a wish. You cannot promote an agent to act on its own
        without an objective, pre-agreed trigger — and that trigger is a measured metric clearing a threshold.
      </Callout>

      <h2 id="why">Why these two are one system</h2>
      <p>
        Most teams treat “how autonomous should the agent be?” and “how do we measure the agent?” as separate
        workstreams. They aren’t. Eval produces evidence → evidence is the gate to climb the ladder → climbing
        drops human-in-the-loop % → better economics fund the next use case.
      </p>

      <h2 id="ladder">The autonomy ladder</h2>
      <Callout kind="tip" title="The reframe that separates seniors from beginners">
        Autonomy is a property of <strong>each action × each case-segment</strong>, not the system. One deployed
        agent sits on different rungs simultaneously — autopilot for “where’s my order,” act-with-limits for
        small refunds, pure copilot for high-value disputes. The deliverable is a <strong>matrix</strong>.
      </Callout>
      <p>Five rungs — climb only as evidence accumulates. HITL% (human time per case) falls as you climb:</p>
      <AutonomyLadder />

      <h2 id="promotion">Promotion criteria &amp; circuit breakers</h2>
      <p>You climb a rung <strong>only</strong> when pre-agreed evidence clears a bar — defined <em>before</em> deploying so it can’t be renegotiated under launch pressure. A complete gate specifies:</p>
      <ul>
        <li><strong>Metric(s) + threshold</strong> — e.g. determination accuracy ≥ 96% AND citation faithfulness ≥ 98% AND edit rate ≤ 10% AND zero critical-safety violations.</li>
        <li><strong>Sample size / duration</strong> — hundreds per segment, not dozens.</li>
        <li><strong>The segment it applies to</strong> — promote the easy segment first; the hard segment stays a rung lower.</li>
        <li><strong>Sign-off</strong> — named owner (governance forum / clinical lead / risk owner).</li>
        <li><strong>The rollback trigger</strong> — defined at the same time.</li>
      </ul>
      <Callout kind="trap" title="Agents don’t only climb — define automatic demotion">
        Live accuracy drops below threshold → demote to the rung requiring human approval. A critical incident →
        demote + halt + alert. Input drift detected → demote until re-evaluated. Plus a <strong>manual kill
        switch</strong> for any consequential agent. “What happens when it’s wrong?” must have a one-click answer.
      </Callout>

      <h2 id="matrix">The autonomy matrix — prior auth (illustrative)</h2>
      <Table
        head={['Action ↓ / Segment →', 'Clearly meets criteria', 'Borderline / complex', 'High-risk / appeal']}
        rows={[
          ['Extract & structure data', 'R5 Autopilot', 'R5 Autopilot', 'R4 + audit'],
          ['Recommend determination', 'R4 act-with-limits', 'R3 assist (escalate)', 'R2 suggest'],
          ['Issue determination / sign', 'R4 (auto-approve only) ✱', 'R2 — clinician signs', 'R2 — clinician signs'],
          ['Notify provider/member', 'R5 Autopilot', 'R5 Autopilot', 'R5 Autopilot'],
        ]}
      />
      <p style={{ fontSize: 13.5, color: 'var(--ink-faint)' }}>✱ Hard ceiling: a <em>denial</em> is never autonomous; only clear auto-approvals can reach R4 — a regulatory/legal decision, not an engineering one.</p>

      <h2 style={{ fontSize: 20 }}>Retail post-purchase (illustrative)</h2>
      <Table
        head={['Action ↓ / Segment →', 'WISMO / simple', 'Return within policy', 'Out-of-policy / VIP / upset']}
        rows={[
          ['Look up & explain', 'R5 Autopilot', 'R5 Autopilot', 'R4 + audit'],
          ['Initiate return label', 'R5 Autopilot', 'R4 (within rules)', 'R2 suggest'],
          ['Issue refund', 'n/a', 'R4 ≤ $X cap', 'R2 — human approves'],
          ['Make goodwill gesture', 'R4 ≤ small cap', 'R4 ≤ cap', 'R3 (escalate large)'],
        ]}
      />

      <hr className="rule" />

      <h2 id="eval">Evaluation — the engine room</h2>
      <p>Build it <strong>before</strong> you build the agent. You can’t gate, ship, trust, or price what you can’t measure.</p>

      <h3>The golden dataset — your crown jewel</h3>
      <ul>
        <li><strong>Source it</strong> from the Phase-2 ground-truth audit — historical cases with known-good outcomes.</li>
        <li><strong>Stratify it</strong> to mirror the real distribution <em>and</em> deliberately over-sample edge cases. An all-easy golden set yields a flattering, useless number.</li>
        <li><strong>Size it</strong> for statistical confidence — hundreds per important segment.</li>
        <li><strong>Measure human disagreement first</strong> — when experts disagree, that’s the ceiling on achievable “accuracy” and a finding worth reporting.</li>
        <li><strong>Keep it alive</strong> — every production failure and Rung-2 correction flows back in. The dataset compounds; that’s the moat.</li>
      </ul>

      <h3>The metric tree — measure what the job is</h3>
      <Table
        head={['Layer', 'Examples', 'Question it answers']}
        rows={[
          ['Outcome', 'task success, resolution rate, determination correctness', 'Did it achieve the goal?'],
          ['Quality / faithfulness', 'grounded-in-sources, citation accuracy, hallucination rate', 'Is it right and for the right reasons?'],
          ['Safety', 'guardrail-violation rate, non-compliant rate, PII leakage', 'Did it cross a line?'],
          ['Operational', 'latency, cost/task, escalation rate, loop count', 'Can it run at scale affordably?'],
        ]}
      />
      <Callout kind="tip" title="Two distinctions experts never blur">
        <strong>Faithfulness ≠ correctness</strong> — “grounded in the source” and “actually right” are different
        failures; measure both. And for any RAG system, <strong>separate retrieval quality from generation
        quality</strong> — did we fetch the right context vs. did the model use it correctly?
      </Callout>

      <h3>LLM-as-judge — the scaling unlock and its traps</h3>
      <p>
        Human eval is gold but doesn’t scale to every commit and production sample; an LLM judge scoring against
        a rubric does. Prefer <strong>pairwise</strong> comparison, supply a <strong>reference answer</strong> and
        specific behavioral rubric, and ask the judge to reason <em>then</em> score. <strong>You must validate
        the judge</strong> against human ratings before trusting it.
      </p>
      <Callout kind="trap" title="Known biases to neutralize">
        Position bias (randomize order) · verbosity bias (control for length) · self-preference (consider a
        different judge model) · leniency. A vague “rate the quality” prompt amplifies all of them; a tight
        rubric with references suppresses them.
      </Callout>

      <h3>Offline → online → continuous</h3>
      <p>
        Offline golden set as <strong>gating CI</strong> (every prompt/model/tool change re-runs it and blocks
        regressions; each production incident adds a permanent regression test) → <Term k="shadow"><strong>shadow</strong></Term> (Rung 1)
        → <strong>online A/B</strong> vs. human baseline → <strong>continuous</strong> monitoring with sampled
        human audit (Rung-4 spot-checks <em>are</em> online eval). Watch for <Term k="drift"><strong>drift</strong></Term>: input
        distribution shifts trigger re-evaluation and can auto-demote a rung.
      </p>

      <hr className="rule" />

      <h2 id="economics">Economics — speak fluent unit cost</h2>
      <pre className="code">{`Cost/task = Σ steps [ (in_tokens × in_rate) + (out_tokens × out_rate) ]
            + tool / external-API costs
            + infra / orchestration overhead`}</pre>
      <p>Multi-step agents grow cost <strong>superlinearly</strong> if naive — each loop re-sends accumulated context. Levers: prompt caching · retrieval instead of context-stuffing · model routing (cheap model for easy steps, strong model only for hard reasoning) · step/loop caps · distilled small models.</p>

      <Callout kind="key" title="Cost per SUCCESSFUL task — the honest number">
        <code>Cost per successful task = cost per task ÷ success rate.</code> A cheap agent at 60% success that
        dumps 40% of cases onto humans is <em>expensive</em>. Always quote this number, not raw cost/task — the
        pricier, more-accurate model is often cheaper per successful task.
      </Callout>

      <h3>Worked examples <span style={{ fontSize: 13, color: 'var(--ink-faint)', fontWeight: 400 }}>(illustrative — rates assumed, not market quotes)</span></h3>
      <div className="grid grid-2">
        <div className="card" style={{ borderTop: '4px solid var(--p2)' }}>
          <h4 style={{ margin: 0 }}>Retail CS · high volume</h4>
          <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: '8px 0' }}>
            600k contacts/yr · $5 human cost/contact · $0.08 agent cost/task · 80% success.
          </p>
          <ul style={{ fontSize: 13.5 }}>
            <li>Cost per successful task = $0.08 ÷ 0.80 = <strong>$0.10</strong></li>
            <li>Net value / auto-resolved ≈ <strong>$4.90</strong></li>
            <li>Gross annual value ≈ 600k × 0.80 × $4.90 ≈ <strong>$2.35M/yr</strong></li>
          </ul>
          <p style={{ fontSize: 13, color: 'var(--ink-faint)', margin: 0 }}>Token cost is ~1.6% of value saved — the lever that matters is <strong>automation rate</strong>.</p>
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--p1)' }}>
          <h4 style={{ margin: 0 }}>Prior auth · high value</h4>
          <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: '8px 0' }}>
            200k requests/yr · 20→8 min with agent draft · $2/min clinician · $0.50 agent cost · 90% acceptable.
          </p>
          <ul style={{ fontSize: 13.5 }}>
            <li>Cost per successful task = $0.50 ÷ 0.90 ≈ <strong>$0.56</strong></li>
            <li>Clinician time saved/case = 12 min × $2 = <strong>$24</strong></li>
            <li>Auto-approvable segment saves ≈ <strong>$40/case</strong></li>
          </ul>
          <p style={{ fontSize: 13, color: 'var(--ink-faint)', margin: 0 }}>Token cost is a rounding error — <strong>success rate and HITL reduction dominate</strong>.</p>
        </div>
      </div>

      <Callout kind="tip" title="Know which regime you’re in">
        In retail, token cost is a visible slice of small per-case value → cost-engineering matters. In prior
        auth, token cost is a rounding error against expensive clinician time → spend on the better model and the
        eval, not on shaving cents. Also: present the business case as a <strong>range</strong> (base/low/high)
        across success rate, automation rate, volume, and HITL% — a single confident number reads as naïve. And
        always <strong>baseline the metric before launch</strong> — you can’t prove a lift you never measured.
      </Callout>

      <hr className="rule" />

      <h2 id="loop">The closed loop — the whole point in one picture</h2>
      <ClosedLoop />
      <p style={{ textAlign: 'center', color: 'var(--ink-soft)' }}>
        Build this loop once and every subsequent use case is cheaper, safer, and faster — exactly the
        <em> platform-compounds</em> logic from the strategy phase.
      </p>

      <Callout kind="trap" title="Anti-patterns">
        One global autonomy setting · promoting on vanity metrics · no demotion/circuit-breaker logic · no kill
        switch · climbing before the eval infra exists · raw LLM confidence treated as calibrated · golden set of
        only easy cases · quoting cost/task instead of cost-per-successful-task · point-estimate business cases.
      </Callout>
    </div>
  );
}
