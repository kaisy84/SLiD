import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { to: "/", label: "Übersicht", end: true, icon: "overview" },
  { to: "/kinderprofile", label: "Kinderprofile", icon: "profiles" },
  { to: "/diagnostik", label: "Diagnostik", icon: "diagnostics" },
  { to: "/foerderplanung", label: "Förderplanung", icon: "planning" },
  { to: "/berichte", label: "Berichte", icon: "reports" },
  { to: "/einstellungen", label: "Einstellungen", icon: "settings" },
] as const;

function NavIcon({ name }: { name: (typeof navItems)[number]["icon"] }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "overview":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "profiles":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 19.5c1.6-3.2 4-4.8 7-4.8s5.4 1.6 7 4.8" />
        </svg>
      );
    case "diagnostics":
      return (
        <svg {...common}>
          <path d="M9 3h6" />
          <path d="M10 3v5.2L5.8 18.2A2.4 2.4 0 0 0 8 21.5h8a2.4 2.4 0 0 0 2.2-3.3L14 8.2V3" />
          <path d="M8.2 14.5h7.6" />
        </svg>
      );
    case "planning":
      return (
        <svg {...common}>
          <path d="M7 3.5h8.5L19 7v13.5H7z" />
          <path d="M15.5 3.5V7H19" />
          <path d="M9.5 12h5" />
          <path d="M9.5 15.5h5" />
        </svg>
      );
    case "reports":
      return (
        <svg {...common}>
          <path d="M5 4.5h10.5L19 8v12.5H5z" />
          <path d="M15.5 4.5V8H19" />
          <path d="M8 12h8" />
          <path d="M8 15.5h6" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3.5v2.2M12 18.3v2.2M4.8 7.5l1.9 1.1M17.3 15.4l1.9 1.1M4.8 16.5l1.9-1.1M17.3 8.6l1.9-1.1" />
        </svg>
      );
  }
}

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Hauptnavigation">
      <div className="sidebar__brand">
        <p className="sidebar__logo">SLiD</p>
        <p className="sidebar__fullname">
          Schriftsprachliche Lern- und Individualdiagnostik
        </p>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={"end" in item ? item.end : false}
            className={({ isActive }) =>
              isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
            }
          >
            <NavIcon name={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <p>Design-Prototyp – keine Testdaten</p>
      </div>
    </aside>
  );
}
