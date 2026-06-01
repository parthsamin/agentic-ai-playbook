import { useParams, Link } from 'react-router-dom';
import { getDrill, getChallenge } from '../data/quiz';
import QuizEngine from '../components/quiz/QuizEngine';
import '../components/quiz/quiz.css';

export default function QuizRunner({ mode }) {
  const { key } = useParams();

  if (mode === 'drill') {
    const d = getDrill(key);
    if (!d) return <NotFound />;
    return (
      <div className="page">
        <Link to="/lab" style={{ fontSize: 13.5 }}>← Case Lab</Link>
        <div className="eyebrow" style={{ marginTop: 14 }}>Phase Drill</div>
        <h1 style={{ fontSize: 32, margin: '6px 0 18px' }}>{d.title} — pressure test</h1>
        <QuizEngine questions={d.questions} accent={d.accent} kicker={`${d.title} drill`} />
      </div>
    );
  }

  const ch = getChallenge(key);
  if (!ch) return <NotFound />;
  return (
    <div className="page">
      <Link to="/lab" style={{ fontSize: 13.5 }}>← Case Lab</Link>
      <div className="eyebrow" style={{ marginTop: 14 }}>Case Challenge</div>
      <h1 style={{ fontSize: 30, margin: '6px 0 12px', letterSpacing: '-0.01em' }}>{ch.title}</h1>
      <div className="callout callout-tip" style={{ marginTop: 0 }}>
        <span className="ic">📋</span>
        <div>
          <p style={{ margin: 0 }}>{ch.intro}</p>
          <div className="pt-baseline" style={{ marginTop: 12, marginBottom: 0 }}>
            <span className="pt-baseline-label">Baseline</span>
            {ch.baseline.map((b, i) => <span className="pt-baseline-item" key={i}>{b.label}: <b>{b.value}</b></span>)}
          </div>
        </div>
      </div>
      <QuizEngine questions={ch.steps} accent={ch.accent} kicker="LendCo" debrief={ch.debrief} />
    </div>
  );
}

function NotFound() {
  return <div className="page"><h2>Not found</h2><Link to="/lab">← Back to the Case Lab</Link></div>;
}
