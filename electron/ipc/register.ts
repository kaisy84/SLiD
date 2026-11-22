import { app, ipcMain } from "electron";
import { getDbStatus } from "../db/encryptedDb.ts";
import { isDiagnosticMode } from "../security/diagnostic.ts";
import { IPC_CHANNELS, type DbStatus, type ShellInfo } from "../../shared/ipc.ts";

function redactDbStatusForRenderer(status: DbStatus): DbStatus {
  if (status.state !== "lab_probe_open") {
    return status;
  }
  if (isDiagnosticMode()) {
    return status;
  }
  // Omit absolute filesystem path outside diagnostic mode.
  return {
    state: status.state,
    cipher: status.cipher,
    library: status.library,
    schemaVersion: status.schemaVersion,
    message: status.message,
  };
}

export function registerIpcHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.getShellInfo, (): ShellInfo => {
    const diagnostic = isDiagnosticMode();
    return {
      runtime: "electron",
      platform: process.platform,
      appVersion: app.getVersion(),
      diagnosticMode: diagnostic,
      // Full local path only when SLID_DIAGNOSTIC is explicitly enabled.
      userDataPath: diagnostic ? app.getPath("userData") : null,
    };
  });

  ipcMain.handle(IPC_CHANNELS.getDbStatus, (): DbStatus =>
    redactDbStatusForRenderer(getDbStatus()),
  );
}
