# Deep Module: The Autonomy Ladder + Eval & Economics
### The evidence engine and the trust ladder it powers
*Companion to the Agentic Solution Blueprint. Written for the practitioner who has to defend every autonomy decision with a number.*

---

## Why these two are one system

Most teams treat "how autonomous should the agent be?" and "how do we measure the agent?" as separate workstreams. They aren't. The relationship is mechanical:

```
   EVAL produces evidence  ──►  evidence is the GATE  ──►  climbing drops human-in-loop %
        ▲                       to climb the ladder           │
        │                                                     ▼
        └──────────  better economics funds the next use case ◄──  ECONOMICS improve
```

If you remember one thing: **an autonomy roadmap with no eval system is just a wish.** You cannot promote an agent to act on its own without an objective, pre-agreed trigger — and that trigger is a measured metric clearing a threshold. So we build the measurement first (Part 2), but present the ladder first (Part 1) because it's what the client/exec sees and what frames *why* you need the eval.

---
---

# PART 1 — THE AUTONOMY LADDER (deep)

## The reframe that separates seniors from beginners

Beginners ask: *"Is the agent autonomous?"* — a system-level yes/no.

Experts know autonomy is a property of **each action × each case-segment**, not the system. One deployed agent sits on *different rungs simultaneously*: it might be on full autopilot for "where's my order," act-with-limits for small refunds, and pure copilot for high-value disputes — all at once. The deliverable isn't "the agent's autonomy level"; it's a **matrix**.

## The five rungs — mechanics, not labels

