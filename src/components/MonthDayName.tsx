import { daysOfWeekDay } from '../../utils/data';

type MonthDayNameProps = {
  view: string;
  day: daysOfWeekDay;
}

const MonthDayName = ({ view, day }: MonthDayNameProps) => {
  return (
    <p className={`w-[14.28%] h-full lg:px-4 px-0 text-center border-r-2 bg-slate-100 ${view === 'month' ? 'border-b-2' : ''}`}>
      {day.value}
    </p>  
  )
}

export default MonthDayName