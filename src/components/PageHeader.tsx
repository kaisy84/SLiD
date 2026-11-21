import "./PageHeader.css";

interface PageHeaderProps {
  title: string;
  contextLabel: string;
}

export function PageHeader({ title, contextLabel }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header__brand">
        <p className="page-header__logo">SLiD</p>
        <p className="page-header__fullname">
          Schriftsprachliche Lern- und Individualdiagnostik
        </p>
      </div>
      <div className="page-header__meta" aria-label="Kontext">
        <span>{contextLabel}</span>
        <span className="page-header__divider" aria-hidden="true">
          |
        </span>
        <span>Prototyp – nur Oberflächenstruktur</span>
      </div>
      <div className="page-header__title-row">
        <h1 className="page-header__title">{title}</h1>
      </div>
    </header>
  );
}
