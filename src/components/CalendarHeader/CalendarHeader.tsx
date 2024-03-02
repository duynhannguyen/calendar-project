import { MdArrowBackIosNew } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import './CalendarHeader.css';
import { addMonths, subMonths } from 'date-fns';
import { formatDate } from '../../utils/formatDate';
type CalendarHeaderProps = {
  showToDay: (date: Date | ((m: Date) => Date)) => void;
  selectedMonth: Date;
};
function CalendarHeader({ showToDay, selectedMonth }: CalendarHeaderProps) {
  return (
    <header>
      <div className="header-layout">
        <button className="today-button" onClick={() => showToDay(new Date())}>
          <span> Today </span>
        </button>
        <div>
          <button
            className="arrows-container"
            onClick={() => showToDay((m: Date) => subMonths(m, 1))}
          >
            <MdArrowBackIosNew />
          </button>{' '}
          <button
            className="arrows-container"
            onClick={() => showToDay((m: Date) => addMonths(m, 1))}
          >
            <MdArrowForwardIos />
          </button>
        </div>
        <div className="current-month">
          {formatDate(selectedMonth, { month: 'long', year: 'numeric' })}
        </div>
      </div>
    </header>
  );
}

export default CalendarHeader;
