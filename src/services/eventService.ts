import { eventMock } from "@/data/event/event";
import { photoMock } from "@/data/photo/photo";
import { EventSlide } from "@/types/event/eventSlide";
import { EventListItem, EventStatus } from "@/types/event/eventListItem";

const DELAY_MS = 300;
const FALLBACK_IMAGE = "/img/hero/eventos-img.png";

function getEventStatus(startDate: string, endDate: string | null): EventStatus {
  const now = new Date();
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : start;

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  if (isSameDay(start, now) || (now >= start && now <= end)) return "today";
  if (end < now) return "past";
  return "future";
}

// TODO: quando o backend existir, trocar o corpo por:
// const response = await fetch("/api/home/upcoming-events");
// return response.json();
export async function getUpcomingEventSlides(): Promise<EventSlide[]> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  const now = new Date();

  return eventMock
    .filter((event) => new Date(event.startDate) >= now)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map((event) => {
      const cover = photoMock.find((photo) => photo.eventId === event.id && photo.isCover);
      return {
        id: event.id,
        image: cover?.url ?? FALLBACK_IMAGE,
        titleLines: [event.name.toUpperCase()],
        description: event.description ?? "",
        cardTitle: event.name,
        cardDescription: event.description ?? "",
      };
    });
}

// Retorna todos os eventos (passados e futuros) para a página /eventos,
// já com imagem de capa resolvida e status calculado (passado/hoje/futuro),
// ordenados cronologicamente (mais antigo -> mais recente) para agrupar por mês no front.
// TODO: quando o backend existir, trocar o corpo por:
// const response = await fetch("/api/eventos");
// return response.json();
export async function getAllEventsWithStatus(): Promise<EventListItem[]> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  return [...eventMock]
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map((event) => {
      const cover = photoMock.find((photo) => photo.eventId === event.id && photo.isCover);
      return {
        id: event.id,
        name: event.name,
        description: event.description ?? "",
        category: event.category,
        location: event.location ?? "Local a confirmar",
        startDate: event.startDate,
        endDate: event.endDate,
        image: cover?.url ?? FALLBACK_IMAGE,
        status: getEventStatus(event.startDate, event.endDate),
      };
    });
}