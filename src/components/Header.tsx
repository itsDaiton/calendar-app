import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from '../../utils/hooks'
import { setMonth, setYear } from '../slices/dateSlice'
import { getCurrentMonth, getCurrentYear } from '../../utils/data'
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
  }

  return (
    <div className='flex justify-between items-center font-poppins border-b-2 px-6 h-[10vh]'>
      <div className='flex w-1/3 justify-start space-x-4'>
        <FontAwesomeIcon icon={faCalendarDays} className='text-[36px]'/>
        <p className='text-center text-[28px] font-semibold'>Calendar</p>
      </div>
      <CalendarSwitch/>
      <div className='flex w-1/3 justify-end'>
        <button 
          onClick={() => moveToToday()} 
          className='text-[18px] text-slate-500 mr-20 bg-slate-200 rounded-xl p-1 font-medium px-8 select-none space-x-2'
        >
          Today
        </button>
        <ViewSwitch/>
      </div>
    </div>
  )
}

export default Header