import { User } from "../user/user";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string,
  image: string | null; // imagem própria do comunicado (coluna "imagem" na tabela comunicados)
  authorId: string | null;
  author?: User; // populado quando a API fizer join/include
  publishedAt: string; // ISO date string
}

export type CreateAnnouncementInput = Omit<Announcement, "id" | "author" | "publishedAt">;

export type UpdateAnnouncementInput = Partial<CreateAnnouncementInput>;
