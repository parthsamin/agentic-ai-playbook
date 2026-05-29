import { Callout, Table } from '../../components/UI';

const RISKS = [
  { c: 'Accuracy / hallucination', look: 'Confident wrong answer; fabricated citation', mit: 'RAG grounding; require source citations; confidence thresholds; human review on low-confidence', color: 'var(--p4)' },
  { c: 'Autonomy / action risk', look: 'Agent does something harmful/irreversible', mit: 'Autonomy 2×2; action allow-lists; spend/dollar caps; approval gates; dry-run mode', color: '#ff7a45' },
  { c: 'Security', look: 'Prompt injection, data exfiltration, tool abuse', mit: 'Input sanitization; least-privilege tool scopes; isolate untrusted content; output filtering', color: '#ff5470' },
  { c: 'Compliance / regulatory', look: 'HIPAA/PHI exposure, FDA/clinical, consumer-protection, bias laws', mit: 'Data minimization; audit trails; legal sign-off on autonomy; documented rationale', color: '#c14bff' },
  { c: 'Bias / fairness', look: 'Unequal outcomes across groups', mit: 'Subgroup eval; bias testing; human oversight on protected decisions', color: '#6d4bff' },
  { c: 'Reputational', look: 'Public bad output; tone failure', mit: 'Tone/brand guardrails; staged rollout; kill switch', color: '#4b62ff' },
  { c: 'Cost runaway', look: 'Loops, token explosions', mit: 'Step/loop caps; budget alerts; cost-per-task monitoring', color: '#f5a623' },
  { c: 'Model / vendor dependency', look: 'API change, deprecation, price hike', mit: 'Abstraction layer; multi-model fallback; contractual terms', color: '#0fc9b5' },
  { c: 'Drift / silent degradation', look: 'Quality decays as world/data changes', mit: 'Ongoing online eval; monitoring; periodic re-validation', color: '#19c37d' },
];

export default function Phase4() {
  return (
    <>
      <Callout kind="key" title="The mindset">
        Responsible AI is a <strong>design input</strong>, not a checkbox at the end. Score each risk on
        <strong> likelihood × impact</strong>, attach a mitigation and an owner, and you’ve built an AI-specific
        RAID log the client’s risk org instantly recognizes.
      </Callout>

      <h2 id="taxonomy">The agentic risk taxonomy</h2>
      <p>The nine risk classes that show up in nearly every agentic system. Each gets a mitigation and an owner:</p>
      <div className="grid grid-3">
        {RISKS.map((r) => (
          <div className="card card-hover" key={r.c} style={{ borderTop: `4px solid ${r.color}` }}>
            <h4 style={{ margin: 0, fontSize: 15 }}>{r.c}</h4>
            <p style={{ margin: '8px 0 6px', fontSize: 13, color: 'var(--ink-faint)', fontStyle: 'italic' }}>{r.look}</p>
            <p style={{ margin: 0, fontSize: 13.5, color: 'var(--ink-soft)' }}><strong style={{ color: 'var(--ink)' }}>Mitigate:</strong> {r.mit}</p>
          </div>
        ))}
      </div>

      <h2 id="governance">The governance frame</h2>
      <p>
        Map to a recognized structure — <strong>NIST AI RMF</strong> (Govern–Map–Measure–Manage) or
        <strong> ISO/IEC 42001</strong> — so the client’s risk org recognizes it. Then define the operating questions
        every consequential agent must answer:
      </p>
      <div className="grid grid-2">
        {[
          ['Who owns the agent?', 'A named product owner accountable for its behavior.'],
          ['Who can change it?', 'Change control over prompts, tools, and model versions.'],
          ['What’s the audit trail?', 'Every consequential decision logged with its rationale.'],
          ['What’s the human-oversight policy?', 'Which actions need approval, and by whom.'],
          ['What’s the escalation path?', 'How incidents are caught, routed, and resolved.'],
          ['Where’s the kill switch?', 'A one-click halt for any consequential agent.'],
        ].map(([q, a]) => (
          <div className="card" key={q} style={{ borderLeft: '4px solid var(--p4)' }}>
            <h4 style={{ margin: 0, fontSize: 15 }}>{q}</h4>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, color: 'var(--ink-soft)' }}>{a}</p>
          </div>
        ))}
      </div>
      <Callout kind="tip" title="The non-negotiable">
        Every consequential agent needs a documented <strong>“what happens when it’s wrong”</strong> plan — and a
        kill switch. If you can’t answer that in one click, it isn’t ready for production.
      </Callout>

      <h2 id="industry">Industry-specific stakes</h2>
      <div className="case-grid">
        <div className="case-card health">
          <h4>🏥 Healthcare</h4>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
            PHI under HIPAA; PA decisions are regulated and auditable; clinical-decision tools may face FDA
            scrutiny. <strong>The licensed clinician owns the determination — the agent assists.</strong> Every
            output needs a defensible, cited rationale. This is why PA is a human-in-the-loop design, full stop.
          </p>
        </div>
        <div className="case-card retail">
          <h4>🛍️ Retail</h4>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
            Consumer-protection and advertising rules (no false claims in generated copy); PII under GDPR/CCPA;
            pricing/refund actions touch financial controls; recommendation bias and dark-pattern risk;
            brand-safety on anything customer-facing.
          </p>
        </div>
      </div>

      <Callout kind="map" title="For product managers & consultants">
        This is the RAID log, risk register, and compliance workstream — now with AI-native categories. Bringing
        prompt-injection and autonomy-risk to a client unprompted instantly marks you as senior.
      </Callout>
      <Callout kind="trap" title="Traps">
        Treating responsible AI as a checkbox at the end instead of a design input · no kill switch · ignoring
        prompt injection because “it’s internal” (it isn’t, once it reads external content) · no plan for being
        wrong in production.
      </Callout>
    </>
  );
}

Phase4.toc = [
  { id: 'taxonomy', label: 'Risk taxonomy' },
  { id: 'governance', label: 'Governance frame' },
  { id: 'industry', label: 'Industry stakes' },
  { id: 'worked-example', label: 'Worked example' },
];
