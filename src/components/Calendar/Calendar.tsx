import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarItems from '../CalendarItems/CalendarItems';
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
} from 'date-fns';
import { useMemo, useState } from 'react';
import './Calendar.css';
import EventFormModal from '../EventFormModal/EventFormModal';
// import { UseEvents } from '../../hooks/useEvents';
const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  // const { addEvent } = UseEvents();

  const calendarDays = useMemo(() => {
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth));
    const LastWeekEnd = endOfWeek(endOfMonth(selectedMonth));
    console.log('firstWeekStart', firstWeekStart);
    console.log('LastWeekEnd', LastWeekEnd);
    return eachDayOfInterval({
      start: firstWeekStart,
      end: LastWeekEnd,
    });
  }, [selectedMonth]);
  console.log(calendarDays);
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
            addEvent={() => null}
          />
        ))}
      </div>
      <EventFormModal
        date={selectedMonth}
        isOpen={isFormModalOpen}
        onSubmit={() => null}
        onClose={() => setIsFormModalOpen(false)}
      />
    </div>
  );
};

export default Calendar;
