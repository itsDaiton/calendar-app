import React from 'react'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { selectMonth, selectYear, setMonth, setYear } from '../slices/dateSlice'
import { selectView, setView } from '../slices/viewSlice'
import { getCurrentMonth, getCurrentYear, viewTypes } from '../../utils/data'

const Header = () => {

  const year = useAppSelector(selectYear)
  const month = useAppSelector(selectMonth)
  const view = useAppSelector(selectView)
  const dispatch = useAppDispatch()

  const movePreviousMonth = (): void => {
    if (month === 0) {
      dispatch(
        setYear(year - 1)
      )
      dispatch(
        setMonth(11)
      )
    }
    else {
      dispatch(
        setMonth(month - 1)
      )
    }
  }

  const moveNextMonth = (): void => {
    if (month === 11) {
      dispatch(
        setYear(year + 1)
      )
      dispatch(
        setMonth(0)
      )
    }
    else {
      dispatch(
        setMonth(month + 1)
      )
    }
  }

  const moveToToday = (): void => {
    dispatch(
      setYear(getCurrentYear())
    )
    dispatch(
      setMonth(getCurrentMonth())
    )
  }

  const handleViewSwitch = (e: React.FormEvent<HTMLInputElement>): void => {
    dispatch(
      setView(e.currentTarget.value)
    )
  }

  return (
    <div className='flex justify-between items-center font-poppins border-b-2 px-6 py-4'>
      <div className='flex w-1/3 justify-start space-x-4'>
        <FontAwesomeIcon icon={faCalendarDays} className='text-[36px]'/>
        <p className='text-center text-[28px] font-semibold'>Calendar</p>
      </div>
      <div className='flex w-1/3 justify-center items-center'>
        <FontAwesomeIcon icon={faChevronLeft} onClick={() => movePreviousMonth()} className='text-[26px] cursor-pointer'/>
        <div className='flex justify-center text-[28px] space-x-2 font-semibold w-1/2 select-none'>
          <span>{dayjs().month(month).format('MMMM')}</span>
          <span>{year}</span>
        </div>
        <FontAwesomeIcon icon={faChevronRight} onClick={() => moveNextMonth()} className='text-[26px] cursor-pointer'/>
      </div>
      <div className='flex w-1/3 justify-end'>
        <button 
          onClick={() => moveToToday()} 
          className='text-[18px] text-slate-500 mr-20 bg-slate-200 rounded-xl p-1 font-medium px-8 select-none space-x-2'
        >
          Today
        </button>
        <div className='flex justify-center items-center bg-slate-200 rounded-xl p-1 font-medium'>
          {viewTypes.map((viewType) => (
            <label 
              key={viewType.id}
              htmlFor={viewType.value}
              className={`text-[18px] cursor-pointer flex justify-center items-center flex-col py-2 px-8 rounded-xl select-none
              ${viewType.value === view ? 'bg-purple-700 text-white' : 'text-slate-500'}`}
            >
              <input
                type='radio'
                id={viewType.value}
                name='viewType'
                value={viewType.value}
                checked={view === viewType.value}
                className='hidden'
                onChange={handleViewSwitch}
              />
              <span>{viewType.text}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header