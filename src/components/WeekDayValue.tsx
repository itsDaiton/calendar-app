import dayjs from 'dayjs'

type WeekDayValueProps = {
  date: dayjs.Dayjs;
  isToday: boolean;
  isCurrentMonth: boolean;
}

const WeekDayValue = ({ date, isToday, isCurrentMonth }: WeekDayValueProps) => {
  return (
    <div 
      className='w-[14.28%] h-full lg:px-4 px-0 rounded text-center border-r-2 border-b-2 bg-slate-100 flex justify-center items-center pb-2
      lg:text-[22px] md:text-[18px] sm:text-[16px] es:text-[14px] text-[12px] select-none'
    >
      <div className={`md:w-[35px] w-[25px] md:h-[35px] h-[25px] rounded-full flex justify-center items-center 
      ${isToday ? 'bg-purple-700 text-white' : ''}
      ${isCurrentMonth ? 'text-black' : 'text-slate-400'}`}>
        <p>
          {date.date()}
        </p>
      </div>
    </div>
  )
}

export default WeekDayValue