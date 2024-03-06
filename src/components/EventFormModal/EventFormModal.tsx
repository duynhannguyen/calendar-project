import { Fragment, useId, useState } from 'react';
import { Event } from '../../context/Event';
import { formatDate } from '../../utils/formatDate';
import { UnionOmit } from '../../utils/types';
import Modal, { ModalProps } from '../Modal/Modal';
import './EventFormModal.css';
import { EVENT_COLORS } from '../../hooks/useEvents';
type EventFormModalProps = {
  onSubmit: (event: UnionOmit<Event, 'id'>) => void;
} & (
  | {
      onDelete: () => void;
      event: Event;
      date?: never;
    }
  | { onDelete?: never; event?: never; date: Date }
) &
  Omit<ModalProps, 'children'>;
const EventFormModal = ({
  onSubmit,
  onDelete,
  event,
  date,
  ...modalProps
}: EventFormModalProps) => {
  const [selectedColor, setSelectedColor] = useState(
    event?.color || EVENT_COLORS[0]
  );
  const [isAllDay, setIsAllDay] = useState(event?.allDay || false);
  const [startTime, setStartTime] = useState(event?.startTime || '');
  console.log('startTime', startTime);
  const formId = useId();
  const isNew = event == null;
  return (
    <Modal {...modalProps}>
      <div>
        <div className="modal-title">
          <div>Add Event</div>
          <small>
            {formatDate(date || event.date, { dateStyle: 'short' })}
          </small>
          <button className="close-btn" onClick={modalProps.onClose}>
            ×
          </button>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor={`${formId}-name`}>Name</label>
            <input type="text" id={`${formId}-name`} />
          </div>
          <div className="form-group checkbox">
            <input
              checked={isAllDay}
              onChange={(e) => setIsAllDay(e.target.checked)}
              type="checkbox"
              id={`${formId}-all-day`}
            />
            <label htmlFor={`${formId}-all-day`}>All Day?</label>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor={`${formId}-start-time`}>Start Time</label>
              <input
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                type="time"
                id={`${formId}-start-time`}
                required={!isAllDay}
                disabled={isAllDay}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`${formId}-end-time`}>End Time</label>
              <input
                min={startTime}
                type="time"
                id={`${formId}-end-time`}
                required={!isAllDay}
                disabled={isAllDay}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Color</label>
            <div className="row left">
              {EVENT_COLORS.map((color) => (
                <Fragment key={color}>
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    id={`${formId}-${color}`}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    className="color-radio"
                  />
                  <label htmlFor={`${formId}-${color}`}>
                    <span className="sr-only">{color}</span>
                  </label>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="row">
            <button className="btn btn-success" type="submit">
              {isNew ? 'Add' : 'Edit'}
            </button>
            {onDelete != null && (
              <button
                className="btn btn-delete"
                type="button"
                onClick={onDelete}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default EventFormModal;
