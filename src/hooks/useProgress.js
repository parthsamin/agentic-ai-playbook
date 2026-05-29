import { useState, useEffect, useCallback } from 'react';
import { PHASES } from '../data/phases';

const KEY = 'aiplaybook.progress.v1';

function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
}

// Simple global store so the sidebar and pages stay in sync.
let cache = read();
const listeners = new Set();
function emit() { listeners.forEach((l) => l(cache)); }

export function useProgress() {
  const [state, setState] = useState(cache);

  useEffect(() => {
    const l = (s) => setState({ ...s });
    listeners.add(l);
    return () => listeners.delete(l);
  }, []);

  const toggle = useCallback((slug) => {
    cache = { ...cache, [slug]: !cache[slug] };
    localStorage.setItem(KEY, JSON.stringify(cache));
    emit();
  }, []);

  const setDone = useCallback((slug, done) => {
    cache = { ...cache, [slug]: done };
    localStorage.setItem(KEY, JSON.stringify(cache));
    emit();
  }, []);

  const builtPhases = PHASES.filter((p) => p.built);
  const completed = builtPhases.filter((p) => state[p.slug]).length;
  const pct = Math.round((completed / builtPhases.length) * 100);

  return { state, toggle, setDone, completed, total: builtPhases.length, pct };
}
