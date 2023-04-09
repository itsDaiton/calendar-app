import dayjs from 'dayjs'
import Event from './Event'
import isBetween from 'dayjs/plugin/isBetween'
import { EventType } from '../../utils/data'

dayjs.extend(isBetween)

type CalendarCellProps = {
  hours: dayjs.Dayjs[];
  index: number;
}

const events = [
  {
    id: 1,
    title: 'Birthday',
    from: dayjs().hour(1).subtract(5, 'day'),
    to: dayjs().hour(4).subtract(5, 'day'),
    color: 'bg-yellow-200',   
  },
  {
    id: 2,
    title: 'Meeting',
    from: dayjs().hour(10).subtract(5, 'day'),
    to: dayjs().hour(14).subtract(5, 'day'),
    color: 'bg-blue-300',   
  },
  {
    id: 3,
    title: 'Party',
    from: dayjs().hour(12).subtract(5, 'day'),
    to: dayjs().hour(20).subtract(5, 'day'),
    color: 'bg-red-500',   
  },
  {
    id: 4,
    title: 'Party',
    from: dayjs().hour(7).subtract(5, 'day'),
    to: dayjs().hour(16).subtract(5, 'day'),
    color: 'bg-yellow-600',   
  },
  {
    id: 70,
    title: 'Party',
    from: dayjs().hour(7).subtract(5, 'day'),
    to: dayjs().hour(18).subtract(5, 'day'),
    color: 'bg-black',   
  },
  {
    id: 70,
    title: 'Party',
    from: dayjs().hour(1).subtract(4, 'day'),
    to: dayjs().hour(3).subtract(4, 'day'),
    color: 'bg-pink-500',   
  },
  {
    id: 70,
    title: 'Party',
    from: dayjs().hour(1),
    to: dayjs().hour(3),
    color: 'bg-pink-500',   
  },
]

const WeekCell = ({ hours, index }: CalendarCellProps) => {

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

  console.log(eventsPerDay)

  return (
    <div className={`w-[14.28%] flex flex-col relative`}>
      {hours.map((hour) => {
        return (
          <div
            key={hour.format()}
            className='h-[125px] border-b-2 border-r-2 text-sm flex justify-start p-1 items-end font-semibold'
          >
            <span className='z-50'>
              {index % 7 === 0 ? hour.format('HH:mm') : ''}
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

        console.log(eventsPerDay.length)

        return (
          <Event
            key={event.id}
            event={event}
            height={height}
            width={width}
            top={top}
            left={left}
            eventsPerDay={eventsPerDay.length}
          />
        )
      })}
    </div>
  )
}

export default WeekCell