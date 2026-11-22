import type { DbStatus, ShellInfo, SlidApi } from "../../shared/ipc";

declare global {
  interface Window {
    slid?: SlidApi;
  }
}

const browserShellInfo = (): ShellInfo => ({
  runtime: "browser",
  platform: "web",
  appVersion: "0.1.0-browser",
  userDataPath: null,
});

const browserDbStatus = (): DbStatus => ({
  state: "not_opened",
  reason: "not_electron",
  encryptionRequired: true,
  plannedCipher: "sqlcipher",
  plannedLibrary: "better-sqlite3-multiple-ciphers",
  message:
    "Browser Vite mode has no local SQLCipher store. Use Electron for the desktop shell.",
});

/** Typed access to the preload bridge; safe fallbacks for plain browser Vite. */
export function getSlidApi(): SlidApi {
  if (typeof window !== "undefined" && window.slid) {
    return window.slid;
  }
  return {
    getShellInfo: async () => browserShellInfo(),
    getDbStatus: async () => browserDbStatus(),
  };
}
