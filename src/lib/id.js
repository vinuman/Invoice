export function newId(prefix = "id") {
  // Browser-safe unique id without extra deps
  return `${prefix}_${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`}`;
}

