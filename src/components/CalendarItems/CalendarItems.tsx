import { endOfDay, isBefore, isSameMonth, isToday } from 'date-fns';
import { cc } from '../../utils/cc';
import { formatDate } from '../../utils/formatDate';
import './CalendarItems.css';
type CalendarItemsProps = {
  day: Date;
  showWeekName: boolean;
  selectedMonth: Date;
};
const CalendarItems = ({
  day,
  showWeekName,
  selectedMonth,
}: CalendarItemsProps) => {
  return (
    <div
      className={cc(
        'calendar-items',
        !isSameMonth(day, selectedMonth) && 'not-month-day',
        isBefore(endOfDay(day), new Date()) && 'old-month-day'
      )}
    >
      <div className="button-add">+</div>
      {showWeekName ? <div>{formatDate(day, { weekday: 'short' })}</div> : null}

      <div className={cc(isToday(day) && 'today')}>
        {formatDate(day, { day: 'numeric' })}
      </div>
    </div>
  );
};

export default CalendarItems;
