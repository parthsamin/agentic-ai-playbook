import { Link } from 'react-router-dom';
import { Callout, Table } from '../../components/UI';

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

      <h2 id="decomp">The decomposition output (prior auth)</h2>
      <Table
        head={['Step', 'Today', 'Spectrum fit', 'Notes']}
        rows={[
          ['Receive request (fax/portal/EDI)', 'Intake clerk', 'L0 deterministic', 'OCR/parse in code'],
          ['Extract clinical data', 'Nurse reads', 'L2 extraction', 'Unstructured → structured'],
          ['Check if review even needed', 'Nurse', 'L1/L3 classify', 'Auto-approve clear cases'],
          ['Match against medical policy', 'Nurse judgment', 'L4 agent', 'Open-ended reasoning + retrieval'],
          ['Draft determination + citations', 'Nurse', 'L4 agent', 'The high-value step'],
          ['Approve / sign', 'Physician', 'Human — never automated', 'Regulatory + liability'],
          ['Notify provider/member', 'System', 'L0', 'Templated'],
        ]}
      />

      <h2 id="decomp-retail">Retail CS decomposition</h2>
      <Table
        head={['Step', 'Spectrum fit']}
        rows={[
          ['Classify intent (WISMO / return / complaint)', 'L1/L3'],
          ['Look up order, shipment, policy', 'L0 tools'],
          ['Resolve simple WISMO', 'L3 workflow'],
          ['Judgment case (out-of-policy, upset, VIP)', 'L4 agent within bounds'],
          ['Issue refund > threshold', 'Human approval or hard cap'],
        ]}
      />

      <Callout kind="tip" title="Do it for your own process">
        Build your decomposition in the <Link to="/tools">Decomposition Table</Link> tool — add steps, tag each
        with a spectrum level, and it auto-summarizes which steps are agent-suitable.
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
  { id: 'decomp', label: 'Decomposition (PA)' },
  { id: 'decomp-retail', label: 'Decomposition (retail)' },
  { id: 'worked-example', label: 'Worked example' },
];
