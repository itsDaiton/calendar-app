import dayjs from 'dayjs'
import Event from './Event'
import isBetween from 'dayjs/plugin/isBetween'
import { EventType } from '../../utils/data'
import { useEffect, useState } from 'react'
import { loadEvents } from './MonthCell'
import ModalOperations from './ModalOperations'
import ModalSingleEvent from './ModalSingleEvent'

dayjs.extend(isBetween)

type CalendarCellProps = {
  hours: dayjs.Dayjs[];
  index: number;
  year: number;
  month: number;
  week: number;
  view: string;
}

const WeekCell = ({ hours, index, year, month, week, view }: CalendarCellProps) => {

  const [events, setEvents] = useState<EventType[]>([])
  const [showModalOperationsAdd, setShowModalOperationsAdd] = useState<boolean>(false)
  const [showModalOperationsEdit, setShowModalOperationsEdit] = useState<boolean>(false)
  const [showModalSingleEvent, setShowModalSingleEvent] = useState<boolean>(false)
  const [selectedHour, setSelectedHour] = useState<dayjs.Dayjs | null>()
  const [selectedEvent, setSelectedEvent] = useState<EventType>()

  useEffect(() => {
    const items: EventType[] = loadEvents()
    setEvents(items)
  }, [showModalOperationsAdd, showModalOperationsEdit, showModalSingleEvent, year, month, week, view])

  const sortedEvents: EventType[] = [...events].sort(
    (a, b) => dayjs(a.from).diff(dayjs(b.from))
  )

  const eventsPerDay: EventType[] = sortedEvents.filter(
    (event) => {
      const start: number = event.from.hour()
      const end: number = event.to.hour()
      return hours.some(hour => hour.isBetween(event.from, event.to, null, '[]')) && (start !== end)
    }
  )

  return (
    <div className={`w-[14.28%] flex flex-col relative`}>
      {hours.map((hour) => {
        return (
          <div
            key={hour.format()}
            className='h-[125px] border-b-2 border-r-2 text-sm flex justify-start p-1 items-end font-semibold'
            onClick={() => {
              setSelectedHour(hour)
              setShowModalOperationsAdd(true)
            }}
          >
            <span className='z-50'>
              {index % 7 === 0 ? hour.add(1, 'hour').format('HH:mm') : ''}
            </span>
          </div>
        )
      })}
      {eventsPerDay.map((event, i) => {
        const start: number = event.from.hour()
        const end: number = event.to.hour()
        const height: string = `${((end - start) / 24) * 100}%`
        const width: string = `${100 / eventsPerDay.length}%`
        const top: string = `${(start / 24) * 100}%`
        const left: string = `${i * (100 / eventsPerDay.length)}%`

        return (
          <Event
            key={event.id}
            event={event}
            height={height}
            width={width}
            top={top}
            left={left}
            eventsPerDay={eventsPerDay.length}
            setSelectedEvent={setSelectedEvent}
            setShowModalSingleEvent={setShowModalSingleEvent}
            showModalSingleEvent={showModalSingleEvent}
          />
        )
      })}
      {(showModalOperationsAdd && selectedHour) &&
        <ModalOperations
          mode='add'
          date={selectedHour} 
          setShowModal={setShowModalOperationsAdd} 
          showModal={showModalOperationsAdd}
          view={view}
        />
      }
      {(showModalOperationsEdit && selectedEvent) &&
        <ModalOperations
          mode='edit'
          date={selectedEvent.from} 
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
          showModalOperations={showModalOperationsEdit}
          event={selectedEvent}
        />
      }
    </div>
  )
}

export default WeekCell