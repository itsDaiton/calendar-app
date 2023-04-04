import dayjs from 'dayjs';

type CalendarCellProps = {
  date: dayjs.Dayjs
  numberOfRows: number;
  isCurrentMonth: boolean;
  isToday: boolean
}

const Cell = ({ date, numberOfRows, isCurrentMonth, isToday }: CalendarCellProps) => {
  return (
    <div
      className={`w-[14.28%] px-4 flex justify-start font-poppins text-[16px] font-medium border-b-2 border-r-2
      ${isCurrentMonth ? 'text-black' : 'text-slate-400'}
      ${numberOfRows === 6 ? 'h-1/6' : 'h-1/5'}`}
    >   
      <div 
        className={`w-[10px] h-[10px] p-5 flex items-center justify-center rounded-full 
        ${isToday ? 'bg-purple-700 text-white' : ''}`}
      >
        <p>{date.date()}</p>
      </div>     
    </div>
  )
}

export default Cell