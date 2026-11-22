/**
 * OPEN — production key management is not decided.
 *
 * Do not invent OS-keychain / password-derived / recovery-key flows here.
 * Until those decisions land (Pflichtenheft / schema §10.12), SLiD must not
 * open a plaintext file as the “real” local store.
 *
 * Optional lab probe only: set env `SLID_LAB_DB_KEY` to a non-empty passphrase
 * to exercise SQLCipher open/create under userData/lab/. That file is never
 * the production database.
 */

export type KeyResolution =
  | { kind: "unavailable"; reason: "key_management_open" }
  | { kind: "lab"; passphrase: string };

export function resolveDatabaseKey(): KeyResolution {
  const lab = process.env.SLID_LAB_DB_KEY?.trim();
  if (lab) {
    return { kind: "lab", passphrase: lab };
  }
  return { kind: "unavailable", reason: "key_management_open" };
}
