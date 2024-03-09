import { endOfDay, isBefore, isSameMonth, isToday } from "date-fns";
import { cc } from "../../utils/cc";
import { formatDate } from "../../utils/formatDate";
import "./CalendarItems.css";
import { Dispatch, SetStateAction } from "react";
import { UnionOmit } from "../../utils/types";
import { Event } from "../../context/Event";
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
  return (
    <div
      className={cc(
        "calendar-items",
        !isSameMonth(day, selectedMonth) && "not-month-day",
        isBefore(endOfDay(day), new Date()) && "old-month-day"
      )}
    >
      <button
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
      {events.length > 0 && (
        <div className="events">
          <button className="all-day-event blue event">
            <div className="event-name">Short</div>
          </button>
          <button className="all-day-event red event">
            <div className="event-name">
              Long Event Name That Just Keeps Going
            </div>
          </button>
          <button className="event">
            <div className="color-dot red" />
            <div className="event-time">7am</div>
            <div className="event-name">Event Name</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarItems;
