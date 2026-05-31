// Plain-language glossary. `k` is the lookup key used by the <Term> component.

export const GLOSSARY = [
  {
    group: 'Agent concepts',
    terms: [
      { k: 'agent', term: 'Agent', def: 'An LLM running in a loop that chooses which tools to call and when to stop, against a goal. The model controls the flow.' },
      { k: 'workflow', term: 'Workflow', def: 'LLMs and tools orchestrated through code paths you defined. Your code controls the flow — not the model.' },
      { k: 'llm', term: 'LLM', def: 'Large Language Model — the AI model (e.g. Claude, GPT) that generates text and reasons over language.' },
      { k: 'rag', term: 'RAG', def: 'Retrieval-Augmented Generation — fetching authoritative documents (policies, catalogs, guidelines) and feeding them to the model so it answers from real sources instead of guessing.' },
      { k: 'react', term: 'ReAct', def: 'A common agent pattern: Reason → Act (call a tool) → Observe the result → repeat → stop. The workhorse tool-using loop.' },
      { k: 'tools', term: 'Tools / function calling', def: "The agent's 'hands': functions it can call to look things up, do calculations, or take actions in other systems." },
      { k: 'guardrails', term: 'Guardrails', def: 'Input/output filters and rules — PII redaction, policy checks, action allow-lists — that keep the system inside safe bounds.' },
      { k: 'hitl', term: 'HITL', def: 'Human-in-the-loop — a person reviews or approves the agent before a consequential action is taken.' },
      { k: 'memory', term: 'Memory', def: 'What the agent retains: short-term (within one task) vs. long-term (across sessions).' },
      { k: 'multiagent', term: 'Multi-agent', def: 'Multiple specialized agents (e.g. researcher, drafter, checker) coordinated by an orchestrator. Use sparingly — coordination cost is real.' },
      { k: 'blast-radius', term: 'Blast radius', def: 'How far the damage spreads if an action is wrong — one customer vs. every customer, a draft vs. a signed legal decision.' },
      { k: 'reversibility', term: 'Reversibility', def: 'Whether a mistake can be undone, and how cheaply. A key driver of how much autonomy an action can safely have.' },
      { k: 'autonomy', term: 'Autonomy', def: 'How much the system decides and acts on its own vs. deferring to a human. Set per action and per case-segment, not for the whole system.' },
    ],
  },
  {
    group: 'Evaluation',
    terms: [
      { k: 'golden-set', term: 'Golden dataset', def: 'A curated set of representative cases with known-good answers, used to measure the agent objectively. Your most valuable eval asset.' },
      { k: 'faithfulness', term: 'Faithfulness', def: 'Whether the output is actually grounded in the retrieved source — distinct from whether it is correct.' },
      { k: 'llm-judge', term: 'LLM-as-judge', def: 'Using an LLM to score outputs against a rubric so evaluation scales. Must be validated against human ratings first.' },
      { k: 'drift', term: 'Drift', def: 'Silent quality decay as the world changes — new products, new policies, model updates. Detected by monitoring inputs and output metrics.' },
      { k: 'eval-ci', term: 'Eval in CI', def: 'Re-running the golden set automatically on every prompt/model/tool change, and blocking deploys that regress.' },
      { k: 'shadow', term: 'Shadow mode', def: 'Running the agent on live inputs with its output hidden and never acted on — to measure it safely against humans before any exposure.' },
    ],
  },
  {
    group: 'Governance & delivery',
    terms: [
      { k: 'raid', term: 'RAID log', def: 'A standard project register of Risks, Assumptions, Issues, and Dependencies — here extended with AI-native risk categories.' },
      { k: 'raci', term: 'RACI', def: 'A decision-rights matrix marking who is Responsible, Accountable, Consulted, and Informed for each action.' },
      { k: 'nist', term: 'NIST AI RMF', def: "The US standards body's AI Risk Management Framework, structured as Govern–Map–Measure–Manage." },
      { k: 'iso42001', term: 'ISO/IEC 42001', def: 'The first international AI management-system standard (2023) — a recognized governance structure for AI.' },
      { k: 'kill-switch', term: 'Kill switch', def: 'A one-click way to halt a consequential agent. Every such agent needs a documented "what happens when it’s wrong" plan.' },
      { k: 'llmops', term: 'LLMOps / AgentOps', def: 'The operational discipline of running agents: versioning prompts/tools/models, eval in CI, monitoring, rollback, on-call.' },
      { k: 'sow', term: 'SOW', def: 'Statement of Work — the contract defining scope and deliverables for an engagement; here, often phased by autonomy rung.' },
      { k: 'okr', term: 'OKR', def: 'Objectives and Key Results — a goal-setting format tying each roadmap milestone to a measurable outcome.' },
      { k: 'qbr', term: 'QBR', def: 'Quarterly Business Review — the recurring cadence where value/metrics are reported to stakeholders.' },
    ],
  },
  {
    group: 'Economics',
    terms: [
      { k: 'cost-per-task', term: 'Cost per task', def: 'The token + tool + infra cost of one run of the agent.' },
      { k: 'cost-per-success', term: 'Cost per successful task', def: 'Cost per task ÷ success rate — the honest number. A cheap agent that often fails is expensive.' },
      { k: 'tco', term: 'TCO', def: 'Total Cost of Ownership — build + eval + inference + monitoring + governance + change management. The run cost often exceeds the build cost.' },
      { k: 'hitl-ratio', term: 'HITL %', def: 'The share of cases that still need human time. It falls as you climb the autonomy ladder — that fall is the ROI.' },
      { k: 'north-star', term: 'North Star', def: 'The single outcome metric the whole effort is steering toward (e.g. decision turnaround, cost-to-serve).' },
      { k: 'moat', term: 'Moat', def: 'Durable competitive advantage — not the model (everyone rents the same ones), but proprietary data, deep workflow integration, the feedback loop, and trust.' },
    ],
  },
  {
    group: 'Case acronyms',
    terms: [
      { k: 'pa', term: 'PA (prior auth)', def: 'Prior Authorization — a health plan’s approval that a treatment is covered before it’s provided.' },
      { k: 'phi', term: 'PHI', def: 'Protected Health Information — patient data regulated under HIPAA.' },
      { k: 'edi', term: 'EDI', def: 'Electronic Data Interchange — a structured format health-care requests often arrive in.' },
      { k: 'wismo', term: 'WISMO', def: '"Where Is My Order" — the most common, repetitive post-purchase customer-service contact.' },
      { k: 'csat', term: 'CSAT', def: 'Customer Satisfaction score — a standard measure of how happy customers are with a resolution.' },
      { k: 'ltv', term: 'LTV', def: 'Lifetime Value — the total value a customer represents over their relationship; high-LTV customers often warrant human handling.' },
      { k: 'deflection', term: 'Deflection', def: 'The share of contacts resolved without a human agent — the core ROI lever in customer service.' },
    ],
  },
];

// Flat lookup for the <Term> component.
export const GLOSSARY_MAP = GLOSSARY.reduce((acc, g) => {
  g.terms.forEach((t) => { acc[t.k] = t; });
  return acc;
}, {});
