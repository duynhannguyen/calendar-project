import { endOfDay, isBefore, isSameMonth, isToday } from 'date-fns';
import { cc } from '../../utils/cc';
import { formatDate } from '../../utils/formatDate';
import './CalendarItems.css';
import { Dispatch, SetStateAction } from 'react';
import { UnionOmit } from '../../utils/types';
type CalendarItemsProps = {
  day: Date;
  showWeekName: boolean;
  selectedMonth: Date;
  setIsFormModalOpen: Dispatch<SetStateAction<boolean>>;
  isFormModalOpen: boolean;
  addEvent: (event: UnionOmit<Event, 'id'>) => void;
};
const CalendarItems = ({
  day,
  showWeekName,
  selectedMonth,
  setIsFormModalOpen,
}: CalendarItemsProps) => {
  return (
    <div
      className={cc(
        'calendar-items',
        !isSameMonth(day, selectedMonth) && 'not-month-day',
        isBefore(endOfDay(day), new Date()) && 'old-month-day'
      )}
    >
      <button className="button-add" onClick={() => setIsFormModalOpen(true)}>
        +
      </button>
      {showWeekName ? <div>{formatDate(day, { weekday: 'short' })}</div> : null}

      <div className={cc(isToday(day) && 'today')}>
        {formatDate(day, { day: 'numeric' })}
      </div>
    </div>
  );
};

export default CalendarItems;
