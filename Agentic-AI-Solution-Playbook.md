# The Agentic Solution Blueprint
### An operating model for laying out Agentic AI solutions — from intermediate to expert
*Built for the consultant / technical PM who has to frame the problem, sell the strategy, design the system, de-risk it, and ship it.*

---

## How to use this guide

This is not a list of facts about AI. It's a **repeatable engagement methodology** — the same 8 phases you can run on any client problem or product idea, plus the mental models and tools an expert uses inside each phase.

Two running cases appear in every phase so the abstract becomes concrete:

| | **Healthcare case** | **Retail / e-commerce case** |
|---|---|---|
| Primary thread | A health plan automating **prior-authorization (PA) triage and drafting** | A retailer building a **post-purchase customer service agent** (returns, "where's my order", exchanges) |
| Secondary thread | Member **care navigation / benefits Q&A** | **Merchandising content generation** (product pages at scale) |
| Why it's instructive | High stakes, low volume per case, heavily regulated, judgment + rules | High volume, lower per-case stakes, clear deflection ROI, real *action* risk (refunds) |

The contrast is deliberate. PA teaches you **governance, accuracy, and human-in-the-loop**. Retail CS teaches you **autonomy, blast radius, and unit economics**. An expert internalizes both reflexes.

**The skill progression overlaid on the phases:**
- *Intermediate* = you can execute a phase when handed a clear brief.
- *Advanced* = you choose the right framework for the situation and produce the artifact unprompted.
- *Expert* = you know which phases to compress or skip, you can say "don't build an agent here" to a client and gain trust, and you can defend every decision commercially.

---

## The spine: 8 phases

```
0. ORIENT     → mental models; what an agent actually is; when NOT to use one
1. FRAME      → problem & opportunity definition
2. MAP        → current-state discovery; where agents fit the workflow
3. ARCHITECT  → solution & pattern selection; autonomy design
4. DE-RISK    → risk taxonomy, governance, responsible AI
5. STRATEGIZE → product / portfolio strategy
6. SEQUENCE   → roadmap, delivery model, the autonomy ladder
7. PROVE      → evaluation, economics, value realization
8. SCALE      → operating model, change, the last mile
```

Phases 1–6 are roughly your five asks. Phases 0, 7, 8 are the "10x" — the parts that make solutions *survive contact with production* and make *you* the person clients trust with the next problem.

---
---

# Phase 0 — ORIENT: the mental models

Everything downstream goes wrong if you skip this. Most failed "agentic" initiatives are misclassified problems.

### The agent spectrum

"Agentic" is not binary. Place every solution on this spectrum — the higher you go, the more capability *and* the more risk, cost, and governance burden.

| Level | What it is | Decides? | Acts? | Good for |
|---|---|---|---|---|
| 0. Deterministic rules / RPA | If-this-then-that | No | Yes | Stable, high-volume, zero-ambiguity steps |
| 1. Classical ML | Predicts a label/score | A narrow prediction | No | Fraud scoring, demand forecasting |
| 2. LLM single-shot | One prompt → one output | No | No | Drafting, summarizing, extraction |
| 3. LLM **workflow** | Predefined chain of LLM + tool steps | Within fixed paths | Via tools, scripted | Most "GenAI" production value lives here |
| 4. **Agent** | LLM directs its own steps/tools toward a goal in a loop | Yes — chooses path | Yes — calls tools | Open-ended tasks where the path can't be pre-scripted |
| 5. Multi-agent | Multiple agents collaborate/delegate | Yes, distributed | Yes | Genuinely complex, parallelizable workloads |

**The single most expert instinct you can develop:** *Workflows beat agents whenever the path is knowable.* Agents earn their cost only when the steps genuinely can't be predetermined. A client saying "we want agentic AI" usually has a Level-3 workflow problem dressed up as a Level-4 ask. Reclassifying it down is often the highest-value thing you do all engagement — it's cheaper, faster, more reliable, and easier to govern.

> **Definition that matters:** An *agent* is an LLM running in a loop, choosing which tools to call and when to stop, against a goal. A *workflow* is LLMs and tools orchestrated through code paths you defined. The difference is **who controls the flow** — the model or your code.

