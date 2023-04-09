import { EventType } from '../../utils/data';

type EventProps = {
  event: EventType;
  height: string;
  top: string;
  width: string;
  left: string;
  eventsPerDay: number;
}

const Event = ({ event, height, top, width, left, eventsPerDay }: EventProps) => {

  return (
    <div
      className={`absolute ${event.color} rounded-xl pt-2 pl-2 text-gray-800`}
      style={{ top, left, height, width }}
    >
      {eventsPerDay > 2 ? '' : event.title}
    </div>
  )
}

export default Event