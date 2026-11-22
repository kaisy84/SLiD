/**
 * Smoke checks for precise navigation allowlisting (no startsWith tricks).
 */
import assert from "node:assert/strict";
import { fileURLToPath, pathToFileURL } from "node:url";
import { join } from "node:path";

function isAllowedDevNavigation(candidateUrl, allowedDevServerUrl) {
  let candidate;
  let allowed;
  try {
    candidate = new URL(candidateUrl);
    allowed = new URL(allowedDevServerUrl);
  } catch {
    return false;
  }
  if (candidate.protocol !== "http:" && candidate.protocol !== "https:") return false;
  if (candidate.protocol !== allowed.protocol) return false;
  if (candidate.hostname !== allowed.hostname) return false;
  if (candidate.port !== allowed.port) return false;
  if (candidate.username !== "" || candidate.password !== "") return false;
  return true;
}

function isAllowedFileNavigation(candidateUrl, indexHtmlAbsolutePath) {
  let candidate;
  try {
    candidate = new URL(candidateUrl);
  } catch {
    return false;
  }
  if (candidate.protocol !== "file:") return false;
  if (candidate.username !== "" || candidate.password !== "") return false;
  let candidatePath;
  try {
    candidatePath = fileURLToPath(candidate);
  } catch {
    return false;
  }
  const allowedPath = fileURLToPath(pathToFileURL(indexHtmlAbsolutePath));
  return candidatePath === allowedPath;
}

const allowed = "http://127.0.0.1:5173";
assert.equal(isAllowedDevNavigation("http://127.0.0.1:5173/", allowed), true);
assert.equal(isAllowedDevNavigation("http://127.0.0.1:5173/@vite/client", allowed), true);
assert.equal(isAllowedDevNavigation("http://127.0.0.1:5173.evil.example/", allowed), false);
assert.equal(isAllowedDevNavigation("http://127.0.0.1:5173@evil.example/", allowed), false);
assert.equal(isAllowedDevNavigation("https://127.0.0.1:5173/", allowed), false);
assert.equal(isAllowedDevNavigation("http://localhost:5173/", allowed), false);
assert.equal(isAllowedDevNavigation("file:///tmp/x", allowed), false);

const indexHtml = join("/tmp", "slid-app", "dist", "index.html");
const good = pathToFileURL(indexHtml).href + "#/kinderprofile";
const evil = pathToFileURL(join("/tmp", "slid-app", "dist", "index.html.evil")).href;
assert.equal(isAllowedFileNavigation(good, indexHtml), true);
assert.equal(isAllowedFileNavigation(evil, indexHtml), false);
assert.equal(isAllowedFileNavigation("file://127.0.0.1" + indexHtml, indexHtml), false);

console.log("Navigation allowlist smoke OK");
