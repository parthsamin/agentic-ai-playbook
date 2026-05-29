import { Link } from 'react-router-dom';

export default function PhaseStub({ phase }) {
  return (
    <>
      <div className="callout callout-tip">
        <span className="ic">🚧</span>
        <div>
          <h4>Full module in progress</h4>
          <p>
            This first release ships Phases 0–3 in full plus the Autonomy &amp; Eval deep dive.
            Here’s the essence of <strong>{phase.title}</strong> so the methodology stays whole.
          </p>
        </div>
      </div>

      <div className="stub">
        <div className="ic" style={{ marginBottom: 12 }}>🧭</div>
        <h2 style={{ border: 0, margin: 0 }}>The one-sentence test</h2>
        <p style={{ fontSize: 18, color: 'var(--ink)', maxWidth: '60ch', margin: '14px auto 0', fontStyle: 'italic' }}>
          “{phase.oneSentence}”
        </p>
      </div>

      <h3>What this phase is about</h3>
      <p>{phase.summary}</p>

      {phase.slug === 'sequence' && (
        <p>
          The signature device here is the <strong>Autonomy Ladder</strong> — hold the use case constant and
          climb autonomy as trust is earned, gated by eval metrics. It’s previewed in full inside the{' '}
          <Link to="/deep/autonomy-eval">Autonomy &amp; Eval deep dive</Link>.
        </p>
      )}
      {phase.slug === 'prove' && (
        <p>
          This is the 10× core: the golden dataset, the metric tree, LLM-as-judge, and cost-per-<em>successful</em>-task.
          It’s covered in depth in the <Link to="/deep/autonomy-eval">Autonomy &amp; Eval deep dive</Link>.
        </p>
      )}

      <div className="callout callout-map">
        <span className="ic">🧭</span>
        <div>
          <p>
            Want this phase built out next? The structure, running cases, and traps are all mapped —
            this release prioritized the foundation (0–3) and the evidence engine.
          </p>
        </div>
      </div>
    </>
  );
}
