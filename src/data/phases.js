// Central content model. Drives navigation, progress, the home spine, and visuals.

export const PHASES = [
  {
    id: 0, slug: 'orient', title: 'Orient', accent: 'var(--p0)',
    verb: 'ORIENT',
    tagline: 'Mental models — what an agent actually is, and when not to build one.',
    oneSentence: 'Here’s the job, the bottleneck, and why agentic AI is the lever — or isn’t.',
    summary: 'Everything downstream goes wrong if you skip this. Most failed "agentic" initiatives are misclassified problems.',
    built: true,
  },
  {
    id: 1, slug: 'frame', title: 'Frame', accent: 'var(--p1)',
    verb: 'FRAME',
    tagline: 'Problem & opportunity definition.',
    oneSentence: 'Here’s the job, the bottleneck, and why agentic AI is the lever — or isn’t.',
    summary: 'Beginners ask "where can we use AI?" Experts ask what job is done badly and whether judgment under ambiguity is the bottleneck.',
    built: true,
  },
  {
    id: 2, slug: 'map', title: 'Map', accent: 'var(--p2)',
    verb: 'MAP',
    tagline: 'Current-state discovery; where agents fit the workflow.',
    oneSentence: 'Here’s the decomposition; these specific steps are agent-suitable, these stay code or human.',
    summary: 'Don’t "AI-ify a process." Decompose it, then classify each step against the spectrum.',
    built: true,
  },
  {
    id: 3, slug: 'architect', title: 'Architect', accent: 'var(--p3)',
    verb: 'ARCHITECT',
    tagline: 'Solution & pattern selection; autonomy design.',
    oneSentence: 'Here’s the pattern and the autonomy 2×2 for every action.',
    summary: 'The technical-PM core. Specify the pattern and defend the autonomy choice.',
    built: true,
  },
  {
    id: 4, slug: 'de-risk', title: 'De-risk', accent: 'var(--p4)',
    verb: 'DE-RISK',
    tagline: 'Risk taxonomy, governance, responsible AI.',
    oneSentence: 'Here are the top risks, owners, mitigations, and the kill switch.',
    summary: 'Score each risk on likelihood × impact; attach a mitigation and an owner. Your AI-native RAID log.',
    built: true,
  },
  {
    id: 5, slug: 'strategize', title: 'Strategize', accent: 'var(--p5)',
    verb: 'STRATEGIZE',
    tagline: 'Product / portfolio strategy.',
    oneSentence: 'Here’s the moat, the lighthouse, and the platform that compounds.',
    summary: 'One agent is a feature. A strategy answers which jobs, in what order, building toward what durable advantage.',
    built: true,
  },
  {
    id: 6, slug: 'sequence', title: 'Sequence', accent: 'var(--p6)',
    verb: 'SEQUENCE',
    tagline: 'Roadmap, delivery model, the autonomy ladder.',
    oneSentence: 'Here’s the autonomy ladder gated by eval metrics.',
    summary: 'Sequence by value ÷ (risk × effort), and gate each step so autonomy expands only as evidence accumulates.',
    built: true,
  },
  {
    id: 7, slug: 'prove', title: 'Prove', accent: 'var(--p7)',
    verb: 'PROVE',
    tagline: 'Evaluation, economics, value realization.',
    oneSentence: 'Here’s the golden set, the metrics, the cost-per-successful-task, and the baseline.',
    summary: 'If you can’t measure it, you can’t trust it, ship it, or price it. The discipline that separates demos from production.',
    built: true,
  },
  {
    id: 8, slug: 'scale', title: 'Scale', accent: 'var(--p8)',
    verb: 'SCALE',
    tagline: 'Operating model, change, the last mile.',
    oneSentence: 'Here’s who runs it, how humans’ jobs change, and how adoption is won.',
    summary: 'The graveyard phase. Most pilots work and never scale — not for technical reasons but operating-model and human ones.',
    built: true,
  },
];

export const getPhase = (slug) => PHASES.find((p) => p.slug === slug);