### When NOT to build an agent (your trust-building checklist)

Recommend *against* agentic AI when **any** of these hold:
- The task is deterministic and the rules are stable → use RPA/code.
- An error is catastrophic and irreversible with no good human checkpoint → keep a human in the loop or don't automate the decision.
- You can't define what "good" looks like → you can't evaluate it, so you can't trust it.
- The data/integrations don't exist or are too dirty → fix the foundation first.
- Volume is so low that engineering cost never pays back → do it manually.
- Latency or cost budgets can't absorb multi-step model calls.

Saying this out loud to a client is a senior move. It signals you optimize for *their* outcome, not for selling AI. It is how you earn the next, bigger phase.

**Maps to your world:** This is the classic consulting **"is this even the right problem"** gate. It's the AI version of telling a client they don't need the platform rebuild they asked for.

### Running cases through the Phase-0 lens

- **Prior auth:** Triage (does this request even need clinical review?) is a Level-3 workflow with classification. Drafting the rationale and pulling guideline citations is genuinely open-ended → Level-4 agent, *with a clinician approving every output.* Mixed solution.
- **Retail CS:** "Where's my order" is Level-3 (look up, summarize, reply). "Customer wants an exchange on a worn item outside policy, is upset, and has high lifetime value" is Level-4 (judgment, multiple tools, negotiate within bounds). The *refund action* is what forces an autonomy decision (Phase 3).

---
---

# Phase 1 — FRAME: problem & opportunity

> *Your ask #1: how to approach a new problem or idea.*

### The expert reframe

Beginners ask "where can we use AI?" Experts ask "what **job** is being done badly, slowly, or expensively, and is **judgment under language/ambiguity** the bottleneck?" Agentic AI is uniquely good at exactly one thing: **reasoning over unstructured, ambiguous information and taking bounded action.** If that's not the bottleneck, AI isn't the lever.

### The four lenses (extend Desirability/Feasibility/Viability with a fourth)

Run every idea through:

1. **Desirability** — does a real user/stakeholder feel this pain? (jobs-to-be-done)
2. **Feasibility** — can current models + your data + integrations actually do it? (Phase 3 + data readiness)
3. **Viability** — does the unit economics and ROI close? (Phase 7)
4. **Responsibility** — can it be governed, explained, and made compliant? (Phase 4)

A 2×2 of *value* (impact × frequency) against *agentic-fit* (ambiguity × autonomy-safe) gives you a portfolio heatmap clients love.

### The Agentic Opportunity Canvas (your workshop tool)

A one-pager to fill in a discovery session:

```
JOB TO BE DONE:        the outcome the org/user actually wants
TODAY'S PROCESS:       who does it now, how long, how much it costs
THE BOTTLENECK:        why it's slow/costly — is it ambiguity/language? (if no → stop)
TRIGGER & INPUTS:      what kicks it off; what data/docs are needed
DEFINITION OF DONE:    what a "good" output looks like (this becomes your eval)
ACTION SURFACE:        what the agent would *do* (read-only? draft? act?)
REVERSIBILITY:         can a mistake be undone? cheaply? (drives autonomy)
VALUE:                 $ / time / quality / risk reduced, × volume
GUARDRAILS NEEDED:     compliance, PII, what it must never do
```

### Sizing the opportunity (so it survives a CFO)

Value = **(time or cost per case saved) × (volume) × (automation/deflection rate)** − run cost. Always express in the client's native metric: clinical hours returned, days-to-decision, deflection %, conversion lift, cost-to-serve.

### Running cases

| | Prior auth | Retail post-purchase CS |
|---|---|---|
| Job-to-be-done | Decide PA requests faster, accurately, compliantly | Resolve post-purchase issues without an agent, keep CSAT up |
| Bottleneck | Nurses read long faxes/charts against guidelines | Humans answer repetitive WISMO + handle judgment cases |
| Definition of done | Correct determination + cited rationale a clinician signs | Issue resolved within policy, customer satisfied |
| Value metric | Turnaround time, clinician hours, audit-defensibility | Deflection %, cost-per-contact, CSAT, refund leakage |

