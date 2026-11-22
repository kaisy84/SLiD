import { app, BrowserWindow, type WebContents } from "electron";
import { join } from "node:path";
import {
  closeEncryptedDatabase,
  initEncryptedDatabase,
} from "./db/encryptedDb.ts";
import { registerIpcHandlers } from "./ipc/register.ts";
import {
  isAllowedDevNavigation,
  isAllowedFileNavigation,
} from "./security/navigation.ts";

const isDev = !app.isPackaged;
const DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL ?? "http://127.0.0.1:5173";

function artifact(...parts: string[]): string {
  // Unpackaged: project root (package.json). Packaged: app.asar root.
  return join(app.getAppPath(), ...parts);
}

function indexHtmlPath(): string {
  return artifact("dist", "index.html");
}

function isNavigationAllowed(url: string): boolean {
  if (isDev) {
    return isAllowedDevNavigation(url, DEV_SERVER_URL);
  }
  return isAllowedFileNavigation(url, indexHtmlPath());
}

function attachNavigationGuards(contents: WebContents): void {
  // Block window.open / target=_blank — never shell.openExternal by default.
  contents.setWindowOpenHandler(() => ({ action: "deny" }));

  contents.on("will-navigate", (event, url) => {
    if (!isNavigationAllowed(url)) {
      event.preventDefault();
    }
  });

  contents.on("will-redirect", (event, url) => {
    if (!isNavigationAllowed(url)) {
      event.preventDefault();
    }
  });
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

  attachNavigationGuards(win.webContents);

  win.once("ready-to-show", () => {
    win.show();
  });

  if (isDev) {
    void win.loadURL(DEV_SERVER_URL);
  } else {
    void win.loadFile(indexHtmlPath());
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

app.on("web-contents-created", (_event, contents) => {
  contents.on("will-attach-webview", (event) => {
    event.preventDefault();
  });
  // Defense in depth for any extra WebContents (not only the main window).
  attachNavigationGuards(contents);
});
