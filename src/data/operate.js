// ============================================================
// OPERATE — the Day-2 run layer for PMs managing agents in production.
// Grounded in production LLMOps practice: the three monitoring pillars
// (operational · economic · quality) + safety/security + adoption,
// the reality that quality degrades silently, and that prompt injection
// is the #1 production agent vulnerability.
// ============================================================

// ---- The Agent Health Dashboard (what a PM watches) ----
// status values are illustrative defaults for the demo board.
export const DASHBOARD = [
  {
    pillar: 'Quality', color: 'var(--p7)',
    metrics: [
      { name: 'Task success / resolution rate', status: 'green', signal: 'Did it achieve the goal?', act: 'Below the segment’s promotion bar → diagnose drift vs. regression.' },
      { name: 'Faithfulness / citation accuracy', status: 'green', signal: 'Grounded in real sources, not guessed?', act: 'Ungrounded answers rising → check retrieval coverage & index freshness.' },
      { name: 'Hallucination / error rate', status: 'amber', signal: 'Confident wrong answers', act: 'Any upward trend → tighten grounding, add the cases to the regression suite.' },
      { name: 'Human edit rate', status: 'green', signal: 'How much humans change outputs (a trust proxy)', act: 'Rising = quality slipping AND trust eroding at once.' },
    ],
  },
  {
    pillar: 'Economic', color: 'var(--p6)',
    metrics: [
      { name: 'Cost per successful task', status: 'amber', signal: 'The honest unit cost', act: 'Creeping up → context bloat, retry loops, or a falling success rate.' },
      { name: 'Spend vs. budget', status: 'green', signal: 'Daily/weekly token + tool spend', act: 'Anomaly or breach → budget alert; check for loops or a traffic spike.' },
      { name: 'Steps / loops per task', status: 'green', signal: 'Is the agent thrashing?', act: 'Rising loop count → cap steps; inspect failing tool calls.' },
    ],
  },
  {
    pillar: 'Operational', color: 'var(--p1)',
    metrics: [
      { name: 'p95 latency', status: 'green', signal: 'Tail response time users actually feel', act: 'Breaching SLO → fallbacks; cheaper/faster model on the easy path.' },
      { name: 'Tool-call failure rate', status: 'red', signal: 'Are the agent’s “hands” working?', act: 'Spikes → upstream API/integration issue; fail closed on consequential actions.' },
      { name: 'Error / timeout rate', status: 'green', signal: 'Vendor outages, rate limits', act: '→ retries, circuit breaker, multi-model fallback.' },
      { name: 'Escalation rate & queue depth', status: 'amber', signal: 'Human-in-the-loop load', act: 'Queue backing up → tune the threshold or staffing; watch for rubber-stamping.' },
    ],
  },
  {
    pillar: 'Safety & Security', color: 'var(--p4)',
    metrics: [
      { name: 'Guardrail-violation rate', status: 'green', signal: 'Did it cross a line?', act: 'Any critical violation → incident; demote the rung.' },
      { name: 'Guardrail over-block rate', status: 'green', signal: 'Are the guardrails too tight?', act: 'Blocking normal cases → recalibrate, or users will route around it.' },
      { name: 'Injection / jailbreak attempts', status: 'amber', signal: 'Adversarial input (especially in fetched content)', act: 'Any success → isolate untrusted content, least-privilege tools, patch.' },
      { name: 'PII / policy-violation incidents', status: 'green', signal: 'Compliance exposure', act: 'Any → incident + disclosure process; review the audit trail.' },
    ],
  },
  {
    pillar: 'Adoption', color: 'var(--p2)',
    metrics: [
      { name: 'Override rate', status: 'amber', signal: 'A two-sided trust signal', act: 'Too high = distrust; near-zero = dangerous rubber-stamping.' },
      { name: 'Adoption / usage', status: 'green', signal: 'Are people actually using it?', act: 'Falling → a trust or UX problem, not a model problem.' },
      { name: 'Outcome metric (CSAT / turnaround)', status: 'green', signal: 'The North Star, in production', act: 'The number that proves value at the QBR.' },
    ],
  },
];

export const STATUS_LABEL = { green: 'Healthy', amber: 'Watch', red: 'Act now' };

// ---- The Blocker Library ----
export const BLOCKER_CATEGORIES = ['Quality & drift', 'Cost', 'Reliability', 'Security', 'Safety & compliance', 'Autonomy', 'Adoption', 'Data', 'Vendor', 'Governance'];

