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
    <div className="calendar-items">
      <div className="button-add">+</div>
      {showWeekName ? <div>{formatDate(day, { weekday: 'short' })}</div> : null}
      <div>{formatDate(day, { day: 'numeric' })}</div>
    </div>
  );
};

export default CalendarItems;
