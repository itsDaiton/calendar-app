import dayjs from 'dayjs'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { selectMonth, selectWeek, selectYear, setMonth, setWeek, setYear } from '../slices/dateSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectView } from '../slices/viewSlice'
import { getFirstDayOfMonth, getFirstDayOfWeek} from '../../utils/data'

const CalendarSwitch = () => {

  const year: number = useAppSelector(selectYear)
  const month: number = useAppSelector(selectMonth)
  const week: number = useAppSelector(selectWeek)
  const view: string = useAppSelector(selectView)
  const dispatch = useAppDispatch()

  // week view
  const currentWeekFirstDay: dayjs.Dayjs = getFirstDayOfWeek(year, month, week)
  // month view
  const currentMonthFirstDay: dayjs.Dayjs = getFirstDayOfMonth(year, month)

  const movePreviousMonth = (): void => {
    const previousWeekFirstDay: dayjs.Dayjs = currentWeekFirstDay.subtract(1, 'week')
    const previousWeekMonth: number = previousWeekFirstDay.month()
    const previousWeekYear: number = previousWeekFirstDay.year()

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
      const previousMonthFirstDay: dayjs.Dayjs = currentMonthFirstDay.subtract(1, 'month')
      const previousMonthYear: number = previousMonthFirstDay.year()

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
    const nextWeekFirstDay: dayjs.Dayjs = currentWeekFirstDay.add(1, 'week')
    const nextWeekMonth: number = nextWeekFirstDay.month()
    const nextWeekYear: number = nextWeekFirstDay.year()

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
      const nextMonthFirstDay: dayjs.Dayjs = currentMonthFirstDay.add(1, 'month')
      const nextMonthYear: number = nextMonthFirstDay.year()

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
        className='xl:text-[26px] text-[20px] cursor-pointer md:pr-0 pr-6'
      />
      <div className='flex justify-center xl:text-[28px] sm:text-[22px] es:text-[20px] text-[16px] 
      es:space-x-2 space-x-1 font-semibold w-1/2 select-none'>
        <span className='es:flex hidden'>
          {dayjs().month(month).format('MMMM')}
        </span>
        <span className='es:hidden flex'>
          {dayjs().month(month).format('MMMM').substring(0, 3)}
        </span>
        <span>
          {year}
        </span>
      </div>
      <FontAwesomeIcon 
        icon={faChevronRight}
        onClick={() => moveNextMonth()}
        className='xl:text-[26px] text-[20px] cursor-pointer md:pl-0 pl-6'
      />
    </div>
  )
}

export default CalendarSwitch