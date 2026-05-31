// ============================================================
// THE TWO WORKED CASES — single source of truth.
// Powers: the Cases intro page, the per-case Playthroughs,
// the embedded worked-example blocks in each phase, and the
// loadable tool templates.
// Numbers are illustrative (assumed, configurable) per the source docs.
// ============================================================

export const PRIOR_AUTH = {
  id: 'priorauth',
  name: 'Prior-Authorization Triage & Drafting',
  short: 'Prior Auth',
  emoji: '🏥',
  accent: 'var(--p1)',
  sector: 'Healthcare · a health plan',
  teaches: 'governance, accuracy, and human-in-the-loop',
  tagline: 'High stakes, low volume per case, heavily regulated — judgment plus rules.',

  setup: {
    scenario:
      'A health plan drowns in prior-authorization (PA) requests. Nurses read long faxes and charts, match them against medical policy, and a physician signs the determination. It is slow, expensive, and the turnaround time frustrates providers and members.',
    baseline: [
      { label: 'PA requests / yr (one service line)', value: '200,000' },
      { label: 'Clinician review time, manual', value: '20 min / case' },
      { label: 'Loaded clinician cost', value: '$2 / min' },
      { label: 'Turnaround today', value: 'measured in days' },
    ],
    people: 'Intake clerks · review nurses · signing physicians · compliance/privacy · a clinical lead',
    stakes:
      'PHI under HIPAA; PA decisions are regulated and auditable; a wrong determination carries clinical and legal liability. The licensed clinician owns the determination — the agent only assists.',
    win: 'Turnaround drops from days to hours, clinician hours are returned, every output has a defensible cited rationale, and the signature never leaves a human.',
  },

  // Phase 1 — filled Opportunity Canvas (also the tool template)
  canvas: {
    job: 'Decide PA requests faster, accurately, and compliantly.',
    process: 'Nurses manually read faxes/charts and check them against medical policy; a physician signs. ~20 min of clinician time per case across 200k cases/yr.',
    bottleneck: 'Nurses reading long, unstructured clinical documents and exercising judgment against guidelines. The bottleneck IS ambiguity over language → agentic AI is a fit.',
    trigger: 'A PA request arrives via fax / portal / EDI. Inputs needed: the request, member history, and the relevant medical policy / clinical guidelines.',
    dod: 'A correct determination with a cited rationale that a clinician is willing to sign.',
    action: 'Read member history + policy (RAG), reason against criteria, and DRAFT a determination with citations. Read & draft only — it never signs.',
    reversibility: 'A wrong DRAFT is caught at clinician review (cheaply reversible). A wrong SIGNED determination is high blast-radius and regulated (irreversible) → the signature stays human.',
    value: 'Clinician minutes returned (20 → 8) × 200k/yr; turnaround days → hours; audit-defensibility.',
    guardrails: 'PHI minimization under HIPAA; policy-adherence checks; citations required on every output; denials are never autonomous.',
  },

  // Phase 2 — filled decomposition (also the tool template)
  decomposition: [
    { step: 'Receive request (fax/portal/EDI)', today: 'Intake clerk', level: 'L0', err: 'Low', why: 'Pure data capture — OCR/parse in code.' },
    { step: 'Extract clinical data', today: 'Nurse reads', level: 'L2', err: 'Med', why: 'Turning unstructured charts into structured fields is single-shot extraction.' },
    { step: 'Check if review even needed', today: 'Nurse', level: 'L3', err: 'Med', why: 'A classification with a knowable path — auto-approve clear cases.' },
    { step: 'Match against medical policy', today: 'Nurse judgment', level: 'L4', err: 'High', why: 'Open-ended reasoning over guidelines — the path can’t be pre-scripted.' },
    { step: 'Draft determination + citations', today: 'Nurse', level: 'L4', err: 'High', why: 'Generative judgment grounded in retrieved policy — the high-value step.' },
    { step: 'Approve / sign', today: 'Physician', level: 'H', err: 'Critical', why: 'Regulated, liable decision — a licensed clinician owns it.' },
    { step: 'Notify provider / member', today: 'System', level: 'L0', err: 'Low', why: 'Templated output — no judgment.' },
  ],

  // Phase 3 — reference architecture flow + autonomy matrix
  architecture: [
    { label: 'Intake', sub: 'parse fax/EDI', kind: 'code' },
    { label: 'Triage router', sub: 'auto-approve clear cases', kind: 'workflow' },
    { label: 'Agent', sub: 'RAG: member history + policy → reason → draft + citations', kind: 'agent' },
    { label: 'Guardrails', sub: 'PHI, policy adherence', kind: 'guard' },
    { label: 'Clinician approval', sub: 'HUMAN signs', kind: 'human' },
    { label: 'Notify', sub: 'templated', kind: 'code' },
  ],
  matrix: {
    segments: ['Clearly meets criteria', 'Borderline / complex', 'High-risk / appeal'],
    actions: ['Extract & structure data', 'Recommend determination', 'Issue determination / sign', 'Notify provider/member'],
    cells: {
      '0-0': 'R5', '0-1': 'R5', '0-2': 'R4',
      '1-0': 'R4', '1-1': 'R3', '1-2': 'R2',
      '2-0': 'R4', '2-1': 'H', '2-2': 'H',
      '3-0': 'R5', '3-1': 'R5', '3-2': 'R5',
    },
    note: 'Hard ceiling: a denial is never autonomous; only clear auto-approvals reach R4 — a regulatory decision, not an engineering one.',
  },

  // Phase 4 — risk register
  risks: [
    { risk: 'Fabricated / wrong citation', mit: 'RAG grounding + citations required + clinician review on low-confidence', owner: 'Clinical lead' },
    { risk: 'PHI exposure (HIPAA)', mit: 'Data minimization, audit trail, legal sign-off on autonomy', owner: 'Privacy / Legal' },
    { risk: 'Autonomous denial', mit: 'Hard ceiling — denials never autonomous; only auto-approvals can reach R4', owner: 'Governance forum' },
    { risk: 'Bias across member groups', mit: 'Subgroup eval; human oversight on protected decisions', owner: 'Clinical + Risk' },
    { risk: 'Policy drift', mit: 'Drift monitoring; re-validate when guidelines change; auto-demote rung', owner: 'AgentOps' },
  ],

  // Phase 5 — strategy one-pager
  strategy: {
    northStar: 'PA decision turnaround (days → hours)',
    moat: 'Proprietary policy-mapping + the clinician-correction loop + compliance trust',
    lighthouse: 'One high-volume service line to production fast',
    platform: 'Reusable clinical-RAG + eval harness + PHI guardrails — reused for appeals, claims, and care navigation',
  },

  // Phase 6 — roadmap on the autonomy ladder
  roadmap: {
    now: 'Shadow on one service line; build the clinical eval set',
    next: 'Suggest / Assist with clinician approval; reuse the RAG for appeals',
    later: 'Autopilot on low-risk auto-approvals only; expand to more service lines',
    ceiling: 'Determination is NEVER fully autonomous',
  },

  // Phase 7 — economics (computed live in the renderer)
  economics: {
    assumptions: [
      { k: 'PA requests / yr', v: '200,000' },
      { k: 'Clinician time, manual', v: '20 min' },
      { k: 'Clinician time w/ agent draft', v: '8 min' },
      { k: 'Loaded clinician cost', v: '$2 / min' },
      { k: 'Agent cost / task', v: '$0.50' },
      { k: 'Acceptable-draft (success) rate', v: '90%' },
    ],
    agentCost: 0.5, successRate: 0.9, minutesSaved: 12, costPerMin: 2,
    autoApprovableFullSave: 40,
    note: 'Token cost is a rounding error against expensive clinician time → success rate and HITL reduction dominate. Spend on the better model and the eval, not on shaving cents.',
  },

  // Phase 8 — scale & change
  scale: {
    roleShift: 'Clinicians move from reading-and-typing to reviewing-and-signing',
    trust: 'Review UI with inline citations + confidence flags; reskill intake staff',
    governance: 'A governance forum reviews each autonomy promotion against safety data',
  },

  // Per-phase playthrough: the full worked reasoning, not just the conclusion.
  journey: {
    0: {
      artifact: 'verdict',
      situation: '200,000 PA requests a year arrive as faxes, portal forms, and EDI. Nurses read them against medical policy and a physician signs. Before designing anything, decide which parts — if any — an agent should touch.',
      qa: [
        { q: 'Can the path be predetermined, or does it need open-ended judgment?', a: 'Partly. Triage (“does this even need clinical review?”) is mostly rule-based → an L3 workflow. Matching the chart to policy and drafting a cited rationale is open-ended reasoning over messy documents → an L4 agent.', why: 'Only genuinely ambiguous reasoning earns an agent’s cost; steps with a knowable path are cheaper and safer as code or a workflow.' },
        { q: 'Is any step irreversible with no human checkpoint?', a: 'Yes — issuing and signing the determination is regulated and carries clinical and legal liability.', why: 'Irreversible + high blast-radius means it must stay human; this sets the autonomy ceiling every later phase has to respect.' },
      ],
      produces: 'A per-step spectrum verdict',
      artifactNote: 'Two steps (policy-match, draft) are the only genuine L4 work; everything else is code, light ML, or a human.',
      decision: 'Build a MIXED solution: workflow for triage, an agent for drafting, and never automate the signature.',
      why: 'The agent only pays for itself on the two L4 steps; forcing the rest into an agent would add cost, latency, and risk for no benefit.',
      handoff: 'The L4 steps become the agent’s scope in Architect; the sign step becomes a hard ceiling in the autonomy matrix; “cut nurse reading time” becomes the value hypothesis in Frame.',
      takeaway: 'Don’t “AI-ify a process” — classify each step and put the right work in the right tier.',
    },
    1: {
      artifact: 'canvas',
      situation: 'We’ve decided an agent fits the drafting steps. Now prove there’s a real, sized opportunity before anyone builds.',
      qa: [
        { q: 'What job is done badly, and is ambiguity-over-language the bottleneck?', a: 'Deciding PA requests is slow and costly because nurses must read long, unstructured charts and reason against policy — language judgment.', why: 'If the bottleneck were data entry or a fixed rule, AI wouldn’t be the lever. Here it is.' },
        { q: 'What does a “good” output look like?', a: 'A correct determination with a cited rationale a clinician will sign.', why: 'This becomes your definition of done — and later, the exact thing your eval measures.' },
        { q: 'What’s a mistake worth, and can it be undone?', a: 'A wrong draft is caught at review (cheap); a wrong signed determination is not (expensive, regulated).', why: 'Reversibility drives how much autonomy each action can have in Phase 3.' },
      ],
      produces: 'A filled Opportunity Canvas + a sized opportunity',
      artifactNote: 'Notice how “Definition of done” pre-decides your eval, and “Reversibility” pre-decides your autonomy ceiling.',
      decision: 'GO — value hypothesis = clinician minutes returned (20 → 8) × 200k/yr, plus turnaround days → hours.',
      why: 'Real pain, a language bottleneck, a definable “good”, and math that clears — all four lenses pass.',
      handoff: 'The canvas inputs and definition of done feed the decomposition (Phase 2) and the eval golden set (Phase 7).',
      takeaway: 'Frame the value in the client’s metric (clinician hours, turnaround) — never in “we used AI.”',
    },
    2: {
      artifact: 'decomp',
      situation: 'The opportunity is real. Now map the actual workflow so you automate the right steps — not “the process.”',
      qa: [
        { q: 'What are the discrete steps, and who does each today?', a: 'Intake clerk receives; a nurse extracts and triages; a nurse matches policy and drafts; a physician signs; the system notifies.', why: 'Naming the real steps (and who) exposes which are rote vs. judgment.' },
        { q: 'Per step: time, error cost, is the data available?', a: 'Extraction and matching eat the nurse’s ~20 minutes; policy and member history exist but are unstructured; past determinations exist as ground truth.', why: 'No data, no agent — and where time concentrates is where the value is.' },
      ],
      produces: 'A spectrum-tagged decomposition with data-readiness flags',
      artifactNote: 'The two L4 rows are the agent’s job; the Human row (sign) is the ceiling; the rest stay code.',
      decision: 'Automate extract + draft; keep policy-matching as the hard reasoning step; sign stays human.',
      why: 'It concentrates the agent on the ambiguous, high-time steps and leaves deterministic and regulated steps where they belong.',
      handoff: 'This table is the blueprint for the architecture (Phase 3) and the source of the eval golden set (Phase 7).',
      takeaway: 'The decomposition table is your most reusable artifact — it feeds architecture, risk, and the business case.',
    },
    3: {
      artifact: 'arch',
      situation: 'You know which steps are the agent’s. Now choose the pattern and set how much autonomy each action gets.',
      qa: [
        { q: 'Which pattern fits — workflow, agent, or both?', a: 'Both: a routing workflow for triage, then a RAG tool-using agent that retrieves member history + policy and drafts with citations.', why: 'Workflows handle the knowable triage; the agent handles the open-ended drafting — each where it earns its keep.' },
        { q: 'For every action: reversibility × blast radius?', a: 'Read/draft = reversible, low blast radius → high autonomy. Sign a determination = irreversible, high blast radius → human.', why: 'The 2×2 sets autonomy per action — the master design variable.' },
      ],
      produces: 'A reference architecture + a filled autonomy matrix',
      artifactNote: 'The flow puts a human approval gate before any determination leaves; in the matrix, “sign” is Human for anything borderline and only auto-approves clear cases.',
      decision: 'Triage router → RAG drafting agent → guardrails → human approval. Autonomy set per action × segment.',
      why: 'It grounds the agent in authoritative policy (no hallucinated criteria) and keeps the consequential action behind a human.',
      handoff: 'Each autonomous action becomes a risk line in Phase 4 and a rung on the ladder in Phase 6.',
      takeaway: 'Design the pattern so the model is a swappable component; the autonomy 2×2 governs more than the model choice.',
    },
    4: {
      artifact: 'risks',
      situation: 'The design is set. Now make it safe to run in a regulated environment before proposing any autonomy.',
      qa: [
        { q: 'What are the top failure modes, and how likely × how bad?', a: 'A fabricated citation (medium / high) and PHI exposure (low / high) are the headline risks; an autonomous denial would be catastrophic.', why: 'Scoring likelihood × impact prioritizes mitigations and produces a register the client’s risk org recognizes.' },
        { q: 'What’s the kill switch, and who signs off on autonomy?', a: 'A one-click halt; clinical and legal own sign-off; denials are never autonomous by policy.', why: 'Every consequential agent needs a documented “what happens when it’s wrong” and named owners.' },
      ],
      produces: 'An AI-native RAID register + a governance / kill-switch plan',
      artifactNote: 'Notice the owners aren’t all “engineering” — privacy/legal and the clinical lead own the regulated risks.',
      decision: 'Mitigations + owners assigned; clinical & legal sign-off gates any rung climb; denials hard-capped to human.',
      why: 'In a regulated context responsible AI is a load-bearing design input, not a final checkbox.',
      handoff: 'These sign-offs become the promotion gates on the autonomy ladder in Phase 6.',
      takeaway: 'Bringing prompt-injection and autonomy-risk to a client unprompted is what marks you as senior.',
    },
    5: {
      artifact: 'strategy',
      situation: 'One agent is a feature. Decide how this becomes a program with a durable advantage.',
      qa: [
        { q: 'What single metric is the North Star?', a: 'PA decision turnaround (days → hours).', why: 'One outcome metric aligns the whole effort and the exec conversation.' },
        { q: 'Where’s the moat — and what’s the lighthouse vs. the platform?', a: 'Moat = proprietary policy-mapping + the clinician-correction loop + compliance trust. Lighthouse = one service line; platform = reusable clinical-RAG + eval + PHI guardrails.', why: 'The model isn’t the moat (everyone rents it); the data, integration, and feedback loop are.' },
      ],
      produces: 'A product-strategy one-pager',
      artifactNote: 'The platform line is what makes use-case #2 (appeals, claims) a fraction of the cost of #1.',
      decision: 'Lighthouse one service line; build the reusable clinical platform behind it; bank the correction loop as the moat.',
      why: 'The lighthouse funds the platform; the platform compounds across the next use cases.',
      handoff: 'The lighthouse becomes the “Now” on the roadmap; the platform becomes the “Next / Later.”',
      takeaway: 'An “AI strategy” without sequencing and a moat is just a list of use cases.',
    },
    6: {
      artifact: 'roadmap',
      situation: 'You have a safe design and a strategy. Now phase it so autonomy grows only as evidence earns it.',
      qa: [
        { q: 'What’s the value ÷ (risk × effort) order?', a: 'Shadow on one service line first (high learning, zero risk), then copilot drafting, then auto-approve only the clearly-meets-criteria segment.', why: 'Sequence by risk-adjusted value, not by what’s exciting.' },
        { q: 'What eval bar gates each promotion?', a: 'e.g. determination accuracy ≥ 96%, citation faithfulness ≥ 98%, clinician edit-rate ≤ 10%, zero critical safety violations.', why: 'You only climb a rung when a pre-agreed metric clears a bar — defined before launch.' },
      ],
      produces: 'An autonomy-ladder roadmap with eval gates + Now / Next / Later + OKRs',
      artifactNote: 'The ceiling is explicit: determinations never reach full autopilot, no matter the metrics.',
      decision: 'Ship to Shadow now; climb only on cleared gates; cap determinations below autopilot forever.',
      why: 'Gated autonomy is how you sell safety to a risk-averse client and turn each rung into a fundable milestone.',
      handoff: 'Each rung’s gate is measured by the eval system you build in Phase 7.',
      takeaway: 'Each autonomy rung is a fundable SOW milestone with an explicit exit criterion.',
    },
    7: {
      artifact: 'econ',
      situation: 'Nothing climbs the ladder without numbers. Build the measurement and the business case.',
      qa: [
        { q: 'What’s the cost per SUCCESSFUL task?', a: '$0.50 ÷ 0.90 ≈ $0.56 — trivial next to the $24–40 of clinician time saved per case.', why: 'Cost-per-successful-task is the honest number; here token cost is a rounding error, so success rate and HITL reduction dominate.' },
        { q: 'What’s the baseline, and what does each rung save?', a: 'Baseline = 20 min/case today; copilot drafting cuts it to 8 (−$24); auto-approve saves the full ~$40.', why: 'You can’t prove a lift you didn’t measure before launch.' },
      ],
      produces: 'An eval plan + a defensible business case',
      artifactNote: 'Watch the clinician edit-rate fall over time — that’s the trust signal that opens the next rung.',
      decision: 'Promotion gates defined on accuracy / faithfulness / edit-rate; ROI proven on clinician time returned.',
      why: 'Spend on the better model and the eval, not on shaving cents — that’s where the economics actually move.',
      handoff: 'These metrics gate the rung climbs in Phase 6 and become the QBR story in Phase 8.',
      takeaway: 'Quote cost-per-successful-task, present the case as a range, and baseline before you launch.',
    },
    8: {
      artifact: 'scale',
      situation: 'The pilot works. Now make it survive — the operating model and the human change that decides adoption.',
      qa: [
        { q: 'Who runs the agent forever, and how do jobs change?', a: 'A central platform team owns the runtime, eval, and guardrails; clinicians shift from reading-and-typing to reviewing-and-signing.', why: 'Most pilots die in the operating-model and workforce gap, not the technology.' },
        { q: 'How is adoption and trust won?', a: 'A review UI with inline citations and confidence flags; involve clinicians in design; measure them on the new value-added work.', why: 'A 95%-accurate agent nobody trusts delivers 0% value — adoption is a design problem.' },
      ],
      produces: 'An operating model + a change-management plan',
      artifactNote: 'The clinician-correction stream is also your moat fuel and the eval-growth flywheel.',
      decision: 'Central platform team + clinician role redesign + a governance forum that owns autonomy promotions.',
      why: 'The central platform makes use-case #6 a fraction of #1; the role redesign is what makes adoption stick.',
      handoff: 'The governance forum carries the promotion gates forward for every future use case.',
      takeaway: 'The last mile — run model + change management — is the highest-margin, stickiest work.',
    },
  },
};

