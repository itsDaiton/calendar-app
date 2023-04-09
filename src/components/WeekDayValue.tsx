import dayjs from 'dayjs'

type WeekDayValueProps = {
  date: dayjs.Dayjs;
  isToday: boolean;
  isCurrentMonth: boolean;
}

const WeekDayValue = ({ date, isToday, isCurrentMonth }: WeekDayValueProps) => {
  return (
    <div 
      className='w-[14.28%] h-full px-4 rounded text-center border-r-2 border-b-2 bg-slate-100 flex justify-center items-center pb-2'
    >
      <div className={`w-[35px] h-[35px] rounded-full flex justify-center items-center 
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