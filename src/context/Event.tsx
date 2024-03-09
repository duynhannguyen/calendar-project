import { ReactNode, createContext, useState } from "react";
import { UnionOmit } from "../utils/types";
import { EVENT_COLORS } from "../hooks/useEvents";

export type Event = {
  id: string;
  name: string;
  color: (typeof EVENT_COLORS)[number];
  date: Date;
} & (
  | { allDay: false; startTime: string; endTime: string }
  | { allDay: true; startTime?: never; endTime?: never }
);
type EventsContext = {
  events: Event[];
  addEvent: (event: UnionOmit<Event, "id">) => void;
};
export const Context = createContext<EventsContext | null>(null);

type EventsProviderProps = {
  children: ReactNode;
};

export const EventsProvider = ({ children }: EventsProviderProps) => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: UnionOmit<Event, "id">) => {
    setEvents((e) => [...e, { ...event, id: crypto.randomUUID() }]);
  };

  return (
    <Context.Provider value={{ events, addEvent }}>{children}</Context.Provider>
  );
};
