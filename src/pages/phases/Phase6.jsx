import { Link } from 'react-router-dom';
import { Callout, Table } from '../../components/UI';
import { AutonomyLadder } from '../../components/Visuals';

export default function Phase6() {
  return (
    <>
      <Callout kind="key" title="Sequence by risk-adjusted value, gated by maturity">
        Don’t sequence by what’s exciting. Sequence by <strong>value ÷ (risk × effort)</strong>, and gate each
        step so autonomy and scope expand only as evidence accumulates.
      </Callout>

      <h2 id="ladder">The Autonomy Ladder — your signature roadmap device</h2>
      <p>
        The most powerful way to phase an agentic roadmap is to hold the use case constant and
        <strong> climb autonomy</strong> as trust is earned. You only climb a rung when eval metrics
        (<Link to="/phase/prove">Phase 7</Link>) clear a pre-agreed bar:
      </p>
      <AutonomyLadder />
      <Callout kind="tip" title="Why it sells">
        This is crawl-walk-run made concrete — it’s how you sell safety to risk-averse clients, and it doubles as
        the value-realization story. Each rung is a fundable SOW milestone with an exit criterion. The full
        mechanics, promotion gates, and demotion logic live in the{' '}
        <Link to="/deep/autonomy-eval">Autonomy &amp; Eval deep dive</Link>.
      </Callout>

      <h2 id="horizons">Roadmap horizons</h2>
      <div className="grid grid-3">
        {[
          { t: 'Now · 0–3 mo', d: 'Lighthouse to Rung 1–2; stand up eval harness and observability; prove the metric.', c: 'var(--p7)' },
          { t: 'Next · 3–9 mo', d: 'Climb the lighthouse to Rung 3–4; build reusable platform components; add use case #2.', c: 'var(--p6)' },
          { t: 'Later · 9–18 mo', d: 'Autopilot where safe; portfolio expansion on the platform; self-serve enablement for other teams.', c: 'var(--p1)' },
        ].map((x) => (
          <div className="card card-hover" key={x.t} style={{ borderTop: `4px solid ${x.c}` }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: x.c, fontWeight: 600 }}>{x.t}</div>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--ink-soft)' }}>{x.d}</p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 16 }}>
        Tie each milestone to an <strong>OKR</strong> and a money number. Roadmaps that don’t connect to value
        get cut.
      </p>

      <Callout kind="map" title="For product managers & consultants">
        The roadmap, OKRs, release plan, and stage-gate governance. The Autonomy Ladder maps cleanly to phased
        SOWs / funding gates — each rung is a fundable milestone with an exit criterion.
      </Callout>
      <Callout kind="trap" title="Traps">
        Committing to autopilot dates before eval proves the rung · a roadmap of features instead of value
        milestones · no eval gate between rungs (the #1 way agents reach production unsafe).
      </Callout>
    </>
  );
}

Phase6.toc = [
  { id: 'ladder', label: 'The Autonomy Ladder' },
  { id: 'horizons', label: 'Roadmap horizons' },
  { id: 'worked-example', label: 'Worked example' },
];
