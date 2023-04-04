import React from 'react';
import dayjs from 'dayjs'
import { daysOfWeek } from '../../utils/data'
import { useAppSelector } from '../../utils/hooks';
import { selectMonth, selectYear } from '../slices/dateSlice';
import Cell from './Cell';

const Calendar = () => {

  const year: number = useAppSelector(selectYear)
  const month: number = useAppSelector(selectMonth)

  const renderWeeks = () => {
    const weeks: React.ReactElement[] = []
    
    const firstDayOfMonth: dayjs.Dayjs = dayjs().year(year).month(month).date(1)
    const firstDayOfWeek: number = firstDayOfMonth.day()
    const daysInMonth: number = firstDayOfMonth.daysInMonth()

    const previousMonthDays: dayjs.Dayjs[] = []
    const previousMonthLastDay: number = dayjs().year(year).month(month - 1).endOf('month').date()

    const startDayIndex: number = (firstDayOfWeek + 6) % 7

    for (let i = startDayIndex - 1; i >= 0; i--) {
      previousMonthDays.push(dayjs().year(year).month(month - 1).date(previousMonthLastDay - i))
    }

    const currentMonthDays: dayjs.Dayjs[] = []
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push(dayjs().year(year).month(month).date(i))
    }

    const lastDayOfWeek: number = (firstDayOfWeek + daysInMonth - 1) % 7
    const daysInNextMonth: number = (lastDayOfWeek === 6) ? 0 : 6 - lastDayOfWeek

    const nextMonthDays: dayjs.Dayjs[] = []
    for (let i = 1; i <= daysInNextMonth + 1; i++) {
      nextMonthDays.push(dayjs().year(year).month(month + 1).date(i))
    }

    const days: dayjs.Dayjs[] = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays]

    const numberOfRows: number = days.length / 7

    for (let i = 0; i < days.length; i++) {
      const date: dayjs.Dayjs = days[i]
      const isCurrentMonth: boolean = date.month() === month
      const isToday: boolean = date.isSame(dayjs(), 'day')

      weeks.push(
        <Cell 
          key={i} 
          date={date}
          numberOfRows={numberOfRows} 
          isCurrentMonth={isCurrentMonth} 
          isToday={isToday}
        />
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