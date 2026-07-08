// components/ui/calendar/EventCalendar.tsx
"use client";

import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import type { View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-overrides.css";

const locales = { "pt-BR": ptBR };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: ptBR }),
  getDay,
  locales,
});

const eventColors: Record<string, string> = {
  liturgia: "#E8B923",
  eventos: "#701513",
  pastorais: "#1E3A5F",
};

const events = [
  {
    title: "Missa Dominical",
    start: new Date(2026, 6, 5, 9, 0),
    end: new Date(2026, 6, 5, 10, 0),
    category: "liturgia",
  },
  {
    title: "Congresso de Famílias",
    start: new Date(2026, 6, 10, 8, 0),
    end: new Date(2026, 6, 11, 18, 0),
    category: "eventos",
  },
];

function eventPropGetter(event: any) {
  return {
    style: {
      backgroundColor: eventColors[event.category] ?? "#701513",
      borderRadius: "6px",
      border: "none",
      color: "#fff",
      fontSize: "0.75rem",
      padding: "2px 6px",
    },
  };
}

export default function EventCalendar() {
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState(new Date());

  return (
    <div className="w-full rounded-2xl border border-gray-200 p-6">
      <BigCalendar
        localizer={localizer}
        events={events}
        culture="pt-BR"
        views={["month", "week", "day"]}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        eventPropGetter={eventPropGetter}
        style={{ height: 720 }}
        messages={{
          next: "Próximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          agenda: "Agenda",
          noEventsInRange: "Nenhum evento neste período.",
        }}
      />
    </div>
  );
}