import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Callout } from '../components/UI';
import {
  DASHBOARD, STATUS_LABEL, BLOCKERS, BLOCKER_CATEGORIES,
  SEVERITY, TRIAGE, TRIAGE_FALLBACK, RESPONSE_LADDER,
} from '../data/operate';
import '../components/operate.css';

export default function Operate() {
  return (
    <div className="page prose">
      <div className="phase-head fade-up">
        <span className="badge" style={{ background: 'var(--p8)' }}>THE RUN LAYER · OPERATE</span>
        <h1>Operate the agent</h1>
        <p className="tagline">The 8 phases get you to production. This is Day 2 — what a PM watches, how blockers are caught early, and what to do when one becomes an incident.</p>
      </div>

      <div className="toc fade-up-2">
        <a href="#dashboard" onClick={scrollTo('dashboard')}>Health dashboard</a>
        <a href="#blockers" onClick={scrollTo('blockers')}>Blocker library</a>
        <a href="#incident" onClick={scrollTo('incident')}>Incident playbook</a>
      </div>

      <Callout kind="key" title="Why this layer exists">
        With agents, <strong>quality degrades silently — no error is thrown.</strong> The system can be “up” while
        producing wrong, costly, or unsafe output. So you manage three pillars at once — <strong>operational</strong>
        (latency, reliability), <strong>economic</strong> (cost), and <strong>quality</strong> (accuracy, safety,
        drift) — plus security and adoption. The job is to watch leading indicators, not wait for complaints.
      </Callout>

      <h2 id="dashboard">The Agent Health Dashboard</h2>
      <p>What a PM glances at every morning. Each tile carries the signal it gives you and <em>when to act</em>. (Statuses here are an illustrative snapshot.)</p>
      {DASHBOARD.map((p) => (
        <div className="dash-pillar" key={p.pillar}>
          <div className="dash-pillar-head">
            <span className="dot" style={{ background: p.color }} />
            <h3>{p.pillar}</h3>
          </div>
          <div className="dash-grid">
            {p.metrics.map((m) => (
              <div className={`dash-tile ${m.status}`} key={m.name}>
                <div className="dash-tile-head">
                  <span className="dt-name">{m.name}</span>
                  <span className={`dash-status ${m.status}`}>{STATUS_LABEL[m.status]}</span>
                </div>
                <div className="dt-signal">{m.signal}</div>
                <div className="dt-act"><b>ACT WHEN ·</b> {m.act}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h2 id="blockers">The Blocker Library</h2>
      <p>The blockers a PM actually hits. Each shows how to <strong>catch it early</strong>, the likely cause, the response, the owner, and which lever it pulls. Filter by type.</p>
      <BlockerLibrary />

      <h2 id="incident">The Incident Response Playbook</h2>
      <p>When a blocker becomes an incident, triage fast and act in order.</p>

      <h3>1 · Classify the severity</h3>
      <div className="sev-table">
        {SEVERITY.map((s) => (
          <div className="sev-row" key={s.level} style={{ borderLeftColor: s.color }}>
            <div><div className="sev-lvl" style={{ color: s.color }}>{s.level}</div></div>
            <div className="sev-def">{s.def}<div className="sev-who">Who: {s.who}</div></div>
            <div className="sev-resp"><b>Response</b>{s.resp}</div>
          </div>
        ))}
      </div>

      <h3>2 · Triage — what kind of problem is it?</h3>
      <div className="triage">
        {TRIAGE.map((t, i) => (
          <div className="triage-row" key={i}>
            <div className="triage-q"><span className="qn">{i + 1}</span>{t.q}</div>
            <div className="triage-then"><span className="arrow">→</span><span>{t.then}</span></div>
          </div>
        ))}
        <div className="triage-fallback">⚠️ {TRIAGE_FALLBACK}</div>
      </div>

      <h3>3 · The response ladder</h3>
      <div className="ladder-steps">
        {RESPONSE_LADDER.map((r, i) => (
          <div className="ladder-step" key={r.step}>
            <div className="ls-n">{i + 1}</div>
            <div>
              <div className="ls-t">{r.step}</div>
              <div className="ls-d">{r.d}</div>
            </div>
          </div>
        ))}
      </div>

      <Callout kind="tip" title="Close the loop">
        Every incident ends the same way: the failing case becomes a <strong>permanent regression test</strong>, so
        it can never recur silently. That’s how the run layer feeds back into the eval system from{' '}
        <Link to="/phase/prove">Phase 7</Link>, and how demotions/promotions tie to the{' '}
        <Link to="/phase/sequence">autonomy ladder</Link>.
      </Callout>

      <Callout kind="map" title="For product managers & consultants">
        This is your run/BAU operating manual — the on-call rotation, the monitoring dashboard, the incident
        runbook, and the governance cadence. It’s the difference between a pilot that works in a demo and a system
        the business trusts to run unattended.
      </Callout>

      <h2 id="sources" style={{ fontSize: 18 }}>Grounded in production practice</h2>
      <ul style={{ fontSize: 13.5 }}>
        <li>The three monitoring pillars (operational · economic · quality) and “quality degrades silently” — <a href="https://www.langchain.com/blog/production-monitoring" target="_blank" rel="noopener noreferrer">LangChain, Agent Observability</a> and <a href="https://www.braintrust.dev/articles/what-is-llm-monitoring" target="_blank" rel="noopener noreferrer">Braintrust, What is LLM monitoring</a>.</li>
        <li>Prompt injection as the #1 production agent vulnerability and the agent attack surfaces — <a href="https://www.lakera.ai/blog/indirect-prompt-injection" target="_blank" rel="noopener noreferrer">Lakera, Indirect Prompt Injection</a>.</li>
      </ul>

      <div className="phase-foot">
        <Link to="/phase/scale">
          <div className="dir">← Comes from</div>
          <div className="ttl">Phase 8 · Scale</div>
        </Link>
        <Link to="/lab" className="next">
          <div className="dir">Practice →</div>
          <div className="ttl">The Case Lab</div>
        </Link>
      </div>
    </div>
  );
}

function scrollTo(id) {
  return (e) => { e.preventDefault(); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
}

function BlockerLibrary() {
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? BLOCKERS : BLOCKERS.filter((b) => b.category === cat);
  return (
    <>
      <div className="blk-filters">
        <button className={`blk-chip ${cat === 'All' ? 'active' : ''}`} onClick={() => setCat('All')}>All ({BLOCKERS.length})</button>
        {BLOCKER_CATEGORIES.map((c) => {
          const n = BLOCKERS.filter((b) => b.category === c).length;
          if (!n) return null;
          return <button key={c} className={`blk-chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>;
        })}
      </div>
      <div className="blk-grid">
        {list.map((b) => (
          <div className="blk-card" key={b.id}>
            <div className="blk-card-head">
              <h4>{b.title}</h4>
              <span className={`blk-sev ${b.severity}`}>{b.severity}</span>
            </div>
            <div className="blk-cat">{b.category}</div>
            <p className="blk-symptom">“{b.symptom}”</p>

            <div className="blk-label">Catch it early</div>
            <div className="blk-ind">{b.indicators.map((x, i) => <span key={i}>{x}</span>)}</div>

            <div className="blk-label">Likely cause</div>
            <p className="blk-cause">{b.cause}</p>

            <div className="blk-label">Response</div>
            <ul className="blk-resp">{b.response.map((x, i) => <li key={i}>{x}</li>)}</ul>

            <div className="blk-foot">
              <span className="tag">Owner: {b.owner}</span>
              <span className="tag tag-accent" style={{ '--accent': 'var(--p8)' }}>Lever: {b.lever}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
