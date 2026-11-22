# SLiD

**Schriftsprachliche Lern- und Individualdiagnostik** — visueller UI-Prototyp mit Electron-Hülle (Stufe 1).

React + TypeScript (Vite) UI; Electron Main/Preload mit typisiertem IPC; SQLCipher-Vorbereitung für lokale Verschlüsselung. Keine diagnostische Logik, keine Cloud, keine Telemetrie.

## Lokal starten

### Browser (UI only)

```bash
npm install
npm run dev
```

Dann `http://127.0.0.1:5173` öffnen.

### Electron-Shell

```bash
npm install
npm run electron:dev
```

Kinder-/Fachdaten bleiben fiktive Demo-Daten in der UI. Die lokale DB öffnet **kein** unverschlüsseltes Produktiv-Store — Key-Management ist **OPEN** (siehe Docs). Optional: `SLID_LAB_DB_KEY=…` für eine verschlüsselte Lab-Probe unter `userData/lab/`.

## Scripts

| Befehl | Beschreibung |
|--------|--------------|
| `npm run dev` | Vite-Entwicklungsserver (Browser) |
| `npm run electron:dev` | Vite + Electron |
| `npm run build` | Typecheck + Renderer-Produktionsbuild |
| `npm run electron:build` | Renderer + Electron Main/Preload |
| `npm run smoke:sqlcipher` | Kurztest Verschlüsselung (Temp-Datei) |
| `npm run lint` | Oxlint |

## Hinweis

Alle angezeigten Kinderdaten sind fiktiv und dienen ausschließlich der Oberflächenillustration.
