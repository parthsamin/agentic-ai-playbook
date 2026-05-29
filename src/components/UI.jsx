// Small reusable presentational components shared across pages.

export function Callout({ kind = 'key', title, icon, children }) {
  const icons = { key: '🔑', trap: '⚠️', map: '🧭', tip: '💡' };
  return (
    <div className={`callout callout-${kind}`}>
      <span className="ic">{icon || icons[kind]}</span>
      <div>
        {title && <h4>{title}</h4>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export function Tag({ children, accent }) {
  return <span className={`tag ${accent ? 'tag-accent' : ''}`}>{children}</span>;
}

export function Table({ head, rows, render }) {
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead>
          <tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {(render ? render(r) : r).map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SectionTitle({ kicker, children }) {
  return (
    <>
      {kicker && <div className="eyebrow" style={{ marginBottom: 6 }}>{kicker}</div>}
      <h2>{children}</h2>
    </>
  );
}

// Section heading used for anchor navigation inside a phase.
export function Anchor({ id, children }) {
  return <h2 id={id} style={{ scrollMarginTop: 24 }}>{children}</h2>;
}
