import { Link } from 'react-router-dom';
import { PHASES } from '../data/phases';
import './systemmap.css';

// A one-glance map of how the whole methodology connects:
// run the 8 phases → each yields an artifact → they roll into a dossier →
// and the eval→ladder→economics engine compounds across use cases.
export default function SystemMap() {
  return (
    <div className="sysmap">
      <div className="sm-band">
        <div className="sm-band-label">1 · Learn &amp; design — run the phases in order</div>
        <div className="sm-phases">
          {PHASES.map((p, i) => (
            <div className="sm-phase-wrap" key={p.slug}>
              <Link to={`/phase/${p.slug}`} className="sm-phase" style={{ background: p.accent }} title={`${p.title} — ${p.tagline}`}>
                <span className="n">{p.id}</span>
                <span className="t">{p.title}</span>
              </Link>
              {i < PHASES.length - 1 && <span className="sm-arrow">→</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="sm-down">↓ each phase produces one artifact</div>

      <div className="sm-band sm-band-soft">
        <div className="sm-band-label">2 · Produce — artifacts roll up into a Decision Dossier</div>
        <div className="sm-artifacts">
          {['Spectrum verdict', 'Opportunity Canvas', 'Decomposition', 'Architecture + autonomy matrix', 'Risk register', 'Strategy one-pager', 'Roadmap', 'Eval + business case', 'Operating model'].map((a, i) => (
            <span className="sm-art" key={i}>{a}</span>
          ))}
          <span className="sm-art sm-art-final">★ Decision Dossier</span>
        </div>
      </div>

      <div className="sm-down">↓ powered by the engine that compounds</div>

      <div className="sm-band sm-band-engine">
        <div className="sm-band-label" style={{ color: '#fff' }}>3 · The engine — eval gates autonomy, which drops cost, which funds the next use case</div>
        <div className="sm-loop">
          {[
            { t: 'Eval produces evidence', s: 'golden set + metrics' },
            { t: 'Evidence gates autonomy', s: 'a metric clears a bar' },
            { t: 'Climb the ladder', s: 'HITL % drops' },
            { t: 'Economics improve', s: 'funds use case N+1' },
          ].map((x, i) => (
            <div className="sm-loop-step" key={i}>
              <div className="sl-t">{x.t}</div>
              <div className="sl-s">{x.s}</div>
              <span className="sm-loop-arrow">{i < 3 ? '→' : '↺'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
