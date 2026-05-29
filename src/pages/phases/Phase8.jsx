import { Callout, Table } from '../../components/UI';

export default function Phase8() {
  return (
    <>
      <Callout kind="key" title="The graveyard phase">
        Most agentic pilots work and never scale — <strong>not for technical reasons but operating-model and
        human ones.</strong> This is pure consulting territory and your differentiator.
      </Callout>

      <h2 id="last-mile">Productionization — the last mile</h2>
      <p>Pilot ≠ production. Budget for the last mile explicitly; it’s often as large as the build. The gap:</p>
      <div className="pill-row">
        {['reliability at scale', 'monitoring / observability', 'incident response', 'security review', 'integration hardening', 'continuous eval + re-prompting as the world drifts'].map((x) => (
          <span className="tag tag-accent" key={x} style={{ '--accent': 'var(--p8)' }}>{x}</span>
        ))}
      </div>

      <h2 id="operating">Operating model — who runs the agent forever</h2>
      <div className="grid grid-2">
        {[
          ['LLMOps / AgentOps', 'Versioning prompts/tools/models, eval in CI, drift monitoring, rollback, on-call.'],
          ['Ownership', 'A named product owner + a clear “agent steward” who watches quality and incidents.'],
          ['Org shape', 'A central AI platform team (eval harness, guardrails, shared tools, governance) enabling federated product squads — so use case #6 costs a fraction of #1.'],
          ['Governance forum', 'Reviews new use cases, autonomy promotions, and incidents.'],
        ].map(([t, d]) => (
          <div className="card" key={t} style={{ borderLeft: '4px solid var(--p8)' }}>
            <h4 style={{ margin: 0, fontSize: 15 }}>{t}</h4>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, color: 'var(--ink-soft)' }}>{d}</p>
          </div>
        ))}
      </div>

      <h2 id="change">Change management &amp; workforce redesign</h2>
      <p>The agent changes <em>jobs</em>, and adoption is the real bottleneck. Address it head-on:</p>
      <ul>
        <li><strong>Redesign the human role</strong> — humans move from <em>doing</em> to <em>reviewing, handling edge cases, and improving the agent.</em> Make that role attractive and clear.</li>
        <li><strong>Trust &amp; adoption</strong> — explainability, the ability to override, visible accuracy, and involving end-users in design. A clinician who doesn’t trust the draft won’t use it; a CS rep who fears replacement will route around it.</li>
        <li><strong>Incentives</strong> — don’t measure people on metrics the agent now owns; measure them on the new value-added work.</li>
        <li><strong>Comms</strong> — the augmentation story, honestly told. Where roles do shrink, say so and plan it.</li>
      </ul>
      <Callout kind="tip" title="The line that matters">
        An agent at 95% accuracy that nobody trusts delivers 0% value. <strong>Adoption is a design problem, not
        an afterthought</strong> — and it’s the part technical teams skip and consultants own.
      </Callout>

      <Callout kind="map" title="For product managers & consultants">
        Operating-model design, the org-and-change workstream, the run/BAU transition, the capability-build
        recommendation — the highest-margin, stickiest consulting work.
      </Callout>
      <Callout kind="trap" title="Traps">
        “Throw it over the wall” with no run model · no continuous eval (silent drift) · ignoring the workforce
        until adoption fails · no central platform, so every team rebuilds guardrails and costs balloon.
      </Callout>
    </>
  );
}

Phase8.toc = [
  { id: 'last-mile', label: 'The last mile' },
  { id: 'operating', label: 'Operating model' },
  { id: 'change', label: 'Change management' },
  { id: 'worked-example', label: 'Worked example' },
];
