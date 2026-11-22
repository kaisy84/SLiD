import { app, ipcMain } from "electron";
import { getDbStatus } from "../db/encryptedDb.ts";
import { IPC_CHANNELS, type DbStatus, type ShellInfo } from "../../shared/ipc.ts";

export function registerIpcHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.getShellInfo, (): ShellInfo => ({
    runtime: "electron",
    platform: process.platform,
    appVersion: app.getVersion(),
    userDataPath: app.getPath("userData"),
  }));

  ipcMain.handle(IPC_CHANNELS.getDbStatus, (): DbStatus => getDbStatus());
}
