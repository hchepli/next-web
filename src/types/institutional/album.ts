// Álbum de fotos da galeria (RF08). Atualização de RN03: um álbum pode
// estar vinculado a um evento (eventId preenchido) ou ser um grupo de
// fotos avulso, sem evento (eventId null). Ver observação no chat sobre
// atualizar RN03 no documento de requisitos.
export interface Album {
  id: string;
  slug: string;
  // Se vinculado a um evento, o ideal é usar o nome/descrição do evento
  // aqui (mantidos como cópia simples por enquanto, sem join automático).
  // Se não houver evento, é o título/descrição definidos direto no álbum.
  title: string;
  description: string | null;
  eventId: string | null;
  coverUrl: string | null;
}

export type CreateAlbumInput = Omit<Album, "id">;

export type UpdateAlbumInput = Partial<CreateAlbumInput>;
