import { eventMock } from "@/data/event/event";
import { photoMock } from "@/data/photo/photo";
import { EventSlide } from "@/types/event/eventSlide";

const DELAY_MS = 300;
const FALLBACK_IMAGE = "/img/hero/eventos-img.png";

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