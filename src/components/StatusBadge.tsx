import type { DiagnosticStatus } from "../data/sampleData";
import { statusLabels } from "../data/sampleData";
import "./StatusBadge.css";

interface StatusBadgeProps {
  status: DiagnosticStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}
