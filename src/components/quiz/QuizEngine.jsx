import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GRID } from '../../data/quiz';
import { PHASES } from '../../data/phases';
import './quiz.css';

const phaseTitle = (slug) => (PHASES.find((p) => p.slug === slug) || {}).title || slug;

const eqSet = (a = [], b = []) => a.length === b.length && [...a].sort().join('|') === [...b].sort().join('|');
const eqArr = (a = [], b = []) => a.length === b.length && a.every((x, i) => x === b[i]);

function grade(q, v) {
  switch (q.type) {
    case 'single': return v === q.answer;
    case 'grid': return v === q.answer;
    case 'multi':
    case 'antipattern': return eqSet(v, q.answers);
    case 'order': return eqArr(v, q.answer);
    case 'match': return q.left.every((l) => v && v[l.id] === q.answer[l.id]);
    case 'estimate': return v != null && v !== '' && Math.abs(Number(v) - q.answer) <= q.tolerance * q.answer;
    default: return null; // reveal — not graded
  }
}

// ---------- renderers ----------
function SingleSelect({ q, value, onChange, revealed }) {
  return (
    <div className="q-opts">
      {q.options.map((o) => {
        let cls = '';
        if (revealed) { if (o.id === q.answer) cls = 'ok'; else if (o.id === value) cls = 'bad'; }
        else if (o.id === value) cls = 'sel';
        return <button key={o.id} className={`q-opt ${cls}`} disabled={revealed} onClick={() => onChange(o.id)}>{o.label}</button>;
      })}
    </div>
  );
}

function MultiSelect({ q, value = [], onChange, revealed }) {
  const toggle = (id) => onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);
  return (
    <div className="q-opts">
      {q.options.map((o) => {
        const picked = value.includes(o.id);
        const correct = q.answers.includes(o.id);
        let cls = picked ? 'sel' : '';
        if (revealed) { if (correct) cls = 'ok'; else if (picked) cls = 'bad'; }
        return (
          <button key={o.id} className={`q-opt q-check ${cls}`} disabled={revealed} onClick={() => toggle(o.id)}>
            <span className="q-box">{picked ? '✓' : ''}</span>{o.label}
          </button>
        );
      })}
    </div>
  );
}

function Ordering({ q, value, onChange, revealed }) {
  const list = value || q.items.map((i) => i.id);
  const label = (id) => q.items.find((i) => i.id === id).label;
  const move = (i, d) => {
    const n = [...list]; const j = i + d;
    if (j < 0 || j >= n.length) return;
    [n[i], n[j]] = [n[j], n[i]]; onChange(n);
  };
  return (
    <div className="q-order">
      {list.map((id, i) => {
        const rightPos = revealed && q.answer[i] === id;
        return (
          <div key={id} className={`q-order-row ${revealed ? (rightPos ? 'ok' : 'bad') : ''}`}>
            <span className="q-order-n">{i + 1}</span>
            <span className="q-order-l">{label(id)}</span>
            {!revealed && (
              <span className="q-order-btns">
                <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="up">↑</button>
                <button onClick={() => move(i, 1)} disabled={i === list.length - 1} aria-label="down">↓</button>
              </span>
            )}
          </div>
        );
      })}
      {revealed && <p className="q-order-correct">Correct order: {q.answer.map((id) => label(id)).join(' → ')}</p>}
    </div>
  );
}

