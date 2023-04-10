import React from 'react'
import { EventType } from '../../utils/data'

type EventBoxProps = {
  event: EventType;
  start: string;
  end: string;
  setSelectedEvent: (value: React.SetStateAction<EventType | undefined>) => void;
  setShowModalSingleEvent: (value: React.SetStateAction<boolean>) => void
}

const EventBox = ({ event, start, end, setSelectedEvent, setShowModalSingleEvent}: EventBoxProps) => {
  return (
    <div 
        className={`w-full h-[20px] ${event.color} rounded-md text-white font-medium text-sm mb-1 pl-1 pr-2 cursor-pointer`}
        onClick={() => {
          setSelectedEvent(event)
          setShowModalSingleEvent(true)
        }}
      >
        <p className='overflow-hidden whitespace-nowrap lg:text-[14px] md:text-[12px] text-[10px]'>
          {`${event.title} (${start} - ${end})`}
        </p>
      </div>
  )
}

export default EventBox