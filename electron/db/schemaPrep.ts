/**
 * Minimal schema prep for Stufe 1 technical probe only.
 * Full domain schema (users/children/DEKs/…) is out of scope until later phases.
 */

export const LAB_SCHEMA_VERSION = 1;

/** Intentionally tiny — proves encrypted open + migrations path, not product schema. */
export const LAB_SCHEMA_SQL = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS schema_meta (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_events_stub (
  id TEXT PRIMARY KEY NOT NULL,
  created_at TEXT NOT NULL,
  event_type TEXT NOT NULL,
  detail TEXT NOT NULL
);
`;

export function seedLabMetaStatements(nowIso: string): Array<[string, string]> {
  return [
    ["schema_version", String(LAB_SCHEMA_VERSION)],
    ["store_kind", "lab_probe"],
    ["encryption", "sqlcipher"],
    ["created_at", nowIso],
    ["note", "Fictional/lab only — not a production child/user store"],
  ];
}
