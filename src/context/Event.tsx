import { ReactNode, createContext } from "react";
import { UnionOmit } from "../utils/types";
import { EVENT_COLORS } from "../hooks/useEvents";
import useLocalStorage from "../hooks/useLocalStorage";

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
  updateEvent: (id: string, eventDetails: UnionOmit<Event, "id">) => void;
  deleteEvent: (id: string) => void;
};
export const Context = createContext<EventsContext | null>(null);

type EventsProviderProps = {
  children: ReactNode;
};

export const EventsProvider = ({ children }: EventsProviderProps) => {
  const [events, setEvents] = useLocalStorage("EVENTS", []);

  const addEvent = (event: UnionOmit<Event, "id">) => {
    setEvents((e) => [...e, { ...event, id: crypto.randomUUID() }]);
  };
  const updateEvent = (id: string, eventDetails: UnionOmit<Event, "id">) => {
    setEvents((e) => {
      return e.map((event) =>
        event.id === id ? { id, ...eventDetails } : event
      );
    });
  };
  const deleteEvent = (id: string) => {
    setEvents((e) => e.filter((event) => event.id !== id));
  };

  return (
    <Context.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </Context.Provider>
  );
};
