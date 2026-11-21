import { PlaceholderPage } from "./PlaceholderPage";

export function BerichtePage() {
  return (
    <PlaceholderPage
      title="Berichte"
      contextLabel="Berichte"
      description="Berichte und Dokumentationen werden in einer späteren Phase angebunden. Diese Ansicht dient der Navigation und Struktur."
      upcoming={[
        "Diagnoseberichte und Verlaufsdokumente",
        "Export- und Druckvorlagen",
        "Freigabe an Schule und Erziehungsberechtigte",
      ]}
    />
  );
}
