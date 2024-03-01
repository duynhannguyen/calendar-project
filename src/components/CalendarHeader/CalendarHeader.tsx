import { MdArrowBackIosNew } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import './CalendarHeader.css';
function CalendarHeader() {
  return (
    <header>
      <div className="header-layout">
        <div className="today-button">
          <span> Today </span>
        </div>
        <div>
          <span className="arrows-container">
            <MdArrowBackIosNew />
          </span>{' '}
          <span className="arrows-container">
            <MdArrowForwardIos />
          </span>
        </div>
        <div className="current-month">June 2024</div>
      </div>
    </header>
  );
}

export default CalendarHeader;
