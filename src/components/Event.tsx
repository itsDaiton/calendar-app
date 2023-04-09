import { EventType } from '../../utils/data';

type EventProps = {
  event: EventType;
  height: string;
  top: string;
  width: string;
  left: string;
  eventsPerDay: number;
  setShowModalSingleEvent: (value: React.SetStateAction<boolean>) => void
  showModalSingleEvent: boolean;
  setSelectedEvent: (value: React.SetStateAction<EventType | undefined>) => void
}

const Event = ({ event, height, top, width, left, eventsPerDay, setSelectedEvent, setShowModalSingleEvent, showModalSingleEvent }: EventProps) => {

  return (
    <div
      className={`absolute ${event.color} rounded-xl pt-2 pl-2 text-white font-poppins font-medium cursor-pointer`}
      style={{ top, left, height, width }}
      onClick={() => {
        setSelectedEvent(event)
        setShowModalSingleEvent(true)
      }} 
    >
      <div>
        {eventsPerDay > 2 ? '' :
        <div>
          <p>{event.title}</p>
          <p>{event.from.format('HH:mm')} - {event.to.format('HH:mm')}</p> 
        </div>
        }
      </div>
    </div>
  )
}

export default Event