import dayjs from 'dayjs'
import { daysOfWeek } from '../../utils/data'

type CalendarProps = {
  year: number;
  month: number;
}

const Calendar = ({ year, month}: CalendarProps) => {

  const renderWeeks = () => {
    const weeks: any = []
    
    const firstDayOfMonth = dayjs().year(year).month(month).date(1)
    const firstDayOfWeek = firstDayOfMonth.day()
    const daysInMonth = firstDayOfMonth.daysInMonth()

    const previousMonthDays: dayjs.Dayjs[] = []
    const previousMonthLastDay = dayjs().year(year).month(month - 1).endOf('month').date()

    const startDayIndex = (firstDayOfWeek + 6) % 7

    for (let i = startDayIndex - 1; i >= 0; i--) {
      previousMonthDays.push(dayjs().year(year).month(month - 1).date(previousMonthLastDay - i))
    }

    const currentMonthDays: dayjs.Dayjs[] = []
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push(dayjs().year(year).month(month).date(i))
    }

    const lastDayOfWeek = (firstDayOfWeek + daysInMonth - 1) % 7
    const daysInNextMonth = (lastDayOfWeek === 6) ? 0 : 6 - lastDayOfWeek

    const nextMonthDays: dayjs.Dayjs[] = []
    for (let i = 1; i <= daysInNextMonth + 1; i++) {
      nextMonthDays.push(dayjs().year(year).month(month + 1).date(i))
    }

    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays]

    for (let i = 0; i < days.length; i++) {
      const date = days[i]
      const isCurrentMonth = date.month() === month
      const isToday = date.isSame(dayjs(), 'day')

      weeks.push(
        <div
          key={i}
          className={`w-[25px] h-[25px] p-10 m-5 flex justify-center items-center font-poppins text-[26px] rounded-full
          ${isCurrentMonth ? 'text-black' : 'text-gray-400'}
          ${isToday ? 'bg-blue-600' : ''}`}
        >
          {date.date()}
        </div>
      )
    }
    return weeks;
  }

  return (
    <div>
    <div className='flex justify-center items-center flex-wrap flex-row w-1/2 space-x-5'>
      <p className='font-poppins text-[32px]'>
        {dayjs().month(month).format('MMMM')}
      </p>
      <p className='font-poppins text-[32px]'>
        {year}
      </p>
    </div>
    <div className='flex flex-row justify-center space-x-20 items-center w-1/2 py-5 font-poppins font-semibold text-[22px]'>
      {daysOfWeek.map((day) => (
        <p key={day.id}>{day.value}</p>
      ))}
    </div>
    <div className='flex justify-center flex-wrap flex-row w-1/2'>
      {renderWeeks()}
    </div>
    </div>
  )
}

export default Calendar