**Maps to your world:** This *is* the opportunity assessment / discovery deck. The Canvas slots straight into a kickoff workshop; the sizing becomes the business-case skeleton.

**Traps:** "Solution looking for a problem" (someone fell in love with agents); sizing on volume without a deflection assumption you can defend; ignoring the Responsibility lens until legal kills it in month 3.

---
---

# Phase 2 — MAP: current-state discovery & where agents fit

> *Your ask #2: determine existing workflows/flows to use for agentic AI.*

### The core technique: Job → Tasks → Steps → Decomposition

Don't "AI-ify a process." Decompose it, then classify each step against the Phase-0 spectrum. Most processes are a *blend* — and the design win is putting deterministic steps in code, predictions in ML, and only the genuinely-ambiguous steps in an LLM/agent.

For each step capture: **inputs · decision/output · who does it today · time · error cost · data availability · reversibility.** This table is your single most reusable artifact — it feeds architecture (3), risk (4), and the business case (7).

### Three discovery instruments

1. **Process mining / current-state map** — the as-is swimlane. Mark where time and rework concentrate.
2. **Data & systems inventory** — for each needed input: does it exist, where, structured/unstructured, accessible via API, quality, PII/PHI flags. *No data, no agent.* This is where feasibility is really decided.
3. **Ground-truth audit** — can you get labeled "correct" examples? Without them you cannot evaluate (Phase 7). If past human decisions are inconsistent, that's a finding in itself.

### The decomposition output (illustrative — prior auth)

| Step | Today | Spectrum fit | Notes |
|---|---|---|---|
| Receive request (fax/portal/EDI) | Intake clerk | L0 deterministic | OCR/parse in code |
| Extract clinical data | Nurse reads | L2 extraction | Unstructured → structured |
| Check if review even needed | Nurse | L1/L3 classify | Auto-approve clear cases |
| Match against medical policy | Nurse judgment | **L4 agent** | Open-ended reasoning + retrieval |
| Draft determination + citations | Nurse | **L4 agent** | The high-value step |
| **Approve / sign** | **Physician** | **Human — never automated** | Regulatory + liability |
| Notify provider/member | System | L0 | Templated |

### Retail CS decomposition (illustrative)

| Step | Spectrum fit |
|---|---|
| Classify intent (WISMO / return / complaint) | L1/L3 |
| Look up order, shipment, policy | L0 tools |
| Resolve simple WISMO | L3 workflow |
| Judgment case (out-of-policy, upset, VIP) | L4 agent within bounds |
| **Issue refund > threshold** | Human approval or hard cap |

**Maps to your world:** as-is process mapping, value-stream analysis, the data-readiness assessment. The decomposition table is the bridge from "current state" to "future state."

**Traps:** modeling the *official* process instead of the real one (shadow workarounds are where the truth is); discovering mid-build that the data isn't accessible; assuming ground truth exists when human decisions were never logged with rationale.

---
---

# Phase 3 — ARCHITECT: solution & pattern selection

This is the technical-PM core, and the biggest "10x" addition. You don't need to write the code, but you must be able to *specify the pattern* and *defend the autonomy choice.*

### The pattern library (memorize these — they cover ~90% of real systems)

**Workflow patterns (path defined by you):**
- **Prompt chaining** — sequential steps, each refines the last. *Use when:* the task cleanly decomposes (outline → draft → polish).
- **Routing** — classify the input, send to a specialized handler. *Use when:* distinct input types need different treatment (intent triage).
- **Parallelization** — run subtasks at once, then aggregate; or run the same task N times and vote. *Use when:* speed, or you want multiple looks for reliability.
- **Orchestrator–workers** — a lead model breaks work into dynamic subtasks for workers. *Use when:* you can't predict the subtasks in advance.
- **Evaluator–optimizer** — one model produces, another critiques, loop until good. *Use when:* you have clear quality criteria and iteration helps.

