import { mkdirSync } from "node:fs";
import { join } from "node:path";
import Database from "better-sqlite3-multiple-ciphers";
import type { DbStatus } from "../../shared/ipc.ts";
import { resolveDatabaseKey } from "./keyProvider.ts";
import {
  LAB_SCHEMA_SQL,
  LAB_SCHEMA_VERSION,
  seedLabMetaStatements,
} from "./schemaPrep.ts";

type SqliteDb = InstanceType<typeof Database>;

let labDb: SqliteDb | null = null;
let lastStatus: DbStatus | null = null;

const LIBRARY = "better-sqlite3-multiple-ciphers" as const;
const CIPHER = "sqlcipher" as const;

/**
 * Apply SQLCipher settings before any read/write.
 * Windows-first production path will use the same cipher pragma sequence.
 */
function applySqlCipherKey(db: SqliteDb, passphrase: string): void {
  db.pragma("cipher='sqlcipher'");
  db.pragma("legacy=4");
  // Passphrase is bound via pragma string; lab keys only until KMS is decided.
  db.pragma(`key=${sqliteStringLiteral(passphrase)}`);
}

function sqliteStringLiteral(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

function openLabProbe(userDataPath: string, passphrase: string): DbStatus {
  const labDir = join(userDataPath, "lab");
  mkdirSync(labDir, { recursive: true });
  const dbPath = join(labDir, "slid-lab.db");

  const db = new Database(dbPath);
  applySqlCipherKey(db, passphrase);

  // Fail closed if the key did not unlock an encrypted file.
  db.prepare("SELECT 1 AS ok").get();

  db.exec(LAB_SCHEMA_SQL);
  const upsert = db.prepare(
    `INSERT INTO schema_meta (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
  );
  const now = new Date().toISOString();
  const tx = db.transaction(() => {
    for (const [key, value] of seedLabMetaStatements(now)) {
      upsert.run(key, value);
    }
  });
  tx();

  labDb = db;
  return {
    state: "lab_probe_open",
    path: dbPath,
    cipher: CIPHER,
    library: LIBRARY,
    schemaVersion: LAB_SCHEMA_VERSION,
    message:
      "Lab-only encrypted SQLCipher file is open. Production key management remains OPEN — this is not the real store.",
  };
}

/**
 * Initialize local DB access for the main process.
 * Never creates an unencrypted “real” database file.
 */
export function initEncryptedDatabase(userDataPath: string): DbStatus {
  closeEncryptedDatabase();

  const key = resolveDatabaseKey();
  if (key.kind === "unavailable") {
    lastStatus = {
      state: "not_opened",
      reason: "key_management_open",
      encryptionRequired: true,
      plannedCipher: CIPHER,
      plannedLibrary: LIBRARY,
      message:
        "OPEN: Production encryption/key management is not configured. No database file was opened. Set SLID_LAB_DB_KEY only for an encrypted lab probe.",
    };
    return lastStatus;
  }

  try {
    lastStatus = openLabProbe(userDataPath, key.passphrase);
    return lastStatus;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database open error";
    lastStatus = {
      state: "error",
      encryptionRequired: true,
      message: `Failed to open encrypted lab DB: ${message}`,
    };
    return lastStatus;
  }
}

export function getDbStatus(): DbStatus {
  if (lastStatus) return lastStatus;
  return {
    state: "not_opened",
    reason: "key_management_open",
    encryptionRequired: true,
    plannedCipher: CIPHER,
    plannedLibrary: LIBRARY,
    message: "Database layer not initialized.",
  };
}

export function closeEncryptedDatabase(): void {
  if (labDb) {
    try {
      labDb.close();
    } catch {
      // ignore close errors on shutdown
    }
    labDb = null;
  }
}

/** Browser / non-Electron hosts never get a local encrypted store. */
export function browserDbStatus(): DbStatus {
  return {
    state: "not_opened",
    reason: "not_electron",
    encryptionRequired: true,
    plannedCipher: CIPHER,
    plannedLibrary: LIBRARY,
    message:
      "Browser Vite mode has no local SQLCipher store. Use Electron for the desktop shell.",
  };
}
