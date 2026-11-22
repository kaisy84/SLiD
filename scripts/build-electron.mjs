import * as esbuild from "esbuild";
import { mkdirSync } from "node:fs";

mkdirSync("dist-electron", { recursive: true });

const shared = {
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node20",
  sourcemap: true,
  logLevel: "info",
};

await esbuild.build({
  ...shared,
  entryPoints: ["electron/main.ts"],
  outfile: "dist-electron/main.cjs",
  external: ["electron", "better-sqlite3-multiple-ciphers"],
});

await esbuild.build({
  ...shared,
  entryPoints: ["electron/preload.ts"],
  outfile: "dist-electron/preload.cjs",
  external: ["electron"],
});

console.log("Electron main + preload built → dist-electron/");
