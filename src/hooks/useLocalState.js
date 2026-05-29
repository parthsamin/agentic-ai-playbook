import { useState, useEffect } from 'react';

// Persist any tool's state to localStorage under a namespaced key.
export function useLocalState(key, initial) {
  const full = `aiplaybook.tool.${key}`;
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(full);
      return raw ? JSON.parse(raw) : initial;
    } catch { return initial; }
  });

  useEffect(() => {
    try { localStorage.setItem(full, JSON.stringify(value)); } catch { /* ignore */ }
  }, [full, value]);

  const reset = () => setValue(initial);
  return [value, setValue, reset];
}
