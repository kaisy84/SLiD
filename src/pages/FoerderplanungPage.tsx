import { PlaceholderPage } from "./PlaceholderPage";

export function FoerderplanungPage() {
  return (
    <PlaceholderPage
      title="Förderplanung"
      contextLabel="Förderplanung"
      description="Hier entsteht später die Ableitung individueller Förderziele aus dokumentierten Diagnostiken."
      upcoming={[
        "Förderziele je Kind und Kompetenzbereich",
        "Maßnahmen und Verantwortlichkeiten",
        "Überprüfung und Fortschreibung",
      ]}
    />
  );
}