### Rung 1 — SHADOW
- **What runs:** the agent processes live (or replayed historical) inputs; its output is **hidden** — never shown to a user, never acted on.
- **The human:** does the job normally, unaware or unaffected.
- **The point:** collect eval data at the *real* input distribution and compare the agent's would-be decisions against actual human decisions, at scale, at zero risk. This is the cheapest, safest way to grow your golden set and get an honest accuracy read *before any exposure.*
- **Watch:** agreement rate with humans; *where* and *why* it disagrees (the disagreements are gold — they're either agent errors or inconsistent humans).
- **Failure modes:** shadowing forever (analysis paralysis); shadowing on unrepresentative traffic; never instrumenting the comparison so you learn nothing.

### Rung 2 — SUGGEST (copilot)
- **What runs:** agent drafts; human reviews, edits, approves **100%** of outputs.
- **The human:** is both the safety net *and the labeler.* Every edit is a correction signal — this is your moat fuel and your eval-growth flywheel.
- **The point:** capture value (faster drafting) at near-zero risk while the correction stream trains your eval and builds the case for promotion.
- **Watch:** **edit rate** and **edit distance** — how much humans change the output. Trending down = trust building. This is your primary promotion signal off Rung 2.
- **UI is decisive here.** A bad review surface produces one of two failures: *automation complacency* (humans rubber-stamp without reading → unsafe) or *low adoption* (humans find it slower than DIY → ignored). Mitigate with inline citations, confidence flags, diff views, "why I suggested this" rationale. Adoption is a design problem, not a training problem.

### Rung 3 — ASSIST (segmented autonomy)
- **What runs:** the agent **auto-handles the clear/easy segment** and **escalates the rest** to a human.
- **The mechanism that makes or breaks this rung: confidence-based routing / abstention.** The agent (or a routing layer) must reliably know what it doesn't know. Raw LLM confidence is poorly calibrated, so you engineer it:
  - a classifier/router on top of the agent,
  - **self-consistency** (sample N times; route to human if they disagree),
  - **retrieval-coverage checks** (did we find authoritative grounding? if not, escalate),
  - explicit **abstention** ("I'm not sure" is a valid, rewarded output),
  - business-rule complexity flags (VIP, high dollar, edge case → always human).
- **The dial:** the escalation threshold. Raise it → fewer auto-handled cases but higher precision on those you do. Tune it to **the cost of being wrong** on that segment.
- **Watch:** precision on the auto-handled segment; escalation rate; what's leaking through that shouldn't.

### Rung 4 — ACT-WITH-LIMITS
- **What runs:** the agent takes **real action within hard bounds** (dollar caps, allow-lists, policy constraints). The human shifts from **pre-approving every action** to **spot-checking a sample after the fact.**
- **The big trust jump** is exactly this shift: pre-approval (Rung 3) → post-hoc audit (Rung 4). It only works when the action is reversible-enough or bounded-enough that an occasional error is *tolerable and detectable.*
- **The dial:** the spot-check sampling rate (e.g., audit 10% of actions, weighted toward higher-risk ones). The sample *is* online eval.
- **Watch:** error rate found in audit; near-miss/cap-hit frequency; reversal/complaint rate.

### Rung 5 — AUTOPILOT
- **What runs:** full autonomy on a **defined, bounded scope**, continuously monitored, with a **kill switch.**
- **Reserved for:** reversible, low-blast-radius, well-evaluated, stable-distribution scopes only. "Autopilot" never means unwatched — it means continuous online eval + anomaly detection + an instant rollback.
- **Watch:** the live outcome metric + drift signals; any anomaly auto-demotes (see below).

## Promotion criteria — the governance core

You climb a rung **only** when pre-agreed evidence clears a bar. Define this **before deploying**, so it can't be renegotiated under launch-pressure later. A complete promotion gate specifies:

1. **Metric(s) + threshold** — e.g., *determination accuracy ≥ 96% AND citation faithfulness ≥ 98% AND edit rate ≤ 10% AND zero critical-safety violations.*
2. **Sample size / duration** — enough for statistical confidence (don't promote on 20 cases; use a rolling window of hundreds per segment).
3. **The segment it applies to** — promote the *easy* segment first; the hard segment stays a rung lower.
4. **Sign-off** — named owner (governance forum / clinical lead / risk owner).
5. **The rollback trigger** — defined at the same time (below).

## Demotion & circuit breakers — agents don't only climb

The safety counterpart that makes climbing defensible. Define **automatic demotion**:
- live accuracy drops below threshold over a window → demote to the rung that requires human approval,
- a critical incident occurs → demote + halt + alert,
- input drift detected (new case-type, distribution shift) → demote until re-evaluated,
- an unevaluated case-type spikes in volume → route to human.

Plus a **manual kill switch** for any consequential agent. "What happens when it's wrong?" must have a one-click answer.

## The Autonomy Matrix (your signature artifact)

A grid of **actions × segments**, each cell carrying a rung, a gate, and a cap. This single artifact replaces a hundred words of hand-waving and is a superb exec slide.

**Prior auth — illustrative matrix:**

| Action ↓ / Segment → | Clearly meets criteria | Borderline / complex | High-risk / appeal |
|---|---|---|---|
| Extract & structure data | R5 Autopilot | R5 Autopilot | R4 + audit |
| Recommend determination | R4 act-with-limits | R3 assist (escalate) | R2 suggest |
| **Issue determination / sign** | **R4 (auto-approve only)** ✱ | **R2 — clinician signs** | **R2 — clinician signs** |
| Notify provider/member | R5 Autopilot | R5 Autopilot | R5 Autopilot |

✱ *Hard ceiling: a **denial** is never autonomous; only clear auto-approvals can reach R4, and that's a regulatory/legal decision, not an engineering one.*

**Retail post-purchase — illustrative matrix:**

| Action ↓ / Segment → | WISMO / simple | Return within policy | Out-of-policy / VIP / upset |
|---|---|---|---|
| Look up & explain | R5 Autopilot | R5 Autopilot | R4 + audit |
| Initiate return label | R5 Autopilot | R4 (within rules) | R2 suggest |
| **Issue refund** | n/a | **R4 ≤ $X cap** | **R2 — human approves** |
| Make goodwill gesture | R4 ≤ small cap | R4 ≤ cap | R3 (escalate large) |

## The economics link (and why the ladder *is* the value story)

Human-in-the-loop ratio (HITL%) — the share of cases needing human time — **falls as you climb**, and that's the dollars:

| Rung | HITL% | What the human does |
|---|---|---|
| 2 Suggest | ~100% | reviews/approves everything |
| 3 Assist | (1 − auto-handled %) | handles only escalations |
| 4 Act-with-limits | spot-check sample % | audits a sample |
| 5 Autopilot | ~0% (monitoring only) | watches dashboards |

ROI improves *along the climb.* Plot HITL% (and net value/case) by rung — that curve is your value-realization narrative and your funding argument in one chart.

## Maps to your consulting / PM world
- **Each rung = a fundable SOW milestone** with an explicit exit criterion. This de-risks the *sale* as much as the system — clients buy "prove it in shadow, then we earn the next rung" far more easily than "trust the autonomous agent."
- The **matrix** is the safety slide execs and risk committees actually understand.
- The **promotion gate + demotion logic** is your AI governance deliverable.

## Anti-patterns
One global autonomy setting · promoting on vanity metrics · no demotion/circuit-breaker logic · no kill switch · climbing before the eval infra exists · raw LLM confidence treated as calibrated · never leaving shadow.

---

### Reusable template — Autonomy Promotion Request

```
USE CASE / ACTION / SEGMENT:   ____ (which cell of the matrix)
CURRENT RUNG → REQUESTED RUNG: ____ → ____
EVIDENCE WINDOW:               dates ____, N = ____ cases
METRICS vs. GATE:
   • Accuracy/success:   ____  (gate: ____ )  PASS/FAIL
   • Faithfulness/quality: ____ (gate: ____ ) PASS/FAIL
   • Safety violations:  ____  (gate: 0 critical) PASS/FAIL
   • Edit rate / escalation rate: ____
HUMAN BASELINE COMPARISON:     agent ____ vs human ____
ECONOMICS:                     HITL% ____→____, net value/case ____
ROLLBACK TRIGGER (set now):    demote to ____ if ____
RESIDUAL RISKS & MITIGATIONS:  ____
SIGN-OFF:                      product ____ | risk/clinical ____ | date ____
```

---
---

# PART 2 — EVAL & ECONOMICS (deep)

This is the engine room and the rarest skill in the field. Build it **before** you build the agent — you can't gate, ship, trust, or price what you can't measure.

## 2A — EVALUATION

### 1. The golden dataset — your crown jewel
- **Source it** from the Phase-2 ground-truth audit: historical cases with known-good outcomes (resolved tickets; past determinations with rationale).
- **Stratify it.** It must mirror the real input distribution *and* deliberately over-sample edge cases, hard cases, and known failure modes. A golden set that's all easy cases yields a flattering, useless number that collapses in production.
- **Size it** for statistical confidence at your decision thresholds — hundreds per important segment, not dozens. You're going to make promotion decisions on these numbers.
- **The labeling problem.** When expert humans disagree (low inter-rater reliability), there is no single ground truth. *Measure the human disagreement rate first* — it's the ceiling on achievable "accuracy" and a finding worth reporting on its own. Use senior-reviewer gold, multiple labelers, and adjudication.
- **Keep it alive.** Every production failure and every Rung-2 human correction flows back in. The dataset compounds — this is the flywheel and a real moat.

### 2. The metric tree — measure what the job is
Pick metrics that match the outcome, layered:

| Layer | Examples | Question it answers |
|---|---|---|
| **Outcome** | task success, resolution rate, determination correctness | Did it achieve the goal? |
| **Quality / faithfulness** | grounded-in-sources, citation accuracy, hallucination rate, expert-acceptability | Is it right *and* for the right reasons? |
| **Safety** | guardrail-violation rate, non-compliant/harmful rate, PII leakage | Did it cross a line? |
| **Operational** | latency, cost/task, escalation rate, loop count | Can it run at scale affordably? |

> **Faithfulness ≠ correctness.** "Grounded in the retrieved source" and "actually right" are different failures. Measure both. And for any RAG system, **separate retrieval quality from generation quality** — did we *fetch* the right context, vs. did the model *use* it correctly? Bundling them hides which half is broken.

### 3. Component vs. end-to-end eval
Eval the **router, the retrieval, the reasoning, and the tool-use separately**, plus end-to-end. Trace every step. When the end-to-end output is wrong you need to localize *which component* failed — otherwise you're debugging blind and tuning the wrong thing.

### 4. LLM-as-judge — the scaling unlock and its traps
- **Why:** human eval is the gold standard but doesn't scale to every commit and every production sample. An LLM judge scoring outputs against a rubric does.
- **How:** prefer **pairwise** comparison (A vs. B is more reliable than absolute 1–10 scoring); supply a **reference answer** and **specific, behavioral rubric criteria**; ask the judge to reason *then* score.
- **You must validate the judge.** Correlate its scores against human ratings on a sample *before* trusting it, and re-validate periodically. An unvalidated judge is just a second opinion of unknown quality.
- **Known biases to neutralize:** *position bias* (favors the first/second option → randomize order), *verbosity bias* (favors longer answers → control for length), *self-preference* (favors its own model family → consider a different judge model), *leniency.* A vague "rate the quality" prompt amplifies all of them; a tight rubric with references suppresses them.

### 5. Offline → online → continuous
- **Offline:** golden set, pre-ship, **gating CI** (below).
- **Shadow:** live inputs, agent output hidden, measured against humans — *this is Rung 1.* Eval and the Autonomy Ladder meet here.
- **Online A/B:** agent vs. human baseline / vs. previous version, on the **real outcome metric** (turnaround, deflection, CSAT, edit rate).
- **Continuous:** monitor live; sample for human audit — *Rung-4 spot-checks are online eval.* The same activity that operates the ladder also feeds the eval.

### 6. Eval in CI / regression testing
Every prompt, model, or tool change **re-runs the golden set automatically and blocks deploys that regress.** Prompt tweaks silently break things that worked — this is the guardrail against that. Maintain a **regression suite of past failures** that must never recur; each production incident adds a permanent test.

### 7. Drift detection
The world moves: new product lines, new policies, seasonality, model deprecations/updates. Monitor **input distribution** + **output metrics**; a shift triggers re-evaluation and, per Part 1, can auto-demote the agent's rung until it's re-validated.

---

## 2B — ECONOMICS

### 1. Cost per task — the build-up
```
Cost/task = Σ over steps [ (input_tokens × in_rate) + (output_tokens × out_rate) ]
            + tool / external-API costs
            + infra / orchestration overhead
```
The non-obvious part: **multi-step agents grow cost superlinearly if naive** — each loop re-sends the accumulated context, so the context (and cost) snowballs across steps. Levers:
- **prompt caching** — reuse the static system/context portion,
- **retrieval instead of context-stuffing** — fetch the relevant chunk, don't paste the manual,
- **model routing / portfolio** — cheap/fast model for routing, extraction, and easy steps; the strong model *only* for the hard reasoning step,
- **step/loop caps and output-length limits,**
- **distilled small models** for narrow, high-volume steps.

### 2. Cost per *successful* task — the honest number
```
Cost per successful task = (cost per task) ÷ (success rate)
```
A cheap agent at 60% success that dumps 40% of cases (plus its own wasted spend) onto humans is *expensive.* This reframes "which model?": the pricier model with a higher success rate is often **cheaper per successful task.** Always quote this number, not raw cost/task.

### 3. The fully-loaded value equation
```
Net value / case = value created (or human cost displaced)
                   − agent run cost
                   − human-in-loop cost
                   − failure / rework cost

   where  HITL cost = HITL% × human minutes × loaded hourly rate
          (and HITL% falls as you climb the Autonomy Ladder)
```
Multiply by volume → program value. Subtract amortized build + run → ROI.

### 4. TCO — what business cases forget
build (once) **+** eval infrastructure (ongoing) **+** model/inference (per-volume) **+** monitoring/observability **+** governance/compliance **+** change management **+** maintenance & re-eval. **The post-launch run cost frequently exceeds the build cost.** Name every line; a business case that stops at "build" is the one that gets clawed back at the first QBR.

### 5. Sensitivity analysis
Every case turns on 2–3 assumptions — usually **success rate, deflection/automation rate, volume, HITL%.** Present the business case across a **range**, not a point. CFOs trust a band with a stated base/low/high; a single confident number reads as naïve.

### 6. Worked examples *(illustrative — rates are assumed and configurable, not market quotes)*

**Retail post-purchase CS** *(high volume, lower per-case value):*

| Assumption | Value |
|---|---|
| Addressable contacts / yr | 600,000 |
| Human cost / contact (loaded handle time) | $5.00 |
| Agent cost / task | $0.08 |
| Resolution (success) rate, auto-handled segment | 80% |

- **Cost per successful task** = $0.08 ÷ 0.80 = **$0.10**
- **Net value / auto-resolved contact** ≈ $5.00 − $0.10 ≈ **$4.90**
- Gross annual value (at Rung 3–4, 80% of addressable auto-handled) ≈ 600,000 × 0.80 × $4.90 ≈ **$2.35M/yr** (before build + run amortization)
- **Note:** here the $0.08 token cost is ~1.6% of the $5 saved — meaningful but not dominant; the lever that matters most is the **automation rate** and keeping success high.

**Prior auth** *(low volume, high per-case value):*

| Assumption | Value |
|---|---|
| PA requests / yr (one service line) | 200,000 |
| Clinician review time, manual | 20 min |
| Clinician review time with agent draft (Rung 2/3) | 8 min |
| Loaded clinician cost | $2 / min |
| Agent cost / task | $0.50 |
| Acceptable-draft (success) rate | 90% |

- **Cost per successful task** = $0.50 ÷ 0.90 ≈ **$0.56**
- **Clinician time saved / case** (drafting assist) = (20 − 8) min × $2 = **$24**, dwarfing the $0.56 run cost
- On the **auto-approvable segment** (say 30% reach Rung 4) you save closer to the full 20 min × $2 = $40/case
- Plus **non-dollar value**: turnaround days → hours, audit-defensibility, provider/member satisfaction — often the real reason the project is funded

> **The teaching contrast:** in retail, token cost is a *visible* slice of a small per-case value, so cost-engineering (routing, caching) matters. In prior auth, token cost is a *rounding error* against expensive clinician time, so **success rate and HITL reduction dominate the economics** — spend on the better model and the eval, not on shaving cents. Knowing which regime you're in tells you where to spend your engineering effort.

### 7. Value realization & the baseline discipline
**Baseline the metric before you launch** — you cannot prove a lift you never measured pre-deployment. Instrument the outcome, attribute it (A/B vs. human baseline), and report it on the QBR cadence. The baseline-then-measure discipline is what converts "the agent feels good" into a defensible, fundable number.

---

## The closed loop (the whole point, in one picture)

```
   ┌──────────────────────────────────────────────────────────────┐
   │                                                                │
   │   GOLDEN SET + METRICS  ──►  evidence clears the GATE          │
   │        ▲                          │                            │
   │        │                          ▼                            │
   │   human corrections        climb the AUTONOMY LADDER           │
   │   & production failures           │                            │
   │   feed back in                    ▼                            │
   │        ▲                   HITL% drops                         │
   │        │                          │                            │
   │        │                          ▼                            │
   │        └────────  ECONOMICS improve → fund use case N+1 ◄──────┘
   │                                                                │
   └──────────────────────────────────────────────────────────────┘
```

Eval generates the evidence → the evidence is the ladder's gate → climbing drops human-in-the-loop cost → the improved economics fund the next use case, whose corrections feed back into eval. Build this loop once and every subsequent use case is cheaper, safer, and faster — which is exactly the *platform-compounds* logic from the strategy phase.

---

## Maps to your consulting / PM world
- **Eval plan = the benefits-realization plan made real.** Walking into a kickoff with a measurement plan (golden set, metrics, baseline, judge-validation) puts you two levels above teams that demo first and measure never.
- **Cost-per-successful-task + sensitivity range = the business case a CFO signs.**
- **The closed loop = your program narrative** — why phase 1 funds phase 2.

## Anti-patterns
No baseline (can't prove value) · vanity metrics (containment % that hides angry re-contacts) · unvalidated LLM judge · golden set of only easy cases · quoting cost/task instead of cost-per-*successful*-task · point-estimate business cases · forgetting run-cost/TCO · treating eval as a one-time gate instead of a continuous, regression-protected system.