**Agent patterns (path chosen by the model):**
- **Tool-using agent (ReAct-style)** — reason → act (call tool) → observe → repeat → stop. The workhorse.
- **Plan-and-execute** — plan the whole approach first, then execute steps. More controllable than open ReAct.
- **Multi-agent** — specialized agents (researcher, drafter, checker) coordinated by an orchestrator. *Use sparingly* — coordination cost is real; only when subtasks are genuinely parallel/specialized.

**Cross-cutting components every real system needs:**
- **Retrieval (RAG)** — ground the model in the client's authoritative knowledge (policies, catalog, guidelines) so it isn't guessing. Almost always present.
- **Tools / function calling** — the agent's hands: look-ups, writes, calculations, search.
- **Memory** — short-term (this task) vs long-term (across sessions). Add only when it earns its keep.
- **Guardrails** — input/output filters, PII redaction, policy checks, allow-lists for actions.
- **Human-in-the-loop checkpoints** — approval gates on consequential actions.
- **Orchestration + observability** — logging, tracing, the eval hook (Phase 7).

### Build vs. buy vs. orchestrate

For each capability decide: foundation-model API + your orchestration (most flexible), a vertical SaaS agent (fastest, less control), or RPA/code (cheapest where deterministic). Model selection is a *portfolio* decision — use cheaper/faster models for routing and extraction, stronger models only for the hard reasoning step. This is a major cost lever (Phase 7).

> **Decouple the architecture from the vendor.** Models, frameworks, and vendors change every few months. Design the *pattern* and the *interfaces* so you can swap the model underneath. Clients will ask "which model?" — the senior answer is "here's the architecture; the model is a configurable, replaceable component, and here's how we'll re-evaluate it quarterly."

### The autonomy decision — the master design variable

For every action the system can take, set autonomy by **reversibility × blast radius**:

| | Low impact | High impact |
|---|---|---|
| **Reversible** | Full autonomy | Autonomy + log/monitor |
| **Irreversible** | Autonomy with cap/confirm | **Human approval required** |

This single 2×2 governs more of the design than any model choice.

### Running cases — reference architectures

**Prior auth (sketch):**
`Intake (parse, L0) → Triage router (auto-approve clear cases) → Agent: retrieve member history + medical policy (RAG) + tools, reason against criteria, draft determination with citations → Guardrails (PHI, policy adherence) → HUMAN clinician approval → System notifies.`
Autonomy: read/draft = autonomous; *determine/sign = always human.* Irreversible + high blast radius.

**Retail CS (sketch):**
`Intent router → [WISMO: workflow look-up + reply] or [Judgment: tool-using agent with order/policy/inventory tools] → action layer with hard limits (auto-refund ≤ $X and within policy; else human) → guardrails (tone, no PII leakage, no promises outside policy).`
Autonomy: refunds under a threshold = autonomous (reversible-ish, low blast radius); above threshold or out-of-policy = human.

**Maps to your world:** this is the solution-architecture section of your PRD / SOW and the future-state design. The autonomy 2×2 is a brilliant exec slide — it makes the safety story visual.

**Traps:** reaching for multi-agent when one agent + tools would do (complexity tax, debugging nightmare); skipping retrieval and getting confident hallucinations; building memory before it's needed; choosing one expensive model for everything.

---
---

# Phase 4 — DE-RISK: risk, governance, responsible AI

> *Your ask #3: measure risk and build a mitigation plan.*

### The agentic risk taxonomy

Score each on **likelihood × impact**; attach a mitigation and an owner. This becomes an AI-specific RAID log.

| Risk class | What it looks like | Mitigations |
|---|---|---|
| **Accuracy / hallucination** | Confident wrong answer; fabricated citation | RAG grounding; require source citations; confidence thresholds; human review on low-confidence |
| **Autonomy / action risk** | Agent does something harmful/irreversible | Autonomy 2×2; action allow-lists; spend/dollar caps; approval gates; dry-run mode |
| **Security** | Prompt injection, data exfiltration, tool abuse | Input sanitization; least-privilege tool scopes; isolate untrusted content; output filtering; don't let the agent see secrets it doesn't need |
| **Compliance / regulatory** | HIPAA/PHI exposure, FDA/clinical, consumer-protection, bias laws | Data minimization; audit trails; legal sign-off on autonomy; documented decision rationale |
| **Bias / fairness** | Unequal outcomes across groups | Subgroup eval; bias testing; human oversight on protected decisions |
| **Reputational** | Public bad output; tone failure | Tone/brand guardrails; staged rollout; kill switch |
| **Cost runaway** | Loops, token explosions | Step/loop caps; budget alerts; cost-per-task monitoring |
| **Model/vendor dependency** | API change, deprecation, price hike | Abstraction layer; multi-model fallback; contractual terms |
| **Drift / silent degradation** | Quality decays as world/data changes | Ongoing online eval; monitoring; periodic re-validation |

