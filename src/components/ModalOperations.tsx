import { ChangeEvent, useState } from 'react';
import { EventType } from '../../utils/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import validator from 'validator';

type ColorProps = {
  id: number;
  value: string;
}

const colors: ColorProps[] = [
  {
    id: 1,
    value: 'bg-sky-500',
  },
  {
    id: 2,
    value: 'bg-teal-500',
  },
  {
    id: 3,
    value: 'bg-red-500',
  },
  {
    id: 4,
    value: 'bg-amber-600',
  },
  {
    id: 5,
    value: 'bg-violet-900',
  },
]

type EventInputProps = {
  title: string;
  from: string;
  to: string;
  color: string;
}

const defaultInputs: EventInputProps = {
  title: '',
  from: '',
  to: '',
  color: '',
}

type ModalProps = {
  date: dayjs.Dayjs
  setShowModal: (value: React.SetStateAction<boolean>) => void
  showModal: boolean;
}

const ModalOperations = ({ date, setShowModal, showModal }: ModalProps) => {

  const [eventInputs, setEventsInputs] = useState<EventInputProps>(defaultInputs)
  const hours: dayjs.Dayjs[] = []

  for (let i = 1; i <= 24; i++) {
    const hour: dayjs.Dayjs = date.hour(i).minute(0)
    hours.push(hour)
  }

  const clickOutside = (): void => {
    if (showModal) {
      setShowModal(false)
    }
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
    setEventsInputs({
      ...eventInputs,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    let color = eventInputs.color

    if (validator.isEmpty(eventInputs.title)) {
      //TODO
    }
    if (validator.isEmpty(eventInputs.from)) {
      //TODO
    }
    if (validator.isEmpty(eventInputs.to)) {
      //TODO   
    }
    if (validator.isEmpty(eventInputs.color)) {
      color = 'bg-black'
    }

    if (dayjs(eventInputs.from).isAfter(dayjs(eventInputs.to))) {
      //TODO
    }
    
    const newEvent: EventType = {
      title: eventInputs.title,
      from: dayjs(eventInputs.from),
      to: dayjs(eventInputs.to),
      color: color,
    }

    const data: string | null = localStorage.getItem('events')

    if (data) {
      const items: EventType[] = JSON.parse(data)
      localStorage.setItem('events', JSON.stringify([...items, newEvent]))
    }
    else {
      const events: EventType[] = []
      events.push(newEvent)
      localStorage.setItem('events', JSON.stringify(events))
    }
    setShowModal(false)
  }

  return (
    <div>
      <div
        className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 cursor-default'
        onClick={clickOutside}
      >
        <div className='relative w-auto my-6 mx-auto max-w-2xl text-black'>
          <div 
            className='flex flex-col relative w-full rounded-xl shadow-2xl bg-white'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex p-5 border-b-2'>
              <div className='flex flex-col justify-center items-center w-full'>
                <div className='flex justify-center items-center text-3xl mb-4 space-x-4'>
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <p className='font-semibold'>
                    New event
                  </p>
                </div>
                <p className='text-xl font-semibold text-slate-600'>
                  {date.locale('en').format('dddd').substring(0, 3)} {date.format('DD')}. {date.format('MM')}. {date.format('YYYY')}
                </p>
              </div>
            </div>
            <form className='relative p-5 flex-auto space-y-8 mx-2'>
              <div>
                <label 
                  htmlFor='title'
                  className='flex text-[18px] text-black mb-2'
                >
                  Title
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  value={eventInputs.title}
                  onChange={handleChange}
                  placeholder='Title'
                  className='bg-slate-200 rounded-xl w-full p-2.5 focus:no-underline text-[18px] placeholder:text-[18px] focus:outline-none
                  placeholder:text-black'
                />
              </div>
              <div>
                <label 
                  htmlFor='from'
                  className='flex text-[18px] text-black my-2'
                >
                  From
                </label>
                <select
                  id='from'
                  name='from'
                  value={eventInputs.from}
                  onChange={handleChange}
                  className='bg-slate-200 rounded-xl w-full p-2.5 focus:no-underline text-[18px] placeholder:text-[18px] focus:outline-none'
                >
                  <option>Choose an hour</option>
                  {hours.map((hour, i) => (
                    <option key={i} value={hour.format()} >{hour.format('HH:mm')}</option>
                  ))}             
                </select>
              </div>
              <div>
                <label 
                  htmlFor='to'
                  className='flex text-[18px] text-black my-2'
                >
                  To
                </label>
                <select
                  id='to'
                  name='to'
                  value={eventInputs.to}
                  onChange={handleChange}
                  className='bg-slate-200 rounded-xl w-full p-2.5 focus:no-underline text-[18px] placeholder:text-[18px] focus:outline-none'
                >
                  <option>Choose an hour</option>
                  {hours.map((hour, i) => (
                    <option key={i} value={hour.format()} >{hour.format('HH:mm')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label 
                  htmlFor='to'
                  className='flex text-[18px] text-black my-2'
                >
                  Color
                </label>
                <div className='flex justify-center items-center space-x-5'>
                  {colors.map((color) => (
                    <label 
                    key={color.id}
                    htmlFor={color.value}
                    className={`w-[40px] h-[40px] rounded-full cursor-pointer
                    ${color.value}
                    ${eventInputs.color === color.value ? 'outline outline-4' : ''}`}
                  >
                    <input
                      type='radio'
                      id={color.value}
                      name='color'
                      value={color.value}
                      checked={eventInputs.color === color.value}
                      className='hidden'
                      onChange={handleChange}
                    />
                    </label>
                  ))}
                </div>
              </div>
            </form>
            <div className='flex items-center justify-center space-x-5 mb-8 mt-10'>
              <button
                className='text-[18px] text-white bg-green-500 rounded-xl p-1 font-medium px-8 py-2 select-none space-x-2'
                type='button'
                onClick={handleSubmit}
              >
                Confirm
              </button>
              <button
                className='text-[18px] text-white bg-red-500 rounded-xl p-1 font-medium px-8 py-2 select-none space-x-2'
                type='button'
                onClick={() => setShowModal(false)}
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

export default ModalOperations