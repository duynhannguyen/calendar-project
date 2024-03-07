import { FormEvent, Fragment, useId, useRef, useState } from "react";
import { Event } from "../../context/Event";
import { formatDate } from "../../utils/formatDate";
import { UnionOmit } from "../../utils/types";
import Modal, { ModalProps } from "../Modal/Modal";
import "./EventFormModal.css";
import { EVENT_COLORS } from "../../hooks/useEvents";
type EventFormModalProps = {
  onSubmit: (event: UnionOmit<Event, "id">) => void;
} & (
  | {
      onDelete: () => void;
      event: Event;
      date?: never;
    }
  | { onDelete?: never; event?: never; date: Date }
) &
  Omit<ModalProps, "children">;
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
  const endTimeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [isAllDay, setIsAllDay] = useState(event?.allDay || false);
  const [startTime, setStartTime] = useState(event?.startTime || "");
  const formId = useId();
  const isNew = event == null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const endTime = endTimeRef.current?.value;

    if (name == null || name === "") {
      return;
    }
    const commonProps = {
      name,
      date: date || event?.date,
      color: selectedColor,
    };
    let newEvent: UnionOmit<Event, "id">;
    if (isAllDay) {
      newEvent = { ...commonProps, allDay: true };
    } else {
      if (
        startTime == null ||
        startTime === "" ||
        endTime == null ||
        endTime === ""
      ) {
        return;
      }
      newEvent = { ...commonProps, startTime, endTime, allDay: false };
    }
    onSubmit(newEvent);
    modalProps.onClose();
  };
  return (
    <Modal {...modalProps}>
      <div>
        <div className="modal-title">
          <div>Add Event</div>
          <small>
            {formatDate(date || event.date, { dateStyle: "short" })}
          </small>
          <button className="close-btn" onClick={modalProps.onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor={`${formId}-name`}>Name</label>
            <input type="text" id={`${formId}-name`} ref={nameRef} />
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
                ref={endTimeRef}
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
              {isNew ? "Add" : "Edit"}
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
