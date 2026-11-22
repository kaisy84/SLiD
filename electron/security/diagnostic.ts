/**
 * Explicit diagnostic mode — opt-in via env only.
 * When off, IPC must not expose local filesystem paths (e.g. userData).
 */
export function isDiagnosticMode(): boolean {
  const value = process.env.SLID_DIAGNOSTIC?.trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}
