// Phase-generic "How to run this phase" recipe. Every phase runs in the same
// 4 moves — Ask → Fill → Produce → Decide — so a PM always knows the steps.

export const RUNBOOK = {
  orient: {
    ask: ['Can the path be predetermined, or does it need open-ended judgment?', 'Is any step irreversible with no human checkpoint?', 'Can you define what "good" looks like?'],
    fill: 'A classification of each step on the agent spectrum (L0–L5 / human).',
    produces: 'A build / don’t-build verdict and a workflow-vs-agent split.',
    decision: 'Where — if anywhere — an agent actually earns its cost.',
  },
  frame: {
    ask: ['What job is done badly, and is ambiguity-over-language the bottleneck?', 'What does a "good" output look like?', 'What’s a mistake worth, and can it be undone?'],
    fill: 'The 9-line Opportunity Canvas.',
    produces: 'A filled canvas plus an opportunity size in the client’s metric.',
    decision: 'Go / no-go, and the value hypothesis.',
  },
  map: {
    ask: ['What are the discrete steps, and who does each today?', 'Per step: time, error cost, is the data available?', 'Where does ground truth exist?'],
    fill: 'The decomposition table, each step tagged to the spectrum.',
    produces: 'A spectrum-tagged decomposition with data-readiness flags.',
    decision: 'Which steps are agent-suitable vs. stay code or human.',
  },
  architect: {
    ask: ['Which pattern fits — workflow, agent, or both?', 'For every action: what is its reversibility × blast radius?', 'Which cross-cutting components (RAG, guardrails, HITL) are needed?'],
    fill: 'The pattern choice plus an autonomy matrix (action × segment).',
    produces: 'A reference architecture and a filled autonomy matrix.',
    decision: 'The pattern, and the autonomy level for every action.',
  },
  'de-risk': {
    ask: ['What are the top failure modes, and how likely × how bad?', 'What’s the kill switch?', 'Who signs off on consequential actions?'],
    fill: 'An AI-native RAID register — risk, mitigation, owner.',
    produces: 'A risk register and a governance / kill-switch plan.',
    decision: 'Mitigations, owners, and the sign-offs that gate any autonomy climb.',
  },
  strategize: {
    ask: ['What single metric is the North Star?', 'Where is the durable moat — not the model?', 'What’s the lighthouse vs. the platform?'],
    fill: 'A product-strategy one-pager.',
    produces: 'A strategy and a portfolio sequence.',
    decision: 'Where to play and how to win.',
  },
  sequence: {
    ask: ['What’s the value ÷ (risk × effort) order?', 'What eval bar gates each autonomy promotion?', 'What’s the money number per milestone?'],
    fill: 'An autonomy-ladder roadmap with eval gates.',
    produces: 'A gated roadmap with Now/Next/Later and OKRs.',
    decision: 'The rung plan and the fundable milestones.',
  },
  prove: {
    ask: ['What’s the cost per SUCCESSFUL task?', 'What’s the baseline today?', 'What does each rung save?'],
    fill: 'An eval plan (golden set + metrics) and a unit-economics model.',
    produces: 'An eval plan and a defensible business case (as a range).',
    decision: 'The promotion gates and the ROI a CFO signs.',
  },
  scale: {
    ask: ['Who runs the agent forever?', 'How do the human jobs change?', 'How is adoption and trust won?'],
    fill: 'An operating model and a change-management plan.',
    produces: 'A run model and a workforce-redesign plan.',
    decision: 'Ownership, role redesign, and how adoption is secured.',
  },
};
