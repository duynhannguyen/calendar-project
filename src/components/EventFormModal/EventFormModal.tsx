import { Event } from '../../context/Event';
import { UnionOmit } from '../../utils/types';
import Modal, { ModalProps } from '../Modal/Modal';
import './EventFormModal.css';
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
  return (
    <Modal {...modalProps}>
      <div>
        <div className="modal-title">
          6/8/23
          <button className="close-btn" onClick={modalProps.onClose}>
            ×
          </button>
        </div>
        <div className="events">
          <button className="all-day-event green event">
            <div className="event-name">Short</div>
          </button>
          <button className="event">
            <div className="color-dot blue" />
            <div className="event-time">7am</div>
            <div className="event-name">Event Name</div>
          </button>
          <button className="event">
            <div className="color-dot green" />
            <div className="event-time">8am</div>
            <div className="event-name">Event Name</div>
          </button>
          <button className="event">
            <div className="color-dot blue" />
            <div className="event-time">9am</div>
            <div className="event-name">Event Name</div>
          </button>
          <button className="event">
            <div className="color-dot blue" />
            <div className="event-time">10am</div>
            <div className="event-name">Event Name</div>
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default EventFormModal;
