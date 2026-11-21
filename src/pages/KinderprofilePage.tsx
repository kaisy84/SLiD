import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ChildCard } from "../components/ChildCard";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import {
  children,
  getChildById,
  previousTestsByChild,
  timelineByChild,
} from "../data/sampleData";
import "./KinderprofilePage.css";

export function KinderprofilePage() {
  const { childId } = useParams();
  const selectedId = childId ?? children[0]?.id;
  const selected = useMemo(
    () => (selectedId ? getChildById(selectedId) : undefined),
    [selectedId],
  );

  if (!selectedId) {
    return <Navigate to="/" replace />;
  }

  if (!selected) {
    return <Navigate to={`/kinderprofile/${children[0].id}`} replace />;
  }

  if (!childId) {
    return <Navigate to={`/kinderprofile/${selected.id}`} replace />;
  }

  const previousTests = previousTestsByChild[selected.id] ?? [];
  const timeline = timelineByChild[selected.id] ?? [];

  return (
    <div className="profiles">
      <PageHeader title="Kinderprofile" contextLabel="Kinderprofile" />

      <section aria-labelledby="select-title">
        <h2 id="select-title" className="section-title">
          Profile auswählen
        </h2>
        <div className="child-grid">
          {children.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              selected={child.id === selected.id}
              to={`/kinderprofile/${child.id}`}
            />
          ))}
        </div>
      </section>

      <section className="profile-detail" aria-labelledby="detail-title">
        <div className="profile-detail__header">
          <h2 id="detail-title" className="section-title">
            Profilansicht
          </h2>
          <nav className="profile-tabs" aria-label="Profilbereiche">
            <span className="profile-tabs__item profile-tabs__item--active">
              Stammdaten
            </span>
            <span className="profile-tabs__item">Diagnosen</span>
            <span className="profile-tabs__item">Testungen</span>
            <span className="profile-tabs__item">Verlauf</span>
          </nav>
        </div>

        <div className="profile-detail__grid">
          <article className="detail-card">
            <h3 className="detail-card__title">{selected.displayName}</h3>
            <dl className="detail-list">
              <div>
                <dt>Geburtsdatum</dt>
                <dd>{selected.birthDate}</dd>
              </div>
              <div>
                <dt>Klassenstufe</dt>
                <dd>{selected.grade}</dd>
              </div>
              <div>
                <dt>Schule</dt>
                <dd>{selected.school}</dd>
              </div>
              <div>
                <dt>Dokumentierte Diagnose</dt>
                <dd>{selected.diagnosis}</dd>
              </div>
            </dl>
          </article>

          <article className="detail-card">
            <h3 className="detail-card__title">Bisherige Testungen</h3>
            <ul className="test-list">
              {previousTests.map((test) => (
                <li key={`${test.date}-${test.label}`} className="test-list__item">
                  <div>
                    <p className="test-list__label">{test.label}</p>
                    <p className="test-list__date">{test.date}</p>
                  </div>
                  <StatusBadge status={test.status} />
                </li>
              ))}
            </ul>

            <h3 className="detail-card__title detail-card__title--spaced">
              Verlaufsübersicht
            </h3>
            <ol className="timeline">
              {timeline.map((event) => (
                <li key={`${event.date}-${event.description}`} className="timeline__item">
                  <span className="timeline__dot" aria-hidden="true" />
                  <div>
                    <p className="timeline__date">{event.date}</p>
                    <p className="timeline__text">{event.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </section>
    </div>
  );
}
