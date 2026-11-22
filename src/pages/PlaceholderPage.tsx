import { PageHeader } from "../components/PageHeader";
import "./PlaceholderPage.css";

interface PlaceholderPageProps {
  title: string;
  contextLabel: string;
  description: string;
  upcoming: string[];
}

export function PlaceholderPage({
  title,
  contextLabel,
  description,
  upcoming,
}: PlaceholderPageProps) {
  return (
    <div className="placeholder">
      <PageHeader title={title} contextLabel={contextLabel} />

      <section className="placeholder__panel">
        <p className="placeholder__lead">{description}</p>
        <h2 className="section-title">Geplante Inhalte</h2>
        <ul className="placeholder__list">
          {upcoming.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="placeholder__note">
          Keine Fachlogik in diesem Prototyp – nur Navigations- und Layoutstruktur.
        </p>
      </section>
    </div>
  );
}
