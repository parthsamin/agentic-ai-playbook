import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/tools/tools.css';
import OpportunityCanvas from '../components/tools/OpportunityCanvas';
import DecompositionTable from '../components/tools/DecompositionTable';
import AutonomyMatrix from '../components/tools/AutonomyMatrix';
import RiskRegister from '../components/tools/RiskRegister';
import CostCalculator from '../components/tools/CostCalculator';
import RunBook from '../components/tools/RunBook';

const TABS = [
  { id: 'canvas', icon: '🗂️', label: 'Opportunity Canvas', phaseLabel: 'Phase 1 · Frame', slug: 'frame', feeds: 'Feeds your decomposition (Phase 2).', C: OpportunityCanvas },
  { id: 'decomp', icon: '🪜', label: 'Decomposition Table', phaseLabel: 'Phase 2 · Map', slug: 'map', feeds: 'Feeds the architecture & autonomy choices (Phase 3).', C: DecompositionTable },
  { id: 'matrix', icon: '🎛️', label: 'Autonomy Matrix', phaseLabel: 'Phase 3 · Architect', slug: 'architect', feeds: 'Feeds the risk register (Phase 4) and the roadmap (Phase 6).', C: AutonomyMatrix },
  { id: 'risk', icon: '🛡️', label: 'Risk Register', phaseLabel: 'Phase 4 · De-risk', slug: 'de-risk', feeds: 'Gates each autonomy promotion on the roadmap (Phase 6).', C: RiskRegister },
  { id: 'cost', icon: '🧮', label: 'Cost Calculator', phaseLabel: 'Phase 7 · Prove', slug: 'prove', feeds: 'Becomes the business case in your Decision Dossier.', C: CostCalculator },
  { id: 'runbook', icon: '📓', label: 'Agent Run Book', phaseLabel: 'Run layer · Operate', path: '/operate', feeds: 'The on-call doc ops uses to run the agent every day.', C: RunBook },
];

export default function Tools() {
  const [active, setActive] = useState('canvas');
  const tab = TABS.find((t) => t.id === active);
  const Active = tab.C;
  const phasePath = tab.path || `/phase/${tab.slug}`;

  return (
    <div className="page">
      <div className="eyebrow fade-up">Workshop tools</div>
      <h1 className="fade-up" style={{ fontSize: 40, margin: '8px 0 10px', letterSpacing: '-0.02em' }}>
        Fill them in for your own use case
      </h1>
      <p className="fade-up-2" style={{ color: 'var(--ink-soft)', fontSize: 17, maxWidth: '66ch' }}>
        These are the reusable artifacts an expert walks into engagements with — one per phase that produces a
        deliverable. Everything you type is saved on this device; copy or export it straight into a deck. Load a
        worked case to start from a complete example.
      </p>

      <div className="tool-tabs fade-up-3">
        {TABS.map((t) => (
          <button key={t.id} className={`tool-tab ${active === t.id ? 'active' : ''}`} onClick={() => setActive(t.id)}>
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="tool-phasebar">
        <span className="tag">{tab.phaseLabel}</span>
        <Link to={phasePath} className="tool-phaselink">Open this section →</Link>
        <span className="tool-feeds">↳ {tab.feeds}</span>
      </div>

      <div className="card" style={{ padding: 28 }}>
        <Active />
      </div>

      <div className="phase-foot" style={{ marginTop: 30 }}>
        <Link to={phasePath}>
          <div className="dir">← Learn the method</div>
          <div className="ttl">{tab.phaseLabel}</div>
        </Link>
        <Link to="/cases" className="next">
          <div className="dir">See it worked →</div>
          <div className="ttl">Play a full case</div>
        </Link>
      </div>
    </div>
  );
}