### The governance frame

Map to a recognized structure (NIST AI RMF: *Govern–Map–Measure–Manage*, or ISO/IEC 42001) so the client's risk org recognizes it. Define: who owns the agent, who can change it, the audit trail, the human-oversight policy, the incident/escalation path, and the **kill switch**. Every consequential agent needs a documented "what happens when it's wrong" plan.

### Industry-specific stakes

- **Healthcare:** PHI under HIPAA; PA decisions are regulated and auditable; clinical-decision tools may face FDA scrutiny; *the licensed clinician owns the determination — the agent assists.* Every output needs a defensible, cited rationale. This is why PA is a human-in-the-loop design, full stop.
- **Retail:** consumer-protection and advertising rules (no false claims in generated product copy); PII under GDPR/CCPA; pricing/refund actions touch financial controls; recommendation bias and dark-pattern risk; brand-safety on anything customer-facing.

**Maps to your world:** the RAID log, risk register, and compliance workstream — now with AI-native categories. Bringing prompt-injection and autonomy-risk to a client unprompted instantly marks you as senior.

**Traps:** treating responsible AI as a checkbox at the end instead of a design input; no kill switch; ignoring prompt injection because "it's internal" (it isn't, once it reads external content); no plan for *being wrong in production.*

---
---

# Phase 5 — STRATEGIZE: product / portfolio strategy

> *Your ask #4: create a product strategy involving AI.*

### From use case to strategy

One agent is a feature. A *strategy* answers: which jobs, in what order, building toward what durable advantage, defended by what moat, monetized how.

**Strategic frame to fill in:**
- **North Star** — the one outcome metric the whole effort moves (e.g., PA turnaround days; cost-to-serve per contact).
- **Where to play** — the prioritized opportunity portfolio from Phase 1's heatmap.
- **How to win / moat** — *not the model* (everyone rents the same models). Durable advantage comes from **proprietary data, deep workflow integration, the evaluation/feedback loop, trust/compliance posture, and distribution.** Name yours explicitly.
- **Capability stack** — data, integrations, eval infra, MLOps/LLMOps, talent, governance. Strategy includes building the platform, not just the apps.
- **Build/buy/partner** posture per layer.
- **Operating model** — centralized AI platform team enabling federated product teams is the pattern that scales (Phase 8).

### The "two-speed" portfolio (key senior move)

Run two tracks in parallel:
1. **Lighthouse use case** — one high-value, well-bounded problem you take to production fast to prove value and earn credibility/budget.
2. **Platform / foundation** — the reusable capabilities (retrieval, eval harness, guardrails, observability, integration patterns) so the *next* five use cases are 10× cheaper.

The lighthouse funds the platform; the platform compounds. This is how you turn one engagement into a program — the commercial heart of consulting *and* the product-portfolio logic.

### Productizing (if you're at/joining a product company)

- **Wedge → expansion:** land on one painful job, expand across the workflow.
- **Pricing:** outcome-based (per resolved case, per deflection) aligns with value but needs airtight measurement; seat-based is simpler but caps upside; usage/consumption passes through token cost. Agentic value is often outcome-shaped — price toward it as your eval matures.
- **Moat:** the feedback loop. Every human correction (the clinician edit, the CS agent's override) is training/eval signal competitors don't have. Design to capture it from day one.

### Running cases

- **Prior auth strategy:** North Star = decision turnaround. Moat = proprietary policy-mapping + the clinician-correction loop + compliance trust. Lighthouse = one high-volume service line; platform = reusable clinical-RAG + eval + PHI guardrails reused for appeals, claims, care nav.
- **Retail strategy:** North Star = cost-to-serve at held CSAT. Lighthouse = WISMO+returns deflection; platform = the agent runtime, tool layer, and eval harness reused for the shopping assistant and merchandising-content engine. Moat = catalog + behavioral data + brand-tuned generation.

**Maps to your world:** product strategy doc, portfolio prioritization, the program business case, the operating-model recommendation.

**Traps:** "AI strategy" that's a list of use cases with no sequencing or moat; betting the moat on a model you don't own; building the platform before proving value (no one funds it); ignoring the feedback loop.

---
---

# Phase 6 — SEQUENCE: roadmap & delivery

> *Your ask #5: roadmap planning.*

### Sequence by risk-adjusted value, gated by maturity

Don't sequence by what's exciting. Sequence by **value ÷ (risk × effort)**, and gate each step so autonomy and scope expand only as evidence accumulates.

### The Autonomy Ladder (your signature roadmap device)

The most powerful way to phase an agentic roadmap is to hold the use case constant and **climb autonomy** as trust is earned:

```
Rung 1 — SHADOW:   agent runs, output hidden, you compare to humans (eval only)
Rung 2 — SUGGEST:  agent drafts, human edits/approves everything (copilot)
Rung 3 — ASSIST:   agent auto-handles clear/easy cases, escalates the rest
Rung 4 — ACT-WITH-LIMITS: agent acts within hard bounds, human spot-checks
Rung 5 — AUTOPILOT: full autonomy on this scope, monitored, with kill switch
```

You only climb a rung when eval metrics (Phase 7) clear a pre-agreed bar. This is *crawl-walk-run* made concrete, it's how you sell safety to risk-averse clients, and it doubles as the value-realization story.

### Roadmap horizons

- **Now (0–3 mo):** lighthouse to Rung 1–2; stand up eval harness and observability; prove the metric.
- **Next (3–9 mo):** climb the lighthouse to Rung 3–4; build reusable platform components; add use case #2.
- **Later (9–18 mo):** autopilot where safe; portfolio expansion on the platform; self-serve enablement for other teams.

Tie each milestone to an **OKR** and a money number. Roadmaps that don't connect to value get cut.

### Running cases

| | Prior auth | Retail CS |
|---|---|---|
| Now | Shadow on one service line; build clinical eval set | Shadow + copilot on WISMO; deflection eval |
| Next | Suggest/Assist with clinician approval; reuse RAG for appeals | Assist (auto-resolve WISMO), agent-with-caps on refunds |
| Later | Autopilot on low-risk auto-approvals only; expand lines | Autopilot WISMO; launch shopping assistant on platform |
| Ceiling | Determination **never** fully autonomous | Refunds capped; high-value cases stay human |

**Maps to your world:** the roadmap, OKRs, release plan, and stage-gate governance. The Autonomy Ladder maps cleanly to phased SOWs / funding gates — each rung is a fundable milestone with an exit criterion.

**Traps:** committing to autopilot dates before eval proves the rung; a roadmap of features instead of value milestones; no eval gate between rungs (the #1 way agents reach production unsafe).

---
---

# Phase 7 — PROVE: evaluation, economics & value (the 10x core)

This is what separates demos from production and what makes you irreplaceable. **If you can't measure it, you can't trust it, ship it, or price it.**

### Evaluation — the discipline most teams underinvest in

You need a measurement system *before* you build, not after.

**Build the eval stack:**
1. **Golden dataset** — representative cases with known-good outputs (from your Phase-2 ground-truth audit). Your single most valuable asset; grow it continuously, especially with the hard/edge cases.
2. **Metrics that match the job:**
   - *Task success / resolution rate* — did it achieve the goal?
   - *Accuracy / faithfulness* — correct and grounded in sources (not hallucinated)?
   - *Quality* — clinician-acceptability, tone/brand fit.
   - *Safety* — guardrail-violation rate, harmful-output rate.
   - *Operational* — latency, cost-per-task, escalation rate, loop/step count.
3. **Methods:** human review (gold standard, doesn't scale) → **LLM-as-judge** (scaled, validated against human ratings) → automated checks (citation present, format valid, within policy).
4. **Offline → online:** test on the golden set pre-ship; then measure live (deflection, CSAT, override rate, A/B vs. human baseline). The Autonomy Ladder is gated on these numbers.

> Your thisorthis.ai / SmartPick work is literally this discipline (evaluating model outputs) — you already have the muscle. The move is to apply structured eval to *client* solutions and make it a deliverable.

### Economics — speak fluent unit cost

Experts model this on a napkin and defend it to a CFO:

- **Cost per task** = (tokens in + out × price) × steps + tool/infra cost. *The lever:* cheaper models for easy steps, strong model only for the hard reasoning; cap loops; cache/retrieve instead of re-reasoning.
- **Cost per *successful* task** = cost per task ÷ success rate. The honest number — a cheap agent that fails half the time is expensive.
- **Net value per case** = (human cost displaced or value created) − (agent run cost) − (human-in-loop cost). Multiply by volume.
- **Human-in-loop ratio** — drives the savings; it *falls as you climb the autonomy ladder*, so ROI improves over time. Show that curve.
- **TCO** — model/infra + build + eval + monitoring + governance + change management. Most business cases forget everything after "build."

### The value-realization plan

Baseline the metric *before* launch (you can't prove improvement you didn't measure pre). Define how each rung translates to dollars. Instrument it. Report it. This is what gets the next phase funded.

### Running cases

- **Prior auth:** golden set = past cases with correct determinations + rationale; metrics = determination accuracy, citation faithfulness, clinician-edit rate, turnaround time, % auto-approvable. Economics = clinician minutes returned × volume − run cost; the edit-rate falling is the trust signal that opens the next rung.
- **Retail CS:** golden set = resolved tickets; metrics = resolution rate, deflection %, CSAT, escalation rate, refund-leakage; economics = cost-per-contact deflected × volume; watch cost-per-*successful*-resolution so you don't celebrate deflection that just creates angry re-contacts.

**Maps to your world:** the benefits-realization plan, the business case made defensible, the QBR metrics. Bring a measurement plan to a kickoff and you're operating two levels up.

**Traps:** no baseline (can't prove value); vanity metrics (containment % that hides re-contacts); ignoring cost-per-*successful*-task; treating eval as one-time instead of continuous.

---
---

# Phase 8 — SCALE: operating model, change & the last mile

The graveyard phase. Most agentic pilots work and never scale — not for technical reasons but operating-model and human ones. This is pure consulting territory and your differentiator.

### Productionization — the last mile

Pilot ≠ production. The gap: reliability at scale, monitoring/observability, incident response, security review, integration hardening, and the **continuous eval + retraining/re-prompting loop** as the world drifts. Budget for the last mile explicitly; it's often as large as the build.

### Operating model — who runs the agent forever

- **LLMOps/AgentOps:** versioning prompts/tools/models, eval in CI, drift monitoring, rollback, on-call.
- **Ownership:** a named product owner + a clear "agent steward" who watches quality and incidents.
- **Org shape:** a **central AI platform team** (eval harness, guardrails, shared tools, governance) **enabling federated product squads.** This is the pattern that lets use case #6 cost a fraction of #1.
- **Governance forum:** reviews new use cases, autonomy promotions, and incidents.

### Change management & workforce redesign — where value is actually won or lost

The agent changes *jobs*, and adoption is the real bottleneck. Address head-on:
- **Redesign the human role** — humans move from *doing* to *reviewing, handling edge cases, and improving the agent.* Make that role attractive and clear.
- **Trust & adoption** — explainability, the ability to override, visible accuracy, and involving end-users in design. A clinician who doesn't trust the draft won't use it; a CS rep who fears replacement will route around it.
- **Incentives** — don't measure people on metrics the agent now owns; measure them on the new value-added work.
- **Comms** — augmentation story, honestly told. Where roles do shrink, say so and plan it.

> This is the part technical teams skip and consultants own. An agent at 95% accuracy that nobody trusts delivers 0% value. Adoption is a design problem, not an afterthought.

### Running cases

- **Prior auth:** clinicians shift from reading-and-typing to reviewing-and-signing; design the review UI for fast trust (citations inline, confidence flags); reskill intake staff; governance forum reviews each autonomy promotion against safety data.
- **Retail CS:** agents move to complex/emotional cases and to *coaching the bot* (flagging bad answers → eval data); restructure QA around agent monitoring; the human-correction stream becomes your moat's fuel (Phase 5).

**Maps to your world:** operating-model design, org-and-change workstream, the run/BAU transition, the capability-build recommendation — the highest-margin, stickiest consulting work.

**Traps:** "throw it over the wall" with no run model; no continuous eval (silent drift); ignoring the workforce until adoption fails; no central platform, so every team rebuilds guardrails and costs balloon.

---
---

# The expert's pocket toolkit

### Diagnostic questions for a client kickoff (bring these)
1. What *job* is done badly, and is the bottleneck **ambiguity/judgment over language**? (If no → it's not an agent.)
2. Can the path be predetermined? (If yes → workflow, not agent.)
3. Does the **data and ground truth** exist and is it accessible?
4. What's the **blast radius and reversibility** of a mistake?
5. How will we **measure** "good"? What's the baseline today?
6. What must this system **never** do? Who **signs off** on consequential actions?
7. What's the **cost per successful task**, and does it pay back at this volume?
8. Who **owns and runs** it after launch, and what's the **kill switch**?

### The one-sentence test for each phase
- Frame: *"Here's the job, the bottleneck, and why agentic AI is the lever — or isn't."*
- Map: *"Here's the decomposition; these specific steps are agent-suitable, these stay code or human."*
- Architect: *"Here's the pattern and the autonomy 2×2 for every action."*
- De-risk: *"Here are the top risks, owners, mitigations, and the kill switch."*
- Strategize: *"Here's the moat, the lighthouse, and the platform that compounds."*
- Sequence: *"Here's the autonomy ladder gated by eval metrics."*
- Prove: *"Here's the golden set, the metrics, the cost-per-successful-task, and the baseline."*
- Scale: *"Here's who runs it, how humans' jobs change, and how adoption is won."*

### Anti-patterns that mark a beginner (avoid these)
- Agent where a workflow would do · no eval before build · no baseline · moat = "we used GPT" · multi-agent for a single-agent job · autonomy without reversibility analysis · no kill switch · pilot with no run model · ignoring change management · sizing value without a defensible deflection/accuracy assumption.

### How the AI phases map to artifacts you already produce

| Phase | Your existing deliverable |
|---|---|
| Frame | Opportunity assessment / discovery deck; business-case skeleton |
| Map | As-is process map; data-readiness assessment |
| Architect | PRD solution section / future-state design |
| De-risk | RAID log / risk register / compliance workstream |
| Strategize | Product strategy; portfolio prioritization; operating-model rec |
| Sequence | Roadmap; OKRs; stage-gate plan / phased SOW |
| Prove | Benefits-realization plan; QBR metrics |
| Scale | Org-and-change workstream; run/BAU transition |

---

## Your path to expert (90-day self-development plan)

- **Weeks 1–2:** Take one real current/past assignment and run it through all 8 phases on paper. Where did the real project skip a phase, and what did it cost?
- **Weeks 3–4:** Build the pattern library into muscle memory — for 10 use cases you encounter, name the pattern and the autonomy rung in under a minute.
- **Weeks 5–8:** Get hands-on with the eval discipline (you already have thisorthis/SmartPick as a sandbox) — build a golden set and an LLM-as-judge eval for one task end to end. This is the rarest skill; owning it is your edge.
- **Weeks 9–12:** Build your reusable assets — the Opportunity Canvas, the autonomy 2×2 slide, the risk taxonomy, the autonomy-ladder roadmap template, the cost-per-successful-task model. Walk into engagements with these and you operate as the expert.

The throughline of expertise: **you optimize for the client's outcome over the coolness of the solution** — which means knowing when to say "workflow, not agent," "human stays in the loop here," or "don't build this yet." That judgment, backed by the ability to measure and de-risk, is the whole game.
