import dayjs from 'dayjs'
import React from 'react'

type CalendarCellProps = {
  hours: dayjs.Dayjs[];
  index: number;
}

const WeekCell = ({ hours, index }: CalendarCellProps) => {
  return (
    <div className={`w-[14.28%] flex flex-col`}>
      {hours.map((hour) => (
        <div key={hour.format()} className='h-[125px] border-b-2 border-r-2 text-sm flex justify-start p-1 items-end font-semibold'>
          {index % 7 === 0 ? hour.format('HH:mm') : ''}
        </div>
      ))}
    </div> 
  )
}

export default WeekCell