import { useState } from 'react';
import '../components/tools/tools.css';
import OpportunityCanvas from '../components/tools/OpportunityCanvas';
import DecompositionTable from '../components/tools/DecompositionTable';
import AutonomyMatrix from '../components/tools/AutonomyMatrix';

const TABS = [
  { id: 'canvas', icon: '🗂️', label: 'Opportunity Canvas', phase: 'Phase 1 · Frame', C: OpportunityCanvas },
  { id: 'decomp', icon: '🪜', label: 'Decomposition Table', phase: 'Phase 2 · Map', C: DecompositionTable },
  { id: 'matrix', icon: '🎛️', label: 'Autonomy Matrix', phase: 'Phase 3 · Architect', C: AutonomyMatrix },
];

export default function Tools() {
  const [active, setActive] = useState('canvas');
  const Active = TABS.find((t) => t.id === active).C;

  return (
    <div className="page">
      <div className="eyebrow fade-up">Workshop tools</div>
      <h1 className="fade-up" style={{ fontSize: 40, margin: '8px 0 10px', letterSpacing: '-0.02em' }}>
        Fill them in for your own use case
      </h1>
      <p className="fade-up-2" style={{ color: 'var(--ink-soft)', fontSize: 17, maxWidth: '66ch' }}>
        These are the reusable artifacts an expert walks into engagements with. Everything you type is saved on
        this device automatically — copy or export it straight into a deck.
      </p>

      <div className="tool-tabs fade-up-3">
        {TABS.map((t) => (
          <button key={t.id} className={`tool-tab ${active === t.id ? 'active' : ''}`} onClick={() => setActive(t.id)}>
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 28 }}>
        <Active />
      </div>
    </div>
  );
}
