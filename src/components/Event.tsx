import dayjs from 'dayjs';
import { useAppSelector } from '../../utils/hooks';
import { selectView } from '../slices/viewSlice';

type EventProps = {
  title: string;
  from: dayjs.Dayjs;
  to: dayjs.Dayjs;
  color: string;
}

const Event = ({ title, from, to, color }: EventProps) => {
  const view: string = useAppSelector(selectView)

  if (view === 'week') { 
    const start: number = from.hour()
    const end: number = to.hour()
    const top: string = `${(start / 24) * 100}%`
    const height: string = `${((end - start) / 24) * 100}%`

    return (
      <div
        className={`absolute left-0 ${color} w-full rounded-xl pt-2 pl-2 text-gray-800`}
        style={{ top, height }}
      >
        {title}
      </div>
    )
  }
  else {
    return (
      <div>TODO - month view</div>
    )
  }
}

export default Event