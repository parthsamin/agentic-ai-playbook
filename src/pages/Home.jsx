import { Link } from 'react-router-dom';
import { PHASES } from '../data/phases';
import { useProgress } from '../hooks/useProgress';
import SystemMap from '../components/SystemMap';

export default function Home() {
  const { state, pct } = useProgress();

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero fade-up">
        <div className="hero-glow" />
        <div style={{ position: 'relative' }}>
          <span className="hero-badge">◆ Built for product managers &amp; consultants</span>
          <h1>Build agentic AI solutions that survive contact with production.</h1>
          <p className="lead">
            A repeatable, 8-phase engagement methodology made for <strong>product managers and consultants</strong> —
            the people who have to frame the problem, sell the strategy, design the system, de-risk it, and ship it.
            Every phase maps to the deliverables you already produce, plus interactive tools to do the work for real.
          </p>
          <div className="cta-row">
            <Link to="/phase/orient" className="btn btn-primary">Start with Phase 0 →</Link>
            <Link to="/journey" className="btn btn-ghost" style={{ background: 'rgba(255,255,255,.12)', color: '#fff', borderColor: 'rgba(255,255,255,.25)' }}>
              See the full journey
            </Link>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="stat-strip">
        <div className="stat card card-hover"><div className="big gradient-text">8</div><div className="lbl">phases, run on any problem</div></div>
        <div className="stat card card-hover"><div className="big gradient-text">5</div><div className="lbl">autonomy rungs to climb</div></div>
        <div className="stat card card-hover"><div className="big gradient-text">6</div><div className="lbl">fillable workshop tools</div></div>
        <div className="stat card card-hover"><div className="big gradient-text">{pct}%</div><div className="lbl">your progress</div></div>
      </section>

      {/* HOW THIS GUIDE IS ORGANIZED */}
      <section style={{ margin: '40px 0' }}>
        <div className="eyebrow">How this guide is organized</div>
        <h2 style={{ fontSize: 28, margin: '8px 0 12px' }}>Four surfaces, one methodology</h2>
        <p style={{ color: 'var(--ink-soft)', maxWidth: '72ch' }}>
          This isn’t theory about AI — it’s a methodology a <strong>PM or consultant</strong> runs end-to-end.
          Here’s how the pieces fit, and the path to take if you’re new.
        </p>

        <div className="grid grid-2" style={{ marginTop: 18 }}>
          {[
            { n: '1', t: 'The 8 Phases', d: 'Learn & design. Each phase teaches the mental models, gives you a 4-move recipe, and shows a worked example.', to: '/phase/orient', cta: 'Start at Phase 0', c: 'var(--p1)' },
            { n: '2', t: 'Worked Cases', d: 'See it end-to-end. Two real cases played from a blank page to a finished Decision Dossier.', to: '/cases', cta: 'Play a case', c: 'var(--p2)' },
            { n: '3', t: 'Workshop Tools', d: 'Do it for your own problem. Fillable canvas, decomposition, autonomy matrix, risk register & cost calculator — saved on your device.', to: '/tools', cta: 'Open the tools', c: 'var(--p3)' },
            { n: '4', t: 'Reference', d: 'Go deeper or look things up: the Autonomy & Eval deep dive, the Pocket Toolkit, and a plain-language Glossary.', to: '/glossary', cta: 'Open the glossary', c: 'var(--p7)' },
          ].map((s) => (
            <div className="card card-hover" key={s.n} style={{ borderLeft: `4px solid ${s.c}`, display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ margin: 0, fontSize: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 24, height: 24, borderRadius: 7, background: s.c, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 13, fontFamily: 'var(--font-mono)' }}>{s.n}</span>
                {s.t}
              </h4>
              <p style={{ color: 'var(--ink-soft)', fontSize: 13.5, margin: '8px 0 12px' }}>{s.d}</p>
              <Link to={s.to} style={{ marginTop: 'auto', fontSize: 13.5, fontWeight: 600 }}>{s.cta} →</Link>
            </div>
          ))}
        </div>

        <div className="callout callout-tip" style={{ marginTop: 18 }}>
          <span className="ic">🧭</span>
          <div>
            <h4>Recommended path</h4>
            <p>New here? Read <strong>Phase 0</strong> to get the core instinct → skim Phases 1–8 in order → then{' '}
            <Link to="/cases">play a case end-to-end</Link> to see it all connect → finally, open the{' '}
            <Link to="/tools">tools</Link> and run your own problem through them.</p>
          </div>
        </div>
      </section>

      {/* SYSTEM MAP */}
      <section style={{ margin: '40px 0' }}>
        <div className="eyebrow">The whole picture</div>
        <h2 style={{ fontSize: 28, margin: '8px 0 12px' }}>How it all connects</h2>
        <SystemMap />
      </section>

      {/* THE TWO CASES */}
      <section style={{ margin: '40px 0' }}>
        <div className="eyebrow">Two running cases</div>
        <h2 style={{ fontSize: 28, margin: '8px 0 12px' }}>Concrete throughout</h2>
        <p style={{ color: 'var(--ink-soft)', maxWidth: '70ch' }}>
          Every phase is illustrated on two deliberately different problems, so the abstract becomes concrete.
        </p>

        <div className="case-grid">
          <div className="case-card health">
            <h4>🏥 Healthcare case <span className="chip" style={{ background: 'rgba(75,98,255,.15)', color: '#4b62ff' }}>governance</span></h4>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14.5 }}>
              A health plan automating <strong>prior-authorization triage and drafting</strong>.
              High stakes, low volume, heavily regulated. Teaches governance, accuracy, and human-in-the-loop.
            </p>
          </div>
          <div className="case-card retail">
            <h4>🛍️ Retail case <span className="chip" style={{ background: 'rgba(15,201,181,.16)', color: '#0b9d8d' }}>autonomy</span></h4>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14.5 }}>
              A retailer building a <strong>post-purchase customer-service agent</strong> (returns, “where’s my order”, exchanges).
              High volume, real action risk. Teaches autonomy, blast radius, and unit economics.
            </p>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <Link to="/cases" className="btn btn-ghost btn-sm">▶ Play both cases end-to-end →</Link>
        </div>
      </section>

      {/* THE SPINE */}
      <section style={{ margin: '48px 0 20px' }}>
        <div className="eyebrow">The spine</div>
        <h2 style={{ fontSize: 28, margin: '8px 0 18px' }}>Eight phases, from orient to scale</h2>
        <div className="spine">
          {PHASES.map((p, i) => (
            <Link key={p.slug} to={`/phase/${p.slug}`} className="spine-node">
              <div className="spine-rail">
                <div className="spine-bubble" style={{ background: p.accent }}>
                  {state[p.slug] ? '✓' : p.id}
                </div>
                {i < PHASES.length - 1 && <div className="spine-line" />}
              </div>
              <div className="spine-card">
                <h4>
                  <span className="verb" style={{ color: p.accent }}>{p.verb}</span>
                  {p.title}
                  {!p.built && <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>coming soon</span>}
                </h4>
                <p>{p.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SKILL PROGRESSION */}
      <section style={{ margin: '40px 0' }}>
        <div className="eyebrow">The skill progression</div>
        <h2 style={{ fontSize: 28, margin: '8px 0 18px' }}>From intermediate to expert</h2>
        <div className="grid grid-3">
          {[
            { t: 'Intermediate', d: 'You can execute a phase when handed a clear brief.', c: 'var(--p1)' },
            { t: 'Advanced', d: 'You choose the right framework for the situation and produce the artifact unprompted.', c: 'var(--p5)' },
            { t: 'Expert', d: 'You know which phases to compress or skip, and can tell a client “don’t build an agent here.”', c: 'var(--p7)' },
          ].map((x) => (
            <div key={x.t} className="card card-hover">
              <div style={{ width: 38, height: 6, borderRadius: 999, background: x.c, marginBottom: 12 }} />
              <h3 style={{ fontSize: 18 }}>{x.t}</h3>
              <p style={{ color: 'var(--ink-soft)', fontSize: 14, margin: '8px 0 0' }}>{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card" style={{ background: 'var(--grad-brand)', color: '#fff', textAlign: 'center', padding: 40, marginTop: 30 }}>
        <h2 style={{ color: '#fff', fontSize: 26 }}>Ready to run your first phase?</h2>
        <p style={{ color: 'rgba(255,255,255,.88)', maxWidth: '54ch', margin: '10px auto 22px' }}>
          Start at Phase 0 to internalize the one instinct that separates seniors from beginners — or jump straight to the workshop tools.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/phase/orient" className="btn" style={{ background: '#fff', color: 'var(--brand)' }}>Begin Phase 0</Link>
          <Link to="/tools" className="btn btn-ghost" style={{ background: 'rgba(255,255,255,.14)', color: '#fff', borderColor: 'rgba(255,255,255,.3)' }}>Open workshop tools</Link>
        </div>
      </section>
    </div>
  );
}