// The agent capability spectrum (Phase 0)
export const SPECTRUM = [
  { level: 0, name: 'Deterministic rules / RPA', what: 'If-this-then-that', decides: 'No', acts: 'Yes', good: 'Stable, high-volume, zero-ambiguity steps' },
  { level: 1, name: 'Classical ML', what: 'Predicts a label/score', decides: 'A narrow prediction', acts: 'No', good: 'Fraud scoring, demand forecasting' },
  { level: 2, name: 'LLM single-shot', what: 'One prompt → one output', decides: 'No', acts: 'No', good: 'Drafting, summarizing, extraction' },
  { level: 3, name: 'LLM workflow', what: 'Predefined chain of LLM + tool steps', decides: 'Within fixed paths', acts: 'Via tools, scripted', good: 'Most "GenAI" production value lives here' },
  { level: 4, name: 'Agent', what: 'LLM directs its own steps/tools toward a goal in a loop', decides: 'Yes — chooses path', acts: 'Yes — calls tools', good: 'Open-ended tasks where the path can’t be pre-scripted' },
  { level: 5, name: 'Multi-agent', what: 'Multiple agents collaborate/delegate', decides: 'Yes, distributed', acts: 'Yes', good: 'Genuinely complex, parallelizable workloads' },
];

// Pattern library (Phase 3)
export const PATTERNS = {
  workflow: [
    { name: 'Prompt chaining', desc: 'Sequential steps, each refines the last.', use: 'The task cleanly decomposes (outline → draft → polish).' },
    { name: 'Routing', desc: 'Classify the input, send to a specialized handler.', use: 'Distinct input types need different treatment (intent triage).' },
    { name: 'Parallelization', desc: 'Run subtasks at once then aggregate; or run N times and vote.', use: 'Speed, or multiple looks for reliability.' },
    { name: 'Orchestrator–workers', desc: 'A lead model breaks work into dynamic subtasks for workers.', use: 'You can’t predict the subtasks in advance.' },
    { name: 'Evaluator–optimizer', desc: 'One model produces, another critiques, loop until good.', use: 'You have clear quality criteria and iteration helps.' },
  ],
  agent: [
    { name: 'Tool-using agent (ReAct)', desc: 'Reason → act (call tool) → observe → repeat → stop. The workhorse.', use: 'Open-ended task, tools available, path unknown upfront.' },
    { name: 'Plan-and-execute', desc: 'Plan the whole approach first, then execute steps.', use: 'You want more control than open ReAct.' },
    { name: 'Multi-agent', desc: 'Specialized agents (researcher, drafter, checker) coordinated.', use: 'Use sparingly — only when subtasks are genuinely parallel/specialized.' },
  ],
  components: [
    { name: 'Retrieval (RAG)', desc: 'Ground the model in the client’s authoritative knowledge. Almost always present.' },
    { name: 'Tools / function calling', desc: 'The agent’s hands: look-ups, writes, calculations, search.' },
    { name: 'Memory', desc: 'Short-term (this task) vs long-term (across sessions). Add only when it earns its keep.' },
    { name: 'Guardrails', desc: 'Input/output filters, PII redaction, policy checks, action allow-lists.' },
    { name: 'Human-in-the-loop', desc: 'Approval gates on consequential actions.' },
    { name: 'Orchestration + observability', desc: 'Logging, tracing, the eval hook.' },
  ],
};

// Autonomy ladder rungs (Phase 6 / deep module)
export const RUNGS = [
  { n: 1, name: 'Shadow', hitl: '—', desc: 'Agent runs, output hidden, you compare to humans (eval only).', human: 'Does the job normally, unaffected.' },
  { n: 2, name: 'Suggest', hitl: '~100%', desc: 'Agent drafts, human edits/approves everything (copilot).', human: 'Reviews/approves everything; is also the labeler.' },
  { n: 3, name: 'Assist', hitl: '1 − auto%', desc: 'Agent auto-handles clear/easy cases, escalates the rest.', human: 'Handles only escalations.' },
  { n: 4, name: 'Act-with-limits', hitl: 'spot-check %', desc: 'Agent acts within hard bounds, human spot-checks a sample.', human: 'Audits a sample after the fact.' },
  { n: 5, name: 'Autopilot', hitl: '~0%', desc: 'Full autonomy on a bounded scope, monitored, with kill switch.', human: 'Watches dashboards.' },
];

// Diagnostic kickoff questions (toolkit)
export const DIAGNOSTICS = [
  'What job is done badly, and is the bottleneck ambiguity/judgment over language? (If no → it’s not an agent.)',
  'Can the path be predetermined? (If yes → workflow, not agent.)',
  'Does the data and ground truth exist and is it accessible?',
  'What’s the blast radius and reversibility of a mistake?',
  'How will we measure "good"? What’s the baseline today?',
  'What must this system never do? Who signs off on consequential actions?',
  'What’s the cost per successful task, and does it pay back at this volume?',
  'Who owns and runs it after launch, and what’s the kill switch?',
];
