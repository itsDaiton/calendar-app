import dayjs from 'dayjs'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { selectMonth, selectYear, setMonth, setYear } from '../slices/dateSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CalendarSwitch = () => {

  const year: number = useAppSelector(selectYear)
  const month: number = useAppSelector(selectMonth)
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

  return (
    <div className='flex w-1/3 justify-center items-center'>
      <FontAwesomeIcon
        icon={faChevronLeft}
        onClick={() => movePreviousMonth()}
        className='text-[26px] cursor-pointer'
      />
      <div className='flex justify-center text-[28px] space-x-2 font-semibold w-1/2 select-none'>
        <span>
          {dayjs().month(month).format('MMMM')}
        </span>
        <span>
          {year}
        </span>
      </div>
      <FontAwesomeIcon 
        icon={faChevronRight}
        onClick={() => moveNextMonth()}
        className='text-[26px] cursor-pointer'
      />
    </div>
  )
}

export default CalendarSwitch