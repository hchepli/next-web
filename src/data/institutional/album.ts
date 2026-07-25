import { Album } from "@/types/institutional/album";

export const albumMock: Album[] = [
  {
    id: "album-1",
    slug: "festa-de-natal",
    title: "Festa de Natal",
    description: "Fotos da celebração de Natal da nossa comunidade.",
    eventId: "event-5",
    coverUrl: "/img/hero/eventos-img.png",
  },
  {
    id: "album-2",
    slug: "vespera-de-ano-novo",
    title: "Véspera de Ano Novo",
    description: "Fotos da nossa véspera de Ano Novo, celebrada em comunidade.",
    eventId: "event-6",
    coverUrl: "/img/hero/vespera-ano-novo.png",
  },
  {
    id: "album-3",
    slug: "comunidade-em-imagens",
    title: "Comunidade em Imagens",
    description: "Momentos do dia a dia da paróquia, sem um evento específico associado.",
    eventId: null,
    coverUrl: "/img/galeria/1.png",
  },
  {
    id: "album-4",
    slug: "celebracoes-e-liturgia",
    title: "Celebrações e Liturgia",
    description: "Registros de missas e celebrações realizadas ao longo do ano.",
    eventId: null,
    coverUrl: "/img/galeria/3.png",
  },
];
