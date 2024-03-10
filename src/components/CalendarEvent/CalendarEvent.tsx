import { parse } from "date-fns";
import { Event } from "../../context/Event";
import { cc } from "../../utils/cc";
import { formatDate } from "../../utils/formatDate";
import "../CalendarItems/CalendarItems.css";
import { useState } from "react";
import EventFormModal from "../EventFormModal/EventFormModal";
import { UseEvents } from "../../hooks/useEvents";
type CalendarEventProps = {
  event: Event;
};

const CalendarEvent = ({ event }: CalendarEventProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const { updateEvent, deleteEvent } = UseEvents();
  return (
    <>
      <button
        className={cc("event", event.color, event.allDay && "all-day-event")}
        onClick={() => setIsEdit(true)}
      >
        {event.allDay ? (
          <div className="event-name">{event.name}</div>
        ) : (
          <>
            <div className={cc("color-dot", event.color)} />
            <div className="event-time">
              {formatDate(parse(event.startTime, "HH:mm", event.date), {
                timeStyle: "short",
              })}
            </div>
            <div className="event-name">{event.name}</div>
          </>
        )}
      </button>
      <EventFormModal
        event={event}
        isOpen={isEdit}
        onSubmit={(e) => updateEvent(event.id, e)}
        onDelete={() => deleteEvent(event.id)}
        onClose={() => setIsEdit(false)}
      />
    </>
  );
};

export default CalendarEvent;
