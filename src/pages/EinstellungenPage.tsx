import { useEffect, useState } from "react";
import type { DbStatus, ShellInfo } from "../../shared/ipc";
import { getSlidApi } from "../shell/slidApi";
import { PlaceholderPage } from "./PlaceholderPage";
import "./EinstellungenPage.css";

export function EinstellungenPage() {
  const [shell, setShell] = useState<ShellInfo | null>(null);
  const [db, setDb] = useState<DbStatus | null>(null);

  useEffect(() => {
    const api = getSlidApi();
    let cancelled = false;
    void (async () => {
      const [shellInfo, dbStatus] = await Promise.all([
        api.getShellInfo(),
        api.getDbStatus(),
      ]);
      if (!cancelled) {
        setShell(shellInfo);
        setDb(dbStatus);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="einstellungen">
      <PlaceholderPage
        title="Einstellungen"
        contextLabel="Einstellungen"
        description="Einstellungen für Nutzerkonto, Standort und Darstellung folgen später. Der Prototyp zeigt nur den Menüpunkt."
        upcoming={[
          "Nutzer- und Rollenverwaltung",
          "Standort- und Schulkonfiguration",
          "Darstellung und Barrierefreiheit",
        ]}
      />

      <section className="einstellungen__tech" aria-label="Technischer Status Stufe 1">
        <h2 className="einstellungen__tech-title">Technischer Status (Stufe 1)</h2>
        <p className="einstellungen__tech-lead">
          Nur Diagnose der Electron-/DB-Vorbereitung — keine Benutzerverwaltung und
          kein echtes Kinderprofil-System.
        </p>
        <dl className="einstellungen__tech-grid">
          <div>
            <dt>Laufzeit</dt>
            <dd>{shell ? `${shell.runtime} (${shell.platform})` : "…"}</dd>
          </div>
          <div>
            <dt>DB-Status</dt>
            <dd>{db?.state ?? "…"}</dd>
          </div>
          <div>
            <dt>Diagnostik-Modus</dt>
            <dd>
              {shell
                ? shell.diagnosticMode
                  ? "an (SLID_DIAGNOSTIC)"
                  : "aus — keine lokalen Pfade im Renderer"
                : "…"}
            </dd>
          </div>
          <div className="einstellungen__tech-span">
            <dt>Hinweis</dt>
            <dd>{db?.message ?? "…"}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
