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
const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const calendarDays = useMemo(() => {
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth));
    const LastWeekEnd = endOfWeek(endOfMonth(selectedMonth));
    return eachDayOfInterval({
      start: firstWeekStart,
      end: LastWeekEnd,
    });
  }, [selectedMonth]);
  console.log(calendarDays);
  return (
    <div>
      <CalendarHeader />
      <div className="calendar-container">
        {calendarDays.map((day, index) => (
          <CalendarItems
            key={day.getTime()}
            day={day}
            showWeekName={index < 7}
            selectedMonth={selectedMonth}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
