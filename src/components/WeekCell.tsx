import dayjs from 'dayjs'
import Event from './Event'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

type CalendarCellProps = {
  hours: dayjs.Dayjs[];
  index: number;
}

const WeekCell = ({ hours, index }: CalendarCellProps) => {

  const test = [
    {
      id: 1,
      title: 'Birthday',
      from: dayjs().hour(1),
      to: dayjs().hour(4),
      color: 'bg-yellow-200',   
    },
    {
      id: 2,
      title: 'Meeting',
      from: dayjs().hour(10),
      to: dayjs().hour(14),
      color: 'bg-blue-300',   
    },
    {
      id: 3,
      title: 'Meeting 2',
      from: dayjs().hour(12),
      to: dayjs().hour(14),
      color: 'bg-red-500',   
    }
  ]

  return (
    <div className={`w-[14.28%] flex flex-col relative`}>
      {hours.map((hour, i) => (
        <div key={hour.format()} className='h-[125px] border-b-2 border-r-2 text-sm flex justify-start p-1 items-end font-semibold'>
          {index % 7 === 0 ? hour.format('HH:mm') : ''}
          {test
            .filter(({ from, to }) => hour.isBetween(from, to, null, '[]'))
            .map((event, j) => (
              <Event key={`${i}-${j}`} {...event}/>
            ))}
        </div>
      ))}
    </div> 
  )
}

export default WeekCell