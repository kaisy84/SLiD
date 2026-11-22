import { Link } from "react-router-dom";
import type { ChildProfile } from "../data/sampleData";
import { StatusBadge } from "./StatusBadge";
import "./ChildCard.css";

interface ChildCardProps {
  child: ChildProfile;
  selected?: boolean;
  to?: string;
}

export function ChildCard({ child, selected = false, to }: ChildCardProps) {
  const content = (
    <>
      <div className="child-card__top">
        <h3 className="child-card__name">{child.displayName}</h3>
        <StatusBadge status={child.status} />
      </div>
      <p className="child-card__meta">
        {child.grade} · {child.school}
      </p>
      <p className="child-card__edited">Zuletzt bearbeitet: {child.lastEdited}</p>
    </>
  );

  const className = selected
    ? "child-card child-card--selected"
    : "child-card";

  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
