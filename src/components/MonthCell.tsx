import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { EventType } from '../../utils/data';
import ModalEvents from './ModalEvents';
import ModalOperations from './ModalOperations';
import ModalSingleEvent from './ModalSingleEvent';
import EventBox from './EventBox';
import ButtonMore from './ButtonMore';

type CalendarCellProps = {
  date: dayjs.Dayjs;
  numberOfRows: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  year: number;
  month: number;
  week: number;
  view: string;
}

export const loadEvents = (): EventType[] => {
  const data: string | null = localStorage.getItem('events')
  if (data) {
    const items: EventType[] = JSON.parse(data)
    return items.map((event: EventType) => ({
      id: event.id,
      title: event.title,
      from: dayjs(event.from),
      to: dayjs(event.to),
      color: event.color
    }))
  } 
  else {
    return []
  }
}

const MonthCell = ({ date, numberOfRows, isCurrentMonth, isToday, year, week, month, view }: CalendarCellProps) => {

  const [showModalEvents, setShowModalEvents] = useState<boolean>(false)
  const [showModalOperationsAdd, setShowModalOperationsAdd] = useState<boolean>(false)
  const [showModalOperationsEdit, setShowModalOperationsEdit] = useState<boolean>(false)
  const [showModalSingleEvent, setShowModalSingleEvent] = useState<boolean>(false)
  const [events, setEvents] = useState<EventType[]>([])
  const [selectedEvent, setSelectedEvent] = useState<EventType>()
  
  const addEvent = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      setShowModalOperationsAdd(true)
    }
  }

  useEffect(() => {
    const items: EventType[] = loadEvents()
    setEvents(items)
  }, [showModalOperationsAdd, showModalOperationsEdit, showModalSingleEvent, year, month, week, view])

  const sameDayEvents: EventType[] = events.filter(
    (event) => date.isSame(event.from, 'date')).sort(
      (a, b) => dayjs(a.from).diff(dayjs(b.from)
    )
  )

  const eventBoxes: JSX.Element[] = sameDayEvents.slice(0, 2).map((event, index) => {
    const startTime: string = event.from.format('HH:mm')
    const endTime: string = event.to.format('HH:mm')
    return (
      <EventBox
        key={index}
        event={event}
        start={startTime}
        end={endTime}
        setSelectedEvent={setSelectedEvent}
        setShowModalSingleEvent={setShowModalSingleEvent}
      />
    )
  })

  const moreButton: JSX.Element | null =
    sameDayEvents.length > 2 ? (
      <ButtonMore
        setShowModalEvents={setShowModalEvents}
      />
    ) : null

  return (
    <div
      className={`w-[14.28%] md:px-4 px-1 flex justify-start font-poppins md:text-[16px] es:text-[14px] text-[12px] font-medium border-b-2 border-r-2 flex-col
      ${isCurrentMonth ? 'text-black' : 'text-slate-400'}
      ${numberOfRows === 6 ? 'h-1/6' : 'h-1/5'}`}
      onClick={addEvent}
    >   
      <div 
        className={`md:w-[10px] w-[5px] md:h-[10px] h-[5px] md:p-5 p-3 mt-1 flex items-center justify-center rounded-full cursor-default 
        ${isToday ? 'bg-purple-700 text-white' : ''}`}
      >
        <p>{date.date()}</p>
      </div>
      <div className='flex flex-col mt-3'>
        {eventBoxes}
        {moreButton} 
      </div>
      {showModalEvents &&
        <ModalEvents 
          events={sameDayEvents} 
          setShowModalEvents={setShowModalEvents}
          showModalEvents={showModalEvents}
          setShowModalSingleEvent={setShowModalSingleEvent}
          date={date}
          setSelectedEvent={setSelectedEvent}
        />  
      }
      {showModalOperationsAdd &&
        <ModalOperations
          mode='add'
          date={date} 
          setShowModal={setShowModalOperationsAdd} 
          showModal={showModalOperationsAdd}
          view={view}
        />  
      }
      {(showModalOperationsEdit && selectedEvent) &&
        <ModalOperations
          mode='edit'
          date={selectedEvent?.from} 
          setShowModal={setShowModalOperationsEdit} 
          showModal={showModalOperationsEdit}
          event={selectedEvent}
          view={view}
        />  
      }
      {(showModalSingleEvent && selectedEvent) &&
        <ModalSingleEvent
          setShowModalSingleEvent={setShowModalSingleEvent}
          showModalSingleEvent={showModalSingleEvent}
          setShowModalOpeartions={setShowModalOperationsEdit}
          event={selectedEvent}
        />
      }
    </div>
  )
}

export default MonthCell