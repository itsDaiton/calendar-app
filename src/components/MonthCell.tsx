import dayjs from 'dayjs';
import { useState } from 'react';
import Modal from './Modal';

type CalendarCellProps = {
  date: dayjs.Dayjs;
  numberOfRows: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

const MonthCell = ({ date, numberOfRows, isCurrentMonth, isToday }: CalendarCellProps) => {

  const [showModal, setShowModal] = useState<boolean>(false)

  const events = [
    {
      title: 'Birthday',
      from: dayjs().hour(1).minute(0),
      to: dayjs().hour(4).minute(0),
      color: 'bg-yellow-600',   
    },
    {
      title: 'Meeting 1',
      from: dayjs().hour(10).minute(0),
      to: dayjs().hour(14).minute(0),
      color: 'bg-blue-300',   
    },
    {
      title: 'Meeting 2',
      from: dayjs().hour(12).minute(0).add(1, 'day'),
      to: dayjs().hour(14).minute(0).add(1, 'day'),
      color: 'bg-red-500',   
    },
    {
      title: 'Meeting 3',
      from: dayjs().hour(4).minute(0).add(1, 'day'),
      to: dayjs().hour(5).minute(0).add(1, 'day'),
      color: 'bg-cyan-500',   
    },
    {
      title: 'Meeting 4',
      from: dayjs().hour(7).add(1, 'day').minute(0),
      to: dayjs().hour(8).add(1, 'day').minute(0),
      color: 'bg-indigo-600',   
    },
    {
      title: 'Meeting 4',
      from: dayjs().hour(7).minute(0),
      to: dayjs().hour(8).minute(0),
      color: 'bg-indigo-600',   
    },
  ]

  const sameDayEvents = events.filter(
    (event) => date.isSame(event.from, 'date')
  )

  const eventBoxes: JSX.Element[] = sameDayEvents.slice(0, 2).map((event, index) => {
    const startTime = event.from.format('HH:mm')
    const endTime = event.to.format('HH:mm')
    return (
      <div key={index} className={`w-full h-[20px] ${event.color} rounded-md text-white font-medium text-sm mb-1 pl-1 pr-2`}>
        <span>
          {`${event.title} (${startTime} - ${endTime})`}
        </span>
      </div>
    )
  })

  const moreButton: JSX.Element | null =
    sameDayEvents.length > 2 ? (
      <div className="w-full flex justify-center mt-1">
        <button
          className="text-blue-500 font-medium hover:text-blue-700 cursor-pointer"
          onClick={() => setShowModal(true)}
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
    >   
      <div 
        className={`w-[10px] h-[10px] p-5 flex items-center justify-center rounded-full 
        ${isToday ? 'bg-purple-700 text-white' : ''}`}
      >
        <p>{date.date()}</p>
      </div>
      <div className='flex flex-col mt-3'>
        {eventBoxes}
        {moreButton} 
      </div>
      {showModal &&
        <Modal events={sameDayEvents} setShowModal={setShowModal} showModal={showModal} date={date}/>  
      } 
    </div>
  )
}

export default MonthCell