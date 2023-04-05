import dayjs from 'dayjs'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { selectMonth, selectWeek, selectYear, setMonth, setWeek, setYear } from '../slices/dateSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectView } from '../slices/viewSlice'
import { getFirstDayOfMonth, getFirstDayOfWeek} from '../../utils/data'
import isLeapYear from 'dayjs/plugin/isLeapYear'

dayjs.extend(isLeapYear)

const CalendarSwitch = () => {

  const year: number = useAppSelector(selectYear)
  const month: number = useAppSelector(selectMonth)
  const week: number = useAppSelector(selectWeek)
  const view: string = useAppSelector(selectView)
  const dispatch = useAppDispatch()

  // week view
  const currentWeekFirstDay = getFirstDayOfWeek(year, month, week)
  // month view
  const currentMonthFirstDay = getFirstDayOfMonth(year, month)

  const movePreviousMonth = (): void => {
    const previousWeekFirstDay = currentWeekFirstDay.subtract(1, 'week')
    const previousWeekMonth = previousWeekFirstDay.month()
    const previousWeekYear = previousWeekFirstDay.year()

    if (view === 'week') {   
      if (previousWeekMonth !== month) {
        dispatch(
          setMonth(previousWeekMonth)
        )
      }
      if (previousWeekYear !== year) {
        dispatch(
          setYear(previousWeekYear)
        )
      }
      dispatch(
        setWeek(previousWeekFirstDay.week())
      )
    }
    else {
      const previousMonthFirstDay = currentMonthFirstDay.subtract(1, 'month')
      const previousMonthYear = previousMonthFirstDay.year()

      if (previousMonthYear !== year) {
        dispatch(
          setYear(previousMonthYear)
        )
      }
      dispatch(
        setMonth(previousMonthFirstDay.month())
      )
      dispatch(
        setWeek(previousMonthFirstDay.week())
      )
    }
  }

  const moveNextMonth = (): void => {
    const nextWeekFirstDay = currentWeekFirstDay.add(1, 'week')
    const nextWeekMonth = nextWeekFirstDay.month()
    const nextWeekYear = nextWeekFirstDay.year()

    if (view === 'week') {   
      if (nextWeekMonth !== month) {
        dispatch(
          setMonth(nextWeekMonth)
        )
      }
      if (nextWeekYear!== year) {
        dispatch(
          setYear(nextWeekYear)
        )
      }
      dispatch(
        setWeek(nextWeekFirstDay.week())
      )
    }
    else {
      const nextMonthFirstDay = currentMonthFirstDay.add(1, 'month')
      const nextMonthYear = nextMonthFirstDay.year()

      if (nextMonthYear !== year) {
        dispatch(
          setYear(nextMonthYear)
        )
      }
      dispatch(
        setMonth(nextMonthFirstDay.month())
      )
      dispatch(
        setWeek(nextMonthFirstDay.week())
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