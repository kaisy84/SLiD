/**
 * Typed IPC contract between Electron main (trusted) and renderer (untrusted).
 * Renderer must only talk to the main process through this API — never Node/DB APIs.
 */

export const IPC_CHANNELS = {
  getShellInfo: "slid:getShellInfo",
  getDbStatus: "slid:getDbStatus",
} as const;

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];

export type ShellInfo = {
  runtime: "electron" | "browser";
  /** Electron `process.platform`, or `"web"` in the browser. */
  platform: string;
  appVersion: string;
  /** userData directory when running under Electron; null in browser. */
  userDataPath: string | null;
};

/**
 * Database readiness for Stufe 1.
 * Production key management is intentionally OPEN — see docs.
 */
export type DbStatus =
  | {
      state: "not_opened";
      /** Why no real store is open. */
      reason: "key_management_open" | "not_electron";
      encryptionRequired: true;
      /** Planned cipher stack (not a claim that a production DB exists). */
      plannedCipher: "sqlcipher";
      plannedLibrary: "better-sqlite3-multiple-ciphers";
      message: string;
    }
  | {
      state: "lab_probe_open";
      /** Lab-only encrypted file; never the production store. */
      path: string;
      cipher: "sqlcipher";
      library: "better-sqlite3-multiple-ciphers";
      schemaVersion: number;
      message: string;
    }
  | {
      state: "error";
      encryptionRequired: true;
      message: string;
    };

export type SlidApi = {
  getShellInfo: () => Promise<ShellInfo>;
  getDbStatus: () => Promise<DbStatus>;
};
