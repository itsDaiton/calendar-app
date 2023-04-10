import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faHouse } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from '../../utils/hooks'
import { setMonth, setWeek, setYear } from '../slices/dateSlice'
import { getCurrentMonth, getCurrentWeek, getCurrentYear } from '../../utils/data'
import ViewSwitch from './ViewSwitch'
import CalendarSwitch from './CalendarSwitch'

const Header = () => {

  const dispatch = useAppDispatch()

  const moveToToday = (): void => {
    dispatch(
      setYear(getCurrentYear())
    )
    dispatch(
      setMonth(getCurrentMonth())
    )
    dispatch(
      setWeek(getCurrentWeek())
    )
  }

  return (
    <div className='flex justify-between items-center font-poppins border-b-2 sm:px-6 px-3 h-[10vh]'>
      <div className='flex md:w-1/3 sm:w-[10%] w-fit justify-start space-x-4 select-none'>
        <FontAwesomeIcon icon={faCalendarDays} className='xl:text-[36px] es:text-[30px] text-[24px]'/>
        <p className='text-center xl:text-[28px] text-[24px] font-semibold md:flex hidden'>Calendar</p>
      </div>
      <CalendarSwitch/>
      <div className='flex w-1/3 justify-end'>
        <button 
          onClick={() => moveToToday()} 
          className='xl:text-[18px] md:text-[16px] es:text-[14px] text-[12px] text-slate-500 2xl:mr-20 xl:mr-10 ns:mr-5 mr-1 bg-slate-200 
          rounded-xl p-1 font-medium xl:px-8 es:px-4 px-2 select-none es:space-x-2 space-x-0'
        >
          <span className='es:flex hidden'>Today</span>
          <FontAwesomeIcon icon={faHouse} className='es:hidden flex'/>
        </button>
        <ViewSwitch/>
      </div>
    </div>
  )
}

export default Header