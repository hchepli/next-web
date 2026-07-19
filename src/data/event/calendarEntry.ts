import { CalendarEntry } from "@/types/event/calendarEntry";

export const calendarEntryMock: CalendarEntry[] = [
  {
    id: "calendar-entry-1",
    title: "Missa Dominical",
    start: "2026-07-05T09:00:00.000Z",
    end: "2026-07-05T10:00:00.000Z",
    category: "liturgia",
  },
  {
    id: "calendar-entry-2",
    title: "Congresso de Famílias",
    start: "2026-07-10T08:00:00.000Z",
    end: "2026-07-11T18:00:00.000Z",
    category: "eventos",
  },
  {
    id: "calendar-entry-3",
    title: "Encontro da Pastoral da Juventude",
    start: "2026-07-15T19:00:00.000Z",
    end: "2026-07-15T21:00:00.000Z",
    category: "pastorais",
  },
];
