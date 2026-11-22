import { PlaceholderPage } from "./PlaceholderPage";

export function EinstellungenPage() {
  return (
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
  );
}
