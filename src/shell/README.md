# Shell boundary

Electron hosts the React UI in a `BrowserWindow`. UI under `src/pages` and
`src/components` stays shell-agnostic.

## Rules

- **No Node in the renderer** — `nodeIntegration` is off; `contextIsolation` is on.
- Talk to the main process only via `window.slid` (see `slidApi.ts` + `shared/ipc.ts`).
- Database and encryption live in `electron/db/` (main process). The renderer never opens SQLite.
- Browser `npm run dev` still works; IPC falls back to “not Electron” status.

## Scripts

| Command | Meaning |
|---------|---------|
| `npm run dev` | Vite in the browser (UI only) |
| `npm run electron:dev` | Vite + Electron shell |
| `npm run electron:build` | Production renderer + Electron main/preload |
