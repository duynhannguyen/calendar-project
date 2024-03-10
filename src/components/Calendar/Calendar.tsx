import CalendarHeader from "../CalendarHeader/CalendarHeader";
import CalendarItems from "../CalendarItems/CalendarItems";
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import { useMemo, useState } from "react";
import "./Calendar.css";
import EventFormModal from "../EventFormModal/EventFormModal";
import { UseEvents } from "../../hooks/useEvents";
const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [getDate, setGetDate] = useState(new Date());
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const { events, addEvent } = UseEvents();
  const calendarDays = useMemo(() => {
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth));
    const LastWeekEnd = endOfWeek(endOfMonth(selectedMonth));
    return eachDayOfInterval({
      start: firstWeekStart,
      end: LastWeekEnd,
    });
  }, [selectedMonth]);

  return (
    <div>
      <CalendarHeader
        showToDay={setSelectedMonth}
        selectedMonth={selectedMonth}
      />
      <div className="calendar-container">
        {calendarDays.map((day, index) => (
          <CalendarItems
            key={day.getTime()}
            day={day}
            showWeekName={index < 7}
            selectedMonth={selectedMonth}
            setIsFormModalOpen={setIsFormModalOpen}
            isFormModalOpen={isFormModalOpen}
            setGetDate={setGetDate}
            addEvent={() => null}
            events={events.filter((event) => isSameDay(day, event.date))}
          />
        ))}
      </div>
      <EventFormModal
        date={getDate}
        isOpen={isFormModalOpen}
        onSubmit={addEvent}
        onClose={() => setIsFormModalOpen(false)}
      />
    </div>
  );
};

export default Calendar;
