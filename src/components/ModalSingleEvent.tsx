import React from 'react'
import { EventType } from '../../utils/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

type ModalProps = {
  setShowModalSingleEvent: (value: React.SetStateAction<boolean>) => void;
  showModalSingleEvent: boolean;
  setShowModalOpeartions: (value: React.SetStateAction<boolean>) => void;
  event: EventType;
}

const ModalSingleEvent = ({ setShowModalSingleEvent, showModalSingleEvent, setShowModalOpeartions, event }: ModalProps) => {

  const clickOutside = (): void => {
    if (showModalSingleEvent) {
      setShowModalSingleEvent(false)
    }
  }

  const deleteEvent = (): void => {
    const data: string | null = localStorage.getItem('events') || ''
    const items: EventType[] = JSON.parse(data)
    const newItems: EventType[] = items.filter(item => item.id !== event.id)

    if (newItems.length === 0) {
      localStorage.removeItem('events')
    }
    else {  
      localStorage.setItem('events', JSON.stringify(newItems))
    }
    setShowModalSingleEvent(false)
  }

  const editEvent = (): void => {
    setShowModalSingleEvent(false)
    setShowModalOpeartions(true)
  }

  return (
    <div>
      <div
        className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 font-poppins font-medium'
        onClick={clickOutside}
      >
        <div className='relative w-auto my-6 mx-auto max-w-2xl text-black'>
          <div 
            className='flex flex-col relative w-full rounded-xl shadow-2xl bg-white'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex es:p-5 p-3 border-b-2 border-slate-200'>
              <div className='flex flex-col justify-center items-center w-full'>
                <div className='flex justify-center items-center lg:text-3xl md:text-2xl es:text-xl text-[18px] mb-4 es:space-x-4 space-x-2'>
                  <FontAwesomeIcon icon={faCalendarDays}/>
                  <p className='font-semibold'>
                    {event.title}
                  </p>
                </div>
                <p className='lg:text-xl es:text-[20px] text-[14px] font-semibold text-slate-600'>
                  {event.from.format('HH:mm')} - {event.to.format('HH:mm')}
                </p>
                <p className='lg:text-xl es:text-[20px] text-[14px] font-semibold text-slate-600 es:mt-5 mt-1'>
                {event.from.locale('en').format('dddd').substring(0, 3)} {event.from.format('DD')}. {event.from.format('MM')}. {event.from.format('YYYY')}
                </p>
              </div>
            </div>
            <div className='relative es:p-5 p-0 flex flex-row mx-8 space-x-8 es:mt-0 mt-4'>
              <div 
                className='flex items-center justify-center cursor-pointer es:text-[14px] text-[12px] 
                bg-slate-200 rounded-full px-5 py-5 text-slate-500 space-x-2'
                onClick={editEvent}
              >
                  <FontAwesomeIcon icon={faPen}/>
                  <span className='es:block hidden'>Edit</span>
              </div>
              <div 
                className='flex items-center justify-center cursor-pointer es:text-[14px] text-[12px]
              bg-slate-200 rounded-full px-5 py-5 text-slate-500 space-x-2'
                onClick={deleteEvent}
              >
                  <FontAwesomeIcon icon={faTrash}/>
                  <span className='es:block hidden'>Delete</span>
              </div>
            </div>
            <div className='flex items-center justify-center p-5'>
              <button
                className='md:text-[18px] sm:text-[16px] text-[14px] text-white bg-red-500 rounded-xl p-1 
                font-medium es:px-8 px-4 py-2 select-none space-x-2'
                type='button'
                onClick={() => setShowModalSingleEvent(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-40 fixed inset-0 z-40 bg-black'/>
    </div>
    
  )
}

export default ModalSingleEvent