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
    { step: 'Receive request (fax/portal/EDI)', today: 'Intake clerk', level: 'L0', err: 'Low' },
    { step: 'Extract clinical data', today: 'Nurse reads', level: 'L2', err: 'Med' },
    { step: 'Check if review even needed', today: 'Nurse', level: 'L3', err: 'Med' },
    { step: 'Match against medical policy', today: 'Nurse judgment', level: 'L4', err: 'High' },
    { step: 'Draft determination + citations', today: 'Nurse', level: 'L4', err: 'High' },
    { step: 'Approve / sign', today: 'Physician', level: 'H', err: 'Critical' },
    { step: 'Notify provider / member', today: 'System', level: 'L0', err: 'Low' },
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

  // Per-phase playthrough cards: what a PM asks, fills, produces, decides
  journey: {
    0: { artifact: null, questions: ['Can the path be predetermined, or does it need open-ended judgment?', 'Is any step irreversible with no human checkpoint?'], produces: 'A per-step classification on the agent spectrum', decision: 'Build a MIXED solution: workflow for triage, agent for drafting, and never automate the signature.' },
    1: { artifact: 'canvas', questions: ['What job is done badly, and is ambiguity-over-language the bottleneck?', "What does a 'good' output look like?", 'What is a mistake worth, and can it be undone?'], produces: 'A filled Opportunity Canvas + an opportunity size', decision: 'GO — value hypothesis = clinician hours returned + turnaround days → hours.' },
    2: { artifact: 'decomp', questions: ['What are the discrete steps, and who does each today?', 'For each step: time, error cost, is the data available?'], produces: 'A decomposition table tagged to the spectrum, with data-readiness flags', decision: 'Automate extract + draft; keep matching as the hard reasoning step; sign stays human.' },
    3: { artifact: 'arch', questions: ['Which pattern fits — workflow, agent, or both?', 'For every action: what is its reversibility × blast radius?'], produces: 'A reference architecture + a filled autonomy matrix', decision: 'Triage router + RAG drafting agent + guardrails + human approval. Autonomy set per action.' },
    4: { artifact: 'risks', questions: ['What are the top failure modes, and how likely × how bad?', "What's the kill switch, and who signs off on autonomy?"], produces: 'An AI-native RAID risk register + a governance/kill-switch plan', decision: 'Mitigations + owners assigned; clinical & legal sign-off required before any rung climb.' },
    5: { artifact: 'strategy', questions: ['What single metric is the North Star?', 'Where is the durable moat — and what is the lighthouse vs. the platform?'], produces: 'A product-strategy one-pager', decision: 'Lighthouse one service line; build the reusable clinical platform behind it; moat = correction loop + compliance.' },
    6: { artifact: 'roadmap', questions: ['What is the value ÷ (risk × effort) order?', 'What eval bar gates each autonomy promotion?'], produces: 'An autonomy-ladder roadmap with eval gates + Now/Next/Later + OKRs', decision: 'Ship to Shadow now; climb only when the eval bar clears; determination caps below autopilot forever.' },
    7: { artifact: 'econ', questions: ['What is the cost per SUCCESSFUL task?', 'What is the baseline, and what does each rung save?'], produces: 'An eval plan + a defensible business case', decision: 'Promotion gates defined; ROI proven — clinician time saved dwarfs run cost.' },
    8: { artifact: 'scale', questions: ['Who runs the agent forever, and how do jobs change?', 'How is adoption and trust won?'], produces: 'An operating model + a change-management plan', decision: 'Central platform team + clinician role redesign + governance forum owns promotions.' },
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
    { step: 'Classify intent (WISMO / return / complaint)', today: 'Rep / IVR', level: 'L3', err: 'Low' },
    { step: 'Look up order, shipment, policy', today: 'Rep', level: 'L0', err: 'Low' },
    { step: 'Resolve simple WISMO', today: 'Rep', level: 'L3', err: 'Low' },
    { step: 'Judgment case (out-of-policy, upset, VIP)', today: 'Senior rep', level: 'L4', err: 'Med' },
    { step: 'Issue refund > threshold', today: 'Supervisor', level: 'H', err: 'High' },
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
    0: { artifact: null, questions: ['Which contacts have a knowable path vs. need judgment?', 'Which action is irreversible enough to force a human?'], produces: 'A per-segment classification on the spectrum', decision: 'WISMO = workflow; out-of-policy/VIP = bounded agent; the refund action is what forces the autonomy call.' },
    1: { artifact: 'canvas', questions: ['What job is done badly, and is the bottleneck repetitive language + bounded judgment?', "What does 'resolved' mean, within policy?", 'What is reversible vs. not (refunds)?'], produces: 'A filled Opportunity Canvas + a deflection-based size', decision: 'GO — value hypothesis = deflection % × $5 × 600k, CSAT held.' },
    2: { artifact: 'decomp', questions: ['What are the steps from contact to resolution?', 'Where does a refund cross a financial-control threshold?'], produces: 'A decomposition tagged to the spectrum', decision: 'Auto-resolve WISMO; bound the judgment agent; refunds above threshold stay human.' },
    3: { artifact: 'arch', questions: ['Router + workflow + agent — how do they compose?', 'What hard limits sit on the action layer?'], produces: 'A reference architecture + a filled autonomy matrix', decision: 'Intent router → WISMO workflow or judgment agent → capped action layer → guardrails.' },
    4: { artifact: 'risks', questions: ['What can the agent do that costs real money or brand?', 'What caps, allow-lists, and kill switch are needed?'], produces: 'A RAID risk register with dollar caps and a kill switch', decision: 'Refund caps + allow-lists + tone guardrails; finance & brand sign off.' },
    5: { artifact: 'strategy', questions: ['What is the North Star cost metric?', 'What compounds into a moat and a platform?'], produces: 'A product-strategy one-pager', decision: 'Lighthouse = WISMO/returns; platform = agent runtime reused for shopping + merchandising.' },
    6: { artifact: 'roadmap', questions: ['What order maximizes value ÷ (risk × effort)?', 'What deflection/CSAT bar gates each rung?'], produces: 'An autonomy-ladder roadmap + Now/Next/Later + OKRs', decision: 'Shadow WISMO now; climb to assist/act-with-caps as deflection + CSAT clear the bar.' },
    7: { artifact: 'econ', questions: ['What is the cost per SUCCESSFUL resolution?', 'What does deflection actually net after re-contacts?'], produces: 'An eval plan + a deflection business case', decision: 'Gates on resolution rate + CSAT; watch cost-per-successful-resolution so deflection is real.' },
    8: { artifact: 'scale', questions: ['Who owns the runtime, and how does QA change?', 'How do reps adopt rather than route around it?'], produces: 'An operating model + a change plan', decision: 'Central runtime team; reps coach the bot; governance forum owns promotions.' },
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