export const RETAIL_CS = {
  id: 'retail',
  name: 'Post-Purchase Customer-Service Agent',
  short: 'Retail CS',
  emoji: '🛍️',
  accent: 'var(--p2)',
  sector: 'Retail / e-commerce',
  teaches: 'autonomy, blast radius, and unit economics',
  tagline: 'High volume, lower per-case stakes, clear deflection ROI — and real action risk (refunds).',

  setup: {
    scenario:
      'A retailer is buried in post-purchase contacts — "where\'s my order" (WISMO), returns, and exchanges. Human reps answer the same repetitive questions and also handle the emotional, out-of-policy judgment calls. Cost-to-serve is high and CSAT is at risk.',
    baseline: [
      { label: 'Addressable contacts / yr', value: '600,000' },
      { label: 'Human cost / contact (loaded)', value: '$5.00' },
      { label: 'Refund actions', value: 'touch financial controls' },
      { label: 'Channels', value: 'chat / email' },
    ],
    people: 'CS reps · QA team · brand/marketing · finance (refund controls) · a CS product owner',
    stakes:
      'Refunds are real, partly-irreversible money movements; consumer-protection rules apply to generated copy; PII under GDPR/CCPA; a bad tone is a brand-safety incident. The refund action is what forces an autonomy decision.',
    win: 'Repetitive contacts are deflected at low cost with held CSAT, refunds stay within hard caps, and reps move to the cases that actually need a human.',
  },

  canvas: {
    job: 'Resolve post-purchase issues (WISMO, returns, exchanges) without a human, while keeping CSAT up.',
    process: 'Human reps answer repetitive WISMO and handle judgment cases; loaded cost ≈ $5/contact across 600k contacts/yr.',
    bottleneck: 'Humans answering repetitive WISMO plus judgment on out-of-policy / upset / VIP cases. WISMO is rote; the judgment cases need bounded reasoning.',
    trigger: 'A customer contact (chat/email). Inputs: order, shipment, returns policy, inventory, and customer history / lifetime value.',
    dod: 'Issue resolved within policy and the customer satisfied (CSAT held).',
    action: 'Look up & explain; initiate a return label; issue a refund within a cap; offer a goodwill gesture within a cap. Refund above the cap → human.',
    reversibility: 'A WISMO reply is reversible; a small capped refund is bounded/reversible-ish; a large or out-of-policy refund is high blast-radius → human.',
    value: 'Deflection % × cost-per-contact ($5) × 600k/yr; CSAT held; refund-leakage controlled.',
    guardrails: 'Tone / brand guardrails; no PII leakage; no promises outside policy; a hard refund cap of $X.',
  },

  decomposition: [
    { step: 'Classify intent (WISMO / return / complaint)', today: 'Rep / IVR', level: 'L3', err: 'Low', why: 'A routing classification with a knowable path.' },
    { step: 'Look up order, shipment, policy', today: 'Rep', level: 'L0', err: 'Low', why: 'Deterministic tool calls.' },
    { step: 'Resolve simple WISMO', today: 'Rep', level: 'L3', err: 'Low', why: 'Templated lookup-and-reply workflow.' },
    { step: 'Judgment case (out-of-policy, upset, VIP)', today: 'Senior rep', level: 'L4', err: 'Med', why: 'Bounded reasoning across policy + history for upset / VIP / out-of-policy.' },
    { step: 'Issue refund > threshold', today: 'Supervisor', level: 'H', err: 'High', why: 'Money movement above a cap — a financial control.' },
  ],

  architecture: [
    { label: 'Intent router', sub: 'classify the contact', kind: 'workflow' },
    { label: 'WISMO path', sub: 'workflow look-up + reply', kind: 'workflow' },
    { label: 'Judgment agent', sub: 'order / policy / inventory tools', kind: 'agent' },
    { label: 'Action layer', sub: 'auto-refund ≤ $X & in policy; else human', kind: 'guard' },
    { label: 'Guardrails', sub: 'tone · no PII leak · no out-of-policy promises', kind: 'guard' },
  ],
  matrix: {
    segments: ['WISMO / simple', 'Return within policy', 'Out-of-policy / VIP / upset'],
    actions: ['Look up & explain', 'Initiate return label', 'Issue refund', 'Make goodwill gesture'],
    cells: {
      '0-0': 'R5', '0-1': 'R5', '0-2': 'R4',
      '1-0': 'R5', '1-1': 'R4', '1-2': 'R2',
      '2-0': 'na', '2-1': 'R4', '2-2': 'H',
      '3-0': 'R4', '3-1': 'R4', '3-2': 'R3',
    },
    note: 'Refunds: auto only within a hard $X cap and within policy; above the cap or out-of-policy → human approval.',
  },

  risks: [
    { risk: 'Wrong info / promise to customer', mit: 'RAG on order + policy; cite policy; no promises outside policy', owner: 'CS product owner' },
    { risk: 'Over-refund / action loop', mit: 'Dollar caps, action allow-lists, dry-run mode, step caps', owner: 'PM + Finance' },
    { risk: 'Tone / brand failure', mit: 'Tone guardrails, staged rollout, kill switch', owner: 'Brand' },
    { risk: 'Consumer-protection / PII (GDPR/CCPA)', mit: 'Output filters, data minimization, audit trail', owner: 'Legal' },
    { risk: 'Cost runaway (loops, tokens)', mit: 'Step/loop caps, budget alerts, cost-per-task monitoring', owner: 'AgentOps' },
  ],

  strategy: {
    northStar: 'Cost-to-serve per contact at held CSAT',
    moat: 'Catalog + behavioral data + brand-tuned generation + the correction loop',
    lighthouse: 'WISMO + returns deflection',
    platform: 'The agent runtime + tool layer + eval harness — reused for the shopping assistant and merchandising content',
  },

  roadmap: {
    now: 'Shadow + copilot on WISMO; deflection eval',
    next: 'Assist (auto-resolve WISMO); agent-with-caps on refunds',
    later: 'Autopilot WISMO; launch the shopping assistant on the platform',
    ceiling: 'Refunds capped; high-value / out-of-policy cases stay human',
  },

  economics: {
    assumptions: [
      { k: 'Addressable contacts / yr', v: '600,000' },
      { k: 'Human cost / contact', v: '$5.00' },
      { k: 'Agent cost / task', v: '$0.08' },
      { k: 'Resolution (success) rate', v: '80%' },
      { k: 'Auto-handled share (Rung 3–4)', v: '80%' },
    ],
    agentCost: 0.08, successRate: 0.8, humanCost: 5.0, volume: 600000, autoHandled: 0.8,
    note: 'Token cost is ~1.6% of the value saved — meaningful but not dominant. The lever that matters most is the automation rate and keeping success high.',
  },

  scale: {
    roleShift: 'Reps move to complex / emotional cases and to coaching the bot',
    trust: 'Restructure QA around agent monitoring; the human-correction stream becomes the moat’s fuel',
    governance: 'A governance forum reviews promotions and incidents',
  },

  journey: {
    0: {
      artifact: 'verdict',
      situation: '600,000 post-purchase contacts a year — WISMO, returns, exchanges. Reps answer the rote ones and the emotional judgment calls alike. Decide which an agent should handle.',
      qa: [
        { q: 'Which contacts have a knowable path vs. need judgment?', a: 'WISMO (“where’s my order”) is a lookup-and-reply → an L3 workflow. An out-of-policy exchange for an upset, high-LTV customer needs bounded judgment → an L4 agent.', why: 'Most volume is rote; only the judgment cases justify an agent.' },
        { q: 'Which action is irreversible enough to force a human?', a: 'A refund moves real money; above a cap or out-of-policy it’s high blast-radius.', why: 'The refund action is exactly what forces the autonomy decision later.' },
      ],
      produces: 'A per-segment spectrum verdict',
      artifactNote: 'Only the judgment-case row is true L4; the refund row is the human / ceiling line.',
      decision: 'WISMO = workflow; out-of-policy / VIP = bounded agent; refunds above a cap stay human.',
      why: 'Automating rote WISMO captures most of the volume cheaply; the agent is reserved for genuine judgment.',
      handoff: 'The bounded judgment scope feeds Architect; the refund cap becomes the autonomy ceiling.',
      takeaway: 'Segment the work — the same “contact” splits into very different autonomy tiers.',
    },
    1: {
      artifact: 'canvas',
      situation: 'An agent fits the WISMO + judgment work. Size the deflection opportunity before building.',
      qa: [
        { q: 'Is the bottleneck repetitive language + bounded judgment?', a: 'Yes — reps spend most of their time on repetitive WISMO plus a tail of judgment cases.', why: 'Repetitive language resolution is exactly where deflection ROI lives.' },
        { q: 'What does “resolved” mean, within policy?', a: 'Issue resolved within policy and CSAT held.', why: 'Defines done — and what the eval must protect against (angry re-contacts).' },
        { q: 'What’s reversible vs. not?', a: 'A WISMO reply and a small capped refund are reversible-ish; a large / out-of-policy refund isn’t.', why: 'Drives where autonomy has to stop.' },
      ],
      produces: 'A filled Opportunity Canvas + a deflection-based size',
      artifactNote: 'Value is deflection % × $5 × 600k; the guardrails line already names the refund cap.',
      decision: 'GO — value = deflection % × $5/contact × 600k, with CSAT held.',
      why: 'High volume × a clear per-contact cost makes even partial deflection large.',
      handoff: 'Deflection rate and CSAT become the eval metrics; the cap feeds the autonomy matrix.',
      takeaway: 'In high-volume CS the automation rate (not token cost) is the value lever.',
    },
    2: {
      artifact: 'decomp',
      situation: 'Map the contact-to-resolution flow to see where a refund crosses a control line.',
      qa: [
        { q: 'What are the steps from contact to resolution?', a: 'Classify intent → look up order / policy → resolve WISMO or hand a judgment case to the agent → act (refund / label) within limits.', why: 'Naming steps shows which are pure lookups vs. judgment vs. money-movement.' },
        { q: 'Where does a refund cross a financial-control threshold?', a: 'Above a set dollar cap, or any out-of-policy case.', why: 'That threshold is the human gate.' },
      ],
      produces: 'A spectrum-tagged decomposition',
      artifactNote: 'The L4 judgment row is the agent’s job; the Human refund row is the control line.',
      decision: 'Auto-resolve WISMO; bound the judgment agent; refunds above threshold stay human.',
      why: 'It concentrates automation on the high-volume rote work and caps the money-moving action.',
      handoff: 'Feeds the capped action layer in the Phase 3 architecture.',
      takeaway: 'Find the step where money or brand is at stake — that’s where autonomy must stop.',
    },
    3: {
      artifact: 'arch',
      situation: 'Compose the router, the WISMO workflow, and the bounded agent — with hard limits on actions.',
      qa: [
        { q: 'Router + workflow + agent — how do they compose?', a: 'An intent router splits WISMO (workflow lookup + reply) from judgment (a tool-using agent with order / policy / inventory tools).', why: 'Cheap path for the common case; the agent only for judgment.' },
        { q: 'What hard limits sit on the action layer?', a: 'Auto-refund only ≤ $X and within policy; else human. Tone and PII guardrails on everything customer-facing.', why: 'Bounds make an occasional error tolerable and detectable.' },
      ],
      produces: 'A reference architecture + a filled autonomy matrix',
      artifactNote: 'The action layer is the safety valve; in the matrix, refunds cap at R4 within $X and are Human beyond.',
      decision: 'Intent router → WISMO workflow or judgment agent → capped action layer → guardrails.',
      why: 'It serves the 80% cheaply and keeps the risky money-moving action bounded.',
      handoff: 'Each capped action becomes a risk line in Phase 4 and a rung in Phase 6.',
      takeaway: 'Autonomy is per action × segment — one “agent” sits on several rungs at once.',
    },
    4: {
      artifact: 'risks',
      situation: 'Make the money-moving, brand-facing agent safe before granting it any autonomy.',
      qa: [
        { q: 'What can the agent do that costs real money or brand?', a: 'Over-refund or loop (medium / high); a tone / brand failure (medium); a false claim or PII leak (legal).', why: 'Score likelihood × impact to prioritize caps and guardrails.' },
        { q: 'What caps, allow-lists, and kill switch are needed?', a: 'Dollar caps, action allow-lists, dry-run mode, tone guardrails, and a one-click halt; finance and brand sign off.', why: 'Bounded + detectable is what lets you later move from pre-approval to spot-checks.' },
      ],
      produces: 'A RAID register with dollar caps + a kill switch',
      artifactNote: 'Owners span finance and brand, not just engineering — the risks are commercial.',
      decision: 'Refund caps + allow-lists + tone guardrails; finance & brand sign off before any climb.',
      why: 'The action risk is financial and reputational, so the controls and the owners are too.',
      handoff: 'These caps and sign-offs gate the refund rungs in Phase 6.',
      takeaway: 'For action-taking agents, the dollar cap and allow-list are the core safety controls.',
    },
    5: {
      artifact: 'strategy',
      situation: 'Turn the CS agent into a platform play.',
      qa: [
        { q: 'What’s the North Star cost metric?', a: 'Cost-to-serve per contact at held CSAT.', why: 'Cost-to-serve is the metric the business already runs on.' },
        { q: 'What compounds into a moat and a platform?', a: 'Moat = catalog + behavioral data + brand-tuned generation + the correction loop. Platform = agent runtime + tool layer + eval harness.', why: 'A reusable runtime makes the next agent (a shopping assistant) cheap.' },
      ],
      produces: 'A product-strategy one-pager',
      artifactNote: 'The platform line is what lets the same runtime power merchandising and a shopping assistant.',
      decision: 'Lighthouse = WISMO / returns; platform = the reusable agent runtime; moat = data + brand voice + corrections.',
      why: 'Deflection proves value fast and funds the platform that compounds.',
      handoff: 'Lighthouse → “Now”; platform → “Next / Later” on the roadmap.',
      takeaway: 'Bank the correction stream from day one — it’s the moat competitors can’t copy.',
    },
    6: {
      artifact: 'roadmap',
      situation: 'Phase the rollout so refund autonomy only grows as deflection and CSAT hold.',
      qa: [
        { q: 'What order maximizes value ÷ (risk × effort)?', a: 'Shadow + copilot on WISMO first (cheap, safe), then auto-resolve WISMO, then agent-with-caps on refunds.', why: 'Bank the easy, safe volume before touching money.' },
        { q: 'What bar gates each rung?', a: 'Resolution rate, CSAT held or up, and cost-per-successful-resolution — watched so deflection isn’t re-contact churn.', why: 'Promote only on cleared, pre-agreed metrics.' },
      ],
      produces: 'An autonomy-ladder roadmap + Now / Next / Later + OKRs',
      artifactNote: 'Ceiling: large / out-of-policy refunds stay human regardless of metrics.',
      decision: 'Shadow WISMO now; climb to assist / act-with-caps as deflection + CSAT clear the bar.',
      why: 'Gated climbing earns trust and turns each rung into a funded milestone.',
      handoff: 'Gates are measured by the eval system in Phase 7.',
      takeaway: 'Watch cost-per-successful-resolution — vanity deflection that creates angry re-contacts is negative value.',
    },
    7: {
      artifact: 'econ',
      situation: 'Prove the deflection is real and economic before scaling autonomy.',
      qa: [
        { q: 'What’s the cost per SUCCESSFUL resolution?', a: '$0.08 ÷ 0.80 = $0.10 — versus ~$5 of human handling, ≈ $4.90 net per auto-resolved contact.', why: 'Even at high volume the token cost is ~1.6% of value — the automation rate is the lever.' },
        { q: 'What does deflection net after re-contacts?', a: '≈ 600k × 80% × $4.90 ≈ $2.35M/yr gross — but only if resolutions stick.', why: 'Containment that creates angry re-contacts is fake savings; measure cost-per-successful-resolution.' },
      ],
      produces: 'An eval plan + a deflection business case',
      artifactNote: 'The big number rides on the automation and success rates, not on shaving token cost.',
      decision: 'Gates on resolution rate + CSAT; report cost-per-successful-resolution, not raw deflection.',
      why: 'It keeps the savings honest and the autonomy climb defensible.',
      handoff: 'These metrics gate the rungs in Phase 6 and become the QBR story.',
      takeaway: 'Deflection % alone is a vanity metric — pair it with CSAT and cost-per-successful-resolution.',
    },
    8: {
      artifact: 'scale',
      situation: 'Move from pilot to a run model and a redesigned rep role.',
      qa: [
        { q: 'Who owns the runtime, and how does QA change?', a: 'A central runtime team owns it; QA restructures around monitoring the agent and sampling its actions.', why: 'Someone must run it forever, with eval in CI and rollback.' },
        { q: 'How do reps adopt rather than route around it?', a: 'Reps move to complex / emotional cases and to coaching the bot; the correction stream feeds eval; measure reps on the new work.', why: 'Reps who fear replacement route around the agent; design the role so they don’t.' },
      ],
      produces: 'An operating model + a change plan',
      artifactNote: 'The rep-correction stream is both the eval flywheel and the moat fuel.',
      decision: 'Central runtime team; reps coach the bot; a governance forum owns promotions and incidents.',
      why: 'The platform compounds and the role redesign is what makes adoption stick.',
      handoff: 'The governance forum carries gates forward to the shopping-assistant use case.',
      takeaway: 'Reps coaching the bot turns a workforce threat into your eval and moat engine.',
    },
  },
};

export const CASES = { priorauth: PRIOR_AUTH, retail: RETAIL_CS };
export const CASE_LIST = [PRIOR_AUTH, RETAIL_CS];
export const getCase = (id) => CASES[id];

// Compute the headline economics for a case (kept here so renderer + dossier agree).
export function computeEconomics(c) {
  const e = c.economics;
  const costPerSuccess = e.agentCost / e.successRate;
  if (c.id === 'priorauth') {
    const savedPerCase = e.minutesSaved * e.costPerMin; // $24
    return {
      costPerSuccess,
      savedPerCase,
      fullSave: e.autoApprovableFullSave,
      headline: `$${savedPerCase} saved/case vs. $${costPerSuccess.toFixed(2)} run cost`,
    };
  }
  // retail
  const net = e.humanCost - costPerSuccess;
  const annual = e.volume * e.autoHandled * net;
  return {
    costPerSuccess,
    netPerContact: net,
    annual,
    headline: `≈ $${(annual / 1e6).toFixed(2)}M/yr gross value`,
  };
}
