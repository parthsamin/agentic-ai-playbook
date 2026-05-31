import { useState } from 'react';
import { GLOSSARY } from '../data/glossary';

export default function Glossary() {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();

  const groups = GLOSSARY.map((g) => ({
    ...g,
    terms: g.terms.filter(
      (t) => !query || t.term.toLowerCase().includes(query) || t.def.toLowerCase().includes(query)
    ),
  })).filter((g) => g.terms.length);

  const count = groups.reduce((n, g) => n + g.terms.length, 0);

  return (
    <div className="page">
      <div className="eyebrow fade-up">Reference</div>
      <h1 className="fade-up" style={{ fontSize: 40, margin: '8px 0 10px', letterSpacing: '-0.02em' }}>Glossary</h1>
      <p className="fade-up-2" style={{ color: 'var(--ink-soft)', fontSize: 17, maxWidth: '64ch' }}>
        Every acronym and term used in the playbook, in plain language. These same definitions pop up as tooltips
        on the dotted-underlined terms throughout the guide.
      </p>

      <input
        className="field-input"
        style={{ maxWidth: 420, margin: '18px 0 8px' }}
        placeholder="Filter terms… (e.g. RAG, drift, WISMO)"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div style={{ fontSize: 12.5, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)', marginBottom: 18 }}>{count} terms</div>

      {groups.map((g) => (
        <section key={g.group} style={{ margin: '26px 0' }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>{g.group}</div>
          <div className="grid grid-2">
            {g.terms.map((t) => (
              <div className="card" key={t.k} style={{ padding: 16 }}>
                <h4 style={{ margin: 0, fontSize: 15 }}>{t.term}</h4>
                <p style={{ margin: '6px 0 0', fontSize: 13.5, color: 'var(--ink-soft)' }}>{t.def}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {!count && <p style={{ color: 'var(--ink-faint)' }}>No terms match “{q}”.</p>}
    </div>
  );
}
