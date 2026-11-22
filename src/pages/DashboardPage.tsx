import { Link } from "react-router-dom";
import { ChildCard } from "../components/ChildCard";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { children, diagnosticOverview } from "../data/sampleData";
import "./DashboardPage.css";

export function DashboardPage() {
  return (
    <div className="dashboard">
      <PageHeader title="Übersicht" contextLabel="Übersicht" />

      <section className="dashboard__welcome" aria-label="Willkommen">
        <p>
          Willkommen in SLiD. Übersicht über Kinderprofile und den Stand
          dokumentierter Diagnostiken. Dieser Prototyp zeigt ausschließlich die
          Oberflächenstruktur.
        </p>
      </section>

      <section className="dashboard__section" aria-labelledby="schnellzugriff-title">
        <h2 id="schnellzugriff-title" className="section-title">
          Schnellzugriff
        </h2>
        <div className="quick-actions">
          <Link to="/kinderprofile" className="quick-action">
            <span className="quick-action__label">Kinderprofil öffnen</span>
            <span className="quick-action__hint">
              Zu den hinterlegten Beispielprofilen wechseln
            </span>
          </Link>
          <Link to="/diagnostik" className="quick-action">
            <span className="quick-action__label">Neue Diagnostik</span>
            <span className="quick-action__hint">
              Zur Modulübersicht SLiD-L und SLiD-S
            </span>
          </Link>
        </div>
      </section>

      <section className="dashboard__section" aria-labelledby="recent-title">
        <h2 id="recent-title" className="section-title">
          Zuletzt bearbeitete Kinderprofile
        </h2>
        <div className="child-grid">
          {children.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              to={`/kinderprofile/${child.id}`}
            />
          ))}
        </div>
      </section>

      <section className="dashboard__section" aria-labelledby="diagnostics-title">
        <h2 id="diagnostics-title" className="section-title">
          Laufende und abgeschlossene Diagnostiken
        </h2>
        <div className="table-panel">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Kind</th>
                <th scope="col">Bereich</th>
                <th scope="col">Module</th>
                <th scope="col">Status</th>
                <th scope="col">Datum</th>
              </tr>
            </thead>
            <tbody>
              {diagnosticOverview.map((row) => (
                <tr key={`${row.childId}-${row.date}`}>
                  <td>
                    <Link
                      to={`/kinderprofile/${row.childId}`}
                      className="table-link"
                    >
                      {row.childName}
                    </Link>
                  </td>
                  <td>{row.area}</td>
                  <td>{row.modules}</td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