export const BLOCKERS = [
  {
    id: 'drift', category: 'Quality & drift', severity: 'High', title: 'Silent quality decay (drift)',
    symptom: 'Outputs slowly get worse — but nothing throws an error.',
    indicators: ['Success rate trending down on the canary set', 'Rising human edit rate', 'Input distribution shifting / new case types'],
    cause: 'A model update, a world/policy change, or new case types the agent was never evaluated on.',
    response: ['Re-run the golden set to confirm', 'Diagnose drift vs. regression vs. scope', 'Demote the rung until re-validated', 'Re-prompt or refresh retrieval'],
    owner: 'PM + AgentOps', lever: 'Eval + autonomy ladder',
  },
  {
    id: 'eval-decay', category: 'Quality & drift', severity: 'Medium', title: 'Eval / feedback loop decay',
    symptom: 'Your metrics stop reflecting reality — the dashboard is green but users complain.',
    indicators: ['Judge-vs-human correlation dropping', 'Golden set hasn’t grown in weeks', 'New failure types absent from the suite'],
    cause: 'A stale golden set, or an LLM-judge that was never re-validated.',
    response: ['Re-validate the judge against fresh human ratings', 'Add recent production failures to the set', 'Re-stratify for the new case mix'],
    owner: 'PM + Eval owner', lever: 'Eval',
  },
  {
    id: 'cost', category: 'Cost', severity: 'Medium', title: 'Cost creep / runaway',
    symptom: 'Cost-per-successful-task is climbing and you’re not sure why.',
    indicators: ['Token spend over budget', 'Rising steps/loops per task', 'Success rate dropping (inflates the denominator)'],
    cause: 'Context bloat, retry loops, a model price change, or a traffic spike.',
    response: ['Cap steps/loops and output length', 'Prompt caching + retrieval instead of context-stuffing', 'Route easy steps to a cheaper model', 'Set budget alerts'],
    owner: 'PM + AgentOps', lever: 'Architecture + economics',
  },
  {
    id: 'latency', category: 'Reliability', severity: 'High', title: 'Latency & tool failures',
    symptom: 'Responses are slow, or actions are silently failing.',
    indicators: ['p95 latency breaching SLO', 'Tool-call failure rate spiking', 'Timeout / error rate up'],
    cause: 'An upstream API/integration issue, a vendor outage, or rate limits.',
    response: ['Retries + circuit breakers', 'Degraded / fallback mode', 'Multi-model or cached fallback', 'Fail closed on consequential actions'],
    owner: 'Eng + AgentOps', lever: 'Architecture + kill switch',
  },
  {
    id: 'injection', category: 'Security', severity: 'Critical', title: 'Prompt injection / tool misuse',
    symptom: 'The agent does something it was never asked to do.',
    indicators: ['Anomalous tool calls', 'Injected instructions inside fetched/external content', 'Unexpected data-egress patterns'],
    cause: 'Indirect prompt injection via untrusted content; over-broad tool scopes. (The #1 production agent vulnerability.)',
    response: ['Isolate / sanitize untrusted content', 'Least-privilege tool scopes', 'Output filtering + egress controls', 'Red-team, patch, and hit the kill switch'],
    owner: 'Security', lever: 'Guardrails + kill switch',
  },
  {
    id: 'safety', category: 'Safety & compliance', severity: 'Critical', title: 'PII leak / out-of-policy output',
    symptom: 'A harmful, non-compliant, or biased output reaches a user.',
    indicators: ['Guardrail-violation rate up', 'Subgroup metrics diverging (bias)', 'An audit or complaint finding'],
    cause: 'A prompt/guardrail gap, drift, or an unevaluated edge case.',
    response: ['Trigger the incident process', 'Demote + halt the affected path', 'Disclosure if required', 'Add the case as a permanent regression test'],
    owner: 'Legal + Risk + PM', lever: 'Guardrails + eval',
  },
  {
    id: 'action', category: 'Autonomy', severity: 'High', title: 'Wrong consequential action',
    symptom: 'The agent took a costly action it shouldn’t have (over-refund, bad dispatch, wrong approval).',
    indicators: ['Reversal / complaint rate up', 'Cap-hit frequency rising', 'Post-hoc audit sample finds errors'],
    cause: 'A threshold set too loose, an edge case, or a segment that was never evaluated.',
    response: ['Kill switch / pause the action', 'Tighten caps + allow-lists', 'Demote that action a rung (back to approval)', 'Widen post-hoc audit sampling'],
    owner: 'PM + Risk', lever: 'Autonomy ladder + kill switch',
  },
  {
    id: 'trust', category: 'Adoption', severity: 'Medium', title: 'Trust erosion / automation complacency',
    symptom: 'Users override everything — or, worse, rubber-stamp without reading.',
    indicators: ['Override rate very high OR near zero', 'Usage declining', 'CSAT dip / qualitative pushback'],
    cause: 'A poor review surface, a real quality issue, or fear of replacement.',
    response: ['Fix the actual quality issue first', 'Improve the review UI (citations, confidence, diffs)', 'Involve users; retrain; re-incentivize', 'For complacency: inject hidden check cases'],
    owner: 'PM + Change lead', lever: 'UX + change mgmt',
  },
  {
    id: 'hitl', category: 'Adoption', severity: 'Medium', title: 'Human-in-the-loop bottleneck',
    symptom: 'The review queue backs up; humans become the constraint.',
    indicators: ['Queue depth growing', 'Review time per item up', 'Escalation rate high'],
    cause: 'The escalation threshold is too conservative, understaffing, or low auto-handled precision.',
    response: ['Tune the escalation threshold to the cost of being wrong', 'Improve auto-handled precision', 'Right-size the review team', 'Prioritize / batch the queue'],
    owner: 'PM + Ops', lever: 'Autonomy (Assist rung)',
  },
  {
    id: 'data', category: 'Data', severity: 'High', title: 'Integration / RAG breakage',
    symptom: 'Grounding silently fails — answers go generic or wrong.',
    indicators: ['Retrieval-coverage checks failing', 'Index freshness stale', 'An upstream schema change'],
    cause: 'A source-system change, a broken pipeline, or a stale index.',
    response: ['Schema contracts + monitors on source systems', 'Re-index; set freshness SLAs', 'Fail closed when grounding is missing', 'Alert on coverage drops'],
    owner: 'Data eng + AgentOps', lever: 'Architecture',
  },
  {
    id: 'vendor', category: 'Vendor', severity: 'Medium', title: 'Model deprecation / regression',
    symptom: 'A vendor change shifts behavior or breaks you overnight.',
    indicators: ['A deprecation notice', 'Behavior change after an auto-upgrade', 'A price hike'],
    cause: 'A vendor model update, or a ToS / price change.',
    response: ['Pin versions; canary new ones through the eval', 'Abstraction layer + multi-model fallback', 'Re-run the golden set on every model change', 'Negotiate contractual terms'],
    owner: 'PM + Eng', lever: 'Architecture + eval-in-CI',
  },
  {
    id: 'regression', category: 'Quality & drift', severity: 'High', title: 'Prompt / version regression',
    symptom: 'A “small” prompt tweak silently broke something that worked.',
    indicators: ['Regression-suite failures', 'A metric dip right after a deploy'],
    cause: 'An unguarded prompt / model / tool change.',
    response: ['Gate every change on the golden set in CI', 'Roll back to last-good', 'Canary deploys', 'Keep a regression suite of past failures that must never recur'],
    owner: 'Eng + Eval owner', lever: 'Eval-in-CI',
  },
  {
    id: 'governance', category: 'Governance', severity: 'Medium', title: 'Promotion blocked / scope creep',
    symptom: 'Risk blocks a rung climb — or the agent gets quietly pointed at new case types.',
    indicators: ['Unevaluated case-type volume spiking', 'A governance-forum objection', 'An exec pushing autonomy ahead of the evidence'],
    cause: 'An evidence gap, or scope expansion without a matching eval.',
    response: ['Route unevaluated cases to a human', 'Bring the autonomy-promotion artifact (metrics vs. gate)', 'Gate new scope behind its own eval', 'Use the ladder as the shared language with risk'],
    owner: 'PM + Governance', lever: 'Autonomy ladder + governance',
  },
];