function Matching({ q, value = {}, onChange, revealed }) {
  return (
    <div className="q-match">
      {q.left.map((l) => {
        const picked = value[l.id] || '';
        const right = q.right.find((r) => r.id === picked);
        const correct = revealed && picked === q.answer[l.id];
        return (
          <div key={l.id} className={`q-match-row ${revealed ? (correct ? 'ok' : 'bad') : ''}`}>
            <span className="q-match-l">{l.label}</span>
            <span className="q-match-arrow">→</span>
            {revealed ? (
              <span className="q-match-ans">{right ? right.label : '—'}{!correct && <em> · should be: {q.right.find((r) => r.id === q.answer[l.id]).label}</em>}</span>
            ) : (
              <select className="field-select" value={picked} onChange={(e) => onChange({ ...value, [l.id]: e.target.value })}>
                <option value="">choose…</option>
                {q.right.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
              </select>
            )}
          </div>
        );
      })}
    </div>
  );
}

function GridPlace({ q, value, onChange, revealed }) {
  return (
    <div className="q-grid-wrap">
      <div className="q-action">📌 {q.action}</div>
      <div className="q-grid">
        <div className="q-grid-corner" />
        <div className="q-grid-col">{GRID.axes.cols[0]}</div>
        <div className="q-grid-col">{GRID.axes.cols[1]}</div>
        {[0, 1].map((row) => (
          <Row key={row} row={row} q={q} value={value} onChange={onChange} revealed={revealed} />
        ))}
      </div>
    </div>
  );
}
function Row({ row, q, value, onChange, revealed }) {
  const rowCells = GRID.cells.filter((c) => (row === 0 ? c.id.startsWith('rev-') : c.id.startsWith('irrev-')));
  return (
    <>
      <div className="q-grid-row">{GRID.axes.rows[row]}</div>
      {rowCells.map((c) => {
        let cls = c.cls;
        if (revealed) { if (c.id === q.answer) cls += ' ok'; else if (c.id === value) cls += ' bad'; }
        else if (c.id === value) cls += ' sel';
        return (
          <button key={c.id} className={`q-cellbtn ${cls}`} disabled={revealed} onClick={() => onChange(c.id)}>
            {c.label}
          </button>
        );
      })}
    </>
  );
}

function Estimate({ q, value, onChange, revealed }) {
  return (
    <div className="q-estimate">
      <div className="q-est-input">
        {q.unit === '$' && <span className="q-est-unit">$</span>}
        <input className="field-input" type="number" step="any" value={value ?? ''} disabled={revealed}
          onChange={(e) => onChange(e.target.value)} placeholder="your estimate" />
        {q.unit && q.unit !== '$' && <span className="q-est-unit">{q.unit}</span>}
      </div>
      {revealed && <p className="q-est-sol"><strong>Worked:</strong> {q.solution}</p>}
    </div>
  );
}

function Reveal({ q, value, onChange, revealed }) {
  return (
    <div className="q-reveal">
      <textarea className="field-area" placeholder="Write your answer, then reveal the model answer…" value={value || ''}
        onChange={(e) => onChange(e.target.value)} disabled={revealed} />
      {revealed && (
        <div className="q-model"><div className="q-model-h">Model answer</div>{q.modelAnswer}</div>
      )}
    </div>
  );
}

const RENDERERS = { single: SingleSelect, multi: MultiSelect, antipattern: MultiSelect, order: Ordering, match: Matching, grid: GridPlace, estimate: Estimate, reveal: Reveal };

// ---------- engine ----------
export default function QuizEngine({ questions, accent = 'var(--brand)', kicker, debrief, backTo = '/lab' }) {
  const [i, setI] = useState(0);
  const [value, setValue] = useState(undefined);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, graded: 0 });
  const [done, setDone] = useState(false);

  const q = questions[i];
  const total = questions.length;

  // Seed the working order for `order` questions (the data ships them already
  // scrambled); everything else starts blank.
  useEffect(() => {
    if (q && q.type === 'order') setValue(q.items.map((it) => it.id));
    else setValue(undefined);
    setRevealed(false);
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  const Renderer = q ? RENDERERS[q.type] : null;
  const isReveal = q && q.type === 'reveal';
  const answered = isReveal ? value !== undefined : value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0) && !(typeof value === 'object' && !Array.isArray(value) && Object.keys(value || {}).length === 0);

  const check = () => {
    if (!isReveal) {
      const ok = grade(q, value);
      setScore((s) => ({ correct: s.correct + (ok ? 1 : 0), graded: s.graded + 1 }));
    }
    setRevealed(true);
  };
  const next = () => {
    if (i + 1 >= total) { setDone(true); return; }
    setI(i + 1); setValue(undefined); setRevealed(false);
  };
  const restart = () => { setI(0); setValue(undefined); setRevealed(false); setScore({ correct: 0, graded: 0 }); setDone(false); };

  if (done) {
    const pct = score.graded ? Math.round((score.correct / score.graded) * 100) : 100;
    return (
      <div className="quiz-done">
        <div className="quiz-score" style={{ background: accent }}>{score.correct}/{score.graded}</div>
        <h2>{pct >= 80 ? 'Strong — senior-level judgment.' : pct >= 50 ? 'Good — review the misses to sharpen.' : 'Worth another pass.'}</h2>
        <p style={{ color: 'var(--ink-soft)' }}>You scored {score.correct} of {score.graded} graded questions ({pct}%).</p>
        {debrief && (
          <div className="callout callout-key" style={{ textAlign: 'left', marginTop: 16 }}>
            <span className="ic">🎯</span><div><h4>Debrief</h4><p>{debrief}</p></div>
          </div>
        )}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 18, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-sm" onClick={restart}>Try again</button>
          <Link to={backTo} className="btn btn-ghost btn-sm">Back to the Case Lab</Link>
        </div>
      </div>
    );
  }

  const correct = !isReveal && revealed ? grade(q, value) : null;

  return (
    <div className="quiz">
      <div className="quiz-bar">
        <div className="quiz-bar-fill" style={{ width: `${(i / total) * 100}%`, background: accent }} />
      </div>
      <div className="quiz-meta">
        {kicker && <span>{kicker} · </span>}Question {i + 1} of {total}
        <span className="quiz-type">{labelFor(q.type)}</span>
      </div>

      <h3 className="quiz-prompt">{q.prompt}</h3>

      <Renderer q={q} value={value} onChange={(v) => setValue(v)} revealed={revealed} />

      {revealed && (
        <div className={`quiz-feedback ${isReveal ? 'neutral' : correct ? 'good' : 'bad'}`}>
          <div className="qf-head">{isReveal ? '📝 Compare with the model answer' : correct ? '✅ Correct' : '✕ Not quite'}</div>
          <p className="qf-rationale">{q.rationale}</p>
          {q.trap && <p className="qf-trap"><strong>Common trap:</strong> {q.trap}</p>}
          {q.phase && !correct && !isReveal && (
            <Link className="qf-review" to={`/phase/${q.phase}`}>Review Phase: {phaseTitle(q.phase)} →</Link>
          )}
        </div>
      )}

      <div className="quiz-actions">
        {!revealed
          ? <button className="btn btn-primary" disabled={!answered} onClick={check}>{isReveal ? 'Reveal model answer' : 'Check answer'}</button>
          : <button className="btn btn-primary" onClick={next}>{i + 1 >= total ? 'See results →' : 'Next question →'}</button>}
      </div>
    </div>
  );
}

function labelFor(t) {
  return { single: 'Pick one', multi: 'Select all', antipattern: 'Spot the issues', order: 'Put in order', match: 'Match', grid: 'Place on the 2×2', estimate: 'Estimate', reveal: 'Defend the call' }[t] || '';
}
