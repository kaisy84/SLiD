import { PageHeader } from "../components/PageHeader";
import { slidLModules, slidSModules } from "../data/sampleData";
import "./DiagnostikPage.css";

export function DiagnostikPage() {
  return (
    <div className="diagnostics">
      <PageHeader title="Diagnostik" contextLabel="Diagnostik" />

      <p className="diagnostics__intro">
        Modulübersicht für die Lesediagnostik (SLiD-L) und die Schreibdiagnostik
        (SLiD-S). In diesem Prototyp sind die Karten reine Oberflächen –
        diagnostische Funktionen folgen später.
      </p>

      <section className="diagnostics__block" aria-labelledby="slid-l-title">
        <div className="diagnostics__block-head">
          <h2 id="slid-l-title">SLiD-L – Lesediagnostik</h2>
          <p>Module L1–L5</p>
        </div>
        <div className="module-grid">
          {slidLModules.map((module) => (
            <article key={module.code} className="module-card">
              <p className="module-card__code">{module.code}</p>
              <h3 className="module-card__title">{module.title}</h3>
              <p className="module-card__desc">{module.description}</p>
              <span className="module-card__state">Nur Anzeige</span>
            </article>
          ))}
        </div>
      </section>

      <section className="diagnostics__block" aria-labelledby="slid-s-title">
        <div className="diagnostics__block-head">
          <h2 id="slid-s-title">SLiD-S – Schreibdiagnostik</h2>
          <p>Module S1–S5 (inkl. S5.1 / S5.2)</p>
        </div>
        <div className="module-grid">
          {slidSModules.map((module) => (
            <article key={module.code} className="module-card">
              <p className="module-card__code">{module.code}</p>
              <h3 className="module-card__title">{module.title}</h3>
              <p className="module-card__desc">{module.description}</p>
              {module.subModules && module.subModules.length > 0 ? (
                <ul className="module-card__subs">
                  {module.subModules.map((sub) => (
                    <li key={sub.code}>
                      <span className="module-card__sub-code">{sub.code}</span>
                      <span className="module-card__sub-title">{sub.title}</span>
                      <span className="module-card__sub-desc">{sub.description}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <span className="module-card__state">Nur Anzeige</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