// ---- Incident Response ----
export const SEVERITY = [
  { level: 'Sev 1', color: 'var(--red)', def: 'Active harm — unsafe/illegal output, a data leak, or an irreversible wrong action at scale.', resp: 'Minutes — hit the kill switch first, ask questions after.', who: 'On-call + PM + Legal/Security' },
  { level: 'Sev 2', color: 'var(--amber)', def: 'Degraded — rising guardrail violations, cap-hits, or drift past the threshold.', resp: 'Same day — demote a rung and contain.', who: 'PM + AgentOps' },
  { level: 'Sev 3', color: 'var(--p1)', def: 'Bounded — cost creep, latency, or a queue backlog with quality holding.', resp: 'This week — tune and keep monitoring.', who: 'PM + Eng' },
];

export const TRIAGE = [
  { q: 'Did a prompt / model / tool change ship just before it started?', then: 'Regression → roll back to the last-good version, then fix it behind eval-in-CI.' },
  { q: 'Is the input distribution shifting, or are new case types appearing?', then: 'Drift or scope creep → route unevaluated cases to a human, re-run the eval, demote until re-validated.' },
  { q: 'Anomalous tool calls, data egress, or injected instructions in fetched content?', then: 'Security incident → isolate untrusted content, least-privilege the tools, kill switch, patch.' },
  { q: 'Is it only cost or latency, with quality holding?', then: 'Efficiency issue → caps, caching, model routing, budget alerts.' },
];
export const TRIAGE_FALLBACK = 'If none of the above: treat it as quality/safety degradation — demote a rung and investigate against the golden set before anything else.';

export const RESPONSE_LADDER = [
  { step: 'Kill switch', d: 'Halt the consequential action immediately.' },
  { step: 'Roll back', d: 'Revert the prompt / model / tool to the last good version.' },
  { step: 'Demote', d: 'Drop the affected action a rung — back to human approval.' },
  { step: 'Contain', d: 'Route the affected segment to humans while you investigate.' },
  { step: 'Diagnose', d: 'Drift vs. regression vs. attack vs. scope (use the triage above).' },
  { step: 'Patch & re-validate', d: 'Fix, re-run the golden set, and add a permanent regression test.' },
];
