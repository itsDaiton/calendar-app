import dayjs from 'dayjs'
import { daysOfWeek } from '../../utils/data'
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { selectMonth, selectYear } from '../slices/dateSlice';

const Calendar = () => {

  const year = useAppSelector(selectYear)
  const month = useAppSelector(selectMonth)
  const dispatch = useAppDispatch()

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

    const numberOfRows = days.length / 7

    for (let i = 0; i < days.length; i++) {
      const date = days[i]
      const isCurrentMonth = date.month() === month
      const isToday = date.isSame(dayjs(), 'day')

      weeks.push(
        <div
          key={i}
          className={`w-[14.28%] px-4 flex justify-start font-poppins text-[16px] font-medium border-b-2 border-r-2
          ${isCurrentMonth ? 'text-black' : 'text-slate-400'}
          ${numberOfRows === 6 ? 'h-1/6' : 'h-1/5'}`}
        >
          
          <div className={`w-[10px] h-[10px] p-5 flex items-center justify-center rounded-full 
          ${isToday ? 'bg-purple-700 text-white' : ''}`}>
            <p>{date.date()}</p>
          </div>     
        </div>
      )
    }
    return weeks;
  }

  return (
    <div className='w-[85vw] h-[90vh]'>
      <div className='h-full'>
        <div className='flex flex-row justify-center items-center font-poppins font-semibold text-[22px] h-[5%]'>
          {daysOfWeek.map((day) => (
            <p key={day.id} className='w-[14.28%] h-full px-4 text-center border-r-2 border-b-2 bg-slate-100'>{day.value}</p>
          ))}
        </div>
        <div className='flex justify-center h-[95%]'>
          <div className='flex justify-center items-center flex-wrap'>
            {renderWeeks()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar