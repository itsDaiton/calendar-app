import { ChangeEvent, useEffect, useState } from 'react';
import { EventType } from '../../utils/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faPen } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import validator from 'validator';

type ColorProps = {
  id: number;
  value: string;
}

export const colors: ColorProps[] = [
  {
    id: 1,
    value: 'bg-sky-400',
  },
  {
    id: 2,
    value: 'bg-green-500',
  },
  {
    id: 3,
    value: 'bg-red-500',
  },
  {
    id: 4,
    value: 'bg-amber-500',
  },
  {
    id: 5,
    value: 'bg-fuchsia-600',
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
  date: dayjs.Dayjs;
  mode: string;
  event?: EventType;
  view: string;
  showModal: boolean;
  setShowModal: (value: React.SetStateAction<boolean>) => void;
}

const ModalOperations = ({ date, mode, event, view, setShowModal, showModal }: ModalProps) => {

  const [eventInputs, setEventsInputs] = useState<EventInputProps>(defaultInputs)
  const [titleError, setTitleError] = useState<string>('')
  const [fromError, setFromError] = useState<string>('')
  const [toError, setToError] = useState<string>('')

  const hours: dayjs.Dayjs[] = []

  for (let i = 0; i <= 23; i++) {
    const hour: dayjs.Dayjs = date.hour(i).minute(0)
    hours.push(hour)
  }

  const loadInputs = (): void => {
    if (event) {
      setEventsInputs({           
        title: event?.title,
        from: event?.from.format(),
        to: event?.to.format(),
        color: event?.color,
      })   
    }
  }

  useEffect(() => {
    if (view === 'month') {
      if (mode === 'edit') {
        loadInputs()
      }
    }
    else {
      if (mode === 'add') {
        setEventsInputs({
          ...eventInputs,
          from: date.format()
        })
      }
      else {
        loadInputs()   
      }
    }
  }, []) 

  const clickOutside = (): void => {
    if (showModal) {
      setShowModal(false)
    }
  }

  const clearErrors = (): void => {
    setTitleError('')
    setFromError('')
    setToError('')
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
    setEventsInputs({
      ...eventInputs,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    clearErrors()

    let color: string = eventInputs.color

    if (validator.isEmpty(eventInputs.title)) {
      setTitleError('Title is required.')
    }

    if (validator.isEmpty(eventInputs.from)) {
      if (mode === 'edit') {
        setFromError('New start of event is required.')
      }
      else {
        setFromError('Start of event is required.')
      }
    }

    if (validator.isEmpty(eventInputs.to)) {
      if (mode === 'edit') {
        setToError('New end of event is required.')
      }
      else {
        setToError('End of event is required.')
      }
    }

    if (validator.isEmpty(eventInputs.color)) {
      color = 'bg-black'
    }

    if (dayjs(eventInputs.from).isAfter(dayjs(eventInputs.to))) {
      setFromError('Event cannot go the past.')
      setToError('Event cannot go the past.')
    }

    if (dayjs(eventInputs.from).isSame(dayjs(eventInputs.to))) {
      setFromError('Event must be long at least 1 hour.')
      setToError('Event must be long at least 1 hour.')
    }

    if (
      !validator.isEmpty(eventInputs.title) && 
      !validator.isEmpty(eventInputs.from) && 
      !validator.isEmpty(eventInputs.to) &&
      (dayjs(eventInputs.from).isBefore(dayjs(eventInputs.to)) && 
      !dayjs(eventInputs.from).isSame(dayjs(eventInputs.to)))) {
  
      const data: string | null = localStorage.getItem('events')
  
      if (data) {
        const items: EventType[] = JSON.parse(data)

        if (mode === 'edit') {
          const editedEvent: EventType | undefined = items.find(item => item.id === event?.id)
          if (editedEvent) {
            editedEvent.color = eventInputs.color
            editedEvent.from = dayjs(eventInputs.from)
            editedEvent.to = dayjs(eventInputs.to)
            editedEvent.title = eventInputs.title
          }
          localStorage.setItem('events', JSON.stringify(items))         
        }
        else {
          const lastIndex: number = items[items.length - 1].id
          const newEvent: EventType = {       
            id: lastIndex + 1,
            title: eventInputs.title,
            from: dayjs(eventInputs.from),
            to: dayjs(eventInputs.to),
            color: color,
          }
          localStorage.setItem('events', JSON.stringify([...items, newEvent]))
        }
      }
      else {
        const events: EventType[] = []
        const newEvent: EventType = {       
          id: 1,
          title: eventInputs.title,
          from: dayjs(eventInputs.from),
          to: dayjs(eventInputs.to),
          color: color,
        }
        events.push(newEvent)
        localStorage.setItem('events', JSON.stringify(events))
      }
      setShowModal(false)  
    }
  }

  return (
    <div>
      <div
        className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 cursor-default font-poppins font-medium'
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
                  <FontAwesomeIcon icon={mode === 'edit' ? faPen : faCalendarDays} />
                  <p className='font-semibold'>
                    {mode === 'edit' ? `Editing \'${event?.title}\'` : 'New event'}
                  </p>
                </div>
                {mode === 'add' ?
                <p className='text-xl font-semibold text-slate-600'>
                  {date.locale('en').format('dddd').substring(0, 3)} {date.format('DD')}. {date.format('MM')}. {date.format('YYYY')}
                </p>
                :
                <div>
                  <p className='text-xl font-semibold text-slate-600 text-center'>
                    {event?.from.format('HH:mm')} - {event?.to.format('HH:mm')}
                  </p>
                  <p className='text-xl font-semibold text-slate-600 mt-5 text-center'>
                    {event?.from.locale('en').format('dddd').substring(0, 3)} {event?.from.format('DD')}. {event?.from.format('MM')}. {event?.from.format('YYYY')}
                  </p>
                </div>
                }
              </div>
            </div>
            <form className='relative p-5 flex-auto space-y-8 mx-2'>
              <div>
                <label 
                  htmlFor='title'
                  className={`flex text-[18px] text-black mb-2 ${titleError !== '' ? 'text-red-500' : '' }`}
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
                  className={`bg-slate-200 rounded-xl w-full p-2.5 focus:no-underline text-[18px] placeholder:text-[18px] focus:outline-none
                  placeholder:text-black ${titleError !== '' ? 'border-red-500 border-2 bg-red-100 placeholder:text-red-500' : '' }`}
                />
                <p className='pl-1 mt-2 text-sm text-red-600'>
                  {titleError}
                </p>
              </div>
              <div>
                <label 
                  htmlFor='from'
                  className={`flex text-[18px] text-black mb-2 ${fromError !== '' ? 'text-red-500' : '' }`}
                >
                  From
                </label>
                <select
                  id='from'
                  name='from'
                  value={eventInputs.from}
                  onChange={handleChange}
                  className={`bg-slate-200 rounded-xl w-full p-2.5 focus:no-underline text-[18px] placeholder:text-[18px] focus:outline-none
                  ${fromError !== '' ? 'border-red-500 border-2 bg-red-100 placeholder:text-red-500 text-red-500' : '' }`}
                >
                  <option>{mode === 'edit' ? 'Choose an new hour' : 'Choose an hour' }</option>
                  {hours.map((hour, i) => (
                    <option key={i} value={hour.format()}>{hour.format('HH:mm')}</option>
                  ))}             
                </select>
                <p className='pl-1 mt-2 text-sm text-red-600'>
                  {fromError}
                </p>
              </div>
              <div>
                <label 
                  htmlFor='to'
                  className={`flex text-[18px] text-black mb-2 ${toError !== '' ? 'text-red-500' : '' }`}
                >
                  To
                </label>
                <select
                  id='to'
                  name='to'
                  value={eventInputs.to}
                  onChange={handleChange}
                  className={`bg-slate-200 rounded-xl w-full p-2.5 focus:no-underline text-[18px] placeholder:text-[18px] focus:outline-none
                  ${toError !== '' ? 'border-red-500 border-2 bg-red-100 placeholder:text-red-500 text-red-500' : '' }`}
                >
                  <option>{mode === 'edit' ? 'Choose an new hour' : 'Choose an hour' }</option>
                  {hours.map((hour, i) => (
                    <option key={i} value={hour.format()} >{hour.format('HH:mm')}</option>
                  ))}
                </select>
                <p className='pl-1 mt-2 text-sm text-red-600'>
                  {toError}
                </p>
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