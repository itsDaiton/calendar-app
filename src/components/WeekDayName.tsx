import dayjs from 'dayjs';

type WeekDayNameProps = {
  view: string;
  isCurrentMonth: boolean;
  date: dayjs.Dayjs;
}

const WeekDayName = ({ view, isCurrentMonth, date }: WeekDayNameProps) => {
  return (
    <p 
    className={`w-[14.28%] h-full px-4 text-center border-r-2 bg-slate-100 
    ${view === 'month' ? 'border-b-2' : ''}
    ${isCurrentMonth ? 'text-black' : 'text-slate-400'}`}
  >
    {date.locale('en').format('dddd').substring(0, 3)}
  </p>
  )
}

export default WeekDayName