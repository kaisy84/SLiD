export type DiagnosticStatus = "laufend" | "abgeschlossen" | "geplant";

export interface ChildProfile {
  id: string;
  displayName: string;
  birthDate: string;
  grade: string;
  school: string;
  diagnosis: string;
  status: DiagnosticStatus;
  lastEdited: string;
}

export interface PreviousTest {
  date: string;
  label: string;
  status: DiagnosticStatus;
}

export interface TimelineEvent {
  date: string;
  description: string;
}

export interface DiagnosticOverviewRow {
  childId: string;
  childName: string;
  area: string;
  modules: string;
  status: DiagnosticStatus;
  date: string;
}

export interface DiagnosticModule {
  code: string;
  title: string;
  description: string;
}

export const children: ChildProfile[] = [
  {
    id: "kind-01",
    displayName: "Elena M.",
    birthDate: "12.03.2016",
    grade: "4. Klasse",
    school: "Grundschule Am Park",
    diagnosis: "Lese-Rechtschreib-Schwierigkeiten (Verdacht)",
    status: "laufend",
    lastEdited: "14.10.2025",
  },
  {
    id: "kind-02",
    displayName: "Jonas K.",
    birthDate: "28.08.2013",
    grade: "6. Klasse",
    school: "Realschule Nord",
    diagnosis: "Lese-Rechtschreib-Störung (dokumentiert)",
    status: "abgeschlossen",
    lastEdited: "12.09.2025",
  },
  {
    id: "kind-03",
    displayName: "Mira S.",
    birthDate: "05.11.2017",
    grade: "3. Klasse",
    school: "Grundschule Weststadt",
    diagnosis: "Noch keine fachärztliche Diagnose",
    status: "geplant",
    lastEdited: "01.11.2025",
  },
];

export const previousTestsByChild: Record<string, PreviousTest[]> = {
  "kind-01": [
    { date: "14.10.2025", label: "SLiD-L (teilweise)", status: "laufend" },
    { date: "02.09.2025", label: "Screening Lesen", status: "abgeschlossen" },
  ],
  "kind-02": [
    { date: "12.09.2025", label: "SLiD-L / SLiD-S vollständig", status: "abgeschlossen" },
    { date: "18.06.2025", label: "SLiD-L Module L1–L3", status: "abgeschlossen" },
  ],
  "kind-03": [
    { date: "01.11.2025", label: "Erstgespräch geplant", status: "geplant" },
  ],
};

export const timelineByChild: Record<string, TimelineEvent[]> = {
  "kind-01": [
    { date: "14.10.2025", description: "SLiD-L Module L1–L2 dokumentiert" },
    { date: "02.09.2025", description: "Screening Lesen abgeschlossen" },
    { date: "18.08.2025", description: "Erstgespräch mit Erziehungsberechtigten" },
  ],
  "kind-02": [
    { date: "12.09.2025", description: "SLiD-L und SLiD-S abgeschlossen" },
    { date: "18.06.2025", description: "Zwischenbericht an Schule übermittelt" },
    { date: "04.03.2025", description: "Diagnostik gestartet" },
  ],
  "kind-03": [
    { date: "01.11.2025", description: "Termin für Erstgespräch vereinbart" },
    { date: "20.10.2025", description: "Anfrage durch Schule eingegangen" },
  ],
};

export const diagnosticOverview: DiagnosticOverviewRow[] = [
  {
    childId: "kind-01",
    childName: "Elena M.",
    area: "SLiD-L",
    modules: "L1–L2",
    status: "laufend",
    date: "14.10.2025",
  },
  {
    childId: "kind-02",
    childName: "Jonas K.",
    area: "SLiD-L / SLiD-S",
    modules: "vollständig",
    status: "abgeschlossen",
    date: "12.09.2025",
  },
  {
    childId: "kind-03",
    childName: "Mira S.",
    area: "SLiD-L",
    modules: "—",
    status: "geplant",
    date: "01.11.2025",
  },
];

export const slidLModules: DiagnosticModule[] = [
  {
    code: "L1",
    title: "Grundlagen des Lesens",
    description: "Phonologische und graphematische Basiskompetenzen.",
  },
  {
    code: "L2",
    title: "Lesegenauigkeit",
    description: "Genaues Erfassen von Wörtern und Textstellen.",
  },
  {
    code: "L3",
    title: "Leseflüssigkeit",
    description: "Tempo und Automatisierung beim lauten und stillen Lesen.",
  },
  {
    code: "L4",
    title: "Leseverständnis",
    description: "Sinnentnahme auf Satz- und Textebene.",
  },
  {
    code: "L5",
    title: "Weitere diagnostische Leseverfahren",
    description: "Ergänzende Verfahren und vertiefende Einschätzungen.",
  },
];

export const slidSModules: DiagnosticModule[] = [
  {
    code: "S1",
    title: "Schriftsprachliche Grundlagen",
    description: "Grapheme, Laut-Buchstaben-Zuordnung und Basisschreiben.",
  },
  {
    code: "S2",
    title: "Rechtschreibleistung",
    description: "Orthografische Strategien und Fehlerschwerpunkte.",
  },
  {
    code: "S3",
    title: "Diktat",
    description: "Schreiben nach Gehör in kontrollierten Aufgaben.",
  },
  {
    code: "S4",
    title: "Freies Schreiben",
    description: "Textproduktion, Aufbau und sprachliche Mittel.",
  },
  {
    code: "S5",
    title: "Schreibflüssigkeit und Grafomotorik",
    description: "Schreibtempo, Motorik und Ausführung.",
  },
];

export const statusLabels: Record<DiagnosticStatus, string> = {
  laufend: "Laufend",
  abgeschlossen: "Abgeschlossen",
  geplant: "Geplant",
};

export function getChildById(id: string): ChildProfile | undefined {
  return children.find((child) => child.id === id);
}
