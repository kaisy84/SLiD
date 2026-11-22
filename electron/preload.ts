import { contextBridge, ipcRenderer } from "electron";
import {
  IPC_CHANNELS,
  type DbStatus,
  type ShellInfo,
  type SlidApi,
} from "../shared/ipc.ts";

const api: SlidApi = {
  getShellInfo: (): Promise<ShellInfo> =>
    ipcRenderer.invoke(IPC_CHANNELS.getShellInfo),
  getDbStatus: (): Promise<DbStatus> =>
    ipcRenderer.invoke(IPC_CHANNELS.getDbStatus),
};

contextBridge.exposeInMainWorld("slid", api);
