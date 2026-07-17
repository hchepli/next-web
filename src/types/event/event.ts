import { Mass } from "./mass";

export interface Event {
  id: string;
  name: string;
  description: string | null;
  startDate: string; // ISO date string
  endDate: string | null;
  location: string | null;
  massId: string | null; // opcional: evento pode estar ligado a uma missa
  mass?: Mass; // populado quando a API fizer join/include
}

export type CreateEventInput = Omit<Event, "id" | "mass">;

export type UpdateEventInput = Partial<CreateEventInput>;