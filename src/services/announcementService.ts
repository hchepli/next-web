import { announcementMock } from "@/data/event/announcement";
import { Announcement } from "@/types/event/announcement";

const DELAY_MS = 300;
const SIDEBAR_LIMIT = 2;

function sortByPublishedAtDesc(announcements: Announcement[]): Announcement[] {
  return [...announcements].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

// "Destaque" não é uma coluna na tabela comunicados — é regra de negócio do front:
// o comunicado mais recente vira o destaque (hero) da página.
// TODO: quando o backend existir, trocar o corpo por:
// const response = await fetch("/api/comunicados?sort=recentes&limit=1");
// return (await response.json())[0] ?? null;
export async function getFeaturedAnnouncement(): Promise<Announcement | null> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  const sorted = sortByPublishedAtDesc(announcementMock);
  return sorted[0] ?? null;
}

// TODO: quando o backend existir, trocar o corpo por:
// const response = await fetch(`/api/comunicados?sort=recentes&offset=1&limit=${limit}`);
// return response.json();
export async function getSidebarAnnouncements(
  limit: number = SIDEBAR_LIMIT
): Promise<Announcement[]> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  const sorted = sortByPublishedAtDesc(announcementMock);
  return sorted.slice(1, 1 + limit);
}

// Retorna todos os comunicados restantes (após destaque + sidebar), sem limite —
// a paginação de quantos aparecem por vez é feita no front (grid de 4 colunas no desktop).
// TODO: quando o backend existir, trocar o corpo por:
// const response = await fetch(`/api/comunicados?sort=recentes&offset=${1 + SIDEBAR_LIMIT}`);
// return response.json();
export async function getCarouselAnnouncements(): Promise<Announcement[]> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  const sorted = sortByPublishedAtDesc(announcementMock);
  const offset = 1 + SIDEBAR_LIMIT;
  return sorted.slice(offset);
}
