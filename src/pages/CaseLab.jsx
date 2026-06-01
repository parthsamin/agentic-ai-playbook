import { Link } from 'react-router-dom';
import { DRILL_LIST, CHALLENGE_LIST } from '../data/quiz';
import '../components/quiz/quiz.css';

export default function CaseLab() {
  return (
    <div className="page">
      <div className="eyebrow fade-up">The Case Lab</div>
      <h1 className="fade-up" style={{ fontSize: 40, margin: '8px 0 10px', letterSpacing: '-0.02em' }}>
        Put yourself in the consultant’s chair
      </h1>
      <p className="fade-up-2" style={{ color: 'var(--ink-soft)', fontSize: 17, maxWidth: '70ch' }}>
        Not trivia — applied judgment, the way an MBB case interview or an Amazon working-backwards review tests it.
        Every answer comes back with a <strong>debrief</strong>: why it’s right, the senior move, and the common trap.
      </p>

      {/* Case Challenge */}
      <h2 className="lab-section-title">Case Challenge</h2>
      {CHALLENGE_LIST.map((ch) => (
        <div className="lab-challenge fade-up-3" key={ch.id}>
          <span className="lab-badge">★ Flagship · 7 decision steps · all formats</span>
          <h3>{ch.title}</h3>
          <p>{ch.intro}</p>
          <Link to={`/lab/case/${ch.id}`} className="btn" style={{ background: '#fff', color: 'var(--brand)' }}>Take the challenge →</Link>
        </div>
      ))}

      {/* Phase Drills */}
      <h2 className="lab-section-title">Phase Drills</h2>
      <p style={{ color: 'var(--ink-soft)', maxWidth: '64ch', marginTop: 0 }}>
        A short, mixed-format pressure-test for each phase. Pick the one you just read — or the one you’re least sure of.
      </p>
      <div className="drill-grid">
        {DRILL_LIST.map((d, i) => (
          <Link key={d.slug} to={`/lab/drill/${d.slug}`} className="drill-card" style={{ borderTopColor: d.accent }}>
            <div className="dc-n">Phase {i} · Drill</div>
            <h4>{d.title}</h4>
            <p>{d.blurb}</p>
            <div className="dc-go" style={{ color: d.accent }}>{d.questions.length} questions →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
