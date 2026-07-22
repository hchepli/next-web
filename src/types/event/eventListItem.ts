export type EventStatus = "past" | "today" | "future";

export interface EventListItem {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  startDate: string; // ISO date string
  endDate: string | null;
  image: string;
  status: EventStatus;
}
