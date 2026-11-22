/**
 * Verifies SQLCipher encrypt/open round-trip without leaving a plaintext “real” store.
 * Uses an ephemeral temp file and deletes it afterwards.
 */
import Database from "better-sqlite3-multiple-ciphers";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dir = mkdtempSync(join(tmpdir(), "slid-sqlcipher-"));
const dbPath = join(dir, "probe.db");
const passphrase = "lab-only-not-a-production-key";

try {
  {
    const db = new Database(dbPath);
    db.pragma("cipher='sqlcipher'");
    db.pragma("legacy=4");
    db.pragma(`key='${passphrase}'`);
    db.exec(`CREATE TABLE t (id INTEGER PRIMARY KEY, note TEXT NOT NULL)`);
    db.prepare(`INSERT INTO t (note) VALUES (?)`).run("fictional");
    db.close();
  }

  {
    const db = new Database(dbPath);
    db.pragma("cipher='sqlcipher'");
    db.pragma("legacy=4");
    db.pragma(`key='${passphrase}'`);
    const row = db.prepare(`SELECT note FROM t`).get();
    if (!row || row.note !== "fictional") {
      throw new Error("Encrypted read failed");
    }
    db.close();
  }

  let rejected = false;
  try {
    const db = new Database(dbPath);
    db.pragma("cipher='sqlcipher'");
    db.pragma("legacy=4");
    db.pragma(`key='wrong-key'`);
    db.prepare(`SELECT note FROM t`).get();
    db.close();
  } catch {
    rejected = true;
  }

  if (!rejected) {
    throw new Error("Expected wrong key to fail");
  }

  console.log("SQLCipher smoke OK:", dbPath);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
