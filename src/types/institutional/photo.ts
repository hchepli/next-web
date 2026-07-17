export interface Photo {
  id: string;
  eventId: string;
  url: string;
  description: string | null;
  isCover: boolean;
}

export type CreatePhotoInput = Omit<Photo, "id">;

export type UpdatePhotoInput = Partial<CreatePhotoInput>;