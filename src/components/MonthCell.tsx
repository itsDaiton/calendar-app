import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { EventType } from '../../utils/data';
import ModalEvents from './ModalEvents';
import ModalOperations from './ModalOperations';
import ModalSingleEvent from './ModalSingleEvent';

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

const MonthCell = ({ date, numberOfRows, isCurrentMonth, isToday, year, week, month, view }: CalendarCellProps) => {

  const [showModalEvents, setShowModalEvents] = useState<boolean>(false)
  const [showModalOperationsAdd, setShowModalOperationsAdd] = useState<boolean>(false)
  const [showModalOperationsEdit, setShowModalOperationsEdit] = useState<boolean>(false)
  const [showModalSingleEvent, setShowModalSingleEvent] = useState<boolean>(false)
  const [events, setEvents] = useState<EventType[]>([])
  const [selectedEvent, setSelectedEvent] = useState<EventType>()
  
  const loadEvents = (): EventType[] => {
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

  const addEvent = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      setShowModalOperationsAdd(true)
    }
  }

  useEffect(() => {
    const items: EventType[] = loadEvents()
    setEvents(items)
  }, [showModalOperationsAdd,, showModalOperationsEdit, showModalSingleEvent, year, month, week, view])

  const sameDayEvents: EventType[] = events.filter(
    (event) => date.isSame(event.from, 'date')).sort(
      (a, b) => dayjs(a.from).diff(dayjs(b.from)
    )
  )

  const eventBoxes: JSX.Element[] = sameDayEvents.slice(0, 2).map((event, index) => {
    const startTime = event.from.format('HH:mm')
    const endTime = event.to.format('HH:mm')
    return (
      <div 
        key={index} 
        className={`w-full h-[20px] ${event.color} rounded-md text-white font-medium text-sm mb-1 pl-1 pr-2 cursor-pointer`}
        onClick={() => {
          setSelectedEvent(event)
          setShowModalSingleEvent(true)
        }}
      >
        <span>
          {`${event.title} (${startTime} - ${endTime})`}
        </span>
      </div>
    )
  })

  const moreButton: JSX.Element | null =
    sameDayEvents.length > 2 ? (
      <div className='w-full flex justify-center mt-1'>
        <button
          className='text-blue-500 font-medium hover:text-blue-700 cursor-pointer'
          onClick={() => setShowModalEvents(true)}
        >
          More...
        </button>
      </div>
    ) : null

  return (
    <div
      className={`w-[14.28%] px-4 flex justify-start font-poppins text-[16px] font-medium border-b-2 border-r-2 flex-col
      ${isCurrentMonth ? 'text-black' : 'text-slate-400'}
      ${numberOfRows === 6 ? 'h-1/6' : 'h-1/5'}`}
      onClick={addEvent}
    >   
      <div 
        className={`w-[10px] h-[10px] p-5 mt-1 flex items-center justify-center rounded-full cursor-default 
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
          showModalSingleEvent={showModalSingleEvent}
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
        />  
      }
      {showModalOperationsEdit &&
        <ModalOperations
          mode='edit'
          date={date} 
          setShowModal={setShowModalOperationsEdit} 
          showModal={showModalOperationsEdit}
          event={selectedEvent}
        />  
      }
      {(showModalSingleEvent && selectedEvent) &&
        <ModalSingleEvent
          setShowModalSingleEvent={setShowModalSingleEvent}
          showModalSingleEvent={showModalSingleEvent}
          setShowModalOpeartions={setShowModalOperationsEdit}
          showModalOperations={showModalOperationsEdit}
          event={selectedEvent}
        />
      }
    </div>
  )
}

export default MonthCell