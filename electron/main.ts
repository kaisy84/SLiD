import { app, BrowserWindow, shell } from "electron";
import { join } from "node:path";
import {
  closeEncryptedDatabase,
  initEncryptedDatabase,
} from "./db/encryptedDb.ts";
import { registerIpcHandlers } from "./ipc/register.ts";

const isDev = !app.isPackaged;
const DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL ?? "http://127.0.0.1:5173";

function artifact(...parts: string[]): string {
  // Unpackaged: project root (package.json). Packaged: app.asar root.
  return join(app.getAppPath(), ...parts);
}

function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: artifact("dist-electron", "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  // Deny unexpected navigations / open external links in the OS browser.
  win.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (event, url) => {
    const allowed = isDev
      ? url.startsWith(DEV_SERVER_URL)
      : url.startsWith("file://");
    if (!allowed) {
      event.preventDefault();
    }
  });

  if (isDev) {
    void win.loadURL(DEV_SERVER_URL);
  } else {
    void win.loadFile(artifact("dist", "index.html"));
  }

  return win;
}

app.whenReady().then(() => {
  registerIpcHandlers();
  const status = initEncryptedDatabase(app.getPath("userData"));
  console.info("[slid:db]", status.state, status.message);

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  closeEncryptedDatabase();
});

// No remote content / no permission prompts by default.
app.on("web-contents-created", (_event, contents) => {
  contents.on("will-attach-webview", (event) => {
    event.preventDefault();
  });
});
