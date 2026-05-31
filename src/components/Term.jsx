import { useState, useRef } from 'react';
import { GLOSSARY_MAP } from '../data/glossary';

// Inline jargon with a hover/tap tooltip pulling its definition from the glossary.
// Usage: <Term k="rag">RAG</Term>  (children optional; falls back to the term name)
export default function Term({ k, children }) {
  const [open, setOpen] = useState(false);
  const entry = GLOSSARY_MAP[k];
  const ref = useRef(null);
  if (!entry) return <>{children || k}</>;

  return (
    <span
      className="term"
      ref={ref}
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
    >
      {children || entry.term}
      {open && (
        <span className="term-pop" role="tooltip">
          <b>{entry.term}</b>
          {entry.def}
        </span>
      )}
    </span>
  );
}
