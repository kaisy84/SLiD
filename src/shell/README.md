# Shell boundary

This folder marks the future Electron (or other desktop) shell boundary.

- UI pages and components under `src/pages` and `src/components` stay shell-agnostic.
- Browser routing lives in the app entry; a later shell can host the same React tree in a BrowserWindow.
- Do not put Node/Electron APIs in UI components.
