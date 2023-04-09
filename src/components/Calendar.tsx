import React from 'react';
import dayjs from 'dayjs'
import { daysOfWeek, getFirstDayOfWeek } from '../../utils/data'
import { useAppSelector } from '../../utils/hooks';
import { selectMonth, selectWeek, selectYear } from '../slices/dateSlice';
import { selectView } from '../slices/viewSlice';
import MonthCell from './MonthCell';
import WeekCell from './WeekCell';

const Calendar = () => {

  const year: number = useAppSelector(selectYear)
  const month: number = useAppSelector(selectMonth)
  const week: number = useAppSelector(selectWeek)
  const view: string = useAppSelector(selectView)

  const weekDaysValues: React.ReactElement[] = []
  const weekDaysNames: React.ReactElement[] = []

  const renderCells = (viewType: string) => {
    const cells: React.ReactElement[] = []

    if (viewType === 'month') {
      const firstDayOfMonth: dayjs.Dayjs = dayjs().year(year).month(month).date(1)
      const firstDayOfWeek: number = firstDayOfMonth.day()
      const daysInMonth: number = firstDayOfMonth.daysInMonth()
      
      const previousMonthLastDay: number = dayjs().year(year).month(month - 1).endOf('month').date()
      const startDayIndex: number = (firstDayOfWeek + 6) % 7

      const previousMonthDays: dayjs.Dayjs[] = []
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
      
        cells.push(
        <MonthCell 
          key={i} 
          date={date}
          numberOfRows={numberOfRows} 
          isCurrentMonth={isCurrentMonth} 
          isToday={isToday}
          year={year}
          month={month}
          week={week}
          view={view}
        />
        )
      }
    }
    else {
      const startOfWeek = getFirstDayOfWeek(year, month, week)

      for (let i = 0; i < 7; i++) {
        const date: dayjs.Dayjs = startOfWeek.add(i, 'day')
        const hours: dayjs.Dayjs[] = []
        const isCurrentMonth: boolean = date.month() === month
        const isToday: boolean = date.isSame(dayjs(), 'day')

        for (let j = 1; j <= 24; j++) {
          const hour: dayjs.Dayjs = date.hour(j)
          hours.push(hour)
        }

        weekDaysNames.push(
          <p 
            key={i} 
            className={`w-[14.28%] h-full px-4 text-center border-r-2 bg-slate-100 
            ${viewType === 'month' ? 'border-b-2' : ''}
            ${isCurrentMonth ? 'text-black' : 'text-slate-400'}`}
          >
            {date.locale('en').format('dddd').substring(0, 3)}
          </p>        
        )

        weekDaysValues.push(
          <div 
            key={i} 
            className='w-[14.28%] h-full px-4 rounded text-center border-r-2 border-b-2 bg-slate-100 flex justify-center items-center pb-2'
          >
            <div className={`w-[35px] h-[35px] rounded-full flex justify-center items-center 
            ${isToday ? 'bg-purple-700 text-white' : ''}
            ${isCurrentMonth ? 'text-black' : 'text-slate-400'}`}>
              <p>{date.date()}</p>
            </div>
          </div>
        )

        cells.push(
          <WeekCell
            hours={hours}
            index={i}
            key={i}
          />
        )
      }
    }
    return cells;
  }

  return (
    <div className='w-[100vw] h-[90vh]'>
      <div className={`h-full ${view === 'week' ? 'overflow-scroll' : ''}`}>
        <div className={`flex flex-row justify-center items-center font-poppins font-semibold text-[22px]
        ${view === 'week' ? 'h-[4%]' : 'h-[5%]'}`}
        >
          {view === 'month' ?
            daysOfWeek.map((day) => (
              <p key={day.id} className={`w-[14.28%] h-full px-4 text-center border-r-2 bg-slate-100 
              ${view === 'month' ? 'border-b-2' : ''}`}
              >
                {day.value}
              </p>          
            )) : 
            weekDaysNames
          }
        </div>
        {view === 'week' ?
        <div className='flex flex-row justify-center items-center font-poppins font-semibold text-[22px] h-[5%]'>
          {weekDaysValues}
        </div>
        : ''
        }
        <div className='flex justify-center h-[95%]'>
          <div className='flex justify-center flex-wrap w-full'>
            {renderCells(view)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar