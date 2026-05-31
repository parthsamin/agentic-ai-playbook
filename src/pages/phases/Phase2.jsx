import { Link } from 'react-router-dom';
import { Callout } from '../../components/UI';

export default function Phase2() {
  return (
    <>
      <Callout kind="key" title="The core technique: Job → Tasks → Steps → Decomposition">
        Don’t “AI-ify a process.” Decompose it, then classify each step against the Phase-0 spectrum. Most
        processes are a <strong>blend</strong> — the design win is putting deterministic steps in code,
        predictions in ML, and only the genuinely-ambiguous steps in an LLM/agent.
      </Callout>

      <p>For each step, capture these seven attributes. This table is your single most reusable artifact — it feeds architecture (3), risk (4), and the business case (7):</p>
      <div className="pill-row">
        {['inputs', 'decision / output', 'who does it today', 'time', 'error cost', 'data availability', 'reversibility'].map((x) => (
          <span className="tag tag-accent" key={x} style={{ '--accent': 'var(--p2)' }}>{x}</span>
        ))}
      </div>

      <h2 id="instruments">Three discovery instruments</h2>
      <div className="grid grid-3">
        {[
          { t: 'Process mining / current-state map', d: 'The as-is swimlane. Mark where time and rework concentrate.', c: 'var(--p2)' },
          { t: 'Data & systems inventory', d: 'For each input: does it exist, where, structured?, API-accessible?, quality, PII/PHI flags. No data, no agent.', c: 'var(--p1)' },
          { t: 'Ground-truth audit', d: 'Can you get labeled “correct” examples? Without them you cannot evaluate (Phase 7).', c: 'var(--p7)' },
        ].map((x) => (
          <div className="card card-hover" key={x.t}>
            <div style={{ width: 38, height: 6, borderRadius: 999, background: x.c, marginBottom: 12 }} />
            <h4 style={{ margin: 0 }}>{x.t}</h4>
            <p style={{ margin: '8px 0 0', fontSize: 13.5, color: 'var(--ink-soft)' }}>{x.d}</p>
          </div>
        ))}
      </div>

      <h2 id="decomp">How to actually map a workflow</h2>
      <p>Seven concrete moves take you from “we have a process” to a decision-ready decomposition:</p>
      <ol className="howto">
        <li>
          <strong>Walk the real process, not the official one.</strong> Sit with the people doing the work and
          trace one case end to end. Capture the shadow workarounds — that’s where the rework (and the truth) lives.
        </li>
        <li>
          <strong>Break it into discrete steps.</strong> Job → Tasks → Steps, one row per step. Resist lumping;
          a step you can’t classify is usually two steps.
        </li>
        <li>
          <strong>Capture the seven attributes per step</strong> (inputs · decision/output · who does it today ·
          time · error cost · data availability · reversibility). These are the facts every later phase needs.
        </li>
        <li>
          <strong>Classify each step on the spectrum</strong> (L0–L5 / human). Be honest — most steps are L0–L3;
          only genuinely ambiguous reasoning over language is L4+. If you’re tagging everything L4, you’re overusing agents.
        </li>
        <li>
          <strong>Flag data-readiness and ground truth.</strong> For every input the agent needs: does it exist,
          is it accessible, is it clean? And can you get labeled “correct” examples? <em>No data → no agent; no
          ground truth → no eval.</em> This is where feasibility is really decided.
        </li>
        <li>
          <strong>Read off the blend.</strong> Deterministic → code/RPA · predictions → ML · ambiguous judgment →
          agent · consequential/regulated → human. The design win is the <em>split</em>, not “AI-ifying” the whole thing.
        </li>
        <li>
          <strong>Hand the table forward.</strong> This one artifact feeds the architecture (Phase 3), the risk
          register (Phase 4), and the business case (Phase 7) — so get it right once.
        </li>
      </ol>

      <Callout kind="tip" title="Do it for your own process">
        Run these moves in the <Link to="/tools">Decomposition Table</Link> tool — add your steps, tag each with a
        spectrum level, and it auto-summarizes which stay code, which are agent-suitable, and which must stay human.
        See both cases fully decomposed in the worked example below.
      </Callout>

      <Callout kind="map" title="For product managers & consultants">
        As-is process mapping, value-stream analysis, the data-readiness assessment. The decomposition table is
        the bridge from “current state” to “future state.”
      </Callout>
      <Callout kind="trap" title="Traps">
        Modeling the <em>official</em> process instead of the real one (shadow workarounds are where the truth
        is) · discovering mid-build that the data isn’t accessible · assuming ground truth exists when human
        decisions were never logged with rationale.
      </Callout>
    </>
  );
}

Phase2.toc = [
  { id: 'instruments', label: 'Discovery instruments' },
  { id: 'decomp', label: 'How to map' },
  { id: 'worked-example', label: 'Worked example' },
];
