export type DiagnosticStatus = "laufend" | "abgeschlossen" | "geplant";

/** Fachärztlich bestätigte Diagnose (nicht Verdacht). */
export interface ConfirmedDiagnosis {
  label: string;
  diagnosedOn: string;
  practice: string;
}

export interface ChildProfile {
  id: string;
  displayName: string;
  birthDate: string;
  grade: string;
  school: string;
  /** Nur bestätigte medizinische Diagnosen; leer = keine dokumentiert. */
  confirmedDiagnoses: ConfirmedDiagnosis[];
  /** Verdacht / Beobachtungen — getrennt von dokumentierten Diagnosen. */
  suspicionOrObservation: string;
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

export interface DiagnosticSubModule {
  code: string;
  title: string;
  description: string;
}

export interface DiagnosticModule {
  code: string;
  title: string;
  description: string;
  subModules?: DiagnosticSubModule[];
}

export const children: ChildProfile[] = [
  {
    id: "kind-01",
    displayName: "Elena M.",
    birthDate: "12.03.2016",
    grade: "4. Klasse",
    school: "Grundschule Am Park",
    confirmedDiagnoses: [],
    suspicionOrObservation:
      "Auffälligkeiten beim Lesen und Schreiben; LRS-Verdacht durch Schule gemeldet, noch keine fachärztliche Abklärung.",
    status: "laufend",
    lastEdited: "14.10.2025",
  },
  {
    id: "kind-02",
    displayName: "Jonas K.",
    birthDate: "28.08.2013",
    grade: "6. Klasse",
    school: "Realschule Nord",
    confirmedDiagnoses: [
      {
        label: "Lese- und Rechtschreibstörung (ICD-10 F81.0)",
        diagnosedOn: "15.02.2024",
        practice: "Praxis Dr. Weber, Kinder- und Jugendpsychiatrie, Hamburg",
      },
    ],
    suspicionOrObservation: "Keine offenen Verdachtsmomente dokumentiert.",
    status: "abgeschlossen",
    lastEdited: "12.09.2025",
  },
  {
    id: "kind-03",
    displayName: "Mira S.",
    birthDate: "05.11.2017",
    grade: "3. Klasse",
    school: "Grundschule Weststadt",
    confirmedDiagnoses: [],
    suspicionOrObservation:
      "Lehrkraft beobachtet verlangsamtes Lesetempo; Screening geplant.",
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
    description: "Graphem-Phonem-Zuordnung und phonologische Basiskompetenzen.",
  },
  {
    code: "L2",
    title: "Lesegenauigkeit",
    description: "Lautes Lesen einzelner Wörter.",
  },
  {
    code: "L3",
    title: "Leseflüssigkeit",
    description: "Lautes Textlesen innerhalb von 60 Sekunden.",
  },
  {
    code: "L4",
    title: "Leseverständnis",
    description: "Wort-, Satz- und Textverständnis.",
  },
  {
    code: "L5",
    title: "Satz-Bild-Zuordnung",
    description:
      "Zeitbegrenztes Verfahren mit zwei Minuten Bearbeitungszeit.",
  },
];

export const slidSModules: DiagnosticModule[] = [
  {
    code: "S1",
    title: "Schriftsprachliche Grundlagen",
    description: "Basiskompetenzen der schriftsprachlichen Entwicklung.",
  },
  {
    code: "S2",
    title: "Rechtschreibleistung",
    description: "Wortdiktat.",
  },
  {
    code: "S3",
    title: "Satzdiktat",
    description: "Schreiben von Sätzen nach Gehör.",
  },
  {
    code: "S4",
    title: "Schriftlicher Ausdruck",
    description: "Freie Textproduktion und Ausdrucksfähigkeit.",
  },
  {
    code: "S5",
    title: "Schreibflüssigkeit und Grafomotorik",
    description: "Schreibtempo und grafomotorische Ausführung.",
    subModules: [
      {
        code: "S5.1",
        title: "Schreibflüssigkeit",
        description: "Tempo und Automatisierung beim Schreiben.",
      },
      {
        code: "S5.2",
        title: "Grafomotorik",
        description: "Motorische Ausführung und Schriftgestaltung.",
      },
    ],
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
