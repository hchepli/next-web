export type CalendarCategoryKey = "liturgia" | "eventos" | "pastorais";

export interface CalendarCategory {
  key: CalendarCategoryKey;
  label: string;
  color: string;
}

export interface CalendarEntry {
  id: string;
  title: string;
  start: string; // ISO date string
  end: string; // ISO date string
  category: CalendarCategoryKey;
}
