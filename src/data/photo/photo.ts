import { Photo } from "@/types/institutional/photo";

// Nota: só existem assets reais para os eventos abaixo; os demais eventos do
// eventMock caem no FALLBACK_IMAGE definido em eventService.ts.
export const photoMock: Photo[] = [
  {
    id: "photo-1",
    eventId: "event-5",
    url: "/img/hero/eventos-img.png",
    description: "Capa da Festa de Natal",
    isCover: true,
  },
  {
    id: "photo-2",
    eventId: "event-6",
    url: "/img/hero/vespera-ano-novo.png",
    description: "Capa da Véspera de Ano Novo",
    isCover: true,
  },
];
