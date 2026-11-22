import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Precise navigation allowlist — host/port/protocol or exact file path.
 * Do not use loose `startsWith` on URL strings (open to prefix tricks).
 */
export function isAllowedDevNavigation(
  candidateUrl: string,
  allowedDevServerUrl: string,
): boolean {
  let candidate: URL;
  let allowed: URL;
  try {
    candidate = new URL(candidateUrl);
    allowed = new URL(allowedDevServerUrl);
  } catch {
    return false;
  }

  if (candidate.protocol !== "http:" && candidate.protocol !== "https:") {
    return false;
  }
  if (candidate.protocol !== allowed.protocol) return false;
  if (candidate.hostname !== allowed.hostname) return false;
  if (candidate.port !== allowed.port) return false;
  if (candidate.username !== "" || candidate.password !== "") return false;

  // Same origin only; Vite serves app + HMR under that origin.
  return true;
}

/**
 * Production: only the packaged renderer entry HTML (hash/query ignored).
 */
export function isAllowedFileNavigation(
  candidateUrl: string,
  indexHtmlAbsolutePath: string,
): boolean {
  let candidate: URL;
  try {
    candidate = new URL(candidateUrl);
  } catch {
    return false;
  }

  if (candidate.protocol !== "file:") return false;
  if (candidate.username !== "" || candidate.password !== "") return false;

  let candidatePath: string;
  try {
    candidatePath = fileURLToPath(candidate);
  } catch {
    return false;
  }

  const allowedPath = fileURLToPath(pathToFileURL(indexHtmlAbsolutePath));
  return pathsEqual(candidatePath, allowedPath);
}

function pathsEqual(a: string, b: string): boolean {
  if (process.platform === "win32") {
    return a.toLowerCase() === b.toLowerCase();
  }
  return a === b;
}
