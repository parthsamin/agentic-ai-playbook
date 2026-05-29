# The Agentic AI Playbook

An interactive, standalone playbook for building agentic AI solutions — an operating model for the
consultant and technical PM who has to frame the problem, sell the strategy, design the system, de-risk it,
and ship it.

Built with React + Vite. Single-page app, fully client-side, no backend.

## What's inside

- **8-phase methodology, all built** — Orient → Frame → Map → Architect → De-risk → Strategize → Sequence →
  Prove → Scale. Each phase opens with a "How to run this phase in 4 moves" play-card (Ask → Fill → Produce →
  Decide) and closes with a concrete worked example for both cases.
- **Two worked cases, played end-to-end** — a healthcare prior-authorization agent and a retail post-purchase
  CS agent. A "Meet the cases" setup page, then a step-by-step Playthrough for each that runs all nine stages
  (questions → filled artifact → decision → handoff) to a final **Decision Dossier** a PM can execute from.
- **Autonomy & Eval deep dive** — the autonomy ladder, promotion/demotion gates, the autonomy matrix, the
  full eval stack, and the unit-economics worked examples.
- **Three fillable workshop tools** — the Opportunity Canvas, the Decomposition Table, and the Autonomy Matrix
  builder, each loadable with a worked case as a starting template. Everything you type is saved to your
  browser's local storage and can be copied or exported.
- **Pocket toolkit** — kickoff diagnostics, the one-sentence test per phase, anti-patterns, and a 90-day plan.
- **Progress tracking** — mark phases complete; progress persists on your device.

## Run locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build → ./dist
npm run preview  # preview the production build
```

## Notes

- Routing uses `HashRouter`, and `vite.config.js` sets `base: './'`, so the production build works when served
  from any path — including a GitHub Pages project sub-path — without extra configuration.
- Deployment is intentionally left for you to wire up (e.g. push `dist/` to a `gh-pages` branch, or add a
  GitHub Actions workflow).

## Source

The content is distilled from `Agentic-AI-Solution-Playbook.md` and `Autonomy-and-Eval-Deep-Module.md`
(kept in this folder for reference).
