import { endOfDay, isBefore, isSameMonth, isToday } from "date-fns";
import { cc } from "../../utils/cc";
import { formatDate } from "../../utils/formatDate";
import "./CalendarItems.css";
import { Dispatch, SetStateAction, useMemo } from "react";
import { UnionOmit } from "../../utils/types";
import { Event } from "../../context/Event";
import CalendarEvent from "../CalendarEvent/CalendarEvent";
type CalendarItemsProps = {
  day: Date;
  showWeekName: boolean;
  selectedMonth: Date;
  setIsFormModalOpen: Dispatch<SetStateAction<boolean>>;
  setGetDate: Dispatch<SetStateAction<Date>>;
  isFormModalOpen: boolean;
  events: Event[];
  addEvent: (event: UnionOmit<Event, "id">) => void;
};
const CalendarItems = ({
  day,
  showWeekName,
  selectedMonth,
  setIsFormModalOpen,
  setGetDate,
  events,
}: CalendarItemsProps) => {
  const sortedEvent = useMemo(() => {
    const timeToNUmber = (time: string) => parseFloat(time.replace(":", "."));

    return [...events].sort((a, b) => {
      if (a.allDay && b.allDay) {
        return 0;
      } else if (a.allDay) {
        return -1;
      } else if (b.allDay) {
        return 1;
      } else {
        return timeToNUmber(a.startTime) - timeToNUmber(b.startTime);
      }
    });
  }, [events]);

  return (
    <div
      className={cc(
        "calendar-items",
        !isSameMonth(day, selectedMonth) && "not-month-day",
        isBefore(endOfDay(day), new Date()) && "old-month-day",
        events.length > 3 && "scrolling"
      )}
    >
      <button
        type="button"
        className="button-add"
        onClick={() => {
          setIsFormModalOpen(true), setGetDate(day);
        }}
      >
        +
      </button>
      {showWeekName ? <div>{formatDate(day, { weekday: "short" })}</div> : null}

      <div className={cc(isToday(day) && "today")}>
        {formatDate(day, { day: "numeric" })}
      </div>

      {sortedEvent.map((event) => (
        <div key={event.id} className="events">
          <CalendarEvent key={event.id} event={event} />
        </div>
      ))}
    </div>
  );
};

export default CalendarItems;